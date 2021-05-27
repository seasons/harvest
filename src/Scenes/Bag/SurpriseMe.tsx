import gql from "graphql-tag"
import { Button, CloseButton, Container, FadeInImage, Flex, Sans, Separator, Spacer } from "App/Components"
import { Box } from "App/Components/Box"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { shuffle, clone } from "lodash"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { Dimensions, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { CheckCircled } from "Assets/svgs"
import * as Sentry from "@sentry/react-native"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { ADD_TO_BAG, GetBag_NoCache_Query } from "./BagQueries"
import { SaveProductButton } from "../Product/Components"
import { Schema, useTracking, screenTrack } from "App/utils/track"
import { Loader } from "App/Components/Loader"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

export const GET_SURPRISE_PRODUCT_VARIANTS = gql`
  query SurpriseProductVariants {
    surpriseProductVariants {
      id
      isSaved
      product {
        id
        slug
        name
        brand {
          id
          slug
          name
        }
        images(size: Small) {
          id
          url
        }
      }
    }
    me {
      id
      bag {
        id
        productVariant {
          id
          product {
            id
          }
        }
        position
        saved
        status
      }
      customer {
        id
        membership {
          id
          plan {
            id
            itemCount
          }
        }
      }
    }
  }
`

const itemWidth = Math.min(Dimensions.get("window").width - 32, 280)
const imageHeight = itemWidth * PRODUCT_ASPECT_RATIO

const Content = ({ data, variant, product, onRestart, seenAllAvailableProducts }) => {
  const tracking = useTracking()
  const navigation = useNavigation()

  const imageURL = product?.images?.[0]?.url
  const productName = product?.name
  const brand = product?.brand
  const brandName = brand?.name

  const NoProducts = () => {
    return (
      <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center" alignItems="center">
        <Box px={2}>
          <Sans color="black100" size="5" style={{ textAlign: "center", maxWidth: 300 }}>
            We can't find any products in your size. Check you've added your measurements in Personal Preferences in
            account settings.
          </Sans>
          <Spacer mb={100} />
        </Box>
      </Flex>
    )
  }

  const SeenAllContent = () => {
    return (
      <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center" alignItems="center">
        <Box px={2} pt={2}>
          <Sans color="black50" size="5" style={{ textAlign: "center", maxWidth: 300 }}>
            You've seen all of the available products in your size.
          </Sans>
          <Spacer mb={3} />
          <Sans
            color="black100"
            size="5"
            style={{ textAlign: "center", textDecorationLine: "underline" }}
            onPress={onRestart}
          >
            Restart
          </Sans>
        </Box>
      </Flex>
    )
  }

  if (!!data && data?.surpriseProductVariants.length === 0) {
    return <NoProducts />
  } else if (seenAllAvailableProducts) {
    return <SeenAllContent />
  } else {
    return (
      <Box key={variant?.id}>
        <Spacer mb={3} />
        <Flex px={2} flexDirection="row" justifyContent="center">
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("Product", { id: product?.id, slug: product?.slug, name: product?.name })
            }
          >
            <FadeInImage source={{ uri: imageURL }} style={{ width: itemWidth, height: imageHeight }} />
          </TouchableWithoutFeedback>
        </Flex>
        <Spacer mb={5} />
        <Separator />
        <Spacer mb={2} />
        <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-start" pl={2}>
          <Box my={1}>
            {!!productName && (
              <Sans size="3" style={{ maxWidth: itemWidth - 50 }}>
                {productName}
              </Sans>
            )}
            {!!brandName && (
              <TouchableWithoutFeedback
                onPress={() => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.BrandTapped,
                    actionType: Schema.ActionTypes.Tap,
                    brandID: brand?.id,
                    brandSlug: brand?.slug,
                    brandName: brand?.name,
                  })
                  navigation.navigate("Brand", { id: brand?.id, slug: brand?.slug, name: brand?.name })
                }}
              >
                <Sans size="3" color="black50" style={{ maxWidth: itemWidth - 50, textDecorationLine: "underline" }}>
                  {brandName}
                </Sans>
              </TouchableWithoutFeedback>
            )}
          </Box>
          <Box my={0.5}>
            <SaveProductButton
              height={22}
              width={16}
              noModal
              selectedVariant={variant}
              product={product}
              onPressSaveButton={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.SaveProductButtonTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
              }}
            />
          </Box>
        </Flex>
      </Box>
    )
  }
}

export const SurpriseMe = screenTrack()(() => {
  const [variants, setVariants] = useState(null)
  const { previousData, data = previousData } = useQuery(GET_SURPRISE_PRODUCT_VARIANTS)
  const insets = useSafeAreaInsets()
  const [isAddingToBag, setIsAddingToBag] = useState(false)
  const [loadingNext, setLoadingNext] = useState(false)
  const [added, setAdded] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const itemCount = data?.me?.customer?.membership?.plan?.itemCount
  const bagCount = data?.me?.bag?.length

  const bagIsFull = itemCount && bagCount && bagCount === itemCount

  const seenAllAvailableProducts = variants?.length === 0

  const createShuffledVariants = () => {
    // Filter out products that are in the customers bag
    const bagProductIDs = data?.me?.bag?.productVariant?.map((variant) => variant?.id)
    const variants = !!bagProductIDs?.length
      ? data.surpriseProductVariants.filter((variant) => !bagProductIDs.includes(variant.id))
      : data.surpriseProductVariants

    setVariants(shuffle(variants))
  }

  useEffect(() => {
    if (!variants && data?.surpriseProductVariants) {
      createShuffledVariants()
    }
  }, [data, variants, setVariants, createShuffledVariants])

  const variant = variants?.[0]
  const product = variant?.product

  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      id: variant?.id,
    },
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
      {
        query: GET_SURPRISE_PRODUCT_VARIANTS,
      },
    ],
    onCompleted: () => {
      setIsAddingToBag(false)
      if (bagIsFull) {
        showPopUp({
          icon: <CheckCircled />,
          title: "Added to bag",
          note: "Your bag is full. Place your reservation from the bag tab.",
          buttonText: "Got It",
          onClose: () => hidePopUp(),
        })
      }
      setAdded(true)
    },
    onError: (err) => {
      setIsAddingToBag(false)
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

  const onRestart = () => {
    createShuffledVariants()
  }

  const onAddToBag = () => {
    if (isAddingToBag) {
      return
    }
    setIsAddingToBag(true)
    addToBag()
  }

  const onNext = () => {
    if (loadingNext) {
      return
    }
    if (added) {
      setAdded(false)
    }
    setLoadingNext(true)
    const clonedArray = clone(variants)
    clonedArray.shift()
    setTimeout(() => {
      setVariants(clonedArray)
      setLoadingNext(false)
    }, 400)
  }

  let addText
  if (added) {
    addText = "Added"
  } else if (bagIsFull) {
    addText = "Bag is full"
  } else {
    addText = "Add to bag"
  }

  if (!data?.surpriseProductVariants) {
    return (
      <>
        <CloseButton variant="light" />
        <Loader />
      </>
    )
  }

  return (
    <>
      <CloseButton variant="light" />

      <Container insetsBottom={false} insetsTop={false}>
        <Box style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
            <Spacer mb={5} />
            <Spacer mb={4} />
            <Box px={2} pt={2}>
              <Sans color="black100" size="7">
                Styles for you
              </Sans>
              <Sans color="black50" size="4">
                Available now and in your size
              </Sans>
              <Spacer mb={2} />
            </Box>
            <Content
              data={data}
              variant={variant}
              product={product}
              onRestart={onRestart}
              seenAllAvailableProducts={seenAllAvailableProducts}
            />
            <Spacer pb={160} />
          </ScrollView>
        </Box>

        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Spacer mb={2} />
          <Flex p={2} flexDirection="row">
            <Box style={{ flex: 1 }}>
              <Button
                block
                variant="primaryWhite"
                disabled={isAddingToBag || added || bagIsFull || seenAllAvailableProducts}
                loading={isAddingToBag}
                size="large"
                onPress={onAddToBag}
              >
                {addText}
              </Button>
            </Box>
            <Spacer mr={1} />
            <Box style={{ flex: 1 }}>
              <Button block onPress={onNext} size="large" variant="primaryBlack" disabled={seenAllAvailableProducts}>
                Next
              </Button>
            </Box>
          </Flex>
          <Spacer height={insets.bottom + 8} />
        </FadeBottom2>
      </Container>
    </>
  )
})
