import { Box } from "App/Components"
import { useAuthContext } from "App/Navigation/AuthContext"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get } from "lodash"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { useQuery } from "react-apollo"
import { AppState, Dimensions, FlatList, Modal } from "react-native"
import { ChoosePlanPane, WelcomePane } from "./Admitted"
import { CreateAccountPane, GetMeasurementsPane, SendCodePane, TriagePane, VerifyCodePane } from "./Undetermined"
import { WaitlistedPane } from "./Waitlisted"
import { useIsFocused } from "@react-navigation/native"
import { CreditCardFormPane } from "./Admitted/CreditCardFormPane"
import { CouponType } from "App/generated/globalTypes"

interface CreateAccountProps {
  navigation: any
  initialState?: State
  initialUserState?: UserState
  params?: any
  route?: any
}

export interface Coupon {
  discountAmount: number
  discountPercentage: number
  couponType: CouponType
  couponCode: string
}

export enum UserState {
  Undetermined,
  Admitted,
  Waitlisted,
}

export enum PaymentMethod {
  ApplePay = "ApplePay",
  CreditCard = "CreditCard",
}

export enum State {
  CreateAccount = "CreateAccount",
  SendCode = "SendCode",
  VerifyCode = "VerifyCode",
  GetMeasurements = "GetMeasurements",
  Triage = "Triage",

  ChoosePlan = "ChoosePlan",
  CreditCardForm = "CreditCardForm",
  Welcome = "Welcome",

  Waitlisted = "Waitlisted",
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
        admissions {
          id
          allAccessEnabled
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

const statesFor = (userState: UserState): State[] => {
  const commonStates = [State.CreateAccount, State.SendCode, State.VerifyCode, State.GetMeasurements, State.Triage]
  switch (userState) {
    case UserState.Undetermined:
      return commonStates
    case UserState.Admitted:
      return commonStates.concat([State.ChoosePlan, State.CreditCardForm, State.Welcome])
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
  const isFocused = useIsFocused()
  const plans = data?.paymentPlans
  const [selectedPlan, setSelectedPlan] = useState(plans?.[0])
  const [timeStart, setTimeStart] = useState(Date.now())
  const [appState, setAppState] = useState("active")
  const [finishedFlow, setFinishedFlow] = useState(false)
  const [coupon, setCoupon] = useState({
    discountAmount: 0,
    discountPercentage: 0,
    couponType: null,
    couponCode: null,
  })
  const tracking = useTracking()
  const { resetStore } = useAuthContext()

  useEffect(() => {
    if (route?.params) {
      setCoupon({
        discountAmount: route?.params?.discountAmount || coupon.discountAmount,
        discountPercentage: route?.params?.discountPercentage || coupon.discountPercentage,
        couponType: route?.params?.couponType || coupon.couponType,
        couponCode: route?.params?.couponCode || coupon.couponCode,
      })
    }
  }, [route, setCoupon])

  useEffect(() => {
    const unsubscribe = navigation?.addListener("focus", () => {
      setTimeStart(Date.now())
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const unsubscribe = navigation?.addListener("blur", () => {
      if (!finishedFlow) {
        trackStepTimer("Blur")
      }
    })
    return unsubscribe
  }, [navigation, finishedFlow])

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

  const trackStepTimer = (nextStep) => {
    const timeSpent = Date.now() - timeStart
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.CreateAccountStepSessionEnded,
      actionType: TrackSchema.ActionTypes.Session,
      step: currentState,
      time: timeSpent,
      nextStep,
    })
  }

  useEffect(() => {
    const onChange = (nextAppState) => {
      if (nextAppState === "background" && appState !== "background" && isFocused) {
        trackStepTimer("Background")
      }
      if (nextAppState === "active" && appState !== "active" && isFocused) {
        setTimeStart(Date.now())
      }
      if ((nextAppState === "background" || nextAppState === "active") && nextAppState !== appState && !!appState) {
        // We only care about changes from the background to active,
        // If we record 'inactive' changes it can break due to apple pay causing inactive state, etc
        setAppState(nextAppState)
      }
    }
    // If user leaves the app to turn on notifications in the settings recheck status
    AppState.addEventListener("change", (nextAppState) => onChange(nextAppState))
    return () => AppState.removeEventListener("change", (nextAppState) => onChange(nextAppState))
  }, [setAppState, trackStepTimer])

  const paneForState = (state: State) => {
    let pane

    switch (state) {
      case State.CreateAccount:
        pane = (
          <CreateAccountPane
            onSignUp={() => {
              // Track the time viewed
              trackStepTimer(states[index + 1])

              setNextState()
              // Restart the timer
              setTimeStart(Date.now())
            }}
          />
        )
        break
      case State.SendCode:
        pane = (
          <SendCodePane
            focus={currentState === State.SendCode}
            onSendCode={(phoneNumber) => {
              setPhoneNumber(phoneNumber)
              setNextState()
              // Track the time viewed
              trackStepTimer(states[index + 1])
              // Restart the timer
              setTimeStart(Date.now())
            }}
          />
        )
        break
      case State.VerifyCode:
        pane = (
          <VerifyCodePane
            focus={currentState === State.VerifyCode}
            onRequestBack={() => {
              setPrevState()
              // Track the time viewed
              trackStepTimer(states[index - 1])
              // Restart the timer
              setTimeStart(Date.now())
            }}
            onVerifyPhone={() => {
              setNextState()
              // Track the time viewed
              trackStepTimer(states[index + 1])
              // Restart the timer
              setTimeStart(Date.now())
            }}
            phoneNumber={phoneNumber}
          />
        )
        break
      case State.GetMeasurements:
        pane = (
          <GetMeasurementsPane
            onGetMeasurements={() => {
              setNextState()
              // Track the time viewed
              trackStepTimer(states[index + 1])
              // Restart the timer
              setTimeStart(Date.now())
            }}
          />
        )
        break
      case State.Triage:
        pane = (
          <TriagePane
            check={currentState === State.Triage}
            onTriageComplete={(userAdmitted) => {
              // Track the time viewed
              trackStepTimer(userAdmitted ? State.ChoosePlan : State.Waitlisted)
              setUserState(userAdmitted ? UserState.Admitted : UserState.Waitlisted)
              setNextState()
              // Restart the timer
              setTimeStart(Date.now())
            }}
          />
        )
        break
      case State.ChoosePlan:
        pane = (
          <ChoosePlanPane
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            data={data}
            onComplete={(paymentMethod) => {
              paymentMethod === PaymentMethod.CreditCard ? setIndex(index + 1) : setIndex(index + 2)
              // Track the time viewed
              trackStepTimer(states[index + 1])
              // Restart the timer
              setTimeStart(Date.now())
            }}
            headerText={"You're in.\nLet's choose your plan"}
            source="CreateAccountModal"
            coupon={coupon}
            onMountScrollToFaqSection={route?.params?.onMountScrollToFaqSection}
          />
        )
        break
      case State.CreditCardForm:
        pane = (
          <CreditCardFormPane
            currentState={currentState}
            onRequestBack={() => {
              setPrevState()
              // Track the time viewed
              trackStepTimer(states[index - 1])
              // Restart the timer
              setTimeStart(Date.now())
            }}
            plan={selectedPlan}
            onSubmit={() => {
              // Track the time viewed
              trackStepTimer(states[index + 1])

              setNextState()
              // Restart the timer
              setTimeStart(Date.now())
            }}
            coupon={coupon}
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
            setFinishedFlow(true)
            resetStore()
            trackStepTimer(null)
            navigation.goBack()
          }}
        />
      </Modal>

      <Modal visible={currentState === State.Waitlisted} animated>
        <WaitlistedPane
          onPressFinish={() => {
            setFinishedFlow(true)
            resetStore()
            trackStepTimer(null)
            navigation.goBack()
          }}
        />
      </Modal>
    </>
  )
})
