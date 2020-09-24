import { Box, Flex, Sans, Spacer, FadeInImage } from "App/Components"
import React from "react"
import { Dimensions } from "react-native"
import { DateTime } from "luxon"
import { space, color } from "App/utils"
import styled from "styled-components/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

export const ReservationHistoryItem = ({ item }) => {
  const navigation = useNavigation()
  const date = item?.createdAt && DateTime.fromISO(item?.createdAt).toUTC().toFormat("MM/dd")
  const imageWidth = (Dimensions.get("window").width - space(5)) / 3
  const aspectRatio = 1.25
  return (
    <Box px={2}>
      <Spacer mb={2} />
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
        {item?.reservationNumber && <Sans size="1">{`Order #${item.reservationNumber}`}</Sans>}
        {item?.status && <Sans size="1">{item.status}</Sans>}
      </Flex>
      {!!date && (
        <Sans size="1" color="black50">
          {date}
        </Sans>
      )}
      <Spacer mb={3} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
        {item.products?.map((physicalProduct) => {
          const variant = physicalProduct?.productVariant
          const variantSizeDisplay = variant?.internalSize?.display
          const product = variant?.product
          const brandName = product?.brand?.name
          const image = product?.images?.[0]
          const imageURL = image?.url || ""
          return (
            <TouchableOpacity
              onPress={() =>
                product?.id &&
                navigation.navigate("Product", { id: product.id, slug: product.slug, name: product.name })
              }
              key={physicalProduct.id}
            >
              <Box width={imageWidth}>
                <ImageContainer height={imageWidth * aspectRatio} imageWidth={imageWidth} source={{ uri: imageURL }} />
                <Spacer mb={0.5} />
                {!!brandName && <Sans size="0">{brandName}</Sans>}
                {!!variantSizeDisplay && (
                  <Sans size="0" color="black50">
                    {`Size ${variantSizeDisplay}`}
                  </Sans>
                )}
              </Box>
            </TouchableOpacity>
          )
        })}
      </Flex>
      <Spacer mb={2} />
    </Box>
  )
}

const ImageContainer = styled(FadeInImage)<{ imageWidth: number }>`
  background: ${color("black04")};
  height: ${(props) => props.height};
  width: ${(props) => props.imageWidth};
`
