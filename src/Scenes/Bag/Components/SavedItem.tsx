import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Spinner } from "App/Components/Spinner"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import * as Sentry from "@sentry/react-native"
import { ADD_TO_BAG, GET_BAG } from "../BagQueries"
import {
  GetBagAndSavedItems_me_bag_productVariant_product,
  GetBagAndSavedItems_me_bag_productVariant_product_variants,
} from "App/generated/GetBagAndSavedItems"
import { ListCheck } from "Assets/svgs/ListCheck"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { UPSERT_RESTOCK_NOTIF } from "App/Scenes/Product/Product"

interface BagItemProps {
  bagIsFull: boolean
  hasActiveReservation: boolean
  navigation?: any
  product: GetBagAndSavedItems_me_bag_productVariant_product
  variantToUse: GetBagAndSavedItems_me_bag_productVariant_product_variants
}

export const SavedItem: React.FC<BagItemProps> = ({
  bagIsFull,
  variantToUse,
  product,
  navigation,
  hasActiveReservation,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const [addingToBag, setAddingToBag] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()

  const imageURL = product?.images?.[0]?.url || ""
  const variantSize = variantToUse?.displayLong?.toLowerCase()
  const reservable = variantToUse?.reservable > 0
  const hasRestockNotification = variantToUse?.hasRestockNotification

  const [upsertRestockNotification] = useMutation(UPSERT_RESTOCK_NOTIF, {
    variables: {
      variantID: variantToUse.id,
      shouldNotify: !hasRestockNotification,
    },
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          where: {
            id: product.id,
            slug: product.slug,
          },
        },
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (e) => {
      console.log("error", e)
      Sentry.captureException(JSON.stringify(e))
      setIsMutating(false)
    },
  })

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

  const onAddToBag = () => {
    if (!isMutating || !addingToBag) {
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
  }

  const onNotifyMe = () => {
    if (!isMutating) {
      setIsMutating(true)
      upsertRestockNotification()
      tracking.trackEvent({
        actionName: Schema.ActionNames.NotifyMeTapped,
        actionType: Schema.ActionTypes.Tap,
        productSlug: product.slug,
        productId: product.id,
        variantId: variantToUse.id,
        shouldNotify: !hasRestockNotification,
      })
    }
  }

  return (
    <Box key={product.id} width="100%">
      <TouchableWithoutFeedback
        onPress={() => {
          navigation ? navigation.navigate("Product", { id: product.id, slug: product.slug, name: product.name }) : null
        }}
      >
        <BagItemContainer flexDirection="row" px={2}>
          <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              <Sans size="3">{product.brand.name}</Sans>
              <Sans size="3" color={color("black50")}>
                {product.name}
              </Sans>
              <Sans size="3" color={color("black50")}>
                Size {variantSize}
              </Sans>
              <Spacer mb={3} />

              <Flex flexDirection="row" alignItems="center">
                <ColoredDot reservable={reservable} />
                <Spacer mr={1} />
                <Sans size="3" color="black50">
                  {reservable ? "Available" : "Unavailable"}
                </Sans>
              </Flex>
            </Box>
            {(!hasActiveReservation || !reservable) && (
              <Button
                onPress={() => {
                  reservable ? onAddToBag() : onNotifyMe()
                }}
                variant="secondaryWhite"
                size="small"
                Icon={!reservable && hasRestockNotification ? ListCheck : null}
                disabled={isMutating || addingToBag}
                loading={addingToBag}
              >
                {reservable ? "Add to bag" : "Notify me"}
              </Button>
            )}
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            {!!imageURL && (
              <ImageContainer
                style={{ height: 170 * PRODUCT_ASPECT_RATIO, width: 170 }}
                resizeMode="contain"
                source={{ uri: imageURL }}
              />
            )}
          </Flex>
        </BagItemContainer>
      </TouchableWithoutFeedback>
      <Spacer mb={2} />
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

const BagItemContainer = styled(Flex)`
  overflow: hidden;
  height: 210px;
`

const ImageContainer = styled(FadeInImage)`
  height: 214;
`

const ColoredDot = styled(Box)<{ reservable: boolean }>`
  height: 8;
  width: 8;
  background-color: ${(p) => (!!p.reservable ? color("green100") : color("black50"))};
  border-radius: 4;
`
