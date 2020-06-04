import { Box, ProductGridItem, Sans } from "App/Components"
import React, { useState, useEffect } from "react"
import { FlatList } from "react-native"
import { ProductGridItemSkeleton } from "./ProductGridItemSkeleton"

export const MoreFromBrand = ({ products, brandName }) => {
  const [items, setItems] = useState(new Array(2).fill({ id: "" }))

  useEffect(() => {
    if (products) {
      setItems(products)
    }
  }, [products])

  return (
    <>
      {brandName && (
        <Box pl={2} py={1}>
          <Sans color="black" size="2">
            More from {brandName}
          </Sans>
        </Box>
      )}
      <Box ml={2}>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return (
              <Box mr={1}>
                {item.id ? (
                  <ProductGridItem product={item} addLeftSpacing={false} showBrandName />
                ) : (
                  <ProductGridItemSkeleton />
                )}
              </Box>
            )
          }}
          keyExtractor={(item, index) => {
            const itemID = (item && item.id) || ""
            return itemID + index
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </Box>
    </>
  )
}
