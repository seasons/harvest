import { Box, CloseButton } from "App/Components"
import { get } from "lodash"
import React, { useRef, useState, MutableRefObject, useEffect } from "react"
import { Modal, FlatList, Dimensions } from "react-native"

import { CreateAccountPane, SendCodePane, VerifyCodePane, GetMeasurementsPane, TriagePane } from "./Undetermined"
import { ChoosePlanPane, ChargebeeCheckoutPane, ProcessingPaymentPane, WelcomePane } from "./Admitted"
import { WaitlistedPane } from "./Waitlisted"

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
  Checkout,
  ProcessingPayment,
  Welcome,

  Waitlisted,
}

const { width: windowWidth } = Dimensions.get("window")

const statesFor = (userState: UserState): State[] => {
  const commonStates = [State.CreateAccount, State.SendCode, State.VerifyCode, State.GetMeasurements, State.Triage]
  switch (userState) {
    case UserState.Undetermined:
      return commonStates
    case UserState.Admitted:
      return commonStates.concat([State.ChoosePlan, State.Checkout, State.ProcessingPayment, State.Welcome])
    case UserState.Waitlisted:
      return commonStates.concat([State.Waitlisted])
  }
}

// Returns the slice of `array` after and including `afterValue`, or the entire array if the value is not present.
const sliceArray: <T>(array: T[], afterValue: T) => T[] = (array, afterValue) => {
  const index = array.indexOf(afterValue)
  if (index <= 0) {
    return array
  }
  return array.slice(index)
}

// States in which to hide the close button
const statesWithoutCloseButton = [
  State.Triage,
  State.Checkout,
  State.ProcessingPayment,
  State.Welcome,
  State.Waitlisted,
]
export const CreateAccount: React.FC<CreateAccountProps> = ({ navigation, route }) => {
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
  useEffect(() => flatListRef?.current?.scrollToIndex({ index: Math.min(index, maxScrollableIndex) }), [index])

  const [phoneNumber, setPhoneNumber] = useState(null as string)
  const [checkoutUrl, setCheckoutUrl] = useState(null as string)

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
            onSendCode={(phoneNumber) => {
              setPhoneNumber(phoneNumber)
              setNextState()
            }}
          />
        )
        break
      case State.VerifyCode:
        pane = <VerifyCodePane phoneNumber={phoneNumber} onRequestBack={setPrevState} onVerifyPhone={setNextState} />
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
            onChoosePlan={(checkoutUrl) => {
              setCheckoutUrl(checkoutUrl)
              setNextState()
            }}
          />
        )
        break
      case State.ProcessingPayment:
        pane = (
          <ProcessingPaymentPane
            onProcessingComplete={setNextState}
            process={currentState === State.ProcessingPayment}
          />
        )
        break
      case State.Checkout:
        pane = (
          <ChargebeeCheckoutPane url={checkoutUrl} onFinishedCheckout={setNextState} onRequestBack={setPrevState} />
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
            flatListRef?.current?.scrollToIndex({ index: info.index })
          }, 100)
        }}
        ref={flatListRef}
        renderItem={({ item }) => paneForState(item)}
        scrollEnabled={false}
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
      />

      <Modal visible={currentState === State.Welcome} animated>
        <WelcomePane onPressGetStarted={() => navigation.goBack()} />
      </Modal>

      <Modal visible={currentState === State.Waitlisted} animated>
        <WaitlistedPane onPressFinish={() => navigation.goBack()} />
      </Modal>
    </>
  )
}