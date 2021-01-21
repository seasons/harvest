import { Box, Button, Container, FadeInImage, FixedBackArrow, Flex, Sans, Separator, Spacer } from "App/Components"
import { ShareButton } from "App/Components/ShareButton"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Instagram } from "Assets/svgs"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Dimensions, Linking } from "react-native"
import FastImage from "react-native-fast-image"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { SharedElement } from "react-navigation-shared-element"
import { Homepage_fitPics as FitPic } from "src/generated/Homepage"
import styled from "styled-components"
import { GET_BAG } from "../Bag/BagQueries"
import { GET_HOMEPAGE } from "../Home/queries/homeQueries"
import { SAVE_ITEM } from "../Product/Components/SaveProductButton"
import { GET_PRODUCT } from "../Product/Queries"
interface FitPicDetailProps {
  navigation: any
  route: any
}

const screenWidth = Dimensions.get("screen").width
const imageHeight = screenWidth * (5 / 4)
const spacing = 8

export const FitPicDetail: React.FC<FitPicDetailProps> = screenTrack()(({ route, navigation }) => {
  const {
    authState: { isSignedIn },
  } = useAuthContext()
  const tracking = useTracking()
  const [isMutating, setIsMutating] = useState(false)
  const [saveItem] = useMutation(SAVE_ITEM, {
    onCompleted: (data) => {
      setIsMutating(false)
    },
  })

  const item = route?.params?.item as FitPic
  if (!item) {
    return null
  }

  const onViewProduct = (product) => {
    navigation.navigate("Product", { id: product?.id, slug: product?.slug, name: product?.name })
  }

  const onSaveForLater = (product) => {
    if (!isMutating) {
      setIsMutating(true)
      const variantId = product.variants[0].id
      tracking.trackEvent({
        actionName: Schema.ActionNames.BagItemSaved,
        actionType: Schema.ActionTypes.Tap,
        productSlug: product.slug,
        productId: product.id,
        variantId: variantId,
      })
      saveItem({
        variables: {
          item: variantId,
          save: true,
        },
        refetchQueries: [
          {
            query: GET_PRODUCT,
            variables: {
              where: { id: product?.id },
            },
          },
          {
            query: GET_BAG,
          },
          {
            query: GET_HOMEPAGE,
            variables: { firstFitPics: 8, skipFitPics: 0 },
          },
        ],
        optimisticResponse: {
          __typename: "Mutation",
          saveProduct: {
            __typename: "Product",
            id: product.id,
            isSaved: true,
            productVariant: {
              __typename: "ProductVariant",
              isSaved: true,
              id: variantId,
            },
          },
        },
      })
    }
  }

  const onPressInstagramHandle = () => {
    const instagramUsername = item.user.customer.detail.instagramHandle.replace("@", "")
    Linking.openURL(`instagram://user?username=${instagramUsername}`)
  }

  const renderItem = (product) => {
    const imageURL = product?.images?.[0]?.url
    return (
      <Box key={product.id}>
        <Separator />
        <Flex pl={2} pr={1} py={1} flexDirection="row">
          <Flex py={1} flexDirection="column" justifyContent="space-between">
            <Flex>
              <Sans size="3">{product.brand.name}</Sans>
              <Sans size="3" color="black50">
                {product.name}
              </Sans>
              {isSignedIn && !product.isSaved && (
                <TouchableOpacity onPress={() => onSaveForLater(product)}>
                  <Sans mt={2} size="3" style={{ textDecorationLine: "underline" }}>
                    Save for later
                  </Sans>
                </TouchableOpacity>
              )}
            </Flex>
            <Button
              mt={1}
              onPress={() => {
                onViewProduct(product)
              }}
              variant="secondaryWhite"
              size="small"
            >
              View
            </Button>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            {!!imageURL && (
              <FadeInImage
                style={{ height: 144 * PRODUCT_ASPECT_RATIO, width: 144 }}
                resizeMode="contain"
                source={{ uri: imageURL }}
              />
            )}
          </Flex>
        </Flex>
      </Box>
    )
  }

  // console.log("~~", JSON.stringify(DateTime.fromISO(item.createdAt).DATE_MED))
  // Position the shared image target absolutely so that the transitioner knows the final layout after the tab bar disappears.
  return (
    <Container insetsTop={false} insetsBottom={false}>
      <ScrollView>
        <SharedImageTarget id={`fitpic.photo.${item.id}`} uri={item.image?.url} height={imageHeight} />
        <Flex flexGrow={1}>
          <Spacer height={imageHeight + spacing} />
          <Box px={2}>
            <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
              <Sans size="3">{item.author}</Sans>
              <Flex flexDirection="row" alignItems="center">
                {item.includeInstagramHandle && (
                  <>
                    <Sans pr={1} size="3" onPress={onPressInstagramHandle} style={{ textDecorationLine: "underline" }}>
                      {item.user.customer.detail.instagramHandle}
                    </Sans>
                    <Instagram height="18" width="18" />
                  </>
                )}
              </Flex>
            </Flex>
            <Sans size="3" color="black50">
              {item.location
                ? `${item.location.city}, ${item.location.state}`
                : ((date: DateTime) => `${date.monthLong} ${date.day}, ${date.year}`)(DateTime.fromISO(item.createdAt))}
            </Sans>
          </Box>
          {item.products.length > 0 && (
            <>
              <Spacer mb={6} />
              <Sans px={2} mb={1} size="3">
                Tagged Items
              </Sans>
              <Box>
                {item.products?.map((item, i) => {
                  return renderItem(item)
                })}
              </Box>
              <Separator mb={6} />
            </>
          )}
        </Flex>
      </ScrollView>

      <FixedBackArrow variant={"blackTransparent"} navigation={navigation} />
      <ShareButtonWrapper>
        <ShareButton
          onPress={() => {
            navigation.navigate("Modal", {
              screen: "ShareFitPicToIGModal",
              params: { fitPicID: item.id },
            })
          }}
          variant={"blackTransparent"}
          // Not used sicne we have onPress
          options={{
            title: "",
            message: "",
          }}
        />
      </ShareButtonWrapper>
    </Container>
  )
})

// The target for the shared element transition
const SharedImageTarget = (props: { id: string; uri: string; height: number }) => (
  <SharedElement id={props.id}>
    <Box
      style={{
        position: "absolute",
        left: 0,
        top: 0,
      }}
    >
      <FastImage
        source={{
          uri: props.uri,
        }}
        style={{ width: screenWidth, height: props.height }}
      />
    </Box>
  </SharedElement>
)

const ShareButtonWrapper = styled(Box)`
  position: absolute;
  top: 50;
  right: 7;
  z-index: 2000;
`
