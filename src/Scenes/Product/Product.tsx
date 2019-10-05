import React, { useState, useEffect } from "react"
import gql from "graphql-tag"
import { capitalize } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { Theme, Button, Flex, Sans, Box, Radio, Separator, Spacer } from "App/Components"
import { FlatList, SafeAreaView, Dimensions, TouchableWithoutFeedback, ScrollView } from "react-native"
import { ImageRail, ProductDetails, MoreLikeThis, AboutTheBrand } from "./Components"
import { styled } from "App/Components/platform/primitives"
import { color, space } from "App/Utils"
import { animated, Spring } from "react-spring/renderprops-native.cjs"

const GET_PRODUCT = gql`
  {
    productById(id: 1) {
      name
      id
      description
      retailPrice
      modelSize
      modelHeight
      brandByBrandId {
        name
      }
      images
    }
  }
`

const screenHeight = Math.round(Dimensions.get("window").height)

export const Product = () => {
  const [sizeSelection, setSizeSelection] = useState({ size: "", abbreviated: "X", id: null })
  const [showSizeSelection, toggleShowSizeSelection] = useState(false)

  const { loading, data } = useQuery(GET_PRODUCT)

  const sizes = [
    { size: "small", abbreviated: "s", id: 1, stock: 0 },
    { size: "medium", abbreviated: "m", id: 2, stock: 2 },
    { size: "large", abbreviated: "l", id: 3, stock: 1 },
    { size: "x-large", abbreviated: "xl", id: 4, stock: 3 },
    { size: "xx-large", abbreviated: "xxl", id: 5, stock: 3 },
  ]

  useEffect(() => {
    // Find the first product with stock
    const firstInStock = sizes.find(size => {
      return size.stock > 0
    })
    setSizeSelection(firstInStock)
  }, [])

  const handleReserve = () => {
    // FIXME: Handle reserve product
  }

  if (loading) {
    return null
  }

  const { productById } = data

  const renderItem = ({ item: section }) => {
    switch (section) {
      case "imageRail":
        return <ImageRail images={productById.images} />
      case "productDetails":
        return <ProductDetails product={productById} />
      case "moreLikeThis":
        return <MoreLikeThis products={productById.images} />
      case "aboutTheBrand":
        return <AboutTheBrand product={productById} />
      default:
        return null
    }
  }

  const renderSizes = () => {
    return sizes.map(size => {
      return (
        <Box key={size.id}>
          <Spacer mb={2} />
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
            <Flex flexDirection="row" alignItems="center">
              <Radio
                selected={sizeSelection.id === size.id}
                disabled={size.stock === 0}
                onSelect={() => setSizeSelection(size)}
              />
              <Spacer mr={1} />
              <Sans color={size.stock ? "white" : "gray"} size="2">
                {capitalize(size.size)}
              </Sans>
            </Flex>
            <Sans color="gray" size="2">
              {size.stock ? "(" + size.stock + " left)" : "(Out of stock)"}
            </Sans>
          </Flex>
          <Spacer mb={2} />
          <Separator color={color("gray")} />
        </Box>
      )
    })
  }

  const sections = () => {
    return ["imageRail", "productDetails", "moreLikeThis", "aboutTheBrand"]
  }

  return (
    <Theme>
      <Outer>
        <Spring
          native
          toggle={showSizeSelection}
          from={{ height: screenHeight - 106 }}
          to={{ height: showSizeSelection ? screenHeight - 436 : screenHeight - 106 }}
        >
          {props => (
            <AnimatedContent style={props}>
              <SafeAreaView style={{ flex: 1 }}>
                <FlatList data={sections()} keyExtractor={item => item} renderItem={item => renderItem(item)} />
              </SafeAreaView>
            </AnimatedContent>
          )}
        </Spring>
        <FooterNav>
          <Flex p={2} justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
            <Box style={{ width: 114, backgroundColor: "red" }}></Box>
            <TouchableWithoutFeedback onPress={() => toggleShowSizeSelection(!showSizeSelection)}>
              <SizeSelectionButton p={2}>
                <Flex flexDirection="row">
                  <Sans size="2" color="white">
                    {sizeSelection.abbreviated.toUpperCase()}
                  </Sans>
                </Flex>
              </SizeSelectionButton>
            </TouchableWithoutFeedback>
            <Button variant="primaryLight" size="small" onPress={handleReserve}>
              Reserve
            </Button>
          </Flex>
        </FooterNav>
        <Selection m={2}>
          <ScrollView>
            <Separator color={color("gray")} />
            {renderSizes()}
          </ScrollView>
          <Button onPress={() => toggleShowSizeSelection(!showSizeSelection)}>Cancel</Button>
        </Selection>
      </Outer>
    </Theme>
  )
}

const Outer = styled.View`
  flex: 1;
  background-color: black;
`

const Selection = styled.View`
  padding-left: ${space(2)}px;
  padding-right: ${space(2)}px;
  flex: 1;
  padding-bottom: ${space(2)}px;
`

const FooterNav = styled.View`
  background-color: black;
`

const SizeSelectionButton = styled.View`
  border-radius: 30;
  width: 88;
  border: 1px solid ${color("gray")};
  align-items: center;
  justify-content: center;
  position: relative;
  border-width: 1;
  border-radius: 28;
`

const Content = styled.View`
  background-color: white;
  border-bottom-left-radius: 30;
  border-bottom-right-radius: 30;
  overflow: hidden;
  margin-bottom: 10;
`

const AnimatedContent = animated(Content)
