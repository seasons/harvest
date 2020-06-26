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
        pane = <CreateAccountPane onSignUp={setNextState} navigation={navigation} />
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

/*

  // const setState = (state: State) => {
  //   stateStack.push(state)
  //   setStateStack(stateStack)
  // }

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

  const onChoosePlan = (checkoutUrl: string) => {
    setCheckoutUrl(checkoutUrl)
    setState(State.Checkout)
  }

  const onCheckout = () => {
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
    console.log("Navigate to", state)
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
      case State.Checkout:
        pane = (
          <ChargebeeCheckoutPane
            url={checkoutUrl}
            onRequestBack={() => {
              internalNavigationRef.current?.goBack()
              setState(State.ChoosePlan)
            }}
          />
        )
        break
    }
    const Screen = () => (
      <Container insetsBottom={false} insetsTop={false}>
        {pane}
      </Container>
    )
    return <Stack.Screen key={String(state)} name={String(state)} component={Screen} />
  }

  return (
    <FlatList
      data={currQuestions}
      initialScrollIndex={currQuestionIndex}
      // onScrollToIndexFailed={(info) => {
      // When the initialScrollIndex is at the end, the flat list may fail to scroll
      // to that index because the layout is not yet complete so we have to wait for
      // the layout to finish and then retry
      //   const wait = new Promise((resolve) => setTimeout(resolve, 500))
      //   wait.then(() => {
      //     flatListRef.scrollToIndex({ index: info.index })
      //   })
      // }}
      horizontal={true}
      pagingEnabled
      keyExtractor={(item) => item.question}
      ref={(ref) => setFlatListRef(ref)}
      renderItem={({ item, index }) => renderItem(item, index)}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onQuestionsFlatListScrollEnd}
    />
  )

  /*
  return (
    <>
      <NavigationContainer independent={true} ref={internalNavigationRef}>
        <CloseButton onRequestClose={() => navigation.goBack()} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {Array(
            State.CreateAccount,
            State.SendCode,
            State.VerifyCode,
            State.GetMeasurements,
            State.ChoosePlan,
            State.Checkout
          ).map(wrappedPaneForState)}
        </Stack.Navigator>
      </NavigationContainer>

      <Modal visible={state === State.Welcome} animated>
        <WelcomePane onPressGetStarted={onPressGetStarted} />
      </Modal>
    </>
  )
}*/
