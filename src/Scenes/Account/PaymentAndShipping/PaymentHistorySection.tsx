import { Box, Sans, Spacer, Separator, Flex } from "App/Components"
import React from "react"
import { color } from "App/utils"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { formatInvoiceDate, getAdjustedInvoiceTotal } from "./utils"

export const PaymentHistorySection = ({ title, value }) => {
  const navigation = useNavigation()
  return (
    <Box key={title} px={2}>
      <Sans size="4">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("black10")} />
      {value?.map((a, i) => (
        <Box key={i}>
          <Spacer mb={3} />
          <TouchableOpacity key={title} onPress={() => navigation.navigate("InvoiceDetail", { invoice: a })}>
            <Flex flexDirection="row" style={{ flex: 1 }} justifyContent="space-between">
              <Sans size="4">{formatInvoiceDate(a.dueDate)}</Sans>
              <Sans size="4">{getAdjustedInvoiceTotal(a)}</Sans>
            </Flex>
          </TouchableOpacity>
          <Spacer mb={3} />
          <Separator color={color("black10")} />
        </Box>
      ))}
      <Spacer mb={100} />
    </Box>
  )
}
