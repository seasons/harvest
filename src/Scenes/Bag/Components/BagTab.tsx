import { useNavigation } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"
import { Box, Flex, Sans, Separator, Spacer } from "App/Components"
import { PauseStatus, REMOVE_SCHEDULED_PAUSE } from "App/Components/Pause/PauseButtons"
import { GetBagAndSavedItems } from "App/generated/GetBagAndSavedItems"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { State as CreateAccountState, UserState } from "App/Scenes/CreateAccount/CreateAccount"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { AddSlot, DarkInstagram, Stylist, SurpriseMe } from "Assets/svgs"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"
import { Linking } from "react-native"
import { GET_BAG, GET_LOCAL_BAG_ITEMS } from "../BagQueries"
import { BagCardButton } from "./BagCardButton"
import { BagItem } from "./BagItem"
import { DeliveryStatus } from "./DeliveryStatus"
import { EmptyBagItem } from "./EmptyBagItem"

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

  const isSignedIn = authState.isSignedIn

  const bagItems = !isSignedIn
    ? localItems?.products.map((item, i) => ({
        ...items?.[i],
        productVariant: item.variants[0],
        status: "Added",
      }))
    : items

  const paddedItems = assign(fill(new Array(itemCount), { variantID: "", productID: "" }), bagItems) || []

  useEffect(() => {
    if (!isSignedIn) {
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

  const onAddSlot = () => {
    const userStatus = data?.me?.customer?.status
    if (!!userStatus && userStatus === "Authorized") {
      // If user is authorized send them to plan creation
      navigation.navigate("Modal", {
        screen: NavigationSchema.PageNames.CreateAccountModal,
        params: { initialState: CreateAccountState.ChoosePlan, initialUserState: UserState.Admitted },
      })
    } else if (
      !!userStatus &&
      (userStatus === "Active" || userStatus === "Paused" || userStatus === "Deactivated" || userStatus === "Suspended")
    ) {
      navigation.navigate("Modal", { screen: NavigationSchema.PageNames.UpdatePaymentPlanModal })
    } else {
      // If user isn't signed in or isnt active or authorized
      setItemCount(itemCount + 1)
    }
  }

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

  return (
    <Box>
      <Box px={2} pt={4}>
        <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
          <Sans size="4">{hasActiveReservation ? "Current rotation" : "My bag"}</Sans>
          <Sans
            size="4"
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
          <Sans size="4" color="black50">
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
          <Box px={2} py={3}>
            <Sans size="4" color="black50">
              {`Your membership is scheduled to be paused on ${DateTime.fromISO(pauseRequest.pauseDate).toFormat(
                "EEEE LLLL dd"
              )}. To continue it tap `}
              <Sans
                size="4"
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
        const isReserved = !!bagItem?.status && bagItem?.status === "Reserved"
        const spacing = isReserved ? "7px" : 2
        return bagItem?.productID?.length > 0 ? (
          <Box key={bagItem.productID} px={2}>
            {index !== 0 && (
              <>
                <Spacer mb={spacing} />
                {!isReserved && <Separator color={color("black10")} />}
              </>
            )}
            <Spacer mb={index === 0 ? 3 : spacing} />
            <BagItem
              removeItemFromBag={deleteBagItem}
              removeFromBagAndSaveItem={removeFromBagAndSaveItem}
              index={index}
              bagItem={bagItem}
              navigation={navigation}
            />
          </Box>
        ) : (
          <Box key={index} px={2}>
            <Spacer mb={3} />
            {index !== 0 && (
              <>
                <Separator color={color("black10")} />
                <Spacer mb={3} />
              </>
            )}
            <EmptyBagItem index={index} navigation={navigation} />
          </Box>
        )
      })}
      <Spacer mb={3} />
      <Separator />
      <Spacer mb={3} />
      {!hasActiveReservation && itemCount && itemCount < 3 && (
        <>
          <BagCardButton Icon={AddSlot} title="Add a slot" caption="Reserve another item" onPress={onAddSlot} />
          <Spacer mb={3} />
          <Separator />
          <Spacer mb={3} />
        </>
      )}
      {hasActiveReservation && (
        <>
          <BagCardButton
            Icon={DarkInstagram}
            title="Share to IG Stories"
            caption="Post your new styles to Instagram"
            onPress={() =>
              navigation.navigate("Modal", {
                screen: "ShareReservationToIGModal",
                params: { reservationID: activeReservation?.id },
              })
            }
          />
          <Spacer mb={3} />
          <Separator />
          <Spacer mb={3} />
        </>
      )}

      {isSignedIn && (
        <>
          <BagCardButton
            Icon={SurpriseMe}
            title="Surprise me"
            caption="Discover styles in your size"
            onPress={() => {
              navigation.navigate("Modal", { screen: NavigationSchema.PageNames.SurpriseMe })
            }}
          />
          <Spacer mb={3} />
          <Separator />
          <Spacer mb={3} />
        </>
      )}

      <BagCardButton
        Icon={Stylist}
        title="Chat with our stylist"
        caption="Get a personalized consultation"
        onPress={() =>
          Linking.openURL(
            "mailto:membership@seasons.nyc?subject=Chat%20with%20a%20stylist&body=I%20would%20like%20to%20chat%20with%20a%20seasons%20stylist%20to%20help%20find%20items%20that%20suit%20me.%20Thanks!"
          )
        }
      />
      <Spacer mb={10} />
    </Box>
  )
}
