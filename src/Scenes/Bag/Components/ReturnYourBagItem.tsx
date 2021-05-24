import { Box, Button, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { color } from "App/utils"
import { ListCheck } from "Assets/svgs/ListCheck"
import React, { useState } from "react"
import styled from "styled-components/native"

interface ReturnYourBagItemProps {
  physicalProduct: any
  onSelect: (selected: boolean) => void
}

export const ReturnYourBagItem: React.FC<ReturnYourBagItemProps> = ({ physicalProduct, onSelect }) => {
  const variant = physicalProduct?.productVariant
  const product = variant?.product

  const imageURL = product?.images?.[0]?.url || ""
  const variantSize = variant?.displayLong?.toLowerCase()

  const [selected, setSelected] = useState(false)

  return (
    <Box key={product.id} width="100%" py={1}>
      <BagItemContainer flexDirection="row">
        <Flex flexDirection="row" justifyContent="flex-end" alignItems="center">
          {!!imageURL && (
            <ImageContainer
              style={{ height: 110 * PRODUCT_ASPECT_RATIO, width: 110 }}
              resizeMode="contain"
              source={{ uri: imageURL }}
            />
          )}
        </Flex>
        <Flex flexWrap="nowrap" flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <Box mx={2}>
            <Sans size="3">{product.brand.name}</Sans>
            <Sans size="3" color={color("black50")}>
              {product.name}
            </Sans>
            <Sans size="3" color={color("black50")}>
              Size {variantSize}
            </Sans>
          </Box>
          <Flex width="100%" justifyContent="flex-end" alignItems="flex-end" mb={1}>
            <Button
              onPress={() => {
                setSelected(!selected)
                onSelect(!selected)
              }}
              variant="secondaryWhite"
              size="small"
              Icon={selected ? ListCheck : null}
            >
              {selected ? "" : "Select"}
            </Button>
          </Flex>
        </Flex>
      </BagItemContainer>
    </Box>
  )
}

const BagItemContainer = styled(Flex)`
  height: 140px;
`

const ImageContainer = styled(FadeInImage)`
  height: 130px;
`
