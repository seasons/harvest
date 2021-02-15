import React, { useRef, useState, useEffect } from "react"
import gql from "graphql-tag"
import { AlphabetScrubber } from "App/Components/AlphabetScrubber"
import { useQuery } from "@apollo/client"
import { Container, Box, Spacer, Sans, FixedBackArrow, Flex, Separator } from "App/Components"
import { FlatList, TouchableOpacity } from "react-native"
import { GetBrands } from "App/generated/GetBrands"
import { groupBy, map, sortBy, toPairs } from "lodash"
import { Loader } from "App/Components/Loader"
import { screenTrack, useTracking, Schema } from "App/utils/track"

const GET_BRANDS = gql`
  query GetBrands($orderBy: BrandOrderByInput!) {
    brands(orderBy: $orderBy, where: { products_some: { id_not: null } }) {
      id
      slug
      name
    }
  }
`

const ITEM_HEIGHT = 60

export const Brands = screenTrack()((props: any) => {
  const listRef = useRef(null)
  const tracking = useTracking()
  const [groupedBrands, setGroupedBrands] = useState([])
  const [alphabet, setAlphabet] = useState([])
  const { navigation } = props
  const { data } = useQuery<GetBrands>(GET_BRANDS, {
    variables: {
      orderBy: "name_ASC",
    },
  })

  const groupBrands = (brands) => {
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
    setAlphabet(groupedBrands.map((brand) => brand.letter))
    setGroupedBrands(groupedBrands)
  }

  useEffect(() => {
    if (data?.brands) {
      groupBrands(data.brands)
    }
  }, [data])

  if (!data || (groupedBrands.length === 0 && alphabet.length === 0)) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const onAlphabetScrollTo = (touchedLetter) => {
    let index
    if (touchedLetter === "#") {
      index = 0
      listRef?.current?.scrollToOffset?.({ animated: false, offset: index })
    } else {
      index = data?.brands.findIndex((item) => item["name"].charAt(0).toUpperCase().localeCompare(touchedLetter) === 0)
      if (index > -1) {
        listRef?.current?.scrollToOffset?.({ animated: false, offset: index * ITEM_HEIGHT })
      }
    }
  }

  const renderItem = ({ item }, i, navigation) => {
    return (
      <Flex pl={2} pr={6} flexDirection="column">
        <Spacer mb={2} />
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.BrandTapped,
              actionType: Schema.ActionTypes.Tap,
              brandID: item?.id,
              brandSlug: item?.slug,
              brandName: item?.name,
            })
            navigation.navigate("Brand", { id: item?.id, slug: item?.slug, name: item.name })
          }}
        >
          <Sans size="5" style={{ textDecorationLine: "underline" }}>
            {item.name}
          </Sans>
        </TouchableOpacity>
        <Spacer mb={2} />
        <Separator />
      </Flex>
    )
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box pl={2} pr={6}>
        <Spacer mb={80} />
        <Sans size="7">All designers</Sans>
        <Spacer mb={3} />
        <Separator />
      </Box>
      <AlphabetScrubber alphabet={alphabet} scrollTo={onAlphabetScrollTo} style={{ bottom: 0 }} />
      <FlatList
        getItemLayout={(data, index) => {
          return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
        }}
        data={data?.brands}
        ref={listRef}
        keyExtractor={(item) => item.id}
        renderItem={(item, i) => renderItem(item, i, navigation)}
      />
    </Container>
  )
})
