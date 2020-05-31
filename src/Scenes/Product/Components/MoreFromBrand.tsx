import { Box, ProductGridItem, Sans } from "App/Components"
import { Loader } from "App/Components/Loader"
import React from "react"
import { FlatList } from "react-native"

export const MoreFromBrand = ({ products, brandName }) => {
  if (!products) {
    return <Loader />
  }
  return (
    <>
      <Box pl={2} py={1}>
        <Sans color="black" size="2">
          More from {brandName}
        </Sans>
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
