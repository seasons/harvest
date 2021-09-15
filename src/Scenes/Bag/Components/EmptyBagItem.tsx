import { Box, Flex, Spacer } from "App/Components"
import { Sans } from "Components/Typography"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { BagPlus } from "../../../../assets/svgs"

export const EmptyBagItem: React.FC<{ text: string; navigation: any }> = ({ text, navigation }) => {
  return (
    <EmptyBagItemContainer>
      <Flex flexDirection="row" alignItems="center" justifyContent="center" style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("BrowseStack")}>
          <Flex flexDirection="column" alignItems="center" justifyContent="center">
            <BagPlus />
            <Spacer mb={2} />
            <Sans size="3" color="black50" style={{ textAlign: "center" }}>
              {text}
            </Sans>
          </Flex>
        </TouchableOpacity>
      </Flex>
    </EmptyBagItemContainer>
  )
}

const EmptyBagItemContainer = styled(Box)`
  height: 248;
`
