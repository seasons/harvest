import { useMutation } from "@apollo/react-hooks"
import React, { useState } from "react"
import { Dimensions, FlatList, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { GET_PRODUCT } from "App/Apollo/Queries"
import {
  Box,
  Button,
  Container,
  FadeInImage,
  Flex,
  Handle,
  Radio,
  Sans,
  Separator,
  Spacer,
  FixedBackArrow,
} from "App/Components"
import { Loader } from "App/Components/Loader"
import { GetProduct_product } from "App/generated/GetProduct"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { sizeToName } from "./Components/VariantList"
import { SAVE_ITEM } from "./Components/SaveProductButton"
import { useNavigation } from "@react-navigation/native"

const screenWidth = Dimensions.get("window").width

interface SaveProductProps {
  route: any
}

export const SaveProduct: React.FC<SaveProductProps> = screenTrack()(({ route }) => {
  const insets = useSafeArea()
  const tracking = useTracking()
  const [selectedVariantID, setSelectedVariantID] = useState(null)
  const navigation = useNavigation()
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

  if (!product || !showPopUp || !hidePopUp) {
    return (
      <>
        <FixedBackArrow navigation={navigation} />
        <Loader />
      </>
    )
  }

  const images = product.largeImages || product.images

  const {
    brand: { name: brandName },
    description,
    name,
    type,
    variants,
  } = product

  if (!type) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const onSelectSize = (variantID) => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.SizeButtonTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    setSelectedVariantID(variantID)
  }

  const renderItem = (item) => {
    switch (item.type) {
      case "Header":
        return (
          <>
            <Spacer mt={68} />
            <Flex flexDirection="row" justifyContent="space-between">
              <Flex flexDirection="column" justifyContent="flex-end" width={screenWidth - (90 + space(6))}>
                <Sans size="1">{name}</Sans>
                <Sans size="1" color={color("black50")}>
                  {brandName}
                </Sans>
              </Flex>
              <ImageContainer height={112} imageWidth={90} source={{ uri: images?.[0]?.url || "" }} />
            </Flex>
            <Spacer mt={20} />
            <Sans size="1" color={color("black50")}>
              {description}
            </Sans>
            <Spacer mt={3} />
            <Separator />
          </>
        )
      case "Sizes":
        const renderSizeRow = (item) => {
          const {
            id,
            internalSize: { bottom, top },
            isSaved,
          } = item
          let sizeName
          switch (type) {
            case "Top":
              sizeName = sizeToName(top?.letter)
              break
            case "Bottom":
              sizeName = bottom?.value
              break
          }
          return (
            <TouchableWithoutFeedback onPress={() => onSelectSize(id)}>
              <Box>
                <Spacer mt={20} />
                <Flex flexDirection="row" justifyContent="space-between">
                  <Flex flexDirection="row">
                    <Radio selected={id === selectedVariantID} onSelect={() => onSelectSize(id)} />
                    <Sans color={color("black100")} ml={1} size="1" weight="medium">
                      {sizeName}
                    </Sans>
                  </Flex>
                  {isSaved && (
                    <Sans color={color("black50")} size="1" weight="medium">
                      (Saved)
                    </Sans>
                  )}
                </Flex>
                <Spacer mt={20} />
                <Separator color={color("black10")} />
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
      default:
        return null
    }
  }

  const onPressSaveBtn = () => {
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
    navigation.goBack()
  }

  const buttonWidth = (screenWidth - 39) / 2
  const buttonHeight = 48
  const sections = [{ type: "Header" }, { type: "Sizes", variants }]

  return (
    <Container insetsTop={false}>
      <Box px={2}>
        <Handle backgroundColor="black10" style={{ marginTop: space(2) }} />
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
            tracking.trackEvent({
              actionName: Schema.ActionNames.SaveProductModalCancelTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            navigation.goBack()
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
            tracking.trackEvent({
              actionName: Schema.ActionNames.SaveProductModalSaveTapped,
              actionType: Schema.ActionTypes.Tap,
            })
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
  height: ${(props) => props.height};
  width: ${(props) => props.imageWidth};
`
