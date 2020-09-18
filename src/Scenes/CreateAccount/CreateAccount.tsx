import { Box, CloseButton } from "App/Components"
import { screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import { get } from "lodash"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { useQuery } from "react-apollo"
import { Dimensions, FlatList, Modal } from "react-native"

import { ChoosePlanPane, WelcomePane } from "./Admitted"
import { CreateAccountPane, GetMeasurementsPane, SendCodePane, TriagePane, VerifyCodePane } from "./Undetermined"
import { WaitlistedPane } from "./Waitlisted"
import { useAuthContext } from "App/Navigation/AuthContext"

interface CreateAccountProps {
  navigation: any
  initialState?: State
  initialUserState?: UserState
  params?: any
  route?: any
}

export enum UserState {
  Undetermined,
  Admitted,
  Waitlisted,
}

export enum State {
  CreateAccount,
  SendCode,
  VerifyCode,
  GetMeasurements,
  Triage,

  ChoosePlan,
  Welcome,

  Waitlisted,
}

export const GET_PLANS = gql`
  query GetPlans($where: PaymentPlanWhereInput) {
    paymentPlans(where: $where) {
      id
      name
      description
      tagline
      price
      planID
      tier
      itemCount
    }
    me {
      customer {
        id
        membership {
          id
          plan {
            id
            tier
          }
        }
      }
    }
    faq(sectionType: PaymentPlanPage) {
      sections {
        title
        subsections {
          title
          text
        }
      }
    }
  }
`

const { width: windowWidth } = Dimensions.get("window")

// Returns the slice of `array` after and including `afterValue`, or the entire array if the value is not present.
const sliceArray: <T>(array: T[], afterValue: T) => T[] = (array, afterValue) => {
  const index = array.indexOf(afterValue)
  if (index <= 0) {
    return array
  }
  return array.slice(index)
}

// States in which to hide the close button
const statesWithoutCloseButton = [State.Triage, State.Welcome, State.Waitlisted]

const statesFor = (userState: UserState): State[] => {
  const commonStates = [State.CreateAccount, State.SendCode, State.VerifyCode, State.GetMeasurements, State.Triage]
  switch (userState) {
    case UserState.Undetermined:
      return commonStates
    case UserState.Admitted:
      return commonStates.concat([State.ChoosePlan, State.Welcome])
    case UserState.Waitlisted:
      return commonStates.concat([State.Waitlisted])
  }
}

export const CreateAccount: React.FC<CreateAccountProps> = screenTrack()(({ navigation, route }) => {
  const { data } = useQuery(GET_PLANS, {
    variables: {
      where: { status: "active" },
    },
  })
  const { resetStore } = useAuthContext()
  const initialState: State = get(route?.params, "initialState", State.CreateAccount)
  const initialUserState: UserState = get(route?.params, "initialUserState", UserState.Undetermined)

  // The general user's state
  const [userState, setUserState] = useState(initialUserState)
  // The current index into the `states(userState)` array
  const [index, setIndex] = useState(0)
  // All the states (after the initial state)
  const states = sliceArray(statesFor(userState), initialState)

  // The current state
  const currentState = states[index]

  const flatListRef: MutableRefObject<FlatList<State>> = useRef(null)
  // The maximum index shown in the FlatList
  const maxScrollableIndex = states.length - (userState === UserState.Undetermined ? 1 : 2)
  useEffect(() => flatListRef?.current?.scrollToIndex?.({ index: Math.min(index, maxScrollableIndex) }), [index])

  const [phoneNumber, setPhoneNumber] = useState(null as string)

  const setPrevState = () => setIndex(Math.max(0, index - 1))
  const setNextState = () => setIndex(index + 1)

  const paneForState = (state: State) => {
    let pane

    switch (state) {
      case State.CreateAccount:
        pane = <CreateAccountPane onSignUp={setNextState} />
        break
      case State.SendCode:
        pane = (
          <SendCodePane
            focus={currentState === State.SendCode}
            onSendCode={(phoneNumber) => {
              setPhoneNumber(phoneNumber)
              setNextState()
            }}
          />
        )
        break
      case State.VerifyCode:
        pane = (
          <VerifyCodePane
            focus={currentState === State.VerifyCode}
            onRequestBack={setPrevState}
            onVerifyPhone={setNextState}
            phoneNumber={phoneNumber}
          />
        )
        break
      case State.GetMeasurements:
        pane = <GetMeasurementsPane onGetMeasurements={setNextState} />
        break
      case State.Triage:
        pane = (
          <TriagePane
            check={currentState === State.Triage}
            onTriageComplete={(userAdmitted) => {
              setUserState(userAdmitted ? UserState.Admitted : UserState.Waitlisted)
              setNextState()
            }}
          />
        )
        break
      case State.ChoosePlan:
        pane = (
          <ChoosePlanPane
            paneType={1}
            data={data?.faq}
            onComplete={setNextState}
            headerText={"You're in.\nLet's choose your plan"}
          />
        )
        break
    }
    return (
      <Box key={state.toString()} width={windowWidth}>
        {pane}
      </Box>
    )
  }

  return (
    <>
      {!statesWithoutCloseButton.includes(currentState) && <CloseButton variant="light" />}

      <FlatList
        data={states}
        horizontal
        initialScrollIndex={Math.min(index, maxScrollableIndex)}
        keyExtractor={(item) => item.toString()}
        onScrollToIndexFailed={(info) => {
          // When first rendering this component, the layout may not yet be complete
          // depending on the initial index, so we have to wait for the layout to
          // finish and then retry.
          setTimeout(() => {
            flatListRef?.current?.scrollToIndex?.({ index: info.index })
          }, 100)
        }}
        ref={flatListRef}
        renderItem={({ item }) => paneForState(item)}
        scrollEnabled={false}
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
      />

      <Modal visible={currentState === State.Welcome} animated>
        <WelcomePane
          onPressGetStarted={() => {
            resetStore()
            navigation.goBack()
          }}
        />
      </Modal>

      <Modal visible={currentState === State.Waitlisted} animated>
        <WaitlistedPane
          onPressFinish={() => {
            resetStore()
            navigation.goBack()
          }}
        />
      </Modal>
    </>
  )
})
