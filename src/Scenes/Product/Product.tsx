import { GET_PRODUCT } from "App/Apollo/Queries"
import { Theme, Box, Spacer, VariantSizes, PopUp } from "App/Components"
import { Loader } from "App/Components/Loader"
import get from "lodash/get"
import React, { useState, useEffect } from "react"
import { NavigationActions, NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { Dimensions, FlatList, SafeAreaView, TouchableOpacity } from "react-native"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { useQuery } from "@apollo/react-hooks"
import { ImageRail, MoreLikeThis, ProductDetails } from "./Components"
import { BackArrowIcon } from "Assets/icons"
import { color } from "App/Utils"
import { SelectionButtons } from "./Components/SelectionButtons"
import { VariantPicker } from "./Components/VariantPicker"
import { useTracking } from "react-tracking"
import { GetProduct, GetProduct_product } from "App/generated/GetProduct"
import { screenTrack } from "App/Utils/track"

const variantPickerHeight = Dimensions.get("window").height / 2.5 + 50

interface ProductProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export const Product = screenTrack(props => {
  const productID = get(props, "navigation.state.params.id")
  return {
    contextScreen: "Product",
    productID,
  }
})((props: ProductProps) => {
  const [popUp, setPopUp] = useState({ show: false, data: { title: "", note: "", buttonText: "" } })
  const [showVariantPicker, toggleShowVariantPicker] = useState(false)
  const { navigation } = props
  const productID = get(navigation, "state.params.id")
  const { data, loading, error } = useQuery<GetProduct>(GET_PRODUCT, {
    variables: {
      productID,
    },
  })
  const pickerTransition = useSpring({
    translateY: showVariantPicker ? 0 : variantPickerHeight,
  })

  const product: GetProduct_product = data && data.product
  const [selectedVariant, setSelectedVariant] = useState(
    (product && product.variants && product.variants.length && product.variants[0]) || {
      id: "",
      abbreviated: "",
      size: "",
      stock: 0,
    }
  )

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
        return (
          <ImageRail
            images={images}
            showPageDots
            TextComponent={() => <VariantSizes size="1" variants={product.variants} />}
          />
        )
      case "productDetails":
        return <ProductDetails product={product} setPopUp={setPopUp} selectedVariant={selectedVariant} />
      case "moreLikeThis":
        return <MoreLikeThis products={images} />
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
            <ArrowBackground showVariantPicker={showVariantPicker} />
            <BackArrowIcon color={showVariantPicker ? color("white100") : color("black100")} />
          </TouchableOpacity>
        </ArrowWrapper>
        <FlatList
          data={sections}
          ListFooterComponent={() => <Spacer mb={58} />}
          keyExtractor={item => item}
          renderItem={item => renderItem(item)}
        />
        <SelectionButtons
          productID={productID}
          toggleShowVariantPicker={toggleShowVariantPicker}
          setPopUp={setPopUp}
          showVariantPicker={showVariantPicker}
          selectedVariant={selectedVariant}
        />
        {showVariantPicker && <Overlay />}
        <AnimatedVariantPicker style={{ transform: [{ translateY: pickerTransition.translateY }] }}>
          <VariantPicker
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
            height={variantPickerHeight}
            navigation={navigation}
            productID={productID}
            toggleShowVariantPicker={toggleShowVariantPicker}
          />
        </AnimatedVariantPicker>
        <PopUp
          title={popUp.data && popUp.data.title}
          note={popUp.data && popUp.data.note}
          buttonText={popUp.data && popUp.data.buttonText}
          show={popUp.show}
          theme="light"
          onClose={() => {
            setPopUp({ show: false, data: { title: "", note: "", buttonText: "" } })
          }}
        />
      </SafeAreaView>
    </Theme>
  )
})

const VariantPickerWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${variantPickerHeight};
`

const Overlay = styled.View`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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
  background-color: ${p => (p.showVariantPicker ? color("black100") : color("black04"))};
  border-radius: 40;
  left: -6;
  top: -1;
`

const AnimatedVariantPicker = animated(VariantPickerWrapper)
