import React, { useState } from "react"
import { Box, Sans, Button, Spacer, Flex, RailPositionIndicator } from "App/Components"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { space } from "App/Utils"
import { Dimensions } from "react-native"
import * as Animatable from "react-native-animatable"
import { FadeInImage } from "App/Components/FadeInImage"

interface ProductsRailProps {
  items: any
  title?: string
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const cardWidth = 240

export const ProductsRail: React.FC<ProductsRailProps> = ({ items, title, navigation }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState((items && items.length && items[0]) || null)

  const onScroll = e => {
    const newPageNum = Math.round(e.nativeEvent.contentOffset.x / cardWidth + 1)

    if (newPageNum !== currentPage) {
      setCurrentPage(newPageNum)
      setSelectedItem(items[newPageNum - 1])
    }
  }

  const negativeSpace = Math.round(Dimensions.get("window").width) - (cardWidth + 10)
  return (
    <Box mb={40} pl={2} style={{ position: "relative" }}>
      <Sans size="2">{title}</Sans>
      <Box mt={2}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
            const image = item.images && item.images.length && item.images[0]
            return (
              <Animatable.View animation="fadeIn" duration={300}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: item.id })}>
                  <Box mr={2}>
                    <ImageContainer source={{ uri: image.url }}></ImageContainer>
                  </Box>
                </TouchableWithoutFeedback>
                {index === items.length - 1 ? <Spacer mr={negativeSpace} /> : null}
              </Animatable.View>
            )
          }}
          keyExtractor={(item, index) => item.id + index}
          showsHorizontalScrollIndicator={false}
          horizontal
          onScroll={onScroll}
          overScrollMode="always"
          snapToAlignment="start"
          decelerationRate="fast"
          scrollEventThrottle={299}
          directionalLockEnabled={true}
          snapToInterval={cardWidth + space(1)}
        />
        <Spacer mb={2} />
        <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
          <Box>
            {selectedItem && (
              <>
                {selectedItem.brand && selectedItem.brand.name && (
                  <Sans size="1" mt={0.3}>
                    {selectedItem.brand.name}
                  </Sans>
                )}
                {selectedItem.name && (
                  <Sans size="1" color="gray" mt={0.3} numberOfLines={1} clipMode="tail">
                    {selectedItem.name}
                  </Sans>
                )}
                {selectedItem.retailPrice && (
                  <Sans size="1" color="gray" mt={0.3}>
                    ${selectedItem.retailPrice}
                  </Sans>
                )}
              </>
            )}
          </Box>
          <Box pr={2}>
            <Button size="small" onPress={() => navigation.navigate("Product", { id: selectedItem.id })}>
              Reserve
            </Button>
          </Box>
        </Flex>
        <Spacer mb={2} />
        <Box pr={2}>
          <RailPositionIndicator length={items.length} currentPage={currentPage} />
        </Box>
      </Box>
    </Box>
  )
}

const ImageContainer = styled(FadeInImage)`
  height: 360;
  width: ${cardWidth};
`
