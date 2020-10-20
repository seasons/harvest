import { Box, Flex } from "App/Components"
import { color } from "App/utils"
import { Sans } from "Components/Typography"
import React, { ComponentType } from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const BagCardButton: React.FC<{
  Icon: ComponentType
  title: string
  caption: string
  onPress: () => void
}> = ({ Icon, title, caption, onPress }) => {
  const shadowStyles = {
    shadowColor: "black",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: 1,
  }

  return (
    <Box p={1}>
      <TouchableOpacity onPress={onPress}>
        <EmptyBagItemContainer style={shadowStyles}>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="nowrap"
            p={2}
            style={{ flex: 1 }}
          >
            <Box>
              <Sans size="0.5" color="black100">
                {title}
              </Sans>
              <Sans size="0.5" color="black50">
                {caption}
              </Sans>
            </Box>
            <Icon />
          </Flex>
        </EmptyBagItemContainer>
      </TouchableOpacity>
    </Box>
  )
}

const EmptyBagItemContainer = styled(Box)`
  border-radius: 8px;
  height: 80;
  background-color: ${color("white100")};
`
