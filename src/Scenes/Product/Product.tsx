import React, { useState, useEffect } from "react"
import gql from "graphql-tag"
import { capitalize } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { Theme, Button, Flex, Sans, Box, Radio, Separator, Spacer } from "App/Components"
import { FlatList, SafeAreaView, Dimensions, TouchableWithoutFeedback, ScrollView } from "react-native"
import { ImageRail, ProductDetails, MoreLikeThis, AboutTheBrand, ReserveButton } from "./Components"
import { color, space } from "App/Utils"
import styled from "styled-components/native"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import { BackArrowIcon, DownChevronIcon, SaveIcon } from "Assets/icons"

const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(where: { id: $productId }) {
      name
      id
      description
      retailPrice
      modelSize
      modelHeight
      brand {
        name
      }
      images
    }
  }
`

const screenHeight = Math.round(Dimensions.get("window").height)

export const Product = props => {
  const [sizeSelection, setSizeSelection] = useState({ size: "", abbreviated: "X", id: null })
  const [showSizeSelection, toggleShowSizeSelection] = useState(false)
  const productID =
    props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.id
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: productID,
    },
  })

  console.log("props", props)

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

  const handleSaveButton = () => {
    // FIXME: Handle handleSaveButton
  }

  if (loading || !data) {
    return null
  }
  if (error) {
    console.error("error: ", error)
  }

  const product = data && data.product

  const renderItem = ({ item: section }) => {
    const images = product && product.images
    switch (section) {
      case "imageRail":
        return <ImageRail images={images} />
      case "productDetails":
        return <ProductDetails product={product} />
      case "moreLikeThis":
        return <MoreLikeThis products={images} />
      case "aboutTheBrand":
        return <AboutTheBrand product={product} />
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
              {showSizeSelection && <AnimatedOverlay style={props} />}
              <SafeAreaView style={{ flex: 1 }}>
                <FlatList data={sections()} keyExtractor={item => item} renderItem={item => renderItem(item)} />
              </SafeAreaView>
            </AnimatedContent>
          )}
        </Spring>
        <FooterNav>
          <Flex p={2} justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
            <Flex alignItems="center" flexWrap="nowrap" flexDirection="row" style={{ width: 114 }}>
              <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                <BackArrowIcon />
              </TouchableWithoutFeedback>
              <Spacer mr={4} />
              <TouchableWithoutFeedback onPress={() => handleSaveButton()}>
                <SaveIcon />
              </TouchableWithoutFeedback>
            </Flex>
            <TouchableWithoutFeedback onPress={() => toggleShowSizeSelection(!showSizeSelection)}>
              <SizeSelectionButton p={2}>
                <StyledSans size="2" color="white">
                  {sizeSelection.abbreviated.toUpperCase()}
                </StyledSans>
                <Spacer mr={3} />
                <StyledDownChevronIcon rotate={showSizeSelection} />
              </SizeSelectionButton>
            </TouchableWithoutFeedback>
            <ReserveButton product={product}></ReserveButton>
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

const StyledDownChevronIcon = styled(DownChevronIcon)`
  position: absolute;
  right: 15;
  top: 15;
`

const StyledSans = styled(Sans)`
  position: absolute;
  left: 15;
  top: 8;
`

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

const Overlay = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  flex: 1;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`

const FooterNav = styled.View`
  background-color: black;
`

const SizeSelectionButton = styled.View`
  border-radius: 30;
  width: 88;
  border: 1px solid ${color("gray")};
  border-width: 1;
  border-radius: 28;
  position: relative;
`

const Content = styled.View`
  background-color: white;
  border-bottom-left-radius: 30;
  border-bottom-right-radius: 30;
  overflow: hidden;
  margin-bottom: 10;
`

const AnimatedContent = animated(Content)
const AnimatedOverlay = animated(Overlay)
