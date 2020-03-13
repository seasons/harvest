import { Container, Sans, Spacer, CloseButton, Flex, Separator, Box } from "App/Components"
import React from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { space } from "App/utils"

export const DebugMenu = () => {
  const listItems = [
    { title: "Debug", onPress: null, key: "debug" },
    { title: "Debug", onPress: null, key: "debug" },
    { title: "Debug", onPress: null, key: "debug" },
  ]

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <Flex flexDirection="row" styele={{ height: 44 }} alignContent="center">
          <Box pl={2}>
            <Sans size="2">{item.title}</Sans>
          </Box>
        </Flex>
        <Separator />
      </TouchableOpacity>
    )
  }

  return (
    <Container insetsBottom={false}>
      <CloseButton />
      <FlatList
        ListFooterComponent={() => <Spacer mb={space(2)} />}
        data={listItems}
        numColumns={2}
        renderItem={item => renderItem(item)}
      />
    </Container>
  )
}
