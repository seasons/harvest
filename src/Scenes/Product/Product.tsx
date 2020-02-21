import { GET_PRODUCT } from "App/Apollo/Queries"
import { Box, Spacer, VariantSizes, PopUp, Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import get from "lodash/get"
import React, { useState, useEffect } from "react"
import { NavigationActions, NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { Dimensions, FlatList, TouchableOpacity } from "react-native"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { ImageRail, MoreLikeThis, ProductDetails, VariantWant } from "./Components"
import { BackArrowIcon } from "Assets/icons"
import { color } from "App/Utils"
import { SelectionButtons } from "./Components/SelectionButtons"
import { VariantPicker } from "./Components/VariantPicker"
import { GetProduct, GetProduct_product } from "App/generated/GetProduct"
import { screenTrack } from "App/Utils/track"
import { PopUpProps } from "App/Components/PopUp"
import { GET_HOMEPAGE } from "../Home/Home"
import { useSafeArea } from "react-native-safe-area-context"

const variantPickerHeight = Dimensions.get("window").height / 2.5 + 50
const VARIANT_WANT_HEIGHT = 52

const ADD_VIEWED_PRODUCT = gql`
  mutation AddViewedProduct($item: ID!) {
    addViewedProduct(item: $item) {
      id
      viewCount
    }
  }
`
const GET_PRODUCT_VARIANT = gql`
  query GetProductVariant($variantID: ID!) {
    productVariant(where: { id: $variantID }) {
      id
      isWanted
    }
  }
`

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
  const [popUp, setPopUp] = useState({ show: false, data: null } as PopUpProps)
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
  const [addRecentlyViewedItem] = useMutation(ADD_VIEWED_PRODUCT, {
    refetchQueries: [
      {
        query: GET_HOMEPAGE,
      },
    ],
  })

  useEffect(() => {
    addRecentlyViewedItem({
      variables: {
        item: productID,
      },
    })
  }, [])

  const product: GetProduct_product = data && data.product
  const [selectedVariant, setSelectedVariant] = useState(
    (product && product.variants && product.variants.length && product.variants[0]) || {
      id: "",
      reservable: 0,
      size: "",
      stock: 0,
    }
  )

  const {
    data: productVariantData,
    loading: productVariantLoading,
    error: productVariantError
  } = useQuery(GET_PRODUCT_VARIANT, {
    variables: {
      variantID: selectedVariant.id
    }
  })

  const inStock = selectedVariant && selectedVariant.reservable > 0
  const productVariantExists = !productVariantLoading && !productVariantError && productVariantData
  const shouldShowVariantWant = productVariantExists && !inStock

  const variantWantTransition = useSpring({
    translateY: shouldShowVariantWant ? 0 : VARIANT_WANT_HEIGHT,
  })

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

  const selectionButtonsBottom = shouldShowVariantWant ? VARIANT_WANT_HEIGHT : 0
  const listFooterSpacing = selectionButtonsBottom + 58
  const sections = ["imageRail", "productDetails", "aboutTheBrand"]

  return (
    <Container>
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
        ListFooterComponent={() => <Spacer mb={listFooterSpacing} />}
        keyExtractor={item => item}
        renderItem={item => renderItem(item)}
      />
      <SelectionButtons
        bottom={selectionButtonsBottom}
        productID={productID}
        toggleShowVariantPicker={toggleShowVariantPicker}
        setPopUp={setPopUp}
        showVariantPicker={showVariantPicker}
        selectedVariant={selectedVariant}
        navigation={navigation}
      />
      <AnimatedVariantWantWrapper style={{ transform: [{ translateY: variantWantTransition.translateY }] }}>
        {shouldShowVariantWant &&
          <VariantWant
            isWanted={productVariantData?.productVariant?.isWanted}
            variantID={selectedVariant.id}
          />
        }
      </AnimatedVariantWantWrapper>
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
      <PopUp data={popUp.data} show={popUp.show} />
    </Container>
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
  bottom: ${VARIANT_WANT_HEIGHT};
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

const VariantWantWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${VARIANT_WANT_HEIGHT};
`

const AnimatedVariantWantWrapper = animated(VariantWantWrapper)

const AnimatedVariantPicker = animated(VariantPickerWrapper)
