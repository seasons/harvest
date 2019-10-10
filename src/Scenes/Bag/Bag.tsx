import React, { useState, useEffect } from "react"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { EmptyState } from "./Components.tsx"
import { Theme, Spacer, Flex, Box, Separator } from "App/Components"
import { Text, Image, FlatList } from "react-native"
import { useStateValue } from "App/helpers/StateProvider"
import { TouchableWithoutFeedback } from "react-native"
import { color } from "App/Utils"
import { BagPlus } from "../../../assets/svgs"
import { goToBrowse } from "App/Navigation"

const SECTION_HEIGHT = 200

export const Bag = () => {
  const [{ bag }, dispatch] = useStateValue()
  const [bagItems, setBagItems] = useState([])
  useEffect(() => {
    const bagArray = bag.items.forEach(item => {
      bagItems.push({ type: "item", ...item })
    })
    for (let i = 0; i < remainingPieces; i++) {
      bagItems.push({ type: "empty" })
    }
    setBagItems(bagArray)
    console.log("bagitems????", bagItems)
  }, [bag])

  if (!bag || !bag.items) {
    return null
  }

  const bagIsEmpty = bag.items.length === 0
  const remainingPieces = 3 - bag.items.length

  const handleRemove = id => {
    return id
  }

  const handleBagPlusPress = () => {
    return goToBrowse()
  }

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
            <TouchableWithoutFeedback onPress={() => handleBagPlusPress()}>
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
            <Flex flex={1} flexDirection="column" justifyContent="center" alignContent="center">
              <EmptyState remainingPieces={remainingPieces} />
            </Flex>
          ) : (
            <Box>
              <Spacer mb={3} />
              <FlatList
                data={bagItems}
                ListHeaderComponent={() => (
                  <Box p={2}>
                    <Sans size="3" color="black">
                      My bag
                    </Sans>
                    <Sans size="2" color="gray">
                      You have {remainingPieces} pieces remaining
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
