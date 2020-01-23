import { GET_PRODUCT } from "App/Apollo/Queries"
import { PopUp, Theme, Box, Flex, Sans } from "App/Components"
import { Loader } from "App/Components/Loader"
import { setVariant, togglePopUp } from "App/Redux/actions"
import get from "lodash/get"
import React from "react"
import { NavigationActions } from "react-navigation"
import { Dimensions, FlatList, SafeAreaView, TouchableOpacity, TextComponent } from "react-native"
import { connect } from "react-redux"
import { animated } from "react-spring/renderprops-native.cjs"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"

import { useQuery } from "@apollo/react-hooks"

import { AboutTheBrand, ImageRail, MoreLikeThis, ProductDetails } from "./Components"
import { BackArrowIcon } from "Assets/icons"
import { color } from "App/Utils"
import { SelectionButtons } from "./Components/SelectionButtons"

const screenHeight = Math.round(Dimensions.get("window").height)

export const ProductComponent = props => {
  const { togglePopUp, popUp, navigation } = props
  const productID = get(props, "navigation.state.params.id")
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productID,
    },
  })

  const product = data && data.product
  const { productState } = props

  if (loading || !data) {
    return <Loader />
  }

  if (error) {
    console.error("error: ", error)
  }

  const TextComponent = () => {
    return (
      <Flex flexDirection="row">
        {product.variants.map(variant => {
          const reservable = !!variant.reservable
          return (
            <Box key={variant.id} mr={0.3} style={{ position: "relative" }}>
              <Sans size="1" color={reservable ? "black" : "lightgray"}>
                {variant.size}
              </Sans>
              {!reservable && <Strikethrough />}
            </Box>
          )
        })}
      </Flex>
    )
  }

  const renderItem = ({ item: section }) => {
    const images = product && product.images
    switch (section) {
      case "imageRail":
        return <ImageRail images={images} showPageDots TextComponent={TextComponent} />
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

  const sections = ["imageRail", "productDetails", "aboutTheBrand"]

  return (
    <Theme>
      <SafeAreaView style={{ flex: 1 }}>
        <ArrowWrapper>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(NavigationActions.back())
            }}
          >
            <BackArrowIcon color={color("black")} />
          </TouchableOpacity>
        </ArrowWrapper>

        {productState.showSizeSelection && <AnimatedOverlay style={props} />}
        <FlatList data={sections} keyExtractor={item => item} renderItem={item => renderItem(item)} />
        <SelectionButtons />

        <PopUp
          title={popUp.title}
          note={popUp.note}
          buttonText={popUp.buttonText}
          show={productState.showPopUp}
          theme="light"
          onClose={() => {
            togglePopUp(false)
          }}
        />
      </SafeAreaView>
    </Theme>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setVariant,
      togglePopUp,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { bag, productState, popUp } = state
  return { bag, productState, popUp }
}

export const Product = connect(mapStateToProps, mapDispatchToProps)(ProductComponent)

const Overlay = styled.View`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`

const ArrowWrapper = styled(Box)`
  position: absolute;
  top: 60;
  left: 20;
  z-index: 1000;
`

const Content = styled.View``

const Strikethrough = styled.View`
  background-color: ${color("lightgray")};
  height: 2;
  width: 100%;
  position: absolute;
  top: 11;
  left: 0;
`

const AnimatedOverlay = animated(Overlay)
