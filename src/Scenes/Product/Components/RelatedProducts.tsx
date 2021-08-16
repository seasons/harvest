import { Box, Sans } from "App/Components"
import React, { useState, useEffect } from "react"
import { FlatList } from "react-native"
import { color } from "styled-system"
import { ProductGridItem } from '@seasons/eclipse'
import { ProductGridItemSkeleton } from "./ProductGridItemSkeleton"

export const RelatedProducts: React.FC<{
  flatListRef: React.RefObject<any>
}> = ({ products, flatListRef }) => {
  const [items, setItems] = useState(new Array(2).fill({ id: "" }))

  useEffect(() => {
    if (products) {
      setItems(products.slice(0, 15))
    }
  }, [products])

  return (
    <>
      <Box pl={2} py={1}>
        <Sans color={color("black100")} size="5">
          Related Products
        </Sans>
      </Box>
      <Box ml={2}>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return (
              <Box mr={1}>
                {item.id ? (
                  <ProductGridItem flatListRef={flatListRef} product={item} addLeftSpacing={false} showBrandName />
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
