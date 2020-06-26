import { Box } from "App/Components"
import CloseButton from "./CloseButton"
import React, { useRef, useState, MutableRefObject, useEffect } from "react"
import { Modal, FlatList, Dimensions } from "react-native"

import { CreateAccountPane } from "./CreateAccountPane"
import { SendCodePane } from "./SendCodePane"
import { VerifyCodePane } from "./VerifyCodePane"
import { GetMeasurementsPane } from "./GetMeasurementsPane"
import { ChoosePlanPane } from "./ChoosePlanPane"
import { ChargebeeCheckoutPane } from "./ChargebeeCheckoutPane"
import { WelcomePane } from "./WelcomePane"

interface CreateAccountProps {
  navigation: any
}

enum State {
  CreateAccount,
  SendCode,
  VerifyCode,
  GetMeasurements,
  ChoosePlan,
  Checkout,
  Welcome,
}

const { width: windowWidth } = Dimensions.get("window")

export const CreateAccount: React.FC<CreateAccountProps> = ({ navigation }) => {
  // Navigation
  const [state, setState] = useState(State.CreateAccount)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [checkoutUrl, setCheckoutUrl] = useState(null)
  const flatListRef: MutableRefObject<FlatList<State>> = useRef()
  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: state })
  }, [state])

  const states: State[] = [
    State.CreateAccount,
    State.SendCode,
    State.VerifyCode,
    State.GetMeasurements,
    State.ChoosePlan,
    State.Checkout,
  ]

  const setPrevState = () => setState(Math.max(0, state - 1))

  const setNextState = () => {
    if (state == states.length - 1) {
      // show Welcome
    } else {
      setState(state + 1)
    }
  }

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
        pane = <GetMeasurementsPane onGetMeasurements={() => setState(State.ChoosePlan)} />
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
        pane = <ChargebeeCheckoutPane url={checkoutUrl} onRequestBack={setPrevState} />
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
      {state !== State.Checkout ? <CloseButton onRequestClose={() => navigation.goBack()} /> : null}

      <FlatList
        data={states}
        horizontal
        initialScrollIndex={state}
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
        showsHorizontalScrollIndicator={false}
      />

      <Modal visible={state === State.Welcome} animated>
        <WelcomePane onPressGetStarted={() => navigation.goBack()} />
      </Modal>
    </>
  )
}
