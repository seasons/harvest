import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Spinner } from "App/Components/Spinner"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import * as Sentry from "@sentry/react-native"
import { ADD_TO_BAG, GetBag_NoCache_Query, SavedTab_Query } from "../BagQueries"
import { ListCheck } from "Assets/svgs/ListCheck"
import { UPSERT_RESTOCK_NOTIF } from "App/Scenes/Product/Product"

interface BagItemProps {
  bagIsFull: boolean
  navigation?: any
  bagItem: any
}

export const SavedItemFragment_BagItem = gql`
  fragment SavedItemFragment_BagItem on BagItem {
    id
    saved
    productVariant {
      id
      reservable
      displayLong
      hasRestockNotification
      product {
        id
        slug
        name
        brand {
          id
          name
        }
        images(size: Thumb) {
          id
          url
        }
      }
    }
  }
`

export const SavedItem: React.FC<BagItemProps> = ({ bagIsFull, bagItem, navigation }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [upsertingRestockNotif, setIsUpsertingRestockNotif] = useState(false)
  const [addingToBag, setAddingToBag] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()

  const variant = bagItem?.productVariant
  const product = variant?.product
  const imageURL = product?.images?.[0]?.url || ""
  const variantSize = variant?.displayLong?.toLowerCase()
  const reservable = variant?.reservable > 0
  const hasRestockNotification = variant?.hasRestockNotification

  const [upsertRestockNotification] = useMutation(UPSERT_RESTOCK_NOTIF, {
    variables: {
      variantID: variant.id,
      shouldNotify: !hasRestockNotification,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: SavedTab_Query,
      },
    ],
    onCompleted: () => {
      setIsUpsertingRestockNotif(false)
      setIsMutating(false)
    },
    onError: (e) => {
      console.log("error", e)
      Sentry.captureException(JSON.stringify(e))
      setIsMutating(false)
      setIsUpsertingRestockNotif(false)
    },
  })

  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      id: variant.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
      {
        query: SavedTab_Query,
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
        variantId: variant.id,
      })
    }
  }

  const onNotifyMe = () => {
    if (!isMutating) {
      setIsUpsertingRestockNotif(true)
      setIsMutating(true)
      upsertRestockNotification()
      tracking.trackEvent({
        actionName: Schema.ActionNames.NotifyMeTapped,
        actionType: Schema.ActionTypes.Tap,
        productSlug: product.slug,
        productId: product.id,
        variantId: variant.id,
        shouldNotify: !hasRestockNotification,
      })
    }
  }

  const CTA = () => {
    if (!bagIsFull && reservable) {
      return (
        <Button
          onPress={onAddToBag}
          variant="secondaryWhite"
          size="small"
          disabled={isMutating || addingToBag || upsertingRestockNotif}
          loading={addingToBag || upsertingRestockNotif}
        >
          Add to bag
        </Button>
      )
    } else if (!reservable) {
      return (
        <Button
          onPress={onNotifyMe}
          variant="secondaryWhite"
          size="small"
          Icon={hasRestockNotification ? ListCheck : null}
          disabled={isMutating || addingToBag || upsertingRestockNotif}
          loading={addingToBag || upsertingRestockNotif}
        >
          Notify me
        </Button>
      )
    } else {
      return null
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
            <CTA />
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
