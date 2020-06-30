import { Box } from "App/Components"
import CloseButton from "./CloseButton"
import React, { useRef, useState, MutableRefObject, useEffect } from "react"
import { Modal, FlatList, Dimensions } from "react-native"

import { CreateAccountPane, SendCodePane, VerifyCodePane, GetMeasurementsPane, TriagePane } from "./Undetermined"
import { ChoosePlanPane, ChargebeeCheckoutPane, WelcomePane } from "./Admitted"
import { WaitlistedPane } from "./Waitlisted"

interface CreateAccountProps {
  navigation: any
}

enum UserState {
  Undetermined,
  Admitted,
  Waitlisted,
}

enum State {
  CreateAccount,
  SendCode,
  VerifyCode,
  GetMeasurements,
  Triage,

  ChoosePlan,
  Checkout,
  Welcome,

  Waitlisted,
}

const { width: windowWidth } = Dimensions.get("window")

const states = (forUserState: UserState): State[] => {
  const commonStates = [State.CreateAccount, State.SendCode, State.VerifyCode, State.GetMeasurements, State.Triage]
  switch (forUserState) {
    case UserState.Undetermined:
      return commonStates
    case UserState.Admitted:
      return commonStates.concat([State.ChoosePlan, State.Checkout, State.Welcome])
    case UserState.Waitlisted:
      return commonStates.concat([State.Waitlisted])
  }
}

const statesWithoutCloseButton = [State.Triage, State.Checkout, State.Welcome, State.Waitlisted]

export const CreateAccount: React.FC<CreateAccountProps> = ({ navigation }) => {
  // The general user's state
  const [userState, setUserState] = useState(UserState.Undetermined)
  // The current index into the `states(userState)` array
  const [index, setIndex] = useState(0)
  // The current state
  const currentState = states(userState)[index]

  const flatListRef: MutableRefObject<FlatList<State>> = useRef()
  // The maximum index shown in the FlatList
  const maxScrollableIndex = states(userState).length - (userState === UserState.Undetermined ? 1 : 2)
  // Scroll to the new index when the state updates
  useEffect(() => flatListRef.current?.scrollToIndex({ index: Math.min(index, maxScrollableIndex) }), [index])

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

  console.log(states(userState), index)

  return (
    <>
      {!statesWithoutCloseButton.includes(currentState) && <CloseButton onRequestClose={() => navigation.goBack()} />}

      <FlatList
        data={states(userState)}
        horizontal
        initialScrollIndex={Math.min(index, maxScrollableIndex)}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.toString()}
        onScrollToIndexFailed={(info) => {
          // When first rendering this component, the layout may not yet be complete
          // depending on the initial index, so we have to wait for the layout to
          // finish and then retry.
          const wait = new Promise((resolve) => setTimeout(resolve, 500))
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index })
          })
        }}
        ref={flatListRef}
        renderItem={({ item }) => paneForState(item)}
        scrollEnabled={false}
        // not documented but works and is required
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
      />

      <Modal visible={currentState === State.Welcome} animated>
        <WelcomePane onPressGetStarted={() => navigation.goBack()} />
      </Modal>

      <Modal visible={currentState === State.Waitlisted} animated>
        <WaitlistedPane onPressGetStarted={() => navigation.goBack()} />
      </Modal>
    </>
  )
}
