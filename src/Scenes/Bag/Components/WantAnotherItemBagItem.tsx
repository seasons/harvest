import { useNavigation } from "@react-navigation/native"
import { Box, Flex, Separator } from "App/Components"
import { Schema } from "App/Navigation"
import { Sans } from "Components/Typography"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const WantAnotherItemBagItem: React.FC<{ itemCount: number }> = ({ itemCount }) => {
  const navigation = useNavigation()
  const nextItem = itemCount === 2 ? "3rd" : "2nd"
  return (
    <>
      <Separator />
      <Box p={2}>
        <EmptyBagItemContainer>
          <Flex pt="84px" flexDirection="column" alignItems="center">
            <Flex flexWrap="nowrap" flexDirection="column" alignItems="center">
              <TouchableOpacity
                onPress={() => navigation.navigate("Modal", { screen: Schema.PageNames.UpdatePaymentPlanModal })}
              >
                <Sans size="2" color="black100" textAlign="center">
                  {`Want a ${nextItem} item?`}
                </Sans>
                <Sans size="2" color="black50" textAlign="center" style={{ textDecorationLine: "underline" }}>
                  Add a slot for $30
                </Sans>
              </TouchableOpacity>
            </Flex>
          </Flex>
        </EmptyBagItemContainer>
      </Box>
    </>
  )
}

const EmptyBagItemContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
  height: 270;
`
