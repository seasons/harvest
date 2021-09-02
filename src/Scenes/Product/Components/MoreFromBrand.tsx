import { Box, Sans } from "App/Components"
import { ProductGridItem } from "@seasons/eclipse"
import React, { useState, useEffect } from "react"
import { FlatList } from "react-native"
import { ProductGridItemSkeleton } from "./ProductGridItemSkeleton"
import { GetProduct_product_brand_products } from "App/generated/GetProduct"

export const MoreFromBrand: React.FC<{
  products: GetProduct_product_brand_products[]
  brandName: string
  flatListRef: React.RefObject<any>
}> = ({ products, brandName, flatListRef }) => {
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
          <Sans color="black" size="5">
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
