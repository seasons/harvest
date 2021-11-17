import { Flex, Separator } from "App/Components"
import React from "react"
import { useBag } from "../useBag"
import { useNavigation } from "@react-navigation/native"
import { Box, Spacer } from "@seasons/eclipse"
import { BagTabBottomCards } from "./BagTabBottomCards"
import { EmptyBagItem } from "./EmptyBagItem"
import { BagSection } from "./BagSection"

export const BagTab: React.FC = () => {
  const { data, bagSections } = useBag()
  const navigation = useNavigation()

  const hasAtHomeItems = bagSections?.find((section) => section.status === "AtHome")?.bagItems?.length > 0
  const addedItems = bagSections?.find((section) => section.status === "Added")?.bagItems ?? []
  const itemCount = data?.me?.customer?.membership?.plan?.itemCount ?? 6
  const showAddAnItemCard = addedItems?.length < itemCount

  let lastVisibleSection
  bagSections?.forEach((section) => {
    if (section.bagItems.length > 0) {
      lastVisibleSection = section.status
    }
  })

  return (
    <Flex height="100%">
      {bagSections?.map((section, index) => {
        const showSeperator =
          (lastVisibleSection != section.status || (section.status === "Added" && showAddAnItemCard)) &&
          section.bagItems.length > 0
        return (
          <Box key={index}>
            <BagSection section={section} sectionIndex={index} />
            {showSeperator && (
              <Box px={2}>
                <Spacer mb={2} />
                <Separator />
              </Box>
            )}
          </Box>
        )
      })}

      {showAddAnItemCard && (
        <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
          <EmptyBagItem text="Add an item" navigation={navigation} />
        </Flex>
      )}

      <Box mt={3}>
        <BagTabBottomCards hasAtHomeItems={hasAtHomeItems} />
        {!showAddAnItemCard && <Spacer mb={90} />}
      </Box>
    </Flex>
  )
}
