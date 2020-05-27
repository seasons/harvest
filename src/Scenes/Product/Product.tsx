import { GET_PRODUCT } from "App/Apollo/Queries"
import { Box, Container, FixedBackArrow, Spacer, VariantSizes } from "App/Components"
import { Loader } from "App/Components/Loader"
import { GetProduct, GetProduct_product } from "App/generated/GetProduct"
import { useAuthContext } from "App/Navigation/AuthContext"
import { Schema, screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import { find } from "lodash"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { GET_HOMEPAGE } from "../Home/Home"
import { ImageRail, MoreLikeThis, ProductDetails, VariantWant } from "./Components"
import { SelectionButtons } from "./Components/SelectionButtons"
import { VariantPicker } from "./Components/VariantPicker"
import { space } from "App/utils"

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

interface ProductProps {
  route: any
  navigation: any
}

export const Product = screenTrack({
  entityType: Schema.EntityTypes.Product,
})((props: ProductProps) => {
  const { authState } = useAuthContext()
  const insets = useSafeArea()
  const [showWantedConfirmation, setShowWantedConfirmation] = useState(false)
  const userHasSession = !!authState?.userSession
  const [showVariantPicker, toggleShowVariantPicker] = useState(false)
  const { navigation, route } = props
  const productID = route?.params?.id
  const productSlug = route?.params?.slug
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
    if (userHasSession) {
      addRecentlyViewedItem({
        variables: {
          item: productID,
        },
      })
    }
  }, [])

  const product: GetProduct_product = data && data.product
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || {
      id: "",
      reservable: 0,
      size: "",
      stock: 0,
      isInBag: false,
      isWanted: false,
    }
  )

  const viewWidth = Dimensions.get("window").width
  const images = product && product.images
  const imageWidth = images?.length > 1 ? viewWidth - space(3) : viewWidth

  let selectedVariantIsWanted = false
  if (product?.variants?.length > 0 && selectedVariant.id) {
    const selectedVariantData = find(product.variants, (variant) => variant.id === selectedVariant.id)
    selectedVariantIsWanted = selectedVariantData?.isWanted || false
  }

  const inStock = selectedVariant && selectedVariant.reservable > 0
  const shouldShowVariantWant =
    (!inStock && !!selectedVariant?.id && !selectedVariant.isInBag && !selectedVariant.isWanted) ||
    showWantedConfirmation

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
    switch (section) {
      case "imageRail":
        return (
          <ImageRail
            images={images}
            showPageDots
            imageWidth={imageWidth}
            TextComponent={() => <VariantSizes size="1" variants={product.variants} />}
          />
        )
      case "productDetails":
        return <ProductDetails product={product} selectedVariant={selectedVariant} />
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
    <Container insetsTop={false}>
      <FixedBackArrow navigation={navigation} variant={showVariantPicker ? "blackBackground" : "black04Background"} />
      <FlatList
        ListHeaderComponent={() => <Spacer mb={insets.top} />}
        data={sections}
        ListFooterComponent={() => <Spacer mb={listFooterSpacing} />}
        keyExtractor={(item) => item}
        renderItem={(item) => renderItem(item)}
      />
      <SelectionButtons
        bottom={selectionButtonsBottom}
        toggleShowVariantPicker={toggleShowVariantPicker}
        showVariantPicker={showVariantPicker}
        selectedVariant={selectedVariant}
      />
      <AnimatedVariantWantWrapper style={{ transform: [{ translateY: variantWantTransition.translateY }] }}>
        {shouldShowVariantWant && (
          <VariantWant
            setShowWantedConfirmation={setShowWantedConfirmation}
            productSlug={productSlug}
            isWanted={selectedVariantIsWanted}
            productID={productID}
            variantID={selectedVariant.id}
          />
        )}
      </AnimatedVariantWantWrapper>
      {showVariantPicker && <Overlay />}
      <AnimatedVariantPicker style={{ transform: [{ translateY: pickerTransition.translateY }] }}>
        <VariantPicker
          variantPickerHeight={variantPickerHeight}
          product={product}
          setSelectedVariant={setSelectedVariant}
          selectedVariant={selectedVariant}
          height={variantPickerHeight}
          navigation={navigation}
          toggleShowVariantPicker={toggleShowVariantPicker}
        />
      </AnimatedVariantPicker>
    </Container>
  )
})

const VariantPickerWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${variantPickerHeight};
  z-index: 4;
`

const Overlay = styled.View`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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
