import React, { useState, useEffect, useCallback } from "react"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { EmptyState } from "./Components.tsx"
import { Theme, Spacer, Flex, Box, Separator } from "App/Components"
import { Text, Image, FlatList } from "react-native"
import { useStateValue } from "App/helpers/StateProvider"
import { TouchableWithoutFeedback } from "react-native"
import { color } from "App/utils"
import { BagPlus } from "../../../assets/svgs"
import { goToBrowse } from "App/Navigation"
import { Navigation } from "react-native-navigation"
import { BAG_NUM_ITEMS } from "App/App"

const SECTION_HEIGHT = 200

export const Bag = () => {
  const [{ bag }, dispatch] = useStateValue()
  const [_, updateState] = useState({})

  useEffect(() => {
    Navigation.events().registerComponentDidAppearListener(args => {
      if (args.componentName === "Bag") {
        console.log("bag updating")
        updateState({})
      }
    })
  }, [])

  console.log("bag???", bag.items)
  if (!bag || !bag.items) {
    return null
  }

  const remainingPieces = BAG_NUM_ITEMS - bag.items.length
  const bagIsEmpty = bag.items.length === 0

  const emptyBagItem = index => {
    return (
      <Box p={2} style={{ height: SECTION_HEIGHT }}>
        <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
          <Box>
            <Sans size="3">{index + 1}.</Sans>
            <Sans size="2" color="gray">
              Add your item
            </Sans>
          </Box>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            <TouchableWithoutFeedback onPress={() => goToBrowse()}>
              <BagPlus />
            </TouchableWithoutFeedback>
            <Spacer mr={3} />
          </Flex>
        </Flex>
      </Box>
    )
  }

  const bagItem = (item, index) => {
    const imageURL = item.images && item.images.length && item.images[0].url
    return (
      <Box p={2} key={item.id} style={{ height: SECTION_HEIGHT }}>
        <Flex flexDirection="row" style={{ flex: 1 }}>
          <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              <Sans size="3">{index + 1}.</Sans>
              <Sans size="2">{item.brand.name}.</Sans>
              <Sans size="2" color="gray">
                {item.name}.
              </Sans>
            </Box>
            <Box>
              <Text>
                <Sans size="2" color="gray">
                  Size {item.modelSize} |
                </Sans>
                {"  "}
                <TouchableWithoutFeedback
                  onPress={() =>
                    dispatch({
                      type: "removeItemFromBag",
                      item: item,
                    })
                  }
                >
                  <Sans size="2" color="blue">
                    Remove
                  </Sans>
                </TouchableWithoutFeedback>
              </Text>
            </Box>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            <Image style={{ height: SECTION_HEIGHT, width: 160 }} resizeMode="contain" source={{ uri: imageURL }} />
          </Flex>
        </Flex>
      </Box>
    )
  }

  const renderItem = ({ item, index }) => {
    return item.type === "item" ? bagItem(item, index) : emptyBagItem(index)
  }

  return (
    <Theme>
      <Container>
        <Box style={{ flex: 1 }}>
          <Spacer mb={3} />
          {bagIsEmpty ? (
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center" alignContent="center">
              <EmptyState remainingPieces={remainingPieces} />
            </Flex>
          ) : (
            <Box>
              <Spacer mb={3} />
              <FlatList
                data={bag.items}
                ListHeaderComponent={() => (
                  <Box p={2}>
                    <Sans size="3" color="black">
                      My bag
                    </Sans>
                    <Sans size="2" color="gray">
                      You have {remainingPieces} {remainingPieces === 1 ? "piece" : "pieces"} remaining
                    </Sans>
                  </Box>
                )}
                ItemSeparatorComponent={() => (
                  <Box px={2}>
                    <Spacer mb={2} />
                    <Separator color={color("lightGray")} />
                    <Spacer mb={2} />
                  </Box>
                )}
                keyExtractor={(_item, index) => String(index)}
                renderItem={item => renderItem(item)}
                ListFooterComponent={() => <Spacer mb={200} />}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Theme>
  )
}
