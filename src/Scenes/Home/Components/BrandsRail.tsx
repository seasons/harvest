import React, { useState, useEffect } from "react"
import { Box, Sans, Spacer, Flex, RailPositionIndicator } from "App/Components"
import { FlatList, TouchableOpacity, Image } from "react-native"
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
    console.log("items", items)
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
      const styles =
        index !== slideGroup.length - 1 ? { borderBottomColor: `${color("lightGray")}`, borderBottomWidth: 1 } : {}
      return (
        <Box key={brand.logo + index} style={styles}>
          <TouchableOpacity onPress={navigateToBrand}>
            <Flex flexDirection="column">
              <ImageContainer source={{ uri: brand.logo }} resizeMode="contain" />
            </Flex>
          </TouchableOpacity>
        </Box>
      )
    })
  }

  const negativeSpace = Math.round(Dimensions.get("window").width) - (cardWidth + 10)
  return (
    <Box mb={3} pl={2} style={{ position: "relative" }}>
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
          keyExtractor={(item, index) => "brand" + index}
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
          <RailPositionIndicator length={slideGroups.length} currentPage={currentPage} />
        </Box>
      </Box>
    </Box>
  )
}

const GroupWrapper = styled(Box)`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: ${cardWidth};
  background-color: ${color("white")};
  border: 1px solid ${color("lightGray")};
  border-radius: 10px;
`

const ImageContainer = styled(Image)`
  height: 70;
`
