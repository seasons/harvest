import { Flex, Separator } from "App/Components"
import { GetBag_NoCache_Query as GetBag_NoCache_Query_Type } from "App/generated/GetBag_NoCache_Query"
import { MAXIMUM_ITEM_COUNT } from "App/helpers/constants"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"
import { color } from "App/utils"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import React from "react"

import { useNavigation } from "@react-navigation/native"
import { Box, ProductBuyAlertTab, ProductBuyAlertTabType, Spacer } from "@seasons/eclipse"

import { BagItem } from "./BagItem"
import { BagTabBottomCards } from "./BagTabBottomCards"
import { BagTabHeader } from "./BagTabHeader"
import { BuyBottomSheet, height as bottomSheetHeight } from "./BuyBottomSheet"
import { EmptyBagItem } from "./EmptyBagItem"

export const BagTab: React.FC<{
  bagItems
  data: GetBag_NoCache_Query_Type
  items
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ bagItems, data, deleteBagItem, removeFromBagAndSaveItem }) => {
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
  const atHome = status && status === "Delivered" && !activeReservation?.returnedAt

  const itemCount = me?.customer?.membership?.plan?.itemCount || MAXIMUM_ITEM_COUNT
  const paddedItems =
    assign(fill(new Array(Math.min(bagItems.length + 1, itemCount)), { variantID: "", productID: "" }), bagItems) || []

  const showBagItems = bagItems?.length > 0

  return (
    <Flex height="100%">
      <BagTabHeader atHome={atHome} me={me} />

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
