import { GET_PRODUCT } from "App/Apollo/Queries"
import { Box, Button, Container, FadeInImage, Flex, Handle, Radio, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { GetProduct, GetProduct_product, GetProduct_product_variants } from "App/generated/GetProduct"
import { ABBREVIATED_SIZES } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
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

const SAVE_ITEM = gql`
  mutation SaveItem($item: ID!, $save: Boolean!) {
    saveProduct(item: $item, save: $save) {
      id
      productVariant {
        id
        isSaved
      }
    }
  }
`

interface SaveProductProps {
  route: any
  navigation: any
}

export const SaveProduct: React.FC<SaveProductProps> = screenTrack()(({
  route,
  navigation,
}) => {
  const insets = useSafeArea()
  const [selectedVariantID, setSelectedVariantID] = useState(null)
  const product: GetProduct_product = route?.params?.product
  const showPopUp = route?.params?.showPopUp
  const hidePopUp = route?.params?.hidePopUp
  const [saveItem] = useMutation(SAVE_ITEM, {
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          productID: product?.id,
        },
      },
      {
        query: GET_BAG,
      },
    ],
  })
  console.log("PRODUCT EHRE:", product)
  if (!product || !showPopUp || !hidePopUp) {
    return <Loader />
  }
  const {
    brand: { name: brandName },
    description,
    images,
    name,
    type,
    variants,
  } = product

  if (!type || !images || images.length === 0) {
    return <Loader />
  }

  const onSelectSize = (variantID) => {
    setSelectedVariantID(variantID)
  }

  const renderItem = (item) => {
    switch (item.type) {
      case "Header":
        return (
          <>
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
          </>
        )
      case "Sizes":
        const renderSizeRow = (item) => {
          console.log("VAR:", item)
          const { id, internalSize: { bottom, top }, isSaved } = item
          let sizeName
          switch (type) {
            case "Top":
              sizeName = sizeToName(top?.letter)
              break;
            case "Bottom":
              sizeName = bottom?.value
              break;
          }
          return (
            <TouchableWithoutFeedback onPress={() => onSelectSize(id)}>
              <Box>
                <Spacer mt={20} />
                <Flex flexDirection="row" justifyContent="space-between">
                  <Flex flexDirection="row" >
                    <Radio selected={id === selectedVariantID} onSelect={() => onSelectSize(id)} />
                    <Sans color={color("black100")} ml={1} size="1" weight="medium">
                      {sizeName}
                    </Sans>
                  </Flex>
                  {isSaved &&
                    <Sans color={color("black50")} size="1" weight="medium">
                      (Saved)
                    </Sans>
                  }
                </Flex>
                <Spacer mt={20} />
                <Separator color={color("black15")} />
              </Box>
            </TouchableWithoutFeedback>
          )
        }
        return (
          <FlatList
            data={item?.variants || []}
            keyExtractor={(_item, index) => String(index)}
            renderItem={({ item }) => renderSizeRow(item)}
          />
        )
      default: return null
    }
  }

  const onPressSaveBtn = async () => {
    saveItem({
      variables: {
        item: selectedVariantID,
        save: true,
      },
      optimisticResponse: {
        __typename: "Mutation",
        saveProduct: {
          __typename: "Product",
          id: product.id,
          productVariant: {
            __typename: "ProductVariant",
            isSaved: true,
            id: selectedVariantID,
          },
        },
      },
    })
    navigation.pop()
    const popUpData = {
      buttonText: "Got it",
      note: `The ${product.name} has been saved for later in your bag.`,
      title: "Saved for later",
      onClose: () => hidePopUp(),
    }
    showPopUp(popUpData)
  }

  const screenWidth = Dimensions.get("window").width
  const buttonWidth = (screenWidth - 39) / 2
  const buttonHeight = 48
  const sections = [
    { type: "Header" },
    { type: "Sizes", variants }
  ]

  return (
    <Container insetsTop={false}>
      <Box px={2} >
        <Handle color="black15" style={{ marginTop: space(2) }} />
        <FlatList
          data={sections}
          keyExtractor={(_item, index) => String(index)}
          renderItem={({ item }) => renderItem(item)}
          ListFooterComponent={() => <Spacer mb={buttonHeight + space(4)} />}
        />
      </Box>
      <Box style={{ position: "absolute", left: space(2), bottom: space(2) + insets.bottom }}>
        <Button
          variant="primaryWhite"
          width={buttonWidth}
          onPress={() => {
            navigation.pop()
          }}
        >
          Cancel
        </Button>
      </Box>
      <Box style={{ position: "absolute", left: screenWidth / 2 + 3.5, bottom: space(2) + insets.bottom }}>
        <Button
          disabled={selectedVariantID === null}
          variant="primaryBlack"
          width={buttonWidth}
          onPress={() => {
            onPressSaveBtn()
          }}
        >
          Save
        </Button>
      </Box>
    </Container>
  )
})

const ImageContainer = styled(FadeInImage)`
  background: #f6f6f6;
  height: ${props => props.height};
  width: ${props => props.imageWidth};
`