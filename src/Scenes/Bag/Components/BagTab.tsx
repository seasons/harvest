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

export const BagTab: React.FC<{
  pauseStatus: PauseStatus
  me
  items
  deleteBagItem
  hasActiveReservation
  removeFromBagAndSaveItem
}> = ({ pauseStatus, items, deleteBagItem, hasActiveReservation, removeFromBagAndSaveItem, me }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const tracking = useTracking()

  const [removeScheduledPause] = useMutation(REMOVE_SCHEDULED_PAUSE, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
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
  const data = null
  if (hasActiveReservation && me?.customer?.plan === "Essential" && !!me?.activeReservation?.returnAt) {
    const luxonDate = DateTime.fromISO(data?.me?.activeReservation?.returnAt)
    returnReminder = `Return by ${luxonDate.weekdayLong}, ${luxonDate.monthShort} ${luxonDate.day}`
  }

  return (
    <Box>
      {hasActiveReservation && (
        <>
          <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
            <Sans size="2">Current rotation</Sans>
            <Sans
              size="2"
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
          {!!returnReminder && <Sans size="2">{returnReminder}</Sans>}
          <Spacer mb={2} />
          <Separator color={color("black10")} />
        </>
      )}
      {pauseStatus === "pending" && (
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
          <Spacer mb={2} />
          <Separator color={color("black10")} />
        </Box>
      )}
      {items.map((bagItem, index) => {
        return bagItem.productID.length > 0 ? (
          <Box
            key={bagItem.productID}
            px={2}
            pt={(index === 0 && hasActiveReservation) || !hasActiveReservation ? 2 : 1}
            pb={hasActiveReservation ? 0 : 2}
          >
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
