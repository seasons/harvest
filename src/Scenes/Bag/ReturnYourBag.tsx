import { Box, FixedBackArrow, Separator, Spacer } from "App/Components"
import { Schema as NavigationSchema } from "App/Navigation"
import { space } from "App/utils/space"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import React, { useState } from "react"
import { Dimensions, FlatList } from "react-native"

import { gql, useMutation, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import { Button, Flex, Loader } from "@seasons/eclipse"

import { ReturnYourBagItem } from "./Components/ReturnYourBagItem"
import { GetBag_NoCache_Query } from "./BagQueries"

const RETURN_ITEMS = gql`
  mutation ReturnItems($items: [ID!]!) {
    returnItems(items: $items) {
      id
    }
  }
`

const getAtHomeBagSection = gql`
  query getAtHomeBagSection {
    me {
      id
      atHomeSection: bagSection(status: AtHome) {
        id
        status
        bagItems {
          id
          physicalProduct {
            id
            productVariant {
              id
              displayLong
              product {
                id
                slug
                name
                brand {
                  id
                  name
                }
                images {
                  id
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ReturnYourBag = () => {
  const { previousData, data = previousData } = useQuery(getAtHomeBagSection)
  const navigation = useNavigation()
  const [isMutating, setIsMutating] = useState(false)
  const [selectedItems, setSelectedItems] = useState({})
  const [returnItems] = useMutation(RETURN_ITEMS, {
    onError: () => {
      setIsMutating(false)
    },
    onCompleted: () => {
      setIsMutating(false)
      navigation.navigate(NavigationSchema.StackNames.BagStack, {
        screen: NavigationSchema.PageNames.ReturnYourBagConfirmation,
      })
    },
  })

  const atHomeItems = data?.me?.atHomeSection?.bagItems

  const physicalProducts = atHomeItems?.map((item) => item.physicalProduct)

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

  return (
    <Container insetsTop={true}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box style={{ flex: 1 }}>
        <FlatList
          data={physicalProducts.length > 0 ? physicalProducts : []}
          ListHeaderComponent={() => (
            <Box pb={1} px={2}>
              <Spacer mb={80} />
              <Sans size="7" color="black">
                Return your items
              </Sans>
              <Spacer mt="1" />
              <Sans size="4" color="black50">
                Before placing another order, we need to know what you’re returning.
              </Sans>
              <Box mt={4} mb={1}>
                <Sans size="4">What are you returning?</Sans>
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
              loading={isMutating}
              disabled={!Object.keys(selectedItems).length}
              onPress={() => {
                if (isMutating) {
                  return
                }
                setIsMutating(true)
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
