import React from "react"
import gql from "graphql-tag"
import styled from "styled-components/native"
import { DateTime } from "luxon"
import { Box, FadeInImage, Flex, Sans, Spacer } from "App/Components"
import { Linking, ScrollView, TouchableWithoutFeedback } from "react-native"
import { space } from "App/utils/space"
import { color } from "App/utils"
import { Schema } from "App/Navigation"
import { useNavigation } from "@react-navigation/native"

const ITEM_WIDTH = 171

export const LaunchCalendarFragment_Query = gql`
  fragment LaunchCalendarFragment_Query on Query {
    launches(where: { published: true }, first: 8, orderBy: launchAt_ASC, upcoming: true) {
      id
      launchAt
      brand {
        id
        slug
        published
        websiteUrl
        name
        logoImage {
          id
          url
        }
      }
      collection {
        id
        slug
        title
      }
    }
  }
`

const Item = ({ launch, index, itemCount }) => {
  const navigation = useNavigation()
  const collection = launch?.collection
  const brand = launch?.brand
  const uri = brand?.logoImage?.url

  const onPress = () => {
    if (brand?.published) {
      navigation.navigate(Schema.PageNames.Brand, { id: brand.id, slug: brand.slug, name: brand.name })
    } else if (brand?.websiteUrl) {
      Linking.openURL(brand.websiteUrl)
    } else if (collection?.slug) {
      navigation.navigate(Schema.PageNames.Collection, {
        collectionSlug: collection.slug,
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ItemContainer index={index} itemCount={itemCount}>
        <LaunchContentWrapper height="100%" width="100%">
          {uri ? (
            <FadeInImage source={{ uri }} style={{ width: 87, height: 24 }} />
          ) : (
            <Sans size="5" style={{ textAlign: "center", textTransform: "uppercase" }}>
              {launch.collection?.title}
            </Sans>
          )}
        </LaunchContentWrapper>
        <DateTextWrapper py={1}>
          <Sans size="3" style={{ textAlign: "center" }}>
            {DateTime.fromISO(launch?.launchAt).toUTC().toFormat("LLLL d").toUpperCase()}
          </Sans>
        </DateTextWrapper>
      </ItemContainer>
    </TouchableWithoutFeedback>
  )
}

const getSeasonString = () => {
  const now = DateTime.local()
  const nowMonth = now.month
  let year
  let season
  if (nowMonth < 2) {
    year = now.year
    season = "FW"
  } else if (nowMonth > 7) {
    year = now.year + 1
    season = "FW"
  } else {
    year = now.year
    season = "SS"
  }

  return `${season}${year.toString().slice(-2)}`
}

export const LaunchCalendar: React.FC<{ launches: any }> = ({ launches }) => {
  if (!launches) {
    return null
  }

  const filteredLaunched = launches.filter((l) => {
    return l.brand?.logoImage?.url || l.collection?.title
  })

  return (
    <Box>
      <Flex px={2} pb={2} flexDirection="row" justifyContent="space-between" alignItems="flex-end">
        <Sans size="4" style={{ textAlign: "left" }}>
          Launch calendar
        </Sans>
        <Sans size="4" color="black50" style={{ textAlign: "right" }}>
          {getSeasonString()}
        </Sans>
      </Flex>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredLaunched.map((launch, index) => (
          <Item launch={launch} key={index} index={index} itemCount={filteredLaunched.length} />
        ))}
      </ScrollView>
      <Spacer mb={4} />
    </Box>
  )
}

const ItemContainer = styled(Box)<{ index: number; itemCount: number }>`
  width: ${ITEM_WIDTH}px;
  position: relative;
  border-color: ${color("black10")};
  margin-left: ${(p) => (p.index === 0 ? space(2) : 0)};
  margin-right: ${(p) => (p.index + 1 === p.itemCount ? space(2) : 0)};
  border-left-width: ${(p) => (p.index === 0 ? 1 : 0)};
  border-right-width: 1;
  border-top-width: 1;
  border-bottom-width: 1;
`

const DateTextWrapper = styled(Box)`
  position: relative;
  border-top-width: 1;
  border-color: ${color("black10")};
  width: ${ITEM_WIDTH}px;
`

const LaunchContentWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 180px;
  width: ${ITEM_WIDTH}px;
`
