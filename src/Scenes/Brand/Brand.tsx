import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Container, Sans, Box, VariantSizes, Spacer, FixedBackArrow } from "App/Components"
import { GetBrand } from "App/generated/GetBrand"
import { FlatList, Dimensions, TouchableWithoutFeedback } from "react-native"
import { get } from "lodash"
import { imageResize } from "App/helpers/imageResize"
import { FadeInImage } from "App/Components/FadeInImage"
import { color } from "App/Utils"
import { ReadMore } from "App/Components/ReadMore"

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

export const Brand = (props: any) => {
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
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
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

  const products = data?.brand?.products
  const basedIn = data?.brand?.basedIn
  const description = data?.brand?.description

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
                <ReadMore content={description} maxChars={100} />
              </>
            )}
            <Spacer mb={3} />
          </Box>
        )}
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
}
