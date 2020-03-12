import { Box, Flex, Sans, Button, Separator, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { get, head } from "lodash"
import React, { useState, useEffect } from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"

interface BagItemProps {
  bagItem: any
  sectionHeight: number
  navigation?: any
  removeItemFromBag?: Function
}

export const SavedItem: React.FC<BagItemProps> = ({ bagItem, sectionHeight, navigation, removeItemFromBag }) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  if (!bagItem) {
    return <></>
  }
  const variantToUse = head(
    (get(bagItem, "productVariant.product.variants") || []).filter(a => a.id === bagItem.productVariant.id)
  )
  const product = get(bagItem, "productVariant.product")
  if (!product) {
    return null
  }

  const imageURL = imageResize(get(product, "images[0].url"), "medium")
  const variantSize = get(variantToUse, "size")

  return (
    <Box py={1} key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => (navigation ? navigation.navigate("Product", { id: product.id, slug: product.slug }) : null)}
      >
        <BagItemContainer flexDirection="row" px={2}>
          <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              <Sans size="1">{product.brand.name}</Sans>
              <Sans size="1" color={color("black50")}>
                {product.name}
              </Sans>
              <Sans size="1" color={color("black50")}>
                Size {variantSize}
              </Sans>
            </Box>
            <Button
              width={91}
              onPress={() => {
                if (isMutating) {
                  return
                }
                setIsMutating(true)
                tracking.trackEvent({
                  actionName: Schema.ActionNames.BagItemRemoved,
                  actionType: Schema.ActionTypes.Tap,
                  productSlug: product.slug,
                  productId: product.id,
                  variantId: variantToUse.id,
                })
                removeItemFromBag({
                  variables: {
                    id: variantToUse.id,
                    saved: true,
                  },
                })
              }}
              variant="secondaryWhite"
              size="small"
              disabled={isMutating}
              loading={isMutating}
            >
              Remove
            </Button>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            {!!imageURL && (
              <ImageWrapper>
                <ImageContainer
                  radius
                  style={{ height: sectionHeight, width: 170 }}
                  resizeMode="contain"
                  source={{ uri: imageURL }}
                />
              </ImageWrapper>
            )}
          </Flex>
        </BagItemContainer>
      </TouchableWithoutFeedback>
      <Spacer mb={2} />
      <Separator color={color("black15")} />
    </Box>
  )
}

const BagItemContainer = styled(Box)`
  overflow: hidden;
  height: 210px;
`

const ImageContainer = styled(FadeInImage)`
  height: 214;
`

const ImageWrapper = styled(FadeInImage)`
  border-radius: 30px;
  overflow: hidden;
`
