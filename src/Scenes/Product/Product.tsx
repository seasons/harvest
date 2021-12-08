import { Box, Container, FixedBackArrow, Flex, ProductCarousel, Sans, Spacer, VariantSizes } from "App/Components"
import { Loader } from "App/Components/Loader"
import { ShareButton } from "App/Components/ShareButton"
import { GetProduct, GetProduct_products } from "App/generated/GetProduct"
import { Product_NoCache_Query as Product_NoCache_Query_Type } from "App/generated/Product_NoCache_Query"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Homepage_Query } from "App/Scenes/Home/queries/homeQueries"
import { Schema, screenTrack } from "App/utils/track"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { filter } from "graphql-anywhere"
import gql from "graphql-tag"
import { head } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, StatusBar } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { useMutation, useQuery } from "@apollo/client"
import { ProductBuyCTA, ProductBuyCTAFragment_Product, ProductBuyCTAFragment_ProductVariant } from "@seasons/eclipse"
import * as Sentry from "@sentry/react-native"
import { ImageRail, ProductDetails, ProductMeasurements } from "./Components"
import { ProductBottomBar } from "./Components/ProductBottomBar"
import { SizeWarning } from "./Components/SizeWarning"
import { VariantPicker } from "./Components/VariantPicker"
import { PRODUCT_VARIANT_CREATE_DRAFT_ORDER } from "./Mutations"
import { GET_PRODUCT, Product_NoCache_Query } from "./Queries"
import { PricingCalculator } from "./Components/PricingCalculator"
import {
  ProductConditionSection,
  ProductConditionSectionFragment_PhysicalProductQualityReport,
} from "./Components/ProductConditionSection"
import { GetBag_NoCache_Query } from "../Bag/BagQueries"

const windowHeight = Dimensions.get("window").height

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

export const UPSERT_CART_ITEM = gql`
  mutation upsertCartItem($productVariantId: ID!, $addToCart: Boolean!) {
    upsertCartItem(productVariantId: $productVariantId, addToCart: $addToCart) {
      id
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
  const [addToCartButtonIsMutating, setAddToCartButtonIsMutating] = useState(false)
  const { authState } = useAuthContext()
  const [isMutatingBuyButton, setIsMutatingBuyButton] = useState(false)
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
  const { previousData: previousDataMe, data: dataMe = previousDataMe } = useQuery<Product_NoCache_Query_Type>(
    Product_NoCache_Query
  )

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
  const variantPickerHeight = product?.variants?.length > 3 ? windowHeight / 2.5 : windowHeight / 3

  const pickerTransition = useSpring({
    translateY: showVariantPicker ? 0 : windowHeight,
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
    nextReservablePhysicalProduct: null,
  })

  const [addRecentlyViewedItem] = useMutation(ADD_VIEWED_PRODUCT, {
    refetchQueries: [
      {
        query: Homepage_Query,
        variables: {
          firstFitPics: 8,
        },
      },
    ],
  })

  const [upsertCartItem] = useMutation(UPSERT_CART_ITEM, {
    variables: {
      productVariantId: selectedVariant?.id,
      addToCart: !selectedVariant?.isInBag,
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
      {
        query: GetBag_NoCache_Query,
      },
    ],
    onCompleted: () => {
      setAddToCartButtonIsMutating(false)
    },
    onError: (error) => {
      Sentry.captureException(JSON.stringify(error))
      console.log("error upsertRestockNotification Product.tsx", error)
      setAddToCartButtonIsMutating(false)
    },
  })

  console.log("selectedVariant", selectedVariant)

  const [upsertRestockNotification] = useMutation(UPSERT_RESTOCK_NOTIF, {
    variables: {
      variantID: selectedVariant?.id,
      addToCart: !selectedVariant?.hasRestockNotification,
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
      setIsMutatingBuyButton(false)
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
      setIsMutatingBuyButton(false)
    },
  })

  const handleCreateDraftOrder = (orderType: "Used" | "New") => {
    if (isMutatingBuyButton) {
      return
    }
    setIsMutatingBuyButton(true)

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
          setIsMutatingBuyButton(false)
          hidePopUp()
        },
        buttonText: "Sign up",
        onClose: () => {
          hidePopUp()
          setIsMutatingBuyButton(false)
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

    if (data && product && productType === "Accessory") {
      setSelectedVariant(product?.variants?.[0])
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
  const relatedProducts = product?.relatedProducts
  const brand = product?.brand
  const productType = product?.category?.productType
  const physicalProductQualityReport = (selectedVariant?.nextReservablePhysicalProduct?.reports || []).reduce(
    (agg, report) => {
      if (!agg) {
        return report
      }
      return report.published && report.createdAt > agg.createdAt ? report : agg
    },
    null
  )

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
      case "productDetails":
        return <ProductDetails product={product} selectedVariant={selectedVariant} />
      case "pricingCalculator":
        return <PricingCalculator product={product} />
      case "productMeasurements":
        return <ProductMeasurements selectedVariant={selectedVariant} />
      case "relatedProducts":
        return (
          <Box pb={2} pt={1}>
            <ProductCarousel
              titleSize="4"
              title="More like this"
              flatListRef={flatListRef}
              products={relatedProducts}
            />
          </Box>
        )
      case "moreLikeThis":
        return (
          <Box pb={2} pt={1}>
            <ProductCarousel
              title={`More from ${product?.brand?.name}`}
              titleSize="4"
              flatListRef={flatListRef}
              products={brandProducts}
            />
          </Box>
        )
      case "buy":
        return (
          <Box px={2} pb={4}>
            <ProductBuyCTA
              buttonVariant={selectedVariant?.isInBag ? "primaryWhite" : "primaryBlack"}
              product={filter(ProductBuyCTAFragment_Product, product)}
              productVariant={filter(ProductBuyCTAFragment_ProductVariant, selectedVariant)}
              onNavigateToBrand={() =>
                navigation.navigate("Brand", { id: brand.id, slug: brand.slug, name: brand.name })
              }
              isMutating={addToCartButtonIsMutating}
              onAddToCart={() => {
                setAddToCartButtonIsMutating(true)
                upsertCartItem()
              }}
            />
          </Box>
        )
      case "condition":
        return (
          <ProductConditionSection
            px={2}
            pb={4}
            physicalProductQualityReport={
              physicalProductQualityReport
                ? filter(ProductConditionSectionFragment_PhysicalProductQualityReport, physicalProductQualityReport)
                : null
            }
          />
        )
      default:
        return null
    }
  }

  const selectionButtonsBottom = showNotifyMeMessage ? VARIANT_WANT_HEIGHT : 0
  const listFooterSpacing = selectionButtonsBottom + 100
  const sections = [
    "imageRail",
    "productDetails",
    "buy",
    "pricingCalculator",
    "productMeasurements",
    "condition",
    "aboutTheBrand",
    "relatedProducts",
    "moreLikeThis",
  ]
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
      <ProductBottomBar
        isMutatingBuyButton={isMutatingBuyButton}
        showNotifyMeMessage={showNotifyMeMessage}
        toggleShowVariantPicker={toggleShowVariantPicker}
        showVariantPicker={showVariantPicker}
        selectedVariant={selectedVariant}
        onNotifyMe={onNotifyMe}
        isMutatingNotify={isMutatingNotify}
        hasNotification={hasNotification}
        data={data}
        dataMe={dataMe}
        setShowSizeWarning={setShowSizeWarning}
        animatedScrollY={animatedScrollYRef.current}
        retailPrice={product.retailPrice}
        monthlyRental={product?.rentalPrice}
        productType={productType}
        handleCreateDraftOrder={handleCreateDraftOrder}
      />
      {showNotifyMeMessage && (
        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0, zIndex: 0, backgroundColor: "white" }}>
          <Flex px={2} flexDirection="row" flexWrap="nowrap" justifyContent="center">
            <Sans size="4">{notifyButtonText}</Sans>
          </Flex>
          <Spacer pb={4} />
        </FadeBottom2>
      )}
      <AnimatedOverlay pointerEvents={showVariantPicker ? "auto" : "none"} opacity={pickerTransition.overlayOpacity} />
      {productType === "Accessory" ? null : (
        <AnimatedVariantPicker
          style={{ transform: [{ translateY: pickerTransition.translateY }] }}
          variantPickerHeight={variantPickerHeight}
        >
          <VariantPicker
            product={product}
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
            toggleShowVariantPicker={toggleShowVariantPicker}
          />
        </AnimatedVariantPicker>
      )}
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
const VariantPickerWrapper = styled(Box)<{ variantPickerHeight: any }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250;
  z-index: 4;
`
const AnimatedVariantPicker = animated(VariantPickerWrapper)
const AnimatedOverlay = animated(Overlay)
