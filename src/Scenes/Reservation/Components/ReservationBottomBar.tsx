import { Button, ButtonProps } from "App/Components/Button"
import React from "react"
import styled from "styled-components/native"

import { Box, Flex, Sans, Separator } from "@seasons/eclipse"

import { formatPrice } from "../ReservationLineItems"

interface ReservationBottomBarProps {
  lineItems: any[]
  onReserve: () => void
  buttonProps?: Omit<ButtonProps, "children">
}

export const ReservationBottomBar: React.FC<ReservationBottomBarProps> = ({ lineItems, onReserve, buttonProps }) => {
  const total = lineItems.reduce((acc, curr) => acc + curr.taxPrice + curr.price, 0)

  return (
    <Wrapper pb={2}>
      <Separator />
      <Box height={80} pt={2} px={2}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Sans size="3" color="black50">
              Your 30-day total
            </Sans>
            <Flex flexDirection="row" alignItems="center">
              <Sans size="6">{formatPrice(total)}</Sans>
            </Flex>
          </Box>

          <Box>
            <Button {...buttonProps} variant="primaryBlack" onPress={onReserve}>
              Confirm Order
            </Button>
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Flex)`
  background: white;
  position: absolute;
  bottom: 0;
  z-index: 100;
  right: 0;
  left: 0;
`
