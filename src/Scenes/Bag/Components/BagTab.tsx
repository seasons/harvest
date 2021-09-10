import { Flex, Separator, Sans } from "App/Components"
import { PauseStatus, RESUME_MEMBERSHIP } from "App/Components/Pause/PauseButtons"
import { GetBag_NoCache_Query as GetBag_NoCache_Query_Type } from "App/generated/GetBag_NoCache_Query"
import { Schema as NavigationSchema } from "App/Navigation"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { color, space } from "App/utils"
import { DarkInstagram, Stylist } from "Assets/svgs"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { Dimensions, Linking, ScrollView } from "react-native"
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
import { assign, fill } from "lodash"

const dimensions = Dimensions.get("window")
const windowWidth = dimensions.width

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
  const paddedItems = assign(fill(new Array(bagItems.length + 1), { variantID: "", productID: "" }), bagItems) || []

  const showShareIGCard = hasActiveReservation && !isPaused
  const showBottomCards = !isPaused

  const showBagItems = bagItems?.length > 0

  return (
    <Flex height="100%">
      <BagTabHeader atHome={atHome} me={me} />
      {isPaused && (
        <>
          <Box px={2}>
            <Separator color={color("black10")} />
          </Box>
          <Box px={2} py={2}>
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
                  const subscriptionId = me?.customer?.membership?.subscription?.id
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

      {!showBagItems && (
        <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
          <EmptyBagItem text="Add an item" navigation={navigation} />
        </Flex>
      )}

      {showBagItems &&
        paddedItems?.map((bagItem, index) => {
          if (pausedWithoutItems) {
            return null
          }
          const isReserved = !!bagItem?.status && bagItem?.status === "Reserved"
          const spacing = isReserved ? "7px" : 2
          return bagItem?.productID?.length > 0 ? (
            <Box key={index}>
              {index !== 0 && (
                <>
                  <Spacer mb={spacing} />
                  {!isReserved && <Separator color={color("black10")} />}
                </>
              )}
              <Spacer mb={index === 0 ? 3 : spacing} />
              <Box px={2}>
                <BagItem
                  deleteBagItem={deleteBagItem}
                  removeFromBagAndSaveItem={removeFromBagAndSaveItem}
                  index={index}
                  bagItem={bagItem}
                  navigation={navigation}
                  onShowBuyBottomSheet={() => onShowBuyBottomSheet(bagItem)}
                />
              </Box>
            </Box>
          ) : (
            <Box key={index}>
              <Spacer mb={2} />
              <Separator />
              <EmptyBagItem text="Add another item" navigation={navigation} />
            </Box>
          )
        })}

      {showBottomCards && (
        <Box>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {showShareIGCard && (
              <Box ml={2} mr={1}>
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
              </Box>
            )}
            {!isPaused && (
              <Box ml={showShareIGCard ? 0 : 2} mr={1}>
                <BagCardButton
                  width={showShareIGCard ? "auto" : windowWidth - space(4)}
                  Icon={Stylist}
                  title="Chat with our stylist"
                  caption="Get a personalized consultation"
                  onPress={() =>
                    Linking.openURL(
                      "mailto:membership@seasons.nyc?subject=Chat%20with%20a%20stylist&body=I%20would%20like%20to%20chat%20with%20a%20seasons%20stylist%20to%20help%20find%20items%20that%20suit%20me.%20Thanks!"
                    )
                  }
                />
              </Box>
            )}
          </ScrollView>
          {showBagItems && <Spacer mb={90} />}
        </Box>
      )}
    </Flex>
  )
}
