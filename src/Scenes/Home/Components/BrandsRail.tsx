import React, { useState, useEffect } from "react"
import { Box, Sans, Spacer, Flex, RailPositionIndicator } from "App/Components"
import { FlatList, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { space, color } from "App/Utils"
import { Dimensions } from "react-native"
import { chunk } from "lodash"

interface BrandsRailProps {
  items: any
  title?: string
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const cardWidth = 240

export const BrandsRail: React.FC<BrandsRailProps> = ({ items, title, navigation }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [slideGroups, createSlideGroups] = useState([])

  useEffect(() => {
    const cards = chunk(items, 6)
    createSlideGroups(cards)
  }, [])

  const onScroll = e => {
    const newPageNum = Math.round(e.nativeEvent.contentOffset.x / cardWidth + 1)

    if (newPageNum !== currentPage) {
      setCurrentPage(newPageNum)
    }
  }

  const navigateToBrand = () => {
    // FIXME: Navigate to brand
  }

  const slide = slideGroup => {
    return slideGroup.map((brand, index) => {
      const styles = index !== slideGroup.length - 1 ? { borderBottom: `1px solid ${color("lightGray")}` } : {}
      return (
        <TouchableOpacity onPress={navigateToBrand}>
          <Flex key={brand.image.url} alignContent="center" justifyContent="center" style={styles}>
            {brand.image.url}
          </Flex>
        </TouchableOpacity>
      )
    })
  }

  const negativeSpace = Math.round(Dimensions.get("window").width) - (cardWidth + 10)
  return (
    <Box py={2} pl={2} style={{ position: "relative" }}>
      <Sans size="2">{title}</Sans>
      <Box mt={2}>
        <FlatList
          data={slideGroups}
          renderItem={({ item, index }) => {
            return (
              <>
                <Box mr={2}>
                  <GroupWrapper>{slide(item)}</GroupWrapper>
                </Box>
                {index === items.length - 1 ? <Spacer mr={negativeSpace} /> : null}
              </>
            )
          }}
          keyExtractor={({ colorway }) => colorway.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          overScrollMode="always"
          snapToAlignment="start"
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={299}
          directionalLockEnabled={true}
          snapToInterval={cardWidth + space(1)}
        />
        <Spacer mb={2} />
        <Box pr={2}>
          <RailPositionIndicator length={items.length} currentPage={currentPage} />
        </Box>
      </Box>
    </Box>
  )
}

const GroupWrapper = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: ${cardWidth};
  border: 1px solid ${color("lightGray")};
  border-radius: 10px;
`
