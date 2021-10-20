import React from "react"
import { FlatList } from "react-native"
import { ProductGridItem } from "@seasons/eclipse"
import { Box } from "./Box"
import { Sans } from "./Typography"
import { useAuthContext } from "../Navigation/AuthContext"
import { SansSize } from "./Theme"

export const ProductCarousel: React.FC<{
  flatListRef: React.RefObject<any>
  products: any
  title?: string
  titleSize?: SansSize
}> = ({ products, flatListRef, title, titleSize }) => {
  const { authState } = useAuthContext()

  return (
    <>
      {products?.length > 0 && (
        <>
          {!!title && (
            <Box px={2}>
              <Sans color="black100" size={titleSize ? titleSize : "5"}>
                {title}
              </Sans>
            </Box>
          )}
          <FlatList
            data={products}
            renderItem={({ item, index }) => {
              return (
                <Box ml={index === 0 ? 2 : 0} mr={index === products?.length - 1 ? 2 : 1}>
                  <ProductGridItem
                    flatListRef={flatListRef}
                    product={item}
                    addLeftSpacing={false}
                    showBrandName
                    authState={authState}
                  />
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
        </>
      )}
    </>
  )
}
