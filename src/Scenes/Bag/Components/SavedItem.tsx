import { Box, Flex, Sans, Button, Separator, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { get, head } from "lodash"
import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { useMutation } from "react-apollo"
import { ADD_TO_BAG, GET_BAG } from "../BagQueries"
import { GreenCheck } from "Assets/svgs"
import { Spinner } from "App/Components/Spinner"
import { Variant } from "App/Scenes/Product/Components/VariantList"

interface BagItemProps {
  bagIsFull: boolean
  hasActiveReservation: boolean
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
  hasActiveReservation,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const [addingToBag, setAddingToBag] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()
  if (!bagItem) {
    return null
  }
  const variantToUse: Variant = head(
    (get(bagItem, "productVariant.product.variants") || []).filter((a) => a.id === bagItem.productVariant.id)
  )
  const product = get(bagItem, "productVariant.product")
  if (!product) {
    return null
  }

  const imageURL = product?.images?.[0]?.url || ""
  const variantSize = variantToUse?.internalSize?.display
  const reservable = variantToUse?.reservable

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
      setAddingToBag(false)
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
      setAddingToBag(false)
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

              <Flex flexDirection="row" alignItems="center">
                <ColoredDot reservable={reservable} />
                {!!reservable ? (
                  <>
                    {!hasActiveReservation ? (
                      <>
                        <Sans
                          size="1"
                          style={{ textDecorationLine: "underline" }}
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
                          {"  "}Add to bag
                        </Sans>
                      </>
                    ) : (
                      <Sans size="1" color="black50">
                        {"  "}Available
                      </Sans>
                    )}
                  </>
                ) : (
                  <Sans size="1" color="black50">
                    {"  "}Unavailable
                  </Sans>
                )}
              </Flex>
            </Box>
            <Button
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
      <Separator color={color("black10")} />
      {addingToBag && (
        <Overlay>
          <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        </Overlay>
      )}
    </Box>
  )
}

const Overlay = styled(Box)`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`

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

const ColoredDot = styled(Box)`
  height: 8;
  width: 8;
  background-color: ${(p) => (!!p.reservable ? color("green100") : color("black50"))};
  border-radius: 4;
`
