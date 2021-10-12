import { Box, Separator, Spacer } from "App/Components"
import gql from "graphql-tag"
import React from "react"
import { LargeBagItem } from "../BagItem/LargeBagItem"
import { SmallBagItem, BagItemFragment_BagItem } from "../BagItem/SmallBagItem"
import { BagSectionDeliveryStatus, BagSectionDeliveryStatusFragment_BagSection } from "./BagSectionDeliveryStatus"
import { BagSectionHeader, BagSectionHeaderFragment_BagSection } from "./BagSectionHeader"

export const BagSectionFragment_BagSection = gql`
  fragment BagSectionFragment_BagSection on BagSection {
    status
    ...BagSectionHeaderFragment_BagSection
    ...BagSectionDeliveryStatusFragment_BagSection
    bagItems {
      ...BagItemFragment_BagItem
    }
  }
  ${BagSectionHeaderFragment_BagSection}
  ${BagSectionDeliveryStatusFragment_BagSection}
  ${BagItemFragment_BagItem}
`

export const BagSection = ({ section, sectionIndex }) => {
  console.log("section.bagItems", section.bagItems)
  const hasItems = section?.bagItems?.length > 0
  const status = section.status

  const showDeliveryStatus = status === "CustomerToBusiness" || status === "BusinessToCustomer"

  if (!hasItems) {
    return null
  }

  return (
    <>
      <Box px={2} pb={2} pt={4}>
        <BagSectionHeader section={section} sectionIndex={sectionIndex} />
      </Box>
      {showDeliveryStatus && (
        <Box px={0.5} pb={3}>
          <BagSectionDeliveryStatus section={section} />
        </Box>
      )}
      <Box px={2}>
        {section.bagItems.map((bagItem, index) => {
          if (status === "AtHome") {
            return (
              <Box pt={index !== 0 && 2}>
                <LargeBagItem bagItem={bagItem} sectionStatus={status} key={index} />
              </Box>
            )
          } else {
            return (
              <Box pt={index !== 0 && 2}>
                <SmallBagItem bagItem={bagItem} sectionStatus={status} key={index} />
              </Box>
            )
          }
        })}
      </Box>
    </>
  )
}
