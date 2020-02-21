import React from "react"
import { Box, Sans, Spacer } from "App/Components"
import { Image } from "react-native"
import { color } from "App/Utils"
import { ProductsRail } from "../Components/ProductsRail"

interface BrandsRailProps {
  collection: any
  title?: string
  navigation: any
}

export const Collection: React.FC<BrandsRailProps> = ({ collection, title, navigation }) => {
  return (
    <Box mb={3} pl={2} style={{ position: "relative" }}>
      {collection.imageUrl && <Image source={{ uri: collection.imageUrl }} />}
      {title && <Sans size="4">{title}</Sans>}
      {collection.subTitle && (
        <>
          <Spacer mb={2} />
          <Sans color={color("black50")} size="2">
            {collection.subTitle}
          </Sans>
        </>
      )}
      {collection.description && (
        <>
          <Spacer mb={2} />
          <Sans color={color("black50")} size="2">
            {collection.description}
          </Sans>
        </>
      )}
      {collection.products && (
        <>
          <Spacer mb={2} />
          <ProductsRail title={collection.products.title} navigation={navigation} items={collection.products} />
        </>
      )}
    </Box>
  )
}
