import { Box, Separator, Sans, Flex, Spacer } from "App/Components"
import React, { useState } from "react"
import { EmptyBagItem } from "./EmptyBagItem"
import { BagItem } from "./BagItem"
import { useNavigation } from "@react-navigation/native"
import { color } from "App/utils"
import { DateTime } from "luxon"
import { Schema, useTracking } from "App/utils/track"
import { REMOVE_SCHEDULED_PAUSE, PauseStatus } from "App/Components/Pause/PauseButtons"
import { GET_BAG } from "../BagQueries"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { DeliveryStatus } from "./DeliveryStatus"
import * as Sentry from "@sentry/react-native"
import { WantAnotherItemBagItem } from "./"
import { GetBagAndSavedItems } from "App/generated/GetBagAndSavedItems"

export const BagTab: React.FC<{
  pauseStatus: PauseStatus
  data: GetBagAndSavedItems
  items
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ pauseStatus, items, deleteBagItem, removeFromBagAndSaveItem, data }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const tracking = useTracking()

  const me = data?.me
  const paymentPlans = data?.paymentPlans
  const activeReservation = me?.activeReservation

  const hasActiveReservation = !!activeReservation

  const [removeScheduledPause] = useMutation(REMOVE_SCHEDULED_PAUSE, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      const popUpData = {
        title: "Got it!",
        note: "Your membership is no longer scheduled to be paused.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      showPopUp(popUpData)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error canceling the pause on your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      Sentry.captureException(err)
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  let returnReminder
  if (hasActiveReservation && me?.customer?.plan === "Essential" && !!me?.activeReservation?.returnAt) {
    const luxonDate = DateTime.fromISO(me?.activeReservation?.returnAt)
    returnReminder = `Return by ${luxonDate.weekdayLong}, ${luxonDate.monthLong} ${luxonDate.day}`
  }
  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const showPendingMessage = pauseStatus === "pending" && !!pauseRequest?.pauseDate

  return (
    <Box>
      <Box px={2} pt={4}>
        <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
          <Sans size="1">{hasActiveReservation ? "Current rotation" : "My bag"}</Sans>
          <Sans
            size="1"
            style={{ textDecorationLine: "underline" }}
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.FAQButtonTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              navigation.navigate("Faq")
            }}
          >
            View FAQ
          </Sans>
        </Flex>
        <Sans size="1" color="black50">
          {hasActiveReservation && !!returnReminder ? returnReminder : "Reserve your order below"}
        </Sans>
        <Spacer mb={3} />
      </Box>
      {showPendingMessage && (
        <>
          <Box px={2}>
            <Separator color={color("black10")} />
          </Box>
          <Box px={2} py={2}>
            <Sans size="1" color="black50">
              {`Your membership is scheduled to be paused on ${DateTime.fromISO(pauseRequest.pauseDate).toFormat(
                "EEEE LLLL dd"
              )}. To continue it tap `}
              <Sans
                size="1"
                style={{ textDecorationLine: "underline" }}
                onPress={async () => {
                  if (isMutating) {
                    return
                  }
                  setIsMutating(true)
                  const subscriptionId = me?.customer?.invoices?.[0]?.subscriptionId || ""
                  await removeScheduledPause({
                    variables: {
                      subscriptionID: subscriptionId,
                    },
                  })
                }}
              >
                here
              </Sans>
              .
            </Sans>
          </Box>
        </>
      )}
      <Separator />
      <Spacer mb={3} />
      {hasActiveReservation && <DeliveryStatus activeReservation={activeReservation} />}
      {items?.map((bagItem, index) => {
        return bagItem?.productID?.length > 0 ? (
          <Box key={bagItem.productID} px={2} pt={hasActiveReservation ? 0 : 2}>
            <BagItem
              removeItemFromBag={deleteBagItem}
              removeFromBagAndSaveItem={removeFromBagAndSaveItem}
              index={index}
              bagItem={bagItem}
              navigation={navigation}
            />
            {!hasActiveReservation && index !== items.length - 1 && <Separator color={color("black10")} />}
          </Box>
        ) : (
          <Box key={index} px={2}>
            <EmptyBagItem index={index} navigation={navigation} />
            {!hasActiveReservation && index !== items.length - 1 && <Separator color={color("black10")} />}
          </Box>
        )
      })}
      {items && items.length < 3 && (
        <Box px={2}>
          <WantAnotherItemBagItem plan={me?.customer?.membership?.plan} paymentPlans={paymentPlans} />
        </Box>
      )}
    </Box>
  )
}
