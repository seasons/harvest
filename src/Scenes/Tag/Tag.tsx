import { Box, Container, FixedBackArrow, Sans, Spacer, ProductGridItem } from "App/Components"
import { ReadMore } from "App/Components/ReadMore"
import { space } from "App/utils"
import { Schema, screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import React, { useState } from "react"
import { FlatList } from "react-native"

import { useQuery } from "@apollo/react-hooks"

const GET_TAG = gql`
  query GetProductsByTag($tag: String!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    products(
      where: { AND: [{ tags_some: { name: $tag } }, { status: Available }] }
      first: $first
      skip: $skip
      orderBy: $orderBy
    ) {
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
                  products: [...prev.products, ...fetchMoreResult.products],
                })
              },
            })
          }
        }}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }, i) => <ProductGridItem product={item} index={i} />}
      />
    </Container>
  )
})
