import { Box, ProductGridItem, Sans, Spacer } from "App/Components"
import React from "react"
import { FlatList } from "react-native"

export const MoreFromBrand = ({ products }) => {
  return (
    <>
      <Box p={2}>
        <Sans color="black" size="2">
          More like this
        </Sans>
        <Spacer mb={2} />
      </Box>
      <Box ml={2}>
        <FlatList
          data={products}
          renderItem={({ item, index }) => {
            return (
              <Box mr={1}>
                <ProductGridItem product={item} addLeftSpacing={false} showBrandName />
              </Box>
            )
          }}
          keyExtractor={(item) => {
            const itemID = item && item.id
            return itemID
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </Box>
    </>
  )
}
