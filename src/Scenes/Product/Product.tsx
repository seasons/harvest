import { useMutation, useQuery } from "@apollo/react-hooks"
import { Box, Container, FixedBackArrow, Spacer, VariantSizes } from "App/Components"
import { Loader } from "App/Components/Loader"
import { GetProduct, GetProduct_products } from "App/generated/GetProduct"
import { useAuthContext } from "App/Navigation/AuthContext"
import { space } from "App/utils"
import { Schema, screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import { head, find } from "lodash"
import React, { useEffect, useState, useRef } from "react"
import { Dimensions, FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { GET_HOMEPAGE } from "../Home/Home"
import { ImageRail, MoreFromBrand, ProductDetails, ProductMeasurements, VariantWant } from "./Components"
import { SelectionButtons } from "./Components/SelectionButtons"
import { VariantPicker } from "./Components/VariantPicker"
import { GET_PRODUCT } from "./Queries"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

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

export const Product = screenTrack({
  entityType: Schema.EntityTypes.Product,
})(({ route, navigation }) => {
  const { authState } = useAuthContext()
  const insets = useSafeArea()
  const flatListRef = useRef(null)
  const [showWantedConfirmation, setShowWantedConfirmation] = useState(false)
  const userHasSession = !!authState?.userSession
  const [showVariantPicker, toggleShowVariantPicker] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  // If the slug is present, ignore the id. This would happen if a product is passed through a deep link.
  const slug: string = route?.params?.slug || undefined
  const id: string = slug ? undefined : route?.params?.id
  const { data, error } = useQuery<GetProduct>(GET_PRODUCT, {
    variables: {
      where: {
        id,
        slug,
      },
    },
  })
  const product: GetProduct_products = head(data?.products)

  const pickerTransition = useSpring({
    translateY: showVariantPicker ? 0 : variantPickerHeight,
    overlayOpacity: showVariantPicker ? 1 : 0,
  })

  const [addRecentlyViewedItem] = useMutation(ADD_VIEWED_PRODUCT, {
    refetchQueries: [
      {
        query: GET_HOMEPAGE,
      },
    ],
  })

  useEffect(() => {
    if (userHasSession && product) {
      addRecentlyViewedItem({
        variables: {
          item: product.id,
        },
      })
    }
  }, [product])

  useEffect(() => {
    if (data && !product) {
      showPopUp({
        title: "Oops!",
        note:
          "We couldn't find that product at the moment. Please go back and try again, " +
          "or contact us at membership@seasons.nyc if this persists.",
        buttonText: "Go Back",
        onClose: () => {
          hidePopUp()
          navigation.goBack()
        },
      })
    }
  }, [data, product])

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

  const brandProducts = product?.brand?.products

  const viewWidth = Dimensions.get("window").width
  const images = product?.largeImages
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

  if (error) {
    console.error("Error:", error)
  }

  if (!data) {
    return <EmptyView navigation={navigation} />
  }

  // Happens if the product could not be found. The useEffect above will show a popup.
  if (!product) {
    return <EmptyView navigation={navigation} />
  }

  const renderItem = ({ item: section }) => {
    switch (section) {
      case "imageRail":
        return (
          <ImageRail
            images={images}
            showPageDots
            imageWidth={imageWidth}
            TextComponent={() => <VariantSizes size="1" variants={product?.variants ?? []} />}
          />
        )
      case "productMeasurements":
        return <ProductMeasurements selectedVariant={selectedVariant} />
      case "productDetails":
        return <ProductDetails product={product} selectedVariant={selectedVariant} />
      case "moreLikeThis":
        return <MoreFromBrand flatListRef={flatListRef} products={brandProducts} brandName={product.brand.name} />
      default:
        return null
    }
  }

  const selectionButtonsBottom = shouldShowVariantWant ? VARIANT_WANT_HEIGHT : 0
  const listFooterSpacing = selectionButtonsBottom + 58
  const sections = ["imageRail", "productDetails", "productMeasurements", "aboutTheBrand", "moreLikeThis"]

  return (
    <Container insetsTop={false}>
      <FixedBackArrow navigation={navigation} variant={showVariantPicker ? "blackBackground" : "black04Background"} />
      <FlatList
        ListHeaderComponent={() => <Spacer mb={insets.top} />}
        data={sections}
        ref={flatListRef}
        ListFooterComponent={() => <Spacer mb={listFooterSpacing} />}
        keyExtractor={(item) => item}
        renderItem={(item) => renderItem(item)}
      />
      <SelectionButtons
        bottom={selectionButtonsBottom}
        toggleShowVariantPicker={toggleShowVariantPicker}
        showVariantPicker={showVariantPicker}
        selectedVariant={selectedVariant}
        data={data}
      />
      <AnimatedVariantWantWrapper style={{ transform: [{ translateY: variantWantTransition.translateY }] }}>
        {shouldShowVariantWant && (
          <VariantWant
            setShowWantedConfirmation={setShowWantedConfirmation}
            productSlug={product.slug}
            isWanted={selectedVariantIsWanted}
            productID={product.id}
            variantID={selectedVariant.id}
          />
        )}
      </AnimatedVariantWantWrapper>
      <AnimatedOverlay pointerEvents={showVariantPicker ? "auto" : "none"} opacity={pickerTransition.overlayOpacity} />
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

const Overlay = styled(Box)`
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
const AnimatedOverlay = animated(Overlay)

const EmptyView = (navigation: any) => (
  <>
    <FixedBackArrow navigation={navigation} variant="whiteBackground" />
    <Loader />
  </>
)
