import { Flex } from "App/Components"
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

  const totalBagItems = bagSections?.map((section) => section.bagItems.length).reduce((acc, curr) => acc + curr)
  const hasAtHomeItems = bagSections?.find((section) => section.status === "AtHome")?.bagItems?.length > 0
  const itemCount = data?.me?.customer?.membership?.plan?.itemCount ?? 6
  const showAddAnItemCard = totalBagItems < itemCount

  return (
    <Flex height="100%">
      {bagSections?.map((section, index) => {
        return (
          <Box key={index}>
            <BagSection section={section} sectionIndex={index} />
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
