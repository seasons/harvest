import { Box, Container, FixedBackArrow, Flex, Sans, Spacer, VariantSizes } from "App/Components"
import { Loader } from "App/Components/Loader"
import analytics from "@segment/analytics-react-native"
import { ShareButton } from "App/Components/ShareButton"
import { GetProduct, GetProduct_products } from "App/generated/GetProduct"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema, screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import * as Sentry from "@sentry/react-native"
import { head } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, StatusBar } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"

import { useMutation, useQuery } from "@apollo/react-hooks"

import { GET_HOMEPAGE } from "../Home/queries/homeQueries"
import { ImageRail, MoreFromBrand, ProductDetails, ProductMeasurements } from "./Components"
import { SelectionButtons } from "./Components/SelectionButtons"
import { VariantPicker } from "./Components/VariantPicker"
import { GET_PRODUCT } from "./Queries"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"

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

export const UPSERT_RESTOCK_NOTIF = gql`
  mutation UpsertRestockNotification($variantID: ID!, $shouldNotify: Boolean!) {
    upsertRestockNotification(variantID: $variantID, shouldNotify: $shouldNotify) {
      id
    }
  }
`

export const Product = screenTrack({
  entityType: Schema.EntityTypes.Product,
})(({ route, navigation }) => {
  const { authState } = useAuthContext()
  const [viewed, setViewed] = useState(false)
  const [isMutatingNotify, setIsMutatingNotify] = useState(false)
  const insets = useSafeAreaInsets()
  const flatListRef = useRef(null)
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

  const [hasNotification, setHasNotification] = useState(false)

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || {
      id: "",
      reservable: 0,
      size: "",
      stock: 0,
      isInBag: false,
      hasRestockNotification: null,
    }
  )

  const [addRecentlyViewedItem] = useMutation(ADD_VIEWED_PRODUCT, {
    refetchQueries: [
      {
        query: GET_HOMEPAGE,
        variables: {
          firstFitPics: 8,
        },
      },
    ],
  })

  const [upsertRestockNotification] = useMutation(UPSERT_RESTOCK_NOTIF, {
    variables: {
      variantID: selectedVariant.id,
      shouldNotify: !selectedVariant.hasRestockNotification,
    },
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          where: {
            id,
            slug,
          },
        },
      },
    ],
    onCompleted: () => {
      setIsMutatingNotify(false)
    },
    onError: (error) => {
      Sentry.captureException(JSON.stringify(error))
      console.log("error upsertRestockNotification Product.tsx", error)
      setIsMutatingNotify(false)
    },
  })

  useEffect(() => {
    const hasRestockNotif = selectedVariant?.hasRestockNotification
    if (typeof hasRestockNotif === "boolean") {
      setHasNotification(hasRestockNotif)
    }
  }, [selectedVariant])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      StatusBar.setBarStyle("dark-content")
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (userHasSession && product && !viewed) {
      setViewed(true)
      addRecentlyViewedItem({
        variables: {
          item: product.id,
        },
      })
    }
  }, [product])

  useEffect(() => {
    if (data?.me) {
      const baggedItems = data?.me?.bag?.length || 0
      const savedItems = data?.me?.savedItems?.length || 0
      analytics?.identify(data?.me?.customer?.user?.id, { bagItems: baggedItems + savedItems })
    }
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

  const brandProducts = product?.brand?.products

  const viewWidth = Dimensions.get("window").width
  const images = product?.largeImages
  const imageWidth = viewWidth

  const inStock = selectedVariant && selectedVariant.reservable > 0
  let showNotifyMeMessage = false
  if (!inStock) {
    showNotifyMeMessage = true
  }

  if (error) {
    console.error("Error:", error)
  }

  // Happens if the product could not be found. The useEffect above will show a popup.
  if (!product || !data) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const renderItem = ({ item: section }) => {
    switch (section) {
      case "imageRail":
        return (
          <ImageRail
            images={images}
            showPageDots
            imageWidth={imageWidth}
            TextComponent={() => <VariantSizes size="4" variants={product?.variants ?? []} />}
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

  const selectionButtonsBottom = showNotifyMeMessage ? VARIANT_WANT_HEIGHT : 0
  const listFooterSpacing = selectionButtonsBottom + 58
  const sections = ["imageRail", "productDetails", "productMeasurements", "aboutTheBrand", "moreLikeThis"]
  const url = `https://www.wearseasons.com/product/${product.slug}`
  const title = product.name
  const message = `Check out ${product.name} on Seasons!`
  const icon = images?.[0]?.url

  const notifyButtonText = hasNotification
    ? "We'll let you know when it's back"
    : "Unavailable: Get notified when it's back"

  const onNotifyMe = () => {
    if (userHasSession) {
      if (!isMutatingNotify) {
        setIsMutatingNotify(true)
        setHasNotification(!selectedVariant.hasRestockNotification)
        upsertRestockNotification()
      }
    } else {
      showPopUp({
        title: "Sign up to be notified",
        note: "You need to create an account before you can use this feature.",
        secondaryButtonText: "Got it",
        secondaryButtonOnPress: () => {
          hidePopUp()
        },
        buttonText: "Sign up",
        onClose: () => {
          hidePopUp()
          navigation.navigate("Modal", {
            screen: "CreateAccountModal",
          })
        },
      })
    }
  }

  return (
    <Container insetsTop={false}>
      <FixedBackArrow navigation={navigation} variant={showVariantPicker ? "blackBackground" : "productBackground"} />
      <ShareButtonWrapper>
        <ShareButton
          variant={showVariantPicker ? "blackBackground" : "productBackground"}
          options={{
            title,
            message,
            url,
            icon,
          }}
        />
      </ShareButtonWrapper>
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
        onNotifyMe={onNotifyMe}
        isMutatingNotify={isMutatingNotify}
        hasNotification={hasNotification}
        data={data}
      />
      {showNotifyMeMessage && (
        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0, zIndex: 0 }}>
          <Spacer pb={2} />
          <Flex p={2} flexDirection="row" flexWrap="nowrap" justifyContent="center">
            <Sans size="4">{notifyButtonText}</Sans>
          </Flex>
          <Spacer pb={1} />
        </FadeBottom2>
      )}
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

const ShareButtonWrapper = styled(Box)`
  position: absolute;
  top: 50;
  right: 7;
  z-index: 2000;
`

const AnimatedVariantPicker = animated(VariantPickerWrapper)
const AnimatedOverlay = animated(Overlay)
