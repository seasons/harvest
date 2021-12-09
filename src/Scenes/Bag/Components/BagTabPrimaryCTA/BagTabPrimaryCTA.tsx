import { MAXIMUM_ITEM_COUNT } from "App/helpers/constants"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema as TrackSchema, useTracking } from "App/utils/track"
import React from "react"
import { Dimensions } from "react-native"
import { State as CreateAccountState, UserState as CreateAccountUserState } from "../../../CreateAccount/CreateAccount"
import { useNavigation } from "@react-navigation/native"
import { Box, Button, Flex } from "@seasons/eclipse"
import { BagBottomBar } from "../BagBottomBar"

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const BagTabPrimaryCTA = ({
  data,
  sections,
  setShowReturnItemPopup,
  startReservation,
  isMutating,
  setIsMutating,
}) => {
  const { authState } = useAuthContext()

  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const tracking = useTracking()
  const isSignedIn = authState.isSignedIn

  const addedItems = sections?.find((section) => section.status === "Added")?.bagItems
  const hasAddedItems = addedItems?.length > 0
  const atHomeItems = sections?.find((section) => section.status === "AtHome")?.bagItems
  const hasAtHomeItems = atHomeItems?.length > 0
  const returnPendingItems = sections?.find((section) => section.status === "ReturnPending")?.bagItems
  const hasReturnPendingsItems = returnPendingItems?.length > 0
  const inboundTrackingUrl = sections?.find(
    (section) =>
      (section.status === "ScannedOnInbound" ||
        section.status === "InTransitInbound" ||
        section.status === "DeliveredToBusiness") &&
      !!section.deliverTrackingUrl
  )?.deliveryTrackingUrl

  const me = data?.me
  const customerStatus = me?.customer?.status
  const shippingAddress = data?.me?.customer?.detail?.shippingAddress
  const hasShippingAddress =
    !!shippingAddress?.address1 && !!shippingAddress?.city && !!shippingAddress?.state && !!shippingAddress?.zipCode

  const handleReserve = async () => {
    setIsMutating(true)
    if (!isSignedIn) {
      showPopUp({
        title: "Sign up to reserve your items",
        note: "You need to create an account before you can reserve items",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
          navigation.navigate("Modal", {
            screen: "CreateAccountModal",
          })
        },
      })
    } else if (customerStatus === "Authorized") {
      showPopUp({
        title: "You need to choose a plan first",
        note: "Sign up to a plan to continue reserving your items",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
          navigation.navigate("Modal", {
            screen: NavigationSchema.PageNames.CreateAccountModal,
            params: {
              initialState: CreateAccountState.ChoosePlan,
              initialUserState: CreateAccountUserState.Admitted,
            },
          })
        },
      })
    } else if (addedItems?.length > MAXIMUM_ITEM_COUNT) {
      showPopUp({
        title: "You must remove some items first",
        note: `The maximum items you can reserve is ${MAXIMUM_ITEM_COUNT}.`,
        buttonText: "Got it",
        onClose: () => hidePopUp(),
      })
    } else if (!hasShippingAddress) {
      showPopUp({
        title: "Your shipping address is incomplete",
        note:
          "Please update your shipping address under Payment & Shipping in your account settings to complete your reservation.",
        buttonText: "Got it",
        onClose: () => hidePopUp(),
        secondaryButtonText: "Go to settings",
        secondaryButtonOnPress: () => {
          navigation.navigate(NavigationSchema.StackNames.AccountStack, {
            screen: NavigationSchema.PageNames.PaymentAndShipping,
          })
          hidePopUp()
        },
      })
    } else if (hasAtHomeItems && !hasReturnPendingsItems) {
      setShowReturnItemPopup(true)
    } else {
      await startReservation()
    }
    setIsMutating(false)
  }

  let button = null

  const handlePress = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ReserveButtonTapped,
      actionType: TrackSchema.ActionTypes.Tap,
      addedItemCount: addedItems?.length,
    })
    if (hasAddedItems) {
      handleReserve()
    } else if (hasAtHomeItems) {
      navigation.navigate(NavigationSchema.PageNames.ReturnYourBag)
    } else if (hasReturnPendingsItems) {
      navigation.navigate(NavigationSchema.PageNames.ReturnYourBagConfirmation)
    }
  }

  if (hasAddedItems) {
    button = <BagBottomBar bagItems={addedItems} onReserve={handlePress} isMutating={isMutating} />
  } else if (hasAtHomeItems) {
    button = (
      <Box mx={2} my={2}>
        <Button block onPress={handlePress} disabled={isMutating} loading={isMutating} variant="primaryWhite">
          Return bag
        </Button>
      </Box>
    )
  } else if (!!inboundTrackingUrl) {
    button = (
      <Button
        onPress={() => navigation.navigate("Webview", { uri: inboundTrackingUrl })}
        disabled={isMutating}
        loading={isMutating}
        block
        variant="primaryWhite"
      >
        Return label
      </Button>
    )
  } else if (hasReturnPendingsItems) {
    button = (
      <Flex flexDirection="row" justifyContent="space-between" mx={2} my={2}>
        <Button onPress={handlePress} disabled={isMutating} loading={isMutating} block variant="primaryBlack">
          How to return
        </Button>
      </Flex>
    )
  }

  return button && <>{button}</>
}
