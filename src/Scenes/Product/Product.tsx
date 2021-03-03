import { Box, Container, FixedBackArrow, Flex, Sans, Spacer, VariantSizes } from "App/Components"
import { Loader } from "App/Components/Loader"
import { ShareButton } from "App/Components/ShareButton"
import { GetProduct, GetProduct_products } from "App/generated/GetProduct"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema, screenTrack } from "App/utils/track"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import gql from "graphql-tag"
import { head } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, StatusBar } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"

import { useMutation, useQuery } from "@apollo/client"
import analytics from "@segment/analytics-react-native"
import * as Sentry from "@sentry/react-native"

import { ImageRail, MoreFromBrand, ProductBuy, ProductDetails, ProductMeasurements } from "./Components"
import { SelectionButtons } from "./Components/SelectionButtons"
import { SizeWarning } from "./Components/SizeWarning"
import { VariantPicker } from "./Components/VariantPicker"
import { PRODUCT_VARIANT_CREATE_DRAFT_ORDER } from "./Mutations"
import { GET_PRODUCT } from "./Queries"
import { GET_HOMEPAGE } from "@seasons/eclipse"

const windowHeight = Dimensions.get("window").height
const variantPickerHeight = windowHeight / 2.5 + 50
export const VARIANT_WANT_HEIGHT = 52
export enum OrderType {
  BUY_USED = "Used",
  BUY_NEW = "New",
}

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
  const productBuyRef = useRef(null)
  const { authState } = useAuthContext()
  const [buyButtonMutating, setBuyButtonMutating] = useState(false)
  const [viewed, setViewed] = useState(false)
  const [showNotifyMeMessage, setShowNotifyMeMessage] = useState(false)
  const [isMutatingNotify, setIsMutatingNotify] = useState(false)
  const insets = useSafeAreaInsets()
  const flatListRef = useRef(null)
  const animatedScrollYRef = useRef(new Animated.Value(0))
  const userHasSession = !!authState?.userSession
  const [showVariantPicker, toggleShowVariantPicker] = useState(false)
  const [showSizeWarning, setShowSizeWarning] = useState(false)
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

  const [selectedVariant, setSelectedVariant] = useState({
    id: "",
    reservable: 0,
    size: "",
    display: {
      short: "",
      long: "",
    },
    stock: 0,
    isInBag: false,
    hasRestockNotification: null,
  })

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
      variantID: selectedVariant?.id,
      shouldNotify: !selectedVariant?.hasRestockNotification,
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

  const [createDraftOrder] = useMutation(PRODUCT_VARIANT_CREATE_DRAFT_ORDER, {
    onCompleted: (res) => {
      setBuyButtonMutating(false)
      if (res?.createDraftedOrder) {
        navigation.navigate(NavigationSchema.PageNames.Order, { order: res.createDraftedOrder })
      }
    },
    onError: (error) => {
      showPopUp({
        title: "Sorry!",
        note: "There was an issue creating the order, please try again.",
        buttonText: "Okay",
        onClose: () => {
          hidePopUp()
        },
      })
      console.log("error createDraftOrder ", error)
      Sentry.captureException(JSON.stringify(error))
      setBuyButtonMutating(false)
    },
  })

  const handleCreateDraftOrder = (orderType: "Used" | "New") => {
    if (userHasSession) {
      return createDraftOrder({
        variables: {
          input: {
            productVariantID: selectedVariant?.id,
            orderType,
          },
        },
      })
    } else {
      showPopUp({
        title: "Sign up to buy this item",
        note: "You need to sign in or create an account before you can order items",
        secondaryButtonText: "Got it",
        secondaryButtonOnPress: () => {
          setBuyButtonMutating(false)
          hidePopUp()
        },
        buttonText: "Sign up",
        onClose: () => {
          hidePopUp()
          setBuyButtonMutating(false)
          navigation.navigate("Modal", {
            screen: "CreateAccountModal",
          })
        },
      })
    }
  }

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

  useEffect(() => {
    const inStock = selectedVariant && selectedVariant.reservable > 0
    if (selectedVariant?.id) {
      setShowNotifyMeMessage(!inStock)
    }
  }, [selectedVariant])

  const brandProducts = product?.brand?.products

  const viewWidth = Dimensions.get("window").width
  const images = product?.largeImages
  const imageWidth = viewWidth

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
      case "buy":
        return (
          <ProductBuy
            productBuyRef={productBuyRef}
            product={product}
            buyButtonMutating={buyButtonMutating}
            selectedVariant={selectedVariant}
            onBuyNew={() => {
              setBuyButtonMutating(true)
              handleCreateDraftOrder(OrderType.BUY_NEW)
            }}
            onBuyUsed={() => {
              setBuyButtonMutating(true)
              handleCreateDraftOrder(OrderType.BUY_USED)
            }}
          />
        )
      default:
        return null
    }
  }

  const selectionButtonsBottom = showNotifyMeMessage ? VARIANT_WANT_HEIGHT : 0
  const listFooterSpacing = selectionButtonsBottom + 100
  const sections = ["imageRail", "productDetails", "buy", "productMeasurements", "aboutTheBrand", "moreLikeThis"]
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

  const scrollToBuyCTA = () => {
    productBuyRef.current.measure((fx, fy, width, height, px, py) => {
      flatListRef.current?.scrollToOffset({ offset: py - (windowHeight / 2 - 80), animated: true })
    })
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
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
      <Animated.FlatList
        ListHeaderComponent={() => <Spacer mb={insets.top} />}
        data={sections}
        ref={flatListRef}
        ListFooterComponent={() => <Spacer mb={listFooterSpacing} />}
        keyExtractor={(item) => item}
        renderItem={(item) => renderItem(item)}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYRef.current } } }], {
          useNativeDriver: true,
        })}
      />
      <SelectionButtons
        showNotifyMeMessage={showNotifyMeMessage}
        toggleShowVariantPicker={toggleShowVariantPicker}
        showVariantPicker={showVariantPicker}
        selectedVariant={selectedVariant}
        onNotifyMe={onNotifyMe}
        isMutatingNotify={isMutatingNotify}
        hasNotification={hasNotification}
        data={data}
        setShowSizeWarning={setShowSizeWarning}
        scrollToBuyCTA={scrollToBuyCTA}
        animatedScrollY={animatedScrollYRef.current}
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
      <SizeWarning
        show={showSizeWarning}
        data={data}
        selectedVariant={selectedVariant}
        setShowSizeWarning={setShowSizeWarning}
        setSelectedVariant={setSelectedVariant}
      />
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
