import React, { useEffect } from "react"
import gql from "graphql-tag"
import get from "lodash/get"
import { capitalize } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { Theme, Button, Flex, Sans, Box, Radio, Separator, Spacer } from "App/Components"
import { FlatList, SafeAreaView, Dimensions, ScrollView } from "react-native"
import { ImageRail, ProductDetails, MoreLikeThis, AboutTheBrand } from "./Components"
import { color, space } from "App/Utils"
import styled from "styled-components/native"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import { GreenCheck } from "Assets/svgs"
import { BAG_NUM_ITEMS } from "App/Reducer"
import { useStateContext } from "App/helpers/StateProvider"

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
  const [{ bag, productState }, dispatch]: any = useStateContext()
  const productID = get(props, "navigation.state.params.id")
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: productID,
    },
  })

  const sizes = [
    { size: "small", abbreviated: "s", id: 1, stock: 0 },
    { size: "medium", abbreviated: "m", id: 2, stock: 2 },
    { size: "large", abbreviated: "l", id: 3, stock: 1 },
    { size: "x-large", abbreviated: "xl", id: 4, stock: 3 },
    { size: "xx-large", abbreviated: "xxl", id: 5, stock: 3 },
  ]

  const displayReserveConfirmation = () => {
    dispatch({
      type: "toggleReserveConfirmation",
      showReserveConfirmation: true,
    })
    setTimeout(() => {
      dispatch({
        type: "toggleReserveConfirmation",
        showReserveConfirmation: false,
      })
    }, 2000)
  }

  useEffect(() => {
    // Find the first product with stock
    const firstInStock = sizes.find(size => {
      return size.stock > 0
    })
    dispatch({
      type: "productMounted",
      productMountedState: {
        displayFooter: true,
        sizeSelection: firstInStock,
      },
    })
    return dispatch({
      type: "toggleProductFooter",
      displayFooter: false,
    })
  }, [])

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

  const ReserveConfirmation = () => {
    const remainingPieces = BAG_NUM_ITEMS - bag.itemCount
    return (
      <ReserveConfirmationWrapper alignContent="center" justifyContent="center" flexDirection="column">
        <Flex flexDirection="row" alignContent="center" justifyContent="center">
          <Flex alignContent="center" justifyContent="center" flexDirection="column">
            <Flex flexDirection="row" alignContent="center" justifyContent="center">
              <GreenCheck />
            </Flex>
            <Spacer mb={2} />
            <Sans size="2" color="white" textAlign="center">
              Added to bag
            </Sans>
            <Spacer mb={1} />
            <Sans size="2" color="gray" textAlign="center">
              ({remainingPieces} slots remaining)
            </Sans>
          </Flex>
        </Flex>
      </ReserveConfirmationWrapper>
    )
  }

  const renderSizes = () => {
    return sizes.map(size => {
      return (
        <Box key={size.id}>
          <Spacer mb={2} />
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
            <Flex flexDirection="row" alignItems="center">
              <Radio
                selected={productState.sizeSelection.id === size.id}
                disabled={size.stock === 0}
                onSelect={() =>
                  dispatch({
                    type: "setSizeSelection",
                    sizeSelection: size,
                  })
                }
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
      <>
        {productState.showReserveConfirmation && <ReserveConfirmation />}
        <Outer>
          <Spring
            native
            toggle={productState.showSizeSelection}
            from={{ height: screenHeight - 106 }}
            to={{ height: productState.showSizeSelection ? screenHeight - 436 : screenHeight - 106 }}
          >
            {props => (
              <AnimatedContent style={props}>
                {productState.showSizeSelection && <AnimatedOverlay style={props} />}
                <SafeAreaView style={{ flex: 1 }}>
                  <FlatList data={sections()} keyExtractor={item => item} renderItem={item => renderItem(item)} />
                </SafeAreaView>
              </AnimatedContent>
            )}
          </Spring>
          <Selection m={2}>
            <ScrollView>
              <Separator color={color("gray")} />
              {renderSizes()}
            </ScrollView>
            <Button
              onPress={() =>
                dispatch({
                  type: "toggleShowSizeSelection",
                  showSizeSelection: !productState.showSizeSelection,
                })
              }
            >
              Cancel
            </Button>
          </Selection>
        </Outer>
      </>
    </Theme>
  )
}

const Outer = styled.View`
  flex: 1;
  background-color: white;
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

const Content = styled.View`
  margin-bottom: 10;
`

const ReserveConfirmationWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
`

const AnimatedContent = animated(Content)
const AnimatedOverlay = animated(Overlay)
