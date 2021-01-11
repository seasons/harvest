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
    <Box>
      <Spacer mb={2} />
      <Box px={2}>
        <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
          {item?.reservationNumber && <Sans size="4">{`Order #${item.reservationNumber}`}</Sans>}
          {item?.status && <Sans size="4">{item.status}</Sans>}
        </Flex>
        {!!date && (
          <Sans size="4" color="black50">
            {date}
          </Sans>
        )}
      </Box>
      <Spacer mb={3} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="flex-start" px="14px">
        {item.products?.map((physicalProduct) => {
          const variant = physicalProduct?.productVariant
          const variantSizeDisplay = variant?.internalSize?.display
          const product = variant?.product
          const brandName = product?.brand?.name
          const image = product?.images?.[0]
          const imageURL = image?.url || ""
          return (
            <Box key={physicalProduct.id} px="2px">
              <TouchableOpacity
                onPress={() =>
                  product?.id &&
                  navigation.navigate("Product", { id: product.id, slug: product.slug, name: product.name })
                }
              >
                <Box width={imageWidth}>
                  <ImageContainer
                    height={imageWidth * aspectRatio}
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
