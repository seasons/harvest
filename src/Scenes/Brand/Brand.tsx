import { Box, Container, FixedBackArrow, Sans, Spacer, VariantSizes } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { ReadMore } from "App/Components/ReadMore"
import { GetBrand } from "App/generated/GetBrand"
import { imageResize } from "App/helpers/imageResize"
import { color, space } from "App/utils"
import { screenTrack, Schema, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get } from "lodash"
import React, { useState } from "react"
import { Dimensions, FlatList, TouchableWithoutFeedback } from "react-native"

import { useQuery } from "@apollo/react-hooks"

const IMAGE_HEIGHT = 240

const GET_BRAND = gql`
  query GetBrandAndProducts($brandID: ID!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    brand(where: { id: $brandID }) {
      id
      name
      basedIn
      description
      products(first: $first, skip: $skip, orderBy: $orderBy, where: { status: Available }) {
        id
        slug
        name
        description
        images
        modelSize
        modelHeight
        externalURL
        tags
        retailPrice
        status
        createdAt
        updatedAt
        variants {
          id
          size
          total
          reservable
          nonReservable
          reserved
          isSaved
        }
      }
    }
  }
`

export const Brand = screenTrack({
  entityType: Schema.EntityTypes.Brand,
})((props: any) => {
  const [readMoreExpanded, setReadMoreExpanded] = useState(false)
  const tracking = useTracking()
  const { navigation, route } = props
  const brandID = route?.params?.id

  const { data, loading, fetchMore } = useQuery<GetBrand>(GET_BRAND, {
    variables: {
      brandID,
      first: 10,
      skip: 0,
      orderBy: "createdAt_DESC",
    },
  })

  const products = data?.brand?.products
  const basedIn = data?.brand?.basedIn
  const description = data?.brand?.description

  const renderItem = ({ item }, i, navigation) => {
    const itemWidth = Dimensions.get("window").width / 2 - 2
    const product = item

    const image = get(product, "images[0]", { url: "" })
    const resizedImage = imageResize(image.url, "large")
    const isLeft = i % 2 === 0

    if (!product) {
      return null
    }

    const productName = product?.name

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ProductTapped,
            actionType: Schema.ActionTypes.Tap,
            productSlug: product.slug,
            productId: product.id,
          })
          navigation.navigate("Product", { id: product.id, slug: product.slug })
        }}
      >
        <Box mr={isLeft ? 0.0 : "4px"} mb={0.5} width={itemWidth}>
          <FadeInImage source={{ uri: resizedImage }} style={{ width: "100%", height: IMAGE_HEIGHT }} />
          <Box my={0.5} mx={1}>
            {productName && <Sans size="0">{productName}</Sans>}
            <VariantSizes size="0" variants={product.variants} />
          </Box>
          <Spacer mb={0.5} />
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <FlatList
        ListHeaderComponent={() => (
          <Box px={2}>
            <Spacer mb={80} />
            <Sans size="3" style={{ textDecorationLine: "underline" }}>
              {data?.brand?.name}
            </Sans>
            {basedIn && (
              <Sans size="2" color={color("black50")}>
                {basedIn}
              </Sans>
            )}
            {description && (
              <>
                <Spacer mb={3} />
                <Sans size="2">About</Sans>
                <Spacer mb={0.5} />
                <ReadMore
                  readMoreExpanded={readMoreExpanded}
                  setReadMoreExpanded={setReadMoreExpanded}
                  content={description}
                  maxChars={100}
                />
              </>
            )}
            <Spacer mb={3} />
          </Box>
        )}
        ListFooterComponent={() => <Spacer mb={space(2)} />}
        data={products}
        numColumns={2}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (!loading) {
            fetchMore({
              variables: {
                skip: products.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!prev) {
                  return []
                }

                if (!fetchMoreResult) {
                  return prev
                }

                return Object.assign({}, prev, {
                  brand: {
                    ...prev.brand,
                    products: [...prev.brand.products, ...fetchMoreResult.brand.products],
                  },
                })
              },
            })
          }
        }}
        keyExtractor={(item, index) => item.id + index}
        renderItem={(item, i) => renderItem(item, i, navigation)}
      />
    </Container>
  )
})
