import { Flex } from "App/Components"
import React from "react"
import { useBag } from "../../useBag"
import { useNavigation } from "@react-navigation/native"
import { Box } from "@seasons/eclipse"
import { EmptyBagItem } from "../EmptyBagItem"
import { BagSection } from "../BagSection"
import { BagTabHeader } from "../BagTabHeader"

export const RentTab: React.FC = () => {
  const { data, bagSections } = useBag()
  const navigation = useNavigation()

  const totalBagItems = bagSections?.map((section) => section.bagItems.length).reduce((acc, curr) => acc + curr)
  const itemCount = data?.me?.customer?.membership?.plan?.itemCount ?? 6
  const showAddAnItemCard = totalBagItems < itemCount

  return (
    <Flex height="100%">
      {totalBagItems === 0 && <BagTabHeader title="Rent" />}
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
    </Flex>
  )
}
