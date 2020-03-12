import React, { useRef, useState, useEffect } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Container, Box, Spacer, Sans, FixedBackArrow, Flex, Separator } from "App/Components"
import { FlatList, TouchableOpacity, PanResponder } from "react-native"
import { GetBrands } from "App/generated/GetBrands"
import styled from "styled-components/native"
import { useSafeArea } from "react-native-safe-area-context"
import { color } from "App/utils"
import { groupBy, map, sortBy, toPairs } from "lodash"
import { Loader } from "App/Components/Loader"
import { screenTrack, useTracking, Schema } from "App/utils/track"

// NOTE: We need to query products here to filter out brands with 0 products in Monsoon
const GET_BRANDS = gql`
  query GetBrands($orderBy: BrandOrderByInput!) {
    brands(orderBy: $orderBy) {
      id
      slug
      name
      products {
        id
      }
    }
  }
`

const ITEM_HEIGHT = 60

export const Brands = screenTrack()((props: any) => {
  const listRef = useRef(null)
  const tracking = useTracking()
  const alphabetContainer = useRef(null)
  const [groupedBrands, setGroupedBrands] = useState([])
  const [alphabet, setAlphabet] = useState([])
  const [containerSize, setContainerSize] = useState({ containerTop: null, containerHeight: null })
  const insets = useSafeArea()
  const { navigation } = props
  const { data } = useQuery<GetBrands>(GET_BRANDS, {
    variables: {
      orderBy: "name_ASC",
    },
  })

  const groupBrands = brands => {
    const brandPairs = toPairs(
      groupBy(brands, ({ name }) => {
        const char = name.charAt(0)
        if (char.match(/[a-z]/i)) {
          return char
        } else {
          return "#"
        }
      })
    )
    const groupedBrands: any = sortBy(
      map(brandPairs, ([letter, brandsForLetter], index) => ({
        data: brandsForLetter,
        letter: letter.toUpperCase(),
        index,
      })),
      ({ letter }) => letter
    )
    setAlphabet(groupedBrands.map(brand => brand.letter))
    setGroupedBrands(groupedBrands)
  }

  useEffect(() => {
    if (data?.brands) {
      groupBrands(data.brands)
    }
  }, [data])

  if (groupedBrands.length === 0 && alphabet.length === 0) {
    return <Loader />
  }

  const getTouchedLetter = y => {
    const top = y - (containerSize.containerTop || 0) - 5

    if (top >= 1 && top <= containerSize.containerHeight) {
      return alphabet[Math.round((top / containerSize.containerHeight) * alphabet.length)]
    }
  }

  const handleOnFingerTouch = (e, gestureState) => {
    const letter = getTouchedLetter(gestureState.y0)
    handleOnTouchLetter(letter)
    tracking.trackEvent({
      actionName: Schema.ActionNames.AlphabetTapped,
      actionType: Schema.ActionTypes.Tap,
      letter,
    })
  }

  const handleOnFingerMove = (evt, gestureState) => {
    handleOnTouchLetter(getTouchedLetter(gestureState.moveY))
  }

  const scrollTo = touchedLetter => {
    let index
    if (touchedLetter === "#") {
      index = 0
      listRef?.current?.scrollToOffset({ animated: false, offset: index })
    } else {
      index = data?.brands.findIndex(
        item =>
          item["name"]
            .charAt(0)
            .toUpperCase()
            .localeCompare(touchedLetter) === 0
      )
      if (index > -1) {
        listRef?.current?.scrollToOffset({ animated: false, offset: index * ITEM_HEIGHT })
      }
    }
  }

  const handleOnTouchLetter = touchedLetter => {
    scrollTo(touchedLetter)
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => handleOnFingerTouch(evt, gestureState),
    onPanResponderMove: (evt, gestureState) => handleOnFingerMove(evt, gestureState),
  })

  const renderItem = ({ item }, i, navigation) => {
    return (
      <Flex pl={2} pr={6} flexDirection="column">
        <Spacer mb={2} />
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.CategoryTapped,
              actionType: Schema.ActionTypes.Tap,
              brandId: item?.id,
              brandSlug: item?.slug,
            })
            navigation.navigate("Brand", { id: item?.id, slug: item?.slug })
          }}
        >
          <Sans size="2" style={{ textDecorationLine: "underline" }}>
            {item.name}
          </Sans>
        </TouchableOpacity>
        <Spacer mb={2} />
        <Separator />
      </Flex>
    )
  }

  const handleOnLayout = () => {
    alphabetContainer?.current?.measure((width, x1, y1, height, px, py) => {
      if (!containerSize.containerTop && !containerSize.containerHeight) {
        setContainerSize({ containerTop: py, containerHeight: height })
      }
    })
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box pl={2} pr={6}>
        <Spacer mb={80} />
        <Sans size="3">All designers</Sans>
        <Spacer mb={3} />
        <Separator />
      </Box>
      <Scrubber insetsTop={insets.top}>
        <Flex flexDirection="column" style={{ flex: 1 }} justifyContent="center">
          <Box py={2} pr={2} pl={3} {...panResponder?.panHandlers} onLayout={handleOnLayout} ref={alphabetContainer}>
            {alphabet.map(letter => (
              <Box key={letter}>
                <Box>
                  <Sans color={color("black50")} size="0">
                    {letter}
                  </Sans>
                </Box>
              </Box>
            ))}
          </Box>
        </Flex>
      </Scrubber>
      <FlatList
        getItemLayout={(data, index) => {
          return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
        }}
        data={data?.brands}
        ref={listRef}
        keyExtractor={item => item.id}
        renderItem={(item, i) => renderItem(item, i, navigation)}
      />
    </Container>
  )
})

const Scrubber = styled(Flex)`
  position: absolute;
  top: ${p => p.insetsTop};
  right: 0;
  bottom: 0;
  z-index: 1000;
`
