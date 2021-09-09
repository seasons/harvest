import { Sans, Separator } from "App/Components"
import { PauseStatus, RESUME_MEMBERSHIP } from "App/Components/Pause/PauseButtons"
import { GetBag_NoCache_Query as GetBag_NoCache_Query_Type } from "App/generated/GetBag_NoCache_Query"
import { Schema as NavigationSchema } from "App/Navigation"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { color } from "App/utils"
import { DarkInstagram, Stylist } from "Assets/svgs"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { Linking } from "react-native"
import { useMutation } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import { Box, ProductBuyAlertTab, ProductBuyAlertTabType, Spacer } from "@seasons/eclipse"
import * as Sentry from "@sentry/react-native"
import { GetBag_NoCache_Query } from "../BagQueries"
import { BagCardButton } from "./BagCardButton"
import { BagItem } from "./BagItem"
import { BagTabHeader } from "./BagTabHeader"
import { BuyBottomSheet, height as bottomSheetHeight } from "./BuyBottomSheet"
import { EmptyBagItem } from "./EmptyBagItem"

export const BagTab: React.FC<{
  bagItems
  pauseStatus: PauseStatus
  data: GetBag_NoCache_Query_Type
  items
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ bagItems, pauseStatus, data, deleteBagItem, removeFromBagAndSaveItem }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { bottomSheetSetProps, bottomSheetSnapToIndex } = useBottomSheetContext()
  const navigation = useNavigation()

  const me = data?.me
  const activeReservation = me?.activeReservation
  const hasActiveReservation = !!activeReservation

  const [resumeSubscription] = useMutation(RESUME_MEMBERSHIP, {
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
    ],
    onCompleted: () => {
      navigation.navigate("Modal", { screen: NavigationSchema.PageNames.ResumeConfirmation })
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error resuming your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      Sentry.captureException(err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const onShowBuyBottomSheet = (bagItem) => {
    const price = bagItem?.productVariant?.price || {
      buyNewEnabled: false,
      buNewAvailableForSale: false,
      buyUsedEnabled: false,
      buyUsedAvailableForSale: false,
    }
    const { name: brandName, websiteUrl: brandHref, logoImage } = bagItem?.productVariant?.product?.brand

    const newTab: ProductBuyAlertTab = price.buyNewAvailableForSale
      ? {
          type: ProductBuyAlertTabType.NEW,
          price: price.buyNewPrice,
          brandHref,
          brandName,
          brandLogoUri: logoImage?.url,
        }
      : { type: ProductBuyAlertTabType.NEW_UNAVAILABLE, brandHref, brandName, brandLogoUri: logoImage?.url }

    const usedTab: ProductBuyAlertTab = price.buyUsedAvailableForSale
      ? { type: ProductBuyAlertTabType.USED, price: price.buyUsedPrice, brandHref, brandName }
      : { type: ProductBuyAlertTabType.USED_UNAVAILABLE }

    bottomSheetSetProps({
      renderContent: () => (
        <BuyBottomSheet
          productVariantId={bagItem?.productVariant?.id}
          onDismiss={() => bottomSheetSnapToIndex(1)}
          tabs={[newTab, usedTab]}
          initialTab={price.buyNewEnabled ? 0 : 1}
          navigation={navigation}
        />
      ),
      snapPoints: [bottomSheetHeight, 0],
      initialSnap: 1,
      enabledInnerScrolling: false,
    })
    bottomSheetSnapToIndex(0)
  }

  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const isPaused = pauseStatus === "paused"
  const pauseType = pauseRequest?.pauseType
  const withOrWithoutDisplay = pauseType === "WithoutItems" ? "without items" : "with items"
  const pausedWithoutItems = isPaused && pauseType === "WithoutItems"
  const status = activeReservation?.status
  const updatedMoreThan24HoursAgo =
    activeReservation?.updatedAt && DateTime.fromISO(activeReservation?.updatedAt).diffNow("days")?.values?.days <= -1
  const atHome = status && status === "Delivered" && updatedMoreThan24HoursAgo

  return (
    <Box>
      <BagTabHeader atHome={atHome} me={me} />
      {isPaused && (
        <>
          <Box px={2}>
            <Separator color={color("black10")} />
          </Box>
          <Box px={2} py={3}>
            <Sans size="4" color="black50">
              {`Your membership is paused ${withOrWithoutDisplay} until ${DateTime.fromISO(
                pauseRequest.resumeDate
              ).toFormat("EEEE LLLL dd")}. To continue reserving earlier, resume it by tapping `}
              <Sans
                size="4"
                style={{ textDecorationLine: "underline" }}
                onPress={async () => {
                  if (isMutating) {
                    return
                  }
                  setIsMutating(true)
                  const subscriptionId = me?.customer?.invoices?.[0]?.subscriptionId || ""
                  await resumeSubscription({
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
      {bagItems?.map((bagItem, index) => {
        if (pausedWithoutItems) {
          return null
        }
        const isReserved = !!bagItem?.status && bagItem?.status === "Reserved"
        const spacing = isReserved ? "7px" : 2
        return bagItem?.productID?.length > 0 ? (
          <Box key={bagItem.id} px={2}>
            {index !== 0 && (
              <>
                <Spacer mb={spacing} />
                {!isReserved && <Separator color={color("black10")} />}
              </>
            )}
            <Spacer mb={index === 0 ? 3 : spacing} />
            <BagItem
              deleteBagItem={deleteBagItem}
              removeFromBagAndSaveItem={removeFromBagAndSaveItem}
              index={index}
              bagItem={bagItem}
              navigation={navigation}
              onShowBuyBottomSheet={() => onShowBuyBottomSheet(bagItem)}
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
      {!pausedWithoutItems && <Separator />}
      <Spacer mb={3} />

      {hasActiveReservation && !isPaused && (
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
      {!isPaused && (
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
      )}
      <Spacer mb={10} />
    </Box>
  )
}
