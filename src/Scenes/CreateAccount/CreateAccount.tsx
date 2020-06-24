import { Container } from "App/Components"
import CloseButton from "./CloseButton"
import React, { useRef, useState, MutableRefObject, useEffect } from "react"
import { Modal } from "react-native"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { SendCodePane } from "./SendCodePane"
import { VerifyCodePane } from "./VerifyCodePane"
import { CreateAccountPane } from "./CreateAccountPane"
import { GetMeasurementsPane } from "./GetMeasurementsPane"
import { ChoosePlanPane } from "./ChoosePlanPane"
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
  Welcome,
}

const Stack = createStackNavigator()

export const CreateAccount: React.FC<CreateAccountProps> = ({ navigation }) => {
  // Navigation
  const internalNavigationRef: MutableRefObject<NavigationContainerRef> = useRef()
  const [state, setState] = useState(State.CreateAccount)
  const [phoneNumber, setPhoneNumber] = useState("")

  // Handlers

  const onSignUp = () => {
    setState(State.SendCode)
  }

  const onSendCode = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber)
    setState(State.VerifyCode)
  }

  const onRequestBack = () => {
    internalNavigationRef.current?.goBack()
    setState(State.SendCode)
  }

  const onVerifyPhone = () => {
    setState(State.GetMeasurements)
  }

  const onGetMeasurements = () => {
    setState(State.ChoosePlan)
  }

  const onChoosePlan = () => {
    setState(State.Welcome)
  }

  const onPressGetStarted = () => {
    setState(null)
    navigation.goBack()
  }

  // Rendering

  useEffect(() => {
    if (state == State.Welcome) {
      return
    }
    internalNavigationRef.current?.navigate?.(String(state))
  }, [state])

  const wrappedPaneForState = (state: State) => {
    let pane
    switch (state) {
      case State.CreateAccount:
        pane = <CreateAccountPane onSignUp={onSignUp} navigation={navigation} />
        break
      case State.SendCode:
        pane = <SendCodePane onSendCode={onSendCode} />
        break
      case State.VerifyCode:
        pane = <VerifyCodePane phoneNumber={phoneNumber} onRequestBack={onRequestBack} onVerifyPhone={onVerifyPhone} />
        break
      case State.GetMeasurements:
        pane = <GetMeasurementsPane onGetMeasurements={onGetMeasurements} />
        break
      case State.ChoosePlan:
        pane = <ChoosePlanPane onChoosePlan={onChoosePlan} />
        break
    }
    const Screen = (_) => (
      <Container insetsBottom={false} insetsTop={false}>
        {pane}
      </Container>
    )
    return <Stack.Screen key={String(state)} name={String(state)} component={Screen} />
  }

  return (
    <>
      <NavigationContainer independent={true} ref={internalNavigationRef}>
        <CloseButton onRequestClose={() => navigation.goBack()} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {Array(State.CreateAccount, State.SendCode, State.VerifyCode, State.GetMeasurements, State.ChoosePlan).map(
            wrappedPaneForState
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <Modal visible={state === State.Welcome} animated>
        <WelcomePane onPressGetStarted={onPressGetStarted} />
      </Modal>
    </>
  )
}

// Custom action CloseButton

