import React, { useState } from "react"
import { Box, Sans, Button, Spacer, Flex, RailPositionIndicator } from "App/Components"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import { styled } from "Components/platform/primitives"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { space } from "App/Utils"
import { Dimensions } from "react-native"

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
    <Box py={2} pl={2} style={{ position: "relative" }}>
      <Sans size="2">{title}</Sans>
      <Box mt={2}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
            return (
              <>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: item.id })}>
                  <Box mr={2}>
                    <ImageContainer source={{ uri: item.imageUrl }}></ImageContainer>
                  </Box>
                </TouchableWithoutFeedback>
                {index === items.length - 1 ? <Spacer mr={negativeSpace} /> : null}
              </>
            )
          }}
          keyExtractor={({ colorway }) => colorway.toString()}
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
                <Sans size="1" mt={0.3}>
                  {selectedItem.brandName}
                </Sans>
                <Sans size="1" color="gray" mt={0.3} numberOfLines={1} clipMode="tail">
                  {selectedItem.productName}
                </Sans>
                <Sans size="1" color="gray" mt={0.3}>
                  {selectedItem.price}
                </Sans>
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

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: ${cardWidth};
`
