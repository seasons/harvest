import { Box, Flex, Spacer } from "App/Components"
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
  return (
    <Wrapper mb={2}>
      <TouchableOpacity onPress={onPress}>
        <Flex px={3} py={3} flexDirection="row" justifyContent="flex-start" alignItems="center" flexWrap="nowrap">
          <Icon />
          <Spacer mr={2} />
          <Box>
            <Sans size="4" color="black100">
              {title}
            </Sans>
            <Sans size="4" color="black50">
              {caption}
            </Sans>
          </Box>
        </Flex>
      </TouchableOpacity>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  background-color: ${color("black04")};
  border-radius: 8;
`
