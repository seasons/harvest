import { Box, Flex } from "App/Components"
import { Sans } from "Components/Typography"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import { BagPlus } from "../../../../assets/svgs"

export const EmptyBagItem = props => {
  const { navigation } = props

  return (
    <Box p={2}>
      <EmptyBagItemContainer>
        <Flex flex={1} pt="84px" flexDirection="column" alignItems="center">
          <Flex flexWrap="nowrap" flexDirection="column" alignItems="center" alignSelf="center">
            <TouchableOpacity onPress={() => navigation.navigate("Browse")}>
              <Box>
                <Box my={1} mx="auto">
                  <BagPlus />
                </Box>
                <Sans size="2" color="black" textAlign="center">
                  Add item
                </Sans>
              </Box>
            </TouchableOpacity>
          </Flex>
        </Flex>
      </EmptyBagItemContainer>
    </Box>
  )
}

const EmptyBagItemContainer = styled(Box)`
  background: #f6f6f6;
  border-radius: 8px;
  overflow: hidden;
  height: 270;
`
