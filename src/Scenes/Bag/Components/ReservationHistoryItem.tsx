import { Box, Flex, Sans, Spacer, FadeInImage } from "App/Components"
import React from "react"
import { Dimensions } from "react-native"
import { DateTime } from "luxon"
import { space, color } from "App/utils"
import styled from "styled-components/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { gql } from "@apollo/client"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"

export const ReservationHistoryItemFragment_Reservation = gql`
  fragment ReservationHistoryItemFragment_Reservation on Reservation {
    id
    status
    reservationNumber
    createdAt
    products {
      id
      productVariant {
        id
        displayShort
        product {
          id
          slug
          name
          images(size: Thumb) {
            id
            url
          }
          brand {
            id
            name
          }
        }
      }
    }
  }
`

export const ReservationHistoryItem = ({ item }) => {
  const navigation = useNavigation()
  const date = item?.createdAt && DateTime.fromISO(item?.createdAt).toUTC().toFormat("MM/dd")
  const imageWidth = (Dimensions.get("window").width - space(5)) / 3

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
        {item?.products?.map((physicalProduct) => {
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
                  product?.id &&
                  navigation.navigate("Product", { id: product.id, slug: product.slug, name: product.name })
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
