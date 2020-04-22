import { Box, Flex, Sans, Button, Separator, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { get, head } from "lodash"
import React, { useState } from "react"
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { useMutation } from "react-apollo"
import { ADD_TO_BAG, GET_BAG } from "../BagQueries"
import { GreenCheck } from "Assets/svgs"
import { Spinner } from "App/Components/Spinner"

interface BagItemProps {
  bagIsFull: boolean
  bagItem: any
  sectionHeight: number
  navigation?: any
  removeItemFromBag?: Function
}

export const SavedItem: React.FC<BagItemProps> = ({
  bagIsFull,
  bagItem,
  sectionHeight,
  navigation,
  removeItemFromBag,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const [addingToBag, setAddingToBag] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()
  if (!bagItem) {
    return null
  }
  const variantToUse = head(
    (get(bagItem, "productVariant.product.variants") || []).filter((a) => a.id === bagItem.productVariant.id)
  )
  const product = get(bagItem, "productVariant.product")
  if (!product) {
    return null
  }

  const imageURL = imageResize(get(product, "images[0].url"), "medium")
  const variantSize = get(variantToUse, "size")

  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      id: variantToUse.id,
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      if (bagIsFull) {
        showPopUp({
          icon: <GreenCheck />,
          title: "Added to bag",
          note: "Your bag is full. Place your reservation from the bag tab.",
          buttonText: "Got It",
          onClose: () => hidePopUp(),
        })
      }
    },
    onError: (err) => {
      setIsMutating(false)
      if (err && err.graphQLErrors) {
        showPopUp({
          title: "Your bag is full",
          note: "Remove one or more items from your bag to continue adding this item.",
          buttonText: "Got It",
          onClose: () => hidePopUp(),
        })
      }
    },
  })

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
              <Spacer mb={3} />
              {!addingToBag ? (
                <TouchableOpacity
                  onPress={() => {
                    if (!addingToBag) {
                      setAddingToBag(true)
                      addToBag()
                      tracking.trackEvent({
                        actionName: Schema.ActionNames.SavedItemAddedToBag,
                        actionType: Schema.ActionTypes.Tap,
                        productSlug: product.slug,
                        productId: product.id,
                        variantId: variantToUse.id,
                      })
                    }
                  }}
                >
                  <Sans size="1" style={{ textDecorationLine: "underline" }}>
                    Add to bag
                  </Sans>
                </TouchableOpacity>
              ) : (
                <Flex
                  style={{ width: 100, height: 20 }}
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spinner />
                </Flex>
              )}
            </Box>
            <Button
              width={91}
              onPress={() => {
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
              disabled={isMutating || addingToBag}
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
