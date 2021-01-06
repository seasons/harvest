import CameraRoll from "@react-native-community/cameraroll"
import { gql } from "apollo-boost"
import { Box, Button, CloseButton, Display, FadeInImage, FixedBackArrow, Flex, Spacer } from "App/Components"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { SeasonsCircleSVG } from "Assets/svgs"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { useQuery } from "react-apollo"
import { Dimensions, FlatList } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Share from "react-native-share"
import ViewShot, { captureRef } from "react-native-view-shot"

const GET_CUSTOMER_RESERVATION_ITEMS = gql`
  query GetCustomerReservationItems($reservationID: ID!) {
    me {
      customer {
        id
        reservations(where: { id: $reservationID }) {
          id
          products {
            id
            productVariant {
              id
              product {
                id
                name
                brand {
                  id
                  name
                }
                images(size: Large) {
                  id
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ShareReservationToIG = screenTrack()(({ route, navigation }) => {
  const tracking = useTracking()
  const reservationID = route?.params?.reservationID
  const flatListRef: MutableRefObject<FlatList<any>> = useRef(null)
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const insets = useSafeAreaInsets()

  const { data } = useQuery(GET_CUSTOMER_RESERVATION_ITEMS, {
    variables: {
      reservationID,
    },
  })
  useEffect(() => {
    // Need to snap to content inset on load
    flatListRef?.current?.scrollToOffset({ animated: false, offset: -32 })
  }, [])

  const reservation = data?.me?.customer?.reservations?.[0]
  // console.log(reservation)
  let products =
    reservation?.products?.map((product) => {
      return product?.productVariant?.product
    }) ?? []

  const viewShotRefs = [...Array(products.length)].map((_arr, index) => useRef(null))

  let onScrollEnd = (e) => {
    let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / 310 + 0.5), 0), products.length)
    setCurrentPageNumber(pageNumber)
  }

  const slideWidth = 310
  const slideSpacing = 24
  const convertSizing = (pixels) => (pixels * slideWidth) / Dimensions.get("window").width

  const onDownload = async () => {
    if (currentPageNumber < viewShotRefs?.length) {
      captureRef(viewShotRefs[currentPageNumber], {
        result: "tmpfile",
      }).then(
        async (url) => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.DownloadReservationShareImageTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          await CameraRoll.save(url)
        },
        (error) => console.error("Failed to create image", error)
      )
    }
  }

  const onShareToIG = async () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.ShareToIGButtonTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    if (currentPageNumber < viewShotRefs?.length) {
      captureRef(viewShotRefs[currentPageNumber], {
        result: "base64",
        // Recommended Instagram story dimension
        width: 1080,
        height: 1920,
      }).then(
        async (base64) => {
          const shareOptions = {
            title: "Share image to instastory",
            method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
            backgroundImage: "data:image/png;base64," + base64,
            social: Share.Social.INSTAGRAM_STORIES,
          }
          try {
            await Share.shareSingle(shareOptions)
          } catch (error) {
            console.log("Failed to post to instagram stories", error)
          }
        },
        (error) => console.error("Failed to create image", error)
      )
    }
  }

  const renderItem = (product, index) => {
    const imageUrl = product?.images?.[2]?.url
    const brandName = product?.brand?.name
    const productName = product?.name
    const maxCharacters = 50
    const truncateProductName = productName.length > maxCharacters
    const displayProductName = truncateProductName ? productName.substring(0, maxCharacters) + " ..." : productName

    // Based on recommended dimensions (1920 x 1080)
    const instagramShareHeight = (slideWidth * 16) / 9
    return (
      <ViewShot
        ref={viewShotRefs[index]}
        style={{ borderRadius: 6, overflow: "hidden", height: instagramShareHeight, width: slideWidth }}
      >
        <Box style={{ height: "100%", width: "100%", backgroundColor: color("white100") }}>
          <Flex
            mt={convertSizing(68)}
            mx={convertSizing(8)}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex style={{ flexShrink: 1 }}>
              <Display size={convertSizing(24)} color="black100">
                MY ROTATION
              </Display>
              <Display
                mb={convertSizing(4)}
                mt={convertSizing(16)}
                size={convertSizing(12)}
                color="black100"
                style={{ textDecorationLine: "underline" }}
              >
                {brandName}
              </Display>
              <Display
                numberOfLines={1}
                mb={convertSizing(8)}
                color="black100"
                lineHeight={convertSizing(20)}
                size={convertSizing(12)}
                style={{ opacity: 0.5 }}
              >
                {displayProductName}
              </Display>
            </Flex>
            <Spacer ml={1} />
            <SeasonsCircleSVG width={convertSizing(72)} height={convertSizing(72)} />
          </Flex>
          <Box style={{ flex: 1, backgroundColor: "#000000" }}>
            <FadeInImage source={{ uri: imageUrl || "" }} style={{ width: slideWidth, height: "100%" }} />
          </Box>
          <Flex
            mt={convertSizing(4)}
            mb={convertSizing(20)}
            mx={convertSizing(8)}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Display size={convertSizing(12)} color="black100">
              {index + 1 + "/" + products.length}
            </Display>
            <Display size={convertSizing(12)} color="black100">
              @
              <Display size={convertSizing(12)} color="black100" style={{ textDecorationLine: "underline" }}>
                seasons.ny
              </Display>
            </Display>
          </Flex>
        </Box>
      </ViewShot>
    )
  }

  return (
    <Flex pt={insets.top} style={{ flex: 1, backgroundColor: "#1B1B1B" }}>
      <CloseButton overrides={{ borderColor: "#333333", backgroundColor: "#1B1B1B", borderWidth: 1 }} />
      <FixedBackArrow
        overrides={{
          borderColor: "#333333",
          top: 40,
          left: 16,
        }}
        variant="whiteTransparent"
        rotationDegree="270deg"
        navigation={navigation}
        onPress={onDownload}
      />
      <Spacer mt={64} />
      <FlatList
        onMomentumScrollEnd={onScrollEnd}
        ref={flatListRef}
        horizontal
        data={products}
        ItemSeparatorComponent={() => <Spacer ml={12} />}
        keyExtractor={(item, index) => item + String(index)}
        renderItem={({ item, index }) => renderItem(item, index)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentInset={{
          top: 0,
          left: 32,
          bottom: 0,
          right: 32,
        }}
        decelerationRate={0}
        snapToInterval={slideWidth + slideSpacing / 2}
        snapToAlignment={"center"}
      />
      <Flex p={2} style={{ width: "100%" }}>
        <Button
          onPress={onShareToIG}
          variant="primaryBlack"
          backgroundColor="#1B1B1B"
          borderColor="#333333"
          bottom={space(5)}
          mr={4}
          block
        >
          Share to IG Stories
        </Button>
      </Flex>
    </Flex>
  )
})
