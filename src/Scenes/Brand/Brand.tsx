import { useQuery } from "@apollo/react-hooks"
import { Box, Container, FixedBackArrow, ProductGridItem, Sans, Spacer } from "App/Components"
import { ReadMore } from "App/Components/ReadMore"
import { GetBrand } from "App/generated/GetBrand"
import { color, space } from "App/utils"
import { Schema, screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import React, { useState } from "react"
import { FlatList } from "react-native"

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
        images {
          id
          url
        }
        modelHeight
        externalURL
        retailPrice
        status
        createdAt
        updatedAt
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
  }
`

export const Brand = screenTrack({
  entityType: Schema.EntityTypes.Brand,
})((props: any) => {
  const [readMoreExpanded, setReadMoreExpanded] = useState(false)
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
  const numColumns = 2

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
        numColumns={numColumns}
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
        renderItem={({ item }, i) => <ProductGridItem product={item} addLeftSpacing={i % numColumns !== 0} />}
      />
    </Container>
  )
})
