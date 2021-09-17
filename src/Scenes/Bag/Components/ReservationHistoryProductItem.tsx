import { Box, Sans, Spacer, FadeInImage } from "App/Components"
import React from "react"
import styled from "styled-components/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { space, color } from "App/utils"
import { Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"

const imageWidth = (Dimensions.get("window").width - space(5)) / 3

export const ReservationHistoryProductItem = ({ physicalProduct }) => {
  const navigation = useNavigation()

  const variant = physicalProduct?.productVariant
  const variantSizeDisplay = variant?.displayShort
  const product = variant?.product
  const brandName = product?.brand?.name
  const image = product?.images?.[0]
  const imageURL = image?.url || ""

  return (
    <Box key={product.id} px="2px">
      <TouchableOpacity
        onPress={() =>
          product?.id && navigation.navigate("Product", { id: product.id, slug: product.slug, name: product.name })
        }
      >
        <Box width={imageWidth}>
          <ImageContainer
            height={imageWidth * PRODUCT_ASPECT_RATIO}
            imageWidth={imageWidth}
            source={{ uri: imageURL }}
          />
          <Spacer mb={0.5} />
          {!!brandName && <Sans size="2">{brandName}</Sans>}
          {!!variantSizeDisplay && (
            <Sans size="2" color="black50">
              {`Size ${variantSizeDisplay}`}
            </Sans>
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  )
}

const ImageContainer = styled(FadeInImage)<{ imageWidth: number }>`
  background: ${color("black04")};
  height: ${(props) => props.height};
  width: ${(props) => props.imageWidth};
`
