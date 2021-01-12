import { Box, Flex, Sans, Separator, Spacer } from "App/Components"
import { color } from "App/utils"
import { ChevronIcon } from "Assets/icons"
import { CheckCircled } from "Assets/svgs"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import { State, UserState } from "../../CreateAccount/CreateAccount"
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
  rawMeasurements: InitialMeasurements
  navigation: any
  onboardingSteps: OnboardingStep[]
  shippingAddress: any
  stylePreferences: any
  userState: UserState.Undetermined | UserState.Waitlisted
}

export const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({
  rawMeasurements,
  navigation,
  onboardingSteps,
  shippingAddress,
  stylePreferences,
  userState,
}) => {
  const header = "Finish creating your account"
  const detail =
    "To set your sizing & measurements, you must first verify your phone number. Complete those two steps to finish creating your account."

  const items = [
    {
      // Cannot edit phone number once you are waitlisted
      isTappable: userState == UserState.Undetermined,
      key: OnboardingStep.VerifiedPhone,
      title: "Verify phone number",
    },
    {
      // Cannot set measurements before verifying your phone number because you are triaged immediately after
      isTappable: onboardingSteps.includes(OnboardingStep.VerifiedPhone),
      key: OnboardingStep.SetMeasurements,
      title: "Sizing & measurements",
    },
    {
      isTappable: true,
      key: OnboardingStep.SetStylePreferences,
      title: "Style preferences",
    },
    {
      isTappable: true,
      key: OnboardingStep.SetShippingAddress,
      title: "Shipping address",
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
              params: { rawMeasurements },
            })
            break
        }
        break
      case OnboardingStep.SetStylePreferences:
        navigation.navigate("Modal", {
          screen: "EditStylePreferences",
          params: { stylePreferences },
        })
        break
      case OnboardingStep.SetShippingAddress:
        navigation.navigate("Modal", {
          screen: "EditShippingAddress",
          params: { shippingAddress },
        })
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
              {isComplete ? <CheckCircled width={24} height={24} /> : <EmptyCircle />}
              <Spacer mr={2} />
              <Sans size="4">{title}</Sans>
            </Flex>
            {isTappable && <ChevronIcon color={color("black10")} />}
          </Flex>
        </TouchableOpacity>
      </Box>
    )
  }

  const stepsCompleted = items.filter((item) => onboardingSteps.includes(item.key)).length

  return (
    <Box pb={2}>
      {userState === UserState.Undetermined ? (
        <>
          <Sans size="2">{header}</Sans>
          <Spacer mb={0.5} />
          <Sans size="1" color="black50">
            {detail}
          </Sans>
        </>
      ) : null}
      <Spacer mb={5} />
      <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
        <Sans size="4">Complete your profile</Sans>
        <Sans size="4" color="black50">
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
