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

const RETURN_ITEMS = gql`
  mutation ReturnItems($items: [ID!]!) {
    returnItems(items: $items) {
      id
    }
  }
`

export const ReturnYourBag = () => {
  const { previousData, data = previousData, loading } = useQuery(ACTIVE_RESERVATION)
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

  if (loading) {
    return <Loader />
  }

  const date = activeReservation.returnAt
    ? DateTime.fromISO(activeReservation.returnAt)
    : DateTime.fromISO(activeReservation.createdAt).plus({ month: 1 })

  return (
    <Container insetsTop={true}>
      <Box style={{ flex: 1 }}>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <FlatList
          data={activeReservation ? activeReservation.products : []}
          ListHeaderComponent={() => (
            <Box pt={3} pb={1} px={2}>
              <Spacer mb={80} />
              <Sans size="7" color="black">
                Return your items
              </Sans>
              <Spacer mt="1" />
              <Sans size="5" color="black50">
                Heads up, it looks like you don’t have a free swap until{" "}
                <Sans size="5" style={{ textDecorationLine: "underline" }}>
                  {date.toLocaleString(DateTime.DATE_FULL)}
                </Sans>
                . Return your items early & place a new order for only $35
              </Sans>
              <Box mt={4} mb={1}>
                <Sans size="5">Which items are you returning?</Sans>
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
