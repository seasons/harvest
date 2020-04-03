import { GET_PRODUCT } from "App/Apollo/Queries"
import { Box, Container, FadeInImage, Flex, Handle, Radio, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { GetProduct, GetProduct_product, GetProduct_product_variants } from "App/generated/GetProduct"
import { ABBREVIATED_SIZES } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { color, space } from "App/utils"
import { Schema, screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import { find, get } from "lodash"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { GET_HOMEPAGE } from "../Home/Home"
import { ImageRail, MoreLikeThis, ProductDetails, VariantWant } from "./Components"
import { SelectionButtons } from "./Components/SelectionButtons"
import { VariantPicker } from "./Components/VariantPicker"
import { sizeToName } from "./Components/VariantList"

const variantPickerHeight = Dimensions.get("window").height / 2.5 + 50
const VARIANT_WANT_HEIGHT = 52


interface SaveProductProps {
  route: any
  navigation: any
}

export const SaveProduct: React.FC<SaveProductProps> = screenTrack()(({
  route,
  navigation,
}) => {
  const [selectedVariantID, setSelectedVariantID] = useState(null)
  const product: GetProduct_product = route?.params?.product
  console.log("PRODUCT EHRE:", product)
  if (!product) {
    return <Loader />
  }
  const {
    brand: { name: brandName },
    description,
    images,
    name,
    variants,
  } = product

  if (!images || images.length === 0) {
    return <Loader />
  }

  const onSelectSize = (variantID) => {
    setSelectedVariantID(variantID)
  }

  const renderItem = (item: GetProduct_product_variants) => {
    console.log("VAR:", item)
    const { id, internalSize: { display } } = item
    console.log("DIS", sizeToName("HELLO"))
    return (
      <TouchableWithoutFeedback onPress={() => onSelectSize(id)}>
        <Box px={2}>
          <Spacer mt={20} />
          <Flex flexDirection="row">
            <Radio selected={id === selectedVariantID} onSelect={() => onSelectSize(id)} />
            <Sans color={color("black100")} ml={2} size="1" weight="medium">
              {sizeToName(display) || display}
            </Sans>
          </Flex>
          <Spacer mt={20} />
          <Separator color={color("black15")} />
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  const buttonHeight = 48

  return (
    <Container insetsTop={false}>
      <Box px={2} >
        <Handle color="black15" style={{ marginTop: space(2) }} />
        {/* <Flex flexDirection="column"> */}
        <ScrollView style={{ flex: 1, flexDirection: "column" }}>
          <Spacer mt={68} />
          <Flex flexDirection="row" justifyContent="space-between" >
            <Flex flexDirection="column" justifyContent="flex-end">
              <Sans size="1">{name}</Sans>
              <Sans size="1" color={color("black50")}>{brandName}</Sans>
            </Flex>
            <ImageContainer height={112} imageWidth={90} source={{ uri: images[0].url }} />
          </Flex>
          <Spacer mt={20} />
          <Sans size="1" color={color("black50")}>{description}</Sans>
          <Spacer mt={3} />
          <Separator />
          <FlatList
            data={variants}
            keyExtractor={(_item, index) => String(index)}
            renderItem={({ item }) => renderItem(item)}
            ListFooterComponent={() => <Spacer mb={buttonHeight + space(4)} />}
          />
        </ScrollView>
        {/* </Flex> */}
      </Box>
    </Container>
  )
})

const ImageContainer = styled(FadeInImage)`
  background: #f6f6f6;
  height: ${props => props.height};
  width: ${props => props.imageWidth};
`