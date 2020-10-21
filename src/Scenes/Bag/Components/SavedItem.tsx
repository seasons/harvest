import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Spinner } from "App/Components/Spinner"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Variant } from "App/Scenes/Product/Components/VariantList"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import { get, head } from "lodash"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import * as Sentry from "@sentry/react-native"

import { ADD_TO_BAG, GET_BAG } from "../BagQueries"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { GET_BROWSE_PRODUCTS } from "App/Scenes/Browse/Browse"

interface BagItemProps {
  bagIsFull: boolean
  hasActiveReservation: boolean
  bagItem: any
  navigation?: any
  removeItemFromBag?: Function
}

export const SavedItem: React.FC<BagItemProps> = ({
  bagIsFull,
  bagItem,
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
          icon: <CheckCircled />,
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
        if (err.graphQLErrors?.[0]?.message?.includes("Bag is full")) {
          showPopUp({
            title: "Your bag is full",
            note: "Remove one or more items from your bag to continue adding this item.",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        } else {
          Sentry.captureException(err)
          console.log("err SavedItem.tsx", err)
          showPopUp({
            title: "Oops!",
            note: "There was a problem adding your item to your bag.",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        }
      }
    },
  })

  return (
    <Box py={1} key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation ? navigation.navigate("Product", { id: product.id, slug: product.slug, name: product.name }) : null
        }}
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
                <Spacer mr={1} />
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
                          Add to bag
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
                  refetchQueries: [
                    {
                      query: GET_BAG,
                    },
                    {
                      query: GET_PRODUCT,
                      variables: {
                        where: {
                          id: product.id,
                        },
                      },
                    },
                    {
                      query: GET_BROWSE_PRODUCTS,
                      variables: {
                        name: "all",
                        first: 10,
                        skip: 0,
                        orderBy: "publishedAt_DESC",
                        sizes: [],
                      },
                    },
                  ],
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
              <ImageContainer
                radius
                style={{ height: 170 * PRODUCT_ASPECT_RATIO, width: 170 }}
                resizeMode="contain"
                source={{ uri: imageURL }}
              />
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
