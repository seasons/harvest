import React from "react"
import { Flex, Box, Sans } from "../../components"

interface Props {
  item: {
    title: string
    link?: string
    icon: JSX.Element
  }
}

export class ProfileListItem extends React.Component<Props> {
  openURL = () => {
    // FIXME: Add href to list item view
  }

  render() {
    const { item } = this.props

    return (
      <Flex style={{ margin: 20 }} justifyContent="space-between" onPress={this.openURL}>
        <Box style={{ marginRight: 10 }}>{item.icon}</Box>
        <Sans size="2">{item.title}</Sans>
      </Flex>
    )
  }
}
