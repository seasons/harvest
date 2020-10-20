import { gql } from "apollo-boost"
import { Button, CloseButton, Container, FadeInImage, Flex, Sans, Spacer } from "App/Components"
import { Box } from "App/Components/Box"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { shuffle, clone } from "lodash"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { Dimensions, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { CheckCircled } from "Assets/svgs"
import * as Sentry from "@sentry/react-native"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { ADD_TO_BAG, GET_BAG } from "./BagQueries"

export const GET_SURPRISE_PRODUCTS = gql`
  query GetSurpriseProducts($first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    surpriseProducts(where: { AND: [{ status: Available }] }, first: $first, skip: $skip, orderBy: $orderBy) {
      id
      slug
      name
      brand {
        id
        name
      }
      images {
        id
        url
      }
    }
    me {
      bag {
        id
        productVariant {
          id
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

const itemWidth = Dimensions.get("window").width - 32
const imageHeight = itemWidth * PRODUCT_ASPECT_RATIO

export const SurpriseMe = () => {
  const [products, setProducts] = useState(null)
  const { data } = useQuery(GET_SURPRISE_PRODUCTS, {
    variables: {
      first: 10,
      skip: 0,
      orderBy: "createdAt_DESC",
    },
  })
  const insets = useSafeAreaInsets()
  const [isAddingToBag, setIsAddingToBag] = useState(false)
  const [loadingNext, setLoadingNext] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const itemCount = data?.me?.customer?.membership?.plan?.itemCount
  const bagCount = data?.me?.bag?.length

  const bagIsFull = itemCount && bagCount && bagCount === itemCount
  console.log("data", data)

  useEffect(() => {
    if (!products && data?.surpriseProducts) {
      setProducts(shuffle(data.surpriseProducts))
    }
  }, [data, products, setProducts])

  //FIXME:
  const variantToUse = { id: "" }

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
    setLoadingNext(true)
    const clonedArray = clone(products)
    clonedArray.shift()
    setTimeout(() => {
      setProducts(clonedArray)
      setLoadingNext(false)
    }, 200)
  }

  const product = products?.[0]
  const imageURL = product?.images?.[0]?.url
  const productName = product?.name
  const brandName = product?.brand?.name

  console.log("products", products)

  return (
    <>
      <CloseButton variant="light" />
      <Container insetsBottom={false} insetsTop={false}>
        <Box style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Spacer mb={5} />
            <Spacer mb={4} />
            <Box p={2}>
              <Sans color="black100" size="3">
                Styles for you
              </Sans>
              <Sans color="black50" size="1">
                Available now and in your size
              </Sans>
              <Spacer mb={2} />
              <FadeInImage
                source={{ uri: imageURL }}
                style={{ width: itemWidth, height: imageHeight }}
                key={product?.id}
              />
              <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                <Box my={0.5} mx={1}>
                  {!!productName && (
                    <Sans size="0.5" style={{ maxWidth: itemWidth - 50 }} key={product?.id}>
                      {productName}
                    </Sans>
                  )}
                  {!!brandName && (
                    <Sans
                      key={product?.id + "brand"}
                      size="0.5"
                      color="black50"
                      style={{ maxWidth: itemWidth - 50, textDecorationLine: "underline" }}
                    >
                      {brandName}
                    </Sans>
                  )}
                </Box>
              </Flex>
            </Box>
          </ScrollView>
        </Box>

        <FadeBottom2 width="100%">
          <Spacer mb={2} />
          <Flex p={2} flexDirection="row">
            <Box style={{ flex: 1 }}>
              <Button
                block
                variant="primaryWhite"
                disabled={isAddingToBag}
                loading={isAddingToBag}
                size="large"
                onPress={onAddToBag}
              >
                Add to bag
              </Button>
            </Box>
            <Spacer mr={1} />
            <Box style={{ flex: 1 }}>
              <Button
                block
                disabled={loadingNext}
                loading={loadingNext}
                onPress={onNext}
                size="large"
                variant="primaryBlack"
              >
                Next
              </Button>
            </Box>
          </Flex>
          <Spacer height={insets.bottom + 8} />
        </FadeBottom2>
      </Container>
    </>
  )
}
