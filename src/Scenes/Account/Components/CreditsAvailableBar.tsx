import { formatPrice } from "App/utils/formatPrice"
import React from "react"
import styled from "styled-components/native"

import { Box, Flex, Sans } from "@seasons/eclipse"
import { colors } from "@seasons/eclipse/src/theme/colors"

export const CreditsAvailableBar = ({ membership }) => {
  const creditBalance = membership?.adjustedCreditBalance
  const textColor = creditBalance > 0 ? colors.white100 : colors.black100

  return (
    <Bar style={{ backgroundColor: creditBalance > 0 ? colors.black100 : colors.black04 }}>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center" p={2} px={3} mt={1}>
        <Sans size="5" color={textColor}>
          Available Credits
        </Sans>
        <Sans size="5" color={textColor}>
          {formatPrice(membership?.adjustedCreditBalance)}
        </Sans>
      </Flex>
    </Bar>
  )
}

const Bar = styled(Box)`
  position: absolute;
  bottom: 20;
  left: 15;
  right: 15;
  height: 50px;
  border-radius: 25px;
`
