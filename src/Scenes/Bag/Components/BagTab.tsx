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

export const BagTab: React.FC<{
  pauseStatus: PauseStatus
  me
  items
  deleteBagItem
  activeReservation
  removeFromBagAndSaveItem
}> = ({ activeReservation, pauseStatus, items, deleteBagItem, removeFromBagAndSaveItem, me }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const tracking = useTracking()

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
  const trackingURL = activeReservation?.sentPackage?.shippingLabel?.trackingURL

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
      {hasActiveReservation && <DeliveryStatus trackingURL={trackingURL} status={activeReservation?.status} />}
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
      <Spacer mb={3} />
      <Separator />
      <Spacer mb={3} />
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
    </Box>
  )
}
