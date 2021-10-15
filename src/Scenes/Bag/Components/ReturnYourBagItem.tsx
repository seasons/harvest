import { Box, Button, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { color } from "App/utils"
import { WhiteListCheck } from "Assets/svgs/WhiteListCheck"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import styled from "styled-components/native"

interface ReturnYourBagItemProps {
  physicalProduct: any
  onSelect: (selected: boolean) => void
  onSelectReason: (reason: string) => void
  returnReasons: string[]
}

export const ReturnYourBagItem: React.FC<ReturnYourBagItemProps> = ({
  physicalProduct,
  onSelect,
  returnReasons,
  onSelectReason,
}) => {
  const variant = physicalProduct?.productVariant
  const product = variant?.product

  const imageURL = product?.images?.[0]?.url || ""
  const variantSize = variant?.displayShort

  const [selected, setSelected] = useState(false)
  const [selectedReason, setSelectedReason] = useState("")

  return (
    <Box key={product.id} width="100%" py={2}>
      <BagItemContainer flexDirection="row" px={2}>
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
              variant="primaryWhite"
              size="small"
              selected={selected}
              Icon={selected ? WhiteListCheck : null}
            >
              {selected ? "" : "Select"}
            </Button>
          </Flex>
        </Flex>
      </BagItemContainer>
      {selected && (
        <Box pl={2} mt={2}>
          <ScrollView horizontal>
            {returnReasons?.map((reason, index) => {
              const selected = selectedReason === reason
              return (
                <Button
                  onPress={() => {
                    setSelectedReason(reason)
                    onSelectReason(reason)
                  }}
                  selected={selected}
                  key={index}
                  variant={selected ? "primaryWhite" : "primaryGray"}
                  size="small"
                  mr={index !== returnReasons.length - 1 ? 1 : 0}
                >
                  {reason}
                </Button>
              )
            })}
          </ScrollView>
        </Box>
      )}
    </Box>
  )
}

const BagItemContainer = styled(Flex)`
  height: 140px;
`

const ImageContainer = styled(FadeInImage)`
  height: 130px;
`
