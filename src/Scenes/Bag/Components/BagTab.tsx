import { Flex, Separator } from "App/Components"
import { GetBag_NoCache_Query as GetBag_NoCache_Query_Type } from "App/generated/GetBag_NoCache_Query"
import { MAXIMUM_ITEM_COUNT } from "App/helpers/constants"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"
import { color } from "App/utils"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import React from "react"
import { useBag } from "../useBag"

import { useNavigation } from "@react-navigation/native"
import { Box, ProductBuyAlertTab, ProductBuyAlertTabType, Spacer } from "@seasons/eclipse"

import { BagItem } from "./BagItem"
import { BagTabBottomCards } from "./BagTabBottomCards"
import { BagTabHeader } from "./BagTabHeader"
import { BuyBottomSheet, height as bottomSheetHeight } from "./BuyBottomSheet"
import { EmptyBagItem } from "./EmptyBagItem"
import { BagSection } from "./BagSection"

export const BagTab: React.FC<{
  bagItems
  data: GetBag_NoCache_Query_Type
  items
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ bagItems, deleteBagItem, removeFromBagAndSaveItem }) => {
  const { data, bagSections, refetch } = useBag()

  const { bottomSheetSetProps, bottomSheetSnapToIndex } = useBottomSheetContext()
  const navigation = useNavigation()

  const me = data?.me
  const activeReservation = me?.activeReservation

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

  const status = activeReservation?.status
  const updatedMoreThan24HoursAgo =
    activeReservation?.updatedAt && DateTime.fromISO(activeReservation?.updatedAt).diffNow("days")?.values?.days <= -1

  // atHome represents that the package is currently not in a state of transition and the user has it at home.
  // We wait 24 hours before showing its at home so the user can see the delivery status as delivered
  // With this variable we can show and hide the delivery status, for example
  const atHome = status && status === "Delivered" && !activeReservation?.returnedAt && updatedMoreThan24HoursAgo

  const itemCount = me?.customer?.membership?.plan?.itemCount || MAXIMUM_ITEM_COUNT
  const paddedItems =
    assign(fill(new Array(Math.min(bagItems.length + 1, itemCount)), { variantID: "", productID: "" }), bagItems) || []

  const showBagItems = bagItems?.length > 0

  let lastVisibleSection
  bagSections.forEach((section) => {
    if (section.bagItems.length > 0) {
      lastVisibleSection = section.status
    }
  })

  return (
    <Flex height="100%">
      {bagSections.map((section, index) => {
        return (
          <Box key={index}>
            <BagSection section={section} sectionIndex={index} />
            {lastVisibleSection != section.status && (
              <Box px={2}>
                <Spacer mb={2} />
                <Separator />
              </Box>
            )}
          </Box>
        )
      })}

      {!showBagItems && (
        <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
          <EmptyBagItem text="Add an item" navigation={navigation} />
        </Flex>
      )}

      <Spacer mb={2} />

      {showBagItems &&
        paddedItems?.map((bagItem, index) => {
          const isReserved = !!bagItem?.status && bagItem?.status === "Reserved"
          return bagItem?.productID?.length > 0 ? (
            <Box key={index} pt={2}>
              {index !== 0 && !isReserved && (
                <>
                  <Separator color={color("black10")} />
                  <Spacer mb={2} />
                </>
              )}
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

      <Box mt={3}>
        <BagTabBottomCards reservation={activeReservation} />
        {showBagItems && <Spacer mb={90} />}
      </Box>
    </Flex>
  )
}
