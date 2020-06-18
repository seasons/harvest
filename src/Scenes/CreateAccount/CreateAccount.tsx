import { Box, Container } from "App/Components"
import { color } from "App/utils"
import { CloseXSVG } from "Assets/svgs"
import { CreateAccountPane } from "./CreateAccountPane"
import { GetMeasurementsPane } from "./GetMeasurementsPane"
import { ChoosePlanPane } from "./ChoosePlanPane"
import { WelcomePane } from "./WelcomePane"
import React, { useRef, useState, MutableRefObject, useEffect } from "react"
import { TouchableOpacity, Modal } from "react-native"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import styled from "styled-components/native"

interface CreateAccountProps {
    navigation: any
}

enum State {
    CREATE_ACCOUNT, GET_MEASUREMENTS, CHOOSE_PLAN, WELCOME
}

const Stack = createStackNavigator()

export const CreateAccount: React.FC<CreateAccountProps> = ({
    navigation,
}) => {
    // Navigation
    const internalNavigationRef: MutableRefObject<NavigationContainerRef> = useRef()
    const [state, setState] = useState(State.CREATE_ACCOUNT)

    // Handlers

    const onAuth = (credentials, profile) => {
        setState(State.GET_MEASUREMENTS)
    }

    const onGetMeasurements = () => {
        setState(State.CHOOSE_PLAN)
    }

    const onChoosePlan = () => {
        setState(State.WELCOME)
    }

    const onPressGetStarted = () => {
        setState(null)
        navigation.goBack()
    }

    useEffect(() => {
        if (state == State.WELCOME) { return }
        internalNavigationRef.current?.navigate?.(String(state))
    }, [state])

    const wrappedPaneForState = (state: State) => {
        let pane
        switch (state) {
            case State.CREATE_ACCOUNT:
                pane = (<CreateAccountPane onAuth={onAuth} navigation={navigation} />)
                break
            case State.GET_MEASUREMENTS:
                pane = (<GetMeasurementsPane onGetMeasurements={onGetMeasurements} />)
                break
            case State.CHOOSE_PLAN:
                pane = (<ChoosePlanPane onChoosePlan={onChoosePlan} />)
                break
        }
        const Screen = (navigation) => (
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
                    {Array(State.CREATE_ACCOUNT, State.GET_MEASUREMENTS, State.CHOOSE_PLAN).map(wrappedPaneForState)}
                </Stack.Navigator>
            </NavigationContainer>

            <Modal visible={state === State.WELCOME} animated>
                <WelcomePane onPressGetStarted={onPressGetStarted} />
            </Modal>
        </>
    )
}

// Custom action CloseButton

type CloseButtonVariant = "light" | "dark"

export const CloseButton: React.FC<{
    variant?: CloseButtonVariant,
    onRequestClose?: () => void,
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
