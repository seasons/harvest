import { Box, Flex, Sans, Separator, Spacer } from "App/Components"
import { PauseStatus, REMOVE_SCHEDULED_PAUSE } from "App/Components/Pause/PauseButtons"
import { GetBagAndSavedItems } from "App/generated/GetBagAndSavedItems"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import { useLazyQuery, useMutation } from "react-apollo"
import { Schema as NavigationSchema } from "App/Navigation"
import { useNavigation } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"
import { GET_BAG, GET_LOCAL_BAG_ITEMS } from "../BagQueries"
import { BagItem } from "./BagItem"
import { DeliveryStatus } from "./DeliveryStatus"
import { EmptyBagItem } from "./EmptyBagItem"
import { BagCardButton } from "./BagCardButton"
import { AddSlot, Stylist, SurpriseMe } from "Assets/svgs"
import { Linking } from "react-native"

export const BagTab: React.FC<{
  pauseStatus: PauseStatus
  data: GetBagAndSavedItems
  itemCount: number
  items
  setItemCount: (count: number) => void
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ pauseStatus, items, deleteBagItem, removeFromBagAndSaveItem, data, itemCount, setItemCount }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const tracking = useTracking()

  const me = data?.me
  const activeReservation = me?.activeReservation
  const hasActiveReservation = !!activeReservation

  const [getLocalBag, { data: localItems }] = useLazyQuery(GET_LOCAL_BAG_ITEMS, {
    variables: {
      ids: items?.map((i) => i.productID),
    },
  })

  const bagItems = !authState.isSignedIn
    ? localItems?.products.map((item, i) => ({
        ...items?.[i],
        productVariant: item.variants[0],
        status: "Added",
      }))
    : items

  const paddedItems = assign(fill(new Array(itemCount), { variantID: "", productID: "" }), bagItems) || []

  useEffect(() => {
    if (!authState.isSignedIn) {
      getLocalBag()
    }
  }, [items])

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
  if (
    hasActiveReservation &&
    me?.customer?.membership?.plan?.tier === "Essential" &&
    !!me?.activeReservation?.returnAt
  ) {
    const luxonDate = DateTime.fromISO(me?.activeReservation?.returnAt)
    returnReminder = `Return by ${luxonDate.weekdayLong}, ${luxonDate.monthLong} ${luxonDate.day}`
  }
  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const showPendingMessage = pauseStatus === "pending" && !!pauseRequest?.pauseDate

  console.log("itemCount", itemCount)

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
        {((hasActiveReservation && !!returnReminder) || !hasActiveReservation) && (
          <Sans size="1" color="black50">
            {hasActiveReservation && !!returnReminder ? returnReminder : "Reserve your order below"}
          </Sans>
        )}
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
      {hasActiveReservation && <DeliveryStatus activeReservation={activeReservation} />}
      {paddedItems?.map((bagItem, index) => {
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
      {hasActiveReservation && <Spacer mb={1} />}
      <Separator />
      <Spacer mb={1} />
      {!hasActiveReservation && itemCount && itemCount < 3 && (
        <Box px={1}>
          <BagCardButton
            Icon={AddSlot}
            title="Add a slot"
            caption="Reserve another item"
            onPress={() => {
              authState.isSignedIn
                ? navigation.navigate("Modal", { screen: NavigationSchema.PageNames.UpdatePaymentPlanModal })
                : setItemCount(itemCount + 1)
            }}
          />
        </Box>
      )}
      <Box px={1}>
        <BagCardButton
          Icon={SurpriseMe}
          title="Surprise me"
          caption="Discover styles in your size"
          onPress={() => {
            console.log("naving")
            navigation.navigate("Modal", { screen: NavigationSchema.PageNames.SurpriseMe })
          }}
        />
      </Box>
      <Box px={1}>
        <BagCardButton
          Icon={Stylist}
          title="Chat with our stylist"
          caption="Get a personalized consultation"
          onPress={() => Linking.openURL("https://szns.co/stylist")}
        />
      </Box>
    </Box>
  )
}
