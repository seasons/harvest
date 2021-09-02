import { Box, FixedBackArrow, Separator, Spacer } from "App/Components"
import { Schema as NavigationSchema } from "App/Navigation"
import { space } from "App/utils/space"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { Dimensions, FlatList } from "react-native"

import { gql, useMutation, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import { Button, Flex, Loader } from "@seasons/eclipse"

import { ReturnYourBagItem } from "./Components/ReturnYourBagItem"
import { ACTIVE_RESERVATION } from "./CurrentRotation"
import { GetBag_NoCache_Query } from "./BagQueries"

const RETURN_ITEMS = gql`
  mutation ReturnItems($items: [ID!]!) {
    returnItems(items: $items) {
      id
    }
  }
`

export const ReturnYourBag = () => {
  const { previousData, data = previousData } = useQuery(ACTIVE_RESERVATION)
  const navigation = useNavigation()
  const [selectedItems, setSelectedItems] = useState({})
  const [returnItems] = useMutation(RETURN_ITEMS, {
    onCompleted: () => {
      navigation.navigate(NavigationSchema.StackNames.BagStack, {
        screen: NavigationSchema.PageNames.ReturnYourBagConfirmation,
      })
    },
  })

  const activeReservation = data?.me?.activeReservation
  const windowDimensions = Dimensions.get("window")
  const twoButtonWidth = windowDimensions.width / 2 - (space(2) + space(0.5))

  const renderItem = ({ item, index }) => {
    return (
      <Box mx={2} key={index}>
        <ReturnYourBagItem
          physicalProduct={item}
          onSelect={(selected) => {
            if (selected) {
              setSelectedItems({
                ...selectedItems,
                [item.id]: selected,
              })
            } else {
              const updatedSelectedItems = { ...selectedItems }
              delete updatedSelectedItems[item.id]
              setSelectedItems(updatedSelectedItems)
            }
          }}
        />
      </Box>
    )
  }

  if (!data) {
    return <Loader />
  }

  const subscription = data?.me?.customer?.membership?.subscription

  const reservationCreationDate = activeReservation?.createdAt
  const currentTermStart = subscription?.currentTermStart

  const currentTermEndDateTime = DateTime.fromISO(subscription?.currentTermEnd)
  const nextSwapDate = currentTermEndDateTime.plus({ day: 1 })

  const subtitle =
    reservationCreationDate < currentTermStart ? (
      <Sans size="4" color="black50">
        Heads up, it looks like you don’t have a free swap until{" "}
        <Sans size="4" style={{ textDecorationLine: "underline" }}>
          {`${nextSwapDate.weekdayLong}, ${nextSwapDate.monthLong} ${nextSwapDate.day}`}
        </Sans>
        . Return your items early & place a new order for only $30
      </Sans>
    ) : (
      <Sans size="4" color="black50">
        Select which items you're returning below
      </Sans>
    )

  return (
    <Container insetsTop={true}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box style={{ flex: 1 }}>
        <FlatList
          data={activeReservation ? activeReservation.products : []}
          ListHeaderComponent={() => (
            <Box pb={1} px={2}>
              <Spacer mb={80} />
              <Sans size="7" color="black">
                Return your items
              </Sans>
              <Spacer mt="1" />
              {subtitle}
              <Box mt={4} mb={1}>
                <Sans size="4">Which items are you returning?</Sans>
              </Box>
              <Separator />
            </Box>
          )}
          ItemSeparatorComponent={() => (
            <Box px={2}>
              <Separator />
            </Box>
          )}
          keyExtractor={(_item, index) => String(index)}
          renderItem={(item) => renderItem(item)}
          ListFooterComponent={() => (
            <Box px={2}>
              <Separator />
              <Spacer mb={40} />
            </Box>
          )}
        />
      </Box>

      <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Spacer mb={2} />
        <Box px={2}>
          <Flex flexDirection="row" width="100%">
            <Button width={twoButtonWidth} variant="primaryWhite" onPress={() => navigation.goBack()}>
              Cancel
            </Button>
            <Spacer mr={1} />
            <Button
              width={twoButtonWidth}
              variant="primaryBlack"
              onPress={() => {
                returnItems({
                  variables: {
                    items: Object.keys(selectedItems),
                  },
                  awaitRefetchQueries: true,
                  refetchQueries: [{ query: GetBag_NoCache_Query }],
                })
              }}
            >
              Confirm
            </Button>
          </Flex>
        </Box>
        <Spacer mb={2} />
      </FadeBottom2>
    </Container>
  )
}
