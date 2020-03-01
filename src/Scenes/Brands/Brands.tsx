import React, { useRef, useState, useEffect } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Container, Box, Spacer, Sans, FixedBackArrow, Flex, Separator } from "App/Components"
import { SectionList, TouchableOpacity } from "react-native"
import { GetBrands } from "App/generated/GetBrands"
import styled from "styled-components/native"
import { useSafeArea } from "react-native-safe-area-context"
import { space, color } from "App/Utils"
import { groupBy, map, sortBy, toPairs } from "lodash"
import { Loader } from "App/Components/Loader"

const GET_BRANDS = gql`
  query GetBrands($orderBy: BrandOrderByInput!) {
    brands(orderBy: $orderBy) {
      id
      name
    }
  }
`

export const Brands = (props: any) => {
  const listRef = useRef(null)
  const [groupedBrands, setGroupedBrands] = useState([])
  const [alphabet, setAlphabet] = useState([])
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

  const renderItem = ({ item }, i, navigation) => {
    return (
      <Flex pl={2} pr={6} flexDirection="column">
        <Spacer mb={2} />
        <TouchableOpacity onPress={() => navigation.navigate("Brand", { id: item?.id })}>
          <Sans size="2" style={{ textDecorationLine: "underline" }}>
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
        <Sans size="3">All designers</Sans>
        <Spacer mb={3} />
        <Separator />
      </Box>
      <Scrubber insetsTop={insets.top}>
        <Flex flexDirection="column" style={{ flex: 1 }} justifyContent="center">
          {alphabet.map((letter, index) => (
            <Box key={letter}>
              <TouchableOpacity
                onPress={() => {
                  console.log("index", index)
                  listRef?.current?.scrollToLocation({
                    sectionIndex: index,
                    itemIndex: 0,
                  })
                }}
              >
                <Box pl={3}>
                  <Sans color={color("black50")} size="0">
                    {letter}
                  </Sans>
                </Box>
              </TouchableOpacity>
            </Box>
          ))}
        </Flex>
      </Scrubber>
      <SectionList
        sections={groupedBrands}
        ref={listRef}
        keyExtractor={item => item.id}
        renderItem={(item, i) => renderItem(item, i, navigation)}
      />
    </Container>
  )
}

const Scrubber = styled(Flex)`
  position: absolute;
  top: ${p => p.insetsTop};
  right: ${space(2)};
  bottom: 0;
  z-index: 1000;
`
