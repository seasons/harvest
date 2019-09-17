import React from "react"
import { Sans, Box, Radio, Spacer, TextInput, Flex } from "../../../components"
import { FlatList } from "react-native"

export class EditView extends React.Component {
  sections = () => {
    const sections = ["Header", "Delivery address", "Billing address", "Payment information"]

    return sections
  }

  renderItem = ({ item: section }) => {
    switch (section) {
      case "Header":
        return (
          <Box px={2} mt={100}>
            <Sans size="3">Payment & shipping</Sans>
          </Box>
        )
      case "Delivery address":
        return (
          <Box px={2}>
            <Sans size="2">Delivery address</Sans>
            <Spacer mb={1} />
            <TextInput placeholder="Address" />
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="Unit" />
              <Spacer ml={1} />
              <TextInput placeholder="Zipcode" />
            </Flex>
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="City" />
              <Spacer ml={1} />
              <TextInput placeholder="State" />
            </Flex>
          </Box>
        )
      case "Billing address":
        return (
          <Box px={2}>
            <Sans size="2">Billing address</Sans>
            <Spacer mb={2} />
            <Radio selected={false} onSelect={() => console.log("selected")} label="Same as Delivery Address" />
            <Spacer mb={2} />
            <TextInput placeholder="Address" />
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="Unit" />
              <Spacer ml={1} />
              <TextInput placeholder="Zipcode" />
            </Flex>
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="City" />
              <Spacer ml={1} />
              <TextInput placeholder="State" />
            </Flex>
          </Box>
        )
      case "Payment information":
        return (
          <Box px={2}>
            <Sans size="2">Payment information</Sans>
            <Spacer mb={1} />
            <TextInput placeholder="Address" />
            <Flex>
              <TextInput placeholder="Unit" />
              <TextInput placeholder="Zipcode" />
            </Flex>
            <Flex>
              <TextInput placeholder="City" />
              <TextInput placeholder="State" />
            </Flex>
          </Box>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <FlatList
        data={this.sections()}
        ItemSeparatorComponent={() => <Spacer mb={3} />}
        keyExtractor={(item, index) => item + String(index)}
        renderItem={item => this.renderItem(item)}
        ListFooterComponent={() => <Spacer mb={100} />}
      />
    )
  }
}
