import { Box, Container } from "App/Components"
import { color } from "App/utils"
import { CloseXSVG } from "Assets/svgs"
import React, { useRef, useState, MutableRefObject, useEffect } from "react"
import { TouchableOpacity, Modal } from "react-native"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import styled from "styled-components/native"

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

  // Handlers

  const onAuth = (credentials, profile) => {
    setState(State.SendCode)
  }

  const onSendCode = () => {
    setState(State.VerifyCode)
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
        pane = <CreateAccountPane onAuth={onAuth} navigation={navigation} />
        break
      case State.SendCode:
        pane = <SendCodePane onSendCode={onSendCode} />
        break
      case State.VerifyCode:
        pane = <VerifyCodePane onVerifyPhone={onVerifyPhone} />
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

type CloseButtonVariant = "light" | "dark"

const CloseButton: React.FC<{
  variant?: CloseButtonVariant
  onRequestClose?: () => void
}> = ({ variant, onRequestClose }) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onRequestClose}>
        <Circle variant={variant}>
          <CloseXSVG variant={variant} />
        </Circle>
      </TouchableOpacity>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  top: 40;
  right: 20;
  z-index: 100;
`

const Circle = styled(Box)`
  background-color: ${(p) => (p?.variant === "light" ? color("black10") : color("black85"))};
  border-radius: 100;
  height: 40;
  width: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`
