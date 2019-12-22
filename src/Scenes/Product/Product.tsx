import { GET_PRODUCT } from "App/Apollo/Queries"
import { PopUp, Theme } from "App/Components"
import { Loader } from "App/Components/Loader"
import { setVariant, togglePopUp } from "App/Redux/actions"
import get from "lodash/get"
import React from "react"
import { Dimensions, FlatList, SafeAreaView } from "react-native"
import { connect } from "react-redux"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"

import { useQuery } from "@apollo/react-hooks"

import { AboutTheBrand, ImageRail, MoreLikeThis, ProductDetails } from "./Components"

const screenHeight = Math.round(Dimensions.get("window").height)

export const ProductComponent = props => {
  const { togglePopUp, popUp } = props
  const productID = get(props, "navigation.state.params.id")
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productID,
    },
  })

  const product = data && data.product
  const { productState } = props
  const { variant } = productState

  if (loading || !data) {
    return <Loader />
  }

  if (error) {
    console.error("error: ", error)
  }

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

  const sections = ["imageRail", "productDetails", "aboutTheBrand"]

  return (
    <Theme>
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
                <FlatList data={sections} keyExtractor={item => item} renderItem={item => renderItem(item)} />
              </SafeAreaView>
            </AnimatedContent>
          )}
        </Spring>

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
      </Outer>
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

const Outer = styled.View`
  flex: 1;
  background-color: white;
`

const Overlay = styled.View`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`

const Content = styled.View``

const AnimatedContent = animated(Content)
const AnimatedOverlay = animated(Overlay)
