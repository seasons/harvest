import { Box, Flex, Sans, Spacer, Separator } from "App/Components"
import { color } from "App/utils"
import { ChevronIcon } from "Assets/icons"
import { GreenCheck } from "Assets/svgs"
import { State, UserState } from "../../CreateAccount/CreateAccount"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { InitialMeasurements } from "../EditMeasurements"

export enum OnboardingStep {
  VerifiedPhone = "VerifiedPhone",
  SetMeasurements = "SetMeasurements",
  SetStylePreferences = "SetStylePreferences",
  SetShippingAddress = "SetShippingAddress",
}

export enum CustomerStatus {
  Invited = "Invited",
  Created = "Created",
  Waitlisted = "Waitlisted",
  Authorized = "Authorized",
  Active = "Active",
  Suspended = "Suspended",
  Paused = "Paused",
  Deactivated = "Deactivated",
}

interface OnboardingChecklistProps {
  measurements: InitialMeasurements
  navigation: any
  onboardingSteps: OnboardingStep[]
  shippingAddress: any
  stylePreferences: any
  userState: UserState.Undetermined | UserState.Waitlisted
}

export const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({
  measurements,
  navigation,
  onboardingSteps,
  shippingAddress,
  stylePreferences,
  userState,
}) => {
  let header = userState == UserState.Undetermined ? "Finish creating your account" : "You're on the waitlist"
  let detail =
    userState == UserState.Undetermined
      ? "Be sure to verify your phone number and set your sizing & measurements."
      : "We’ll send you a notification when your account is ready and you’re able to choose your plan. In the meantime, complete your profile below."

  const items = [
    {
      isTappable: userState == UserState.Undetermined,
      key: OnboardingStep.VerifiedPhone,
      title: "Verify Phone Number",
    },
    {
      isTappable: true,
      key: OnboardingStep.SetMeasurements,
      title: "Sizing & Measurements",
    },
    {
      isTappable: true,
      key: OnboardingStep.SetStylePreferences,
      title: "Style Preferences",
    },
    {
      isTappable: true,
      key: OnboardingStep.SetShippingAddress,
      title: "Shipping Address",
    },
  ]

  const onPressItem = (key: OnboardingStep) => {
    switch (key) {
      case OnboardingStep.VerifiedPhone:
        switch (userState) {
          case UserState.Undetermined:
            navigation.navigate("Modal", {
              screen: "CreateAccountModal",
              params: { initialState: State.SendCode },
            })
            break
          case UserState.Waitlisted:
            // don't allow changing the phone number at this stage
            break
        }
        break
      case OnboardingStep.SetMeasurements:
        switch (userState) {
          case UserState.Undetermined:
            navigation.navigate("Modal", {
              screen: "CreateAccountModal",
              params: { initialState: State.GetMeasurements },
            })
            break
          case UserState.Waitlisted:
            navigation.navigate("Modal", {
              screen: "EditMeasurements",
              params: { measurements },
            })
            // navigation.navigate("EditMeasurements", { measurements })
            break
        }
        break
      case OnboardingStep.SetStylePreferences:
        navigation.navigate("Modal", {
          screen: "EditStylePreferences",
          params: { stylePreferences },
        })
        // navigation.navigate("EditStylePreferences", { stylePreferences })
        break
      case OnboardingStep.SetShippingAddress:
        navigation.navigate("Modal", {
          screen: "EditShippingAddress",
          params: { shippingAddress },
        })
        // navigation.navigate("EditShippingAddress", { shippingAddress })
        break
    }
  }

  const renderItem = (index: number) => {
    const { isTappable, key, title } = items[index]
    const isComplete = onboardingSteps.includes(key)
    const isLastItem = index == items.length - 1
    return (
      <Box key={key}>
        <Separator />
        <TouchableOpacity disabled={!isTappable} onPress={() => onPressItem(key)}>
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" pt={2} pb={isLastItem ? 0 : 2}>
            <Flex flexDirection="row" alignItems="center">
              {isComplete ? <GreenCheck width={24} height={24} /> : <EmptyCircle />}
              <Spacer mr={2} />
              <Sans size="1">{title}</Sans>
            </Flex>
            {isTappable && <ChevronIcon color={color("black10")} />}
          </Flex>
        </TouchableOpacity>
      </Box>
    )
  }

  const stepsCompleted = items.filter((item) => onboardingSteps.includes(item.key)).length

  return (
    <Box>
      <Sans size="2">{header}</Sans>
      <Spacer height={4} />
      <Sans size="1" color="black50">
        {detail}
      </Sans>
      <Spacer mb={4} />
      <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
        <Sans size="1">Complete your profile</Sans>
        <Sans size="1" color="black50">
          {stepsCompleted} of {items.length} completed
        </Sans>
      </Flex>
      <Spacer mb={2} />

      {items.map((_, index) => renderItem(index))}
    </Box>
  )
}

const EmptyCircle = styled(Box)`
  background-color: white
  border-color: ${() => color("black10")}
  border-width: 1
  border-radius: 12;
  height: 24;
  width: 24;
`
