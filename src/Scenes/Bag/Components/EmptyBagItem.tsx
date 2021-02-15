import { Box, Flex, Spacer } from "App/Components"
import { Sans } from "Components/Typography"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { BagPlus } from "../../../../assets/svgs"

export const EmptyBagItem: React.FC<{ index: number; navigation: any }> = ({ index, navigation }) => {
  return (
    <Box>
      <EmptyBagItemContainer>
        <Spacer />
        <Sans size="4" color="black100">
          {index + 1}. Add an item
        </Sans>
        <Sans size="4" color="black50">
          Or tap below for recommendations
        </Sans>
        <Flex pt="84px" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.navigate("BrowseStack")}>
            <Box>
              <BagPlus />
            </Box>
          </TouchableOpacity>
        </Flex>
      </EmptyBagItemContainer>
    </Box>
  )
}

const EmptyBagItemContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
  height: 216;
`
