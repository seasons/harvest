import { gql } from "apollo-boost"
import { CloseButton, Container, FadeInImage, FixedBackArrow, FixedButton, Flex, Sans, Spacer } from "App/Components"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { useQuery } from "react-apollo"
import { FlatList, Image } from "react-native"
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
                images {
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

  const { data, error } = useQuery(GET_CUSTOMER_RESERVATION_ITEMS, {
    variables: {
      reservationID,
    },
  })
  useEffect(() => {
    // Need to snap to content inset on load
    flatListRef?.current?.scrollToOffset({ animated: false, offset: -32 })
  }, [])

  const reservation = data?.me?.customer?.reservations?.[0]
  let products =
    reservation?.products?.map((product) => {
      return product?.images?.[0]
    }) ?? []
  products = [
    {
      name: "Camo Puffer Jacket",
      brand: { name: "Rhude" },
      images: [{ url: "https://seasons-images.s3.amazonaws.com/prda/prada-suede-coat/prada-suede-coat-1.png" }],
    },
    {
      name: "Camo Puffer Jacket",
      brand: { name: "Rhude" },
      images: [{ url: "https://seasons-images.s3.amazonaws.com/prda/prada-suede-coat/prada-suede-coat-1.png" }],
    },
    {
      name: "Camo Puffer Jacket",
      brand: { name: "Rhude" },
      images: [{ url: "https://seasons-images.s3.amazonaws.com/prda/prada-suede-coat/prada-suede-coat-1.png" }],
    },
    {
      name: "Camo Puffer Jacket",
      brand: { name: "Rhude" },
      images: [{ url: "https://seasons-images.s3.amazonaws.com/prda/prada-suede-coat/prada-suede-coat-1.png" }],
    },
    {
      name: "Camo Puffer Jacket",
      brand: { name: "Rhude" },
      images: [{ url: "https://seasons-images.s3.amazonaws.com/prda/prada-suede-coat/prada-suede-coat-1.png" }],
    },
    {
      name: "Camo Puffer Jacket",
      brand: { name: "Rhude" },
      images: [{ url: "https://seasons-images.s3.amazonaws.com/prda/prada-suede-coat/prada-suede-coat-1.png" }],
    },
  ]

  const viewShotRefs = [...Array(products.length)].map((_arr, index) => useRef(null))

  let onScrollEnd = (e) => {
    let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / 310 + 0.5), 0), products.length)
    console.log(pageNumber)
    setCurrentPageNumber(pageNumber)
  }

  const onDownload = () => {
    // Download image to camera roll
  }

  const onShareToIG = async () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.ShareToIGButtonTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    captureRef(viewShotRefs[currentPageNumber], {
      result: "base64",
      width: 1080,
      height: 1920,
    }).then(
      async (base64) => {
        console.log("Image saved to", base64)
        const shareOptions = {
          title: "Share image to instastory",
          method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
          backgroundImage: "data:image/png;base64," + base64,
          social: Share.Social.INSTAGRAM_STORIES,
        }

        try {
          const ShareResponse = await Share.shareSingle(shareOptions)
          console.log(JSON.stringify(ShareResponse, null, 2))
        } catch (error) {
          console.log("Error =>", error)
        }
      },
      (error) => console.error("Oops, snapshot failed", error)
    )
  }

  const renderItem = (product, index) => {
    const imageUrl = product?.images?.[0]?.url
    const brandName = product?.brand?.name
    const productName = product?.name
    const imageWidth = 310
    const imageHeight = 400
    return (
      <ViewShot ref={viewShotRefs[index]} style={{ flex: 1, overflow: "hidden" }}>
        <Flex style={{ overflow: "hidden", borderRadius: 6, backgroundColor: color("white100") }}>
          <Sans mt={64} ml={1} size="3" color="black100" fontFamily="Apercu-Mono">
            NEW ROTATION
          </Sans>
          <Sans
            mt={2}
            ml={1}
            size="1"
            color="black100"
            fontFamily="Apercu-Mono"
            style={{ textDecorationLine: "underline" }}
          >
            {brandName}
          </Sans>
          <Sans mb={1} ml={1} size="1" color="black100" fontFamily="Apercu-Mono" style={{ opacity: 0.5 }}>
            {productName}
          </Sans>
          <FadeInImage source={{ uri: imageUrl || "" }} style={{ width: imageWidth, height: imageHeight }} />
          <Flex mt={0.5} mx={1} flexDirection="row" justifyContent="space-between">
            <Sans size="1" color="black100" fontFamily="Apercu-Mono" style={{ opacity: 0.5 }}>
              {index + 1 + "/" + products.length}
            </Sans>
            <Sans size="1" color="black100" fontFamily="Apercu-Mono">
              @
              <Sans size="1" color="black100" fontFamily="Apercy-Mono" style={{ textDecorationLine: "underline" }}>
                seasons.ny
              </Sans>
            </Sans>
          </Flex>
        </Flex>
      </ViewShot>
    )
  }

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="black85">
      <CloseButton />
      <FixedBackArrow variant="whiteTransparent" rotationDegree="270deg" navigation={navigation} onPress={onDownload} />
      <Spacer mt={64} />
      <FlatList
        onMomentumScrollEnd={onScrollEnd}
        ref={flatListRef}
        horizontal
        data={products}
        ItemSeparatorComponent={() => <Spacer ml={1.5} />}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
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
        snapToInterval={322}
        snapToAlignment={"center"}
      />
      <FixedButton positionBottom={space(5)} onPress={onShareToIG} block>
        <Flex py={2} justifyContent="center" flexDirection="row">
          <Image
            source={require("../../../assets/images/instagramCopy.png")}
            style={{ opacity: 1.0, height: 24, width: 24 }}
          />
          <Sans pt={0.5} size="1" color="white100">
            Share to IG Stories
          </Sans>
        </Flex>
      </FixedButton>
    </Container>
  )
})
