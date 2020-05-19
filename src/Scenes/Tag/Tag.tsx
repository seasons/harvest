import { Box, Container, FixedBackArrow, Sans, Spacer, VariantSizes } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { ReadMore } from "App/Components/ReadMore"
import { imageResize } from "App/helpers/imageResize"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get } from "lodash"
import React, { useState } from "react"
import { Dimensions, FlatList, TouchableWithoutFeedback } from "react-native"

import { useQuery } from "@apollo/react-hooks"

const IMAGE_HEIGHT = 240

const GET_TAG = gql`
  query GetProductsByTag($tag: String!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    products(where: { tags_some: { name: $tag } }, first: $first, skip: $skip, orderBy: $orderBy) {
      id
      slug
      name
      images {
        id
        url
      }
      variants {
        id
        internalSize {
          top {
            letter
          }
          bottom {
            type
            value
          }
          productType
          display
        }
        total
        reservable
        nonReservable
        reserved
        isSaved
      }
    }
  }
`

export const Tag = screenTrack({
  entityType: Schema.EntityTypes.Tag,
})((props: any) => {
  const [readMoreExpanded, setReadMoreExpanded] = useState(false)
  const tracking = useTracking()
  const { navigation, route } = props
  const { tag, title, description } = route?.params?.tagData

  const { data, loading, fetchMore } = useQuery(GET_TAG, {
    variables: {
      tag,
      first: 10,
      skip: 0,
      orderBy: "createdAt_DESC",
    },
  })

  const products = data?.products

  console.log("data", data)

  const renderItem = ({ item }, i) => {
    const itemWidth = Dimensions.get("window").width / 2 - 2
    const product = item

    const image = get(product, "images[0]", { url: "" })
    const resizedImage = imageResize(image.url, "thumb")
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
              {title}
            </Sans>
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
                    ...prev.products,
                    products: [...prev.products, ...fetchMoreResult.products],
                  },
                })
              },
            })
          }
        }}
        keyExtractor={(item, index) => item.id + index}
        renderItem={(item, i) => renderItem(item, i)}
      />
    </Container>
  )
})
