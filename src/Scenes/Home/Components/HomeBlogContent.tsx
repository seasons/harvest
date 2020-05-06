import React from "react"
import { Box, Flex, Separator, FadeInImage, Spacer } from "App/Components"
import { LogoText, Sans } from "App/Components/Typography"
import { useSafeArea } from "react-native-safe-area-context"
import { space } from "App/utils"
import styled from "styled-components/native"
import { FlatList, TouchableWithoutFeedback, Dimensions } from "react-native"
import { imageResize } from "App/helpers/imageResize"
import { useNavigation } from "@react-navigation/native"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { Schema } from "App/Navigation"

export const HomeBlogContent = ({ items }) => {
  const insets = useSafeArea()
  const navigation = useNavigation()
  const windowWidth = Dimensions.get("window").width

  const renderItem = ({ item }) => {
    console.log("item", item)
    const resizedImage = !!item.imageURL && imageResize(item.imageURL, "large")
    return (
      <>
        <TouchableWithoutFeedback onPress={() => navigation.navigate(Schema.PageNames.Webview, { uri: item.url })}>
          <FadeInImage
            source={{ uri: resizedImage }}
            style={{ width: windowWidth, height: windowWidth * PRODUCT_ASPECT_RATIO }}
          />
        </TouchableWithoutFeedback>
      </>
    )
  }

  return (
    <>
      <TitleWrapper px={2} pt={insets.top + space(2)}>
        <Flex flexDirection="row" justifyContent="center" flexWrap="nowrap" alignContent="center">
          <LogoText>SEASONS</LogoText>
        </Flex>
      </TitleWrapper>
      <Overlay pointerEvents="none" />
      <FlatList
        ListHeaderComponent={() => <></>}
        data={items}
        horizontal
        keyExtractor={(item, index) => item.id + index}
        renderItem={(item, i) => renderItem(item)}
      />
    </>
  )
}

const TitleWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
`
