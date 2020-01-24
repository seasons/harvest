import { GET_PRODUCT } from "App/Apollo/Queries"
import { PopUp, Theme, Box, Flex, Sans, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { setVariant, togglePopUp } from "App/Redux/actions"
import get from "lodash/get"
import React, { useState } from "react"
import { NavigationActions } from "react-navigation"
import { Dimensions, FlatList, SafeAreaView, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import { animated, useSpring } from "react-spring"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"
import { useQuery } from "@apollo/react-hooks"
import { AboutTheBrand, ImageRail, MoreLikeThis, ProductDetails } from "./Components"
import { BackArrowIcon } from "Assets/icons"
import { color } from "App/Utils"
import { SelectionButtons } from "./Components/SelectionButtons"
import { VariantPicker } from "./Components/VariantPicker"
import { Confirmation } from "./Components/Confirmation"

const variantPickerHeight = Dimensions.get("window").height / 2.5

export const ProductComponent = props => {
  const { togglePopUp, popUp, navigation, productState } = props
  const showVariantSelection = productState && productState.showVariantSelection
  const [showConfirmation, setShowConfirmation] = useState({ show: false, type: "" })
  const productID = get(props, "navigation.state.params.id")
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productID,
    },
  })
  const pickerTransition = useSpring({
    translateY: showVariantSelection ? 0 : variantPickerHeight,
  })

  const product = data && data.product

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

  const displayConfirmation = type => {
    console.log("type", type)
    setShowConfirmation({ show: true, type })
    setTimeout(() => {
      setShowConfirmation({ show: false, type })
    }, 2000)
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
  console.log("pickerTransition.translateY", pickerTransition.translateY)
  return (
    <Theme>
      <SafeAreaView style={{ flex: 1 }}>
        <ArrowWrapper>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(NavigationActions.back())
            }}
          >
            <ArrowBackground />
            <BackArrowIcon color={color("black")} />
          </TouchableOpacity>
        </ArrowWrapper>
        {productState.showVariantSelection && <AnimatedOverlay style={props} />}
        <FlatList
          data={sections}
          ListFooterComponent={() => <Spacer mb={58} />}
          keyExtractor={item => item}
          renderItem={item => renderItem(item)}
        />
        <SelectionButtons displayConfirmation={displayConfirmation} productID={productID} />
        <AnimatedVariantPicker style={{ transform: [{ translateY: pickerTransition.translateY }] }}>
          <VariantPicker height={variantPickerHeight} navigation={navigation} productID={productID} />
        </AnimatedVariantPicker>
        {showConfirmation.show && <Confirmation type={showConfirmation.type} />}
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

const VariantPickerWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${variantPickerHeight};
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

const ArrowWrapper = styled(Box)`
  position: absolute;
  top: 60;
  left: 20;
  z-index: 1000;
`

const ArrowBackground = styled(Box)`
  width: 30;
  height: 30;
  position: absolute;
  background-color: ${color("black4")};
  border-radius: 40;
  left: -6;
`

const Strikethrough = styled.View`
  background-color: ${color("lightgray")};
  height: 2;
  width: 100%;
  position: absolute;
  top: 11;
  left: 0;
`

const AnimatedOverlay = animated(Overlay)
const AnimatedVariantPicker = animated(VariantPickerWrapper)
