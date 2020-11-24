import { Box } from "App/Components"
import { useAuthContext } from "App/Navigation/AuthContext"
import { screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import { get, pick } from "lodash"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { useQuery } from "react-apollo"
import { Dimensions, FlatList, Modal } from "react-native"
import { ChoosePlanPane, WelcomePane } from "./Admitted"
import { CreateAccountPane, GetMeasurementsPane, SendCodePane, TriagePane, VerifyCodePane } from "./Undetermined"
import { WaitlistedPane } from "./Waitlisted"
import { CreditCardFormPane } from "./Admitted/CreditCardFormPane"
import { CouponType } from "App/generated/globalTypes"
import analytics from "@segment/analytics-react-native"

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
        status
        user {
          id
        }
        membership {
          id
          plan {
            id
            description
            tier
            itemCount
          }
        }
        admissions {
          id
          admissable
          allAccessEnabled
          authorizationsCount
        }
        coupon {
          id
          type
          amount
          percentage
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
  const plans = data?.paymentPlans
  const [selectedPlan, setSelectedPlan] = useState(plans?.[0])
  const [coupon, setCoupon] = useState({
    discountAmount: 0,
    discountPercentage: 0,
    couponType: null,
    couponCode: null,
  })
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
    const userId = data?.me?.customer?.user?.id
    const cust = data?.me?.customer
    if (!!userId) {
      analytics.identify(userId, {
        status: cust?.status,
        ...pick(cust?.admissions, ["admissable", "authorizationsCount"]),
      })
    }
  }, [data?.me?.customer])

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
        pane = (
          <CreateAccountPane
            onSignUp={() => {
              setNextState()
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
            }}
            onVerifyPhone={() => {
              setNextState()
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
            }}
          />
        )
        break
      case State.Triage:
        pane = (
          <TriagePane
            check={currentState === State.Triage}
            onTriageComplete={(userAdmitted) => {
              setUserState(userAdmitted ? UserState.Admitted : UserState.Waitlisted)
              setNextState()
              // TODO: Run an identify here
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
            }}
            plan={selectedPlan}
            onSubmit={() => {
              setNextState()
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
