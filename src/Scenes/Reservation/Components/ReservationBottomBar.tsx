import { Button, ButtonProps } from "App/Components/Button"
import { formatPrice } from "App/utils/formatPrice"
import React from "react"
import styled from "styled-components/native"

import { Box, Flex, Sans, Separator, Spinner } from "@seasons/eclipse"

interface ReservationBottomBarProps {
  lineItems: any[]
  disabled: boolean
  loading: boolean
  onReserve: () => void
  buttonProps?: Omit<ButtonProps, "children">
}

export const ReservationBottomBar: React.FC<ReservationBottomBarProps> = ({
  lineItems,
  onReserve,
  buttonProps,
  loading,
  disabled,
}) => {
  const totalLineItems = lineItems.filter((l) => l.recordType === "Total")
  const totalLineItem = totalLineItems[totalLineItems.length - 1]
  const total = totalLineItem?.price || 0

  return (
    <Wrapper>
      <Separator />
      <Box height={80} pt={2} px={2}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Sans size="3" color="black50">
              Estimated 30-day total
            </Sans>
            <Flex flexDirection="row" alignItems="center">
              {loading ? (
                <Flex height={25} width={100} alignItems="center" flexDirection="row">
                  <Spinner size="small" />
                </Flex>
              ) : (
                <Sans size="6">{formatPrice(total)}</Sans>
              )}
            </Flex>
          </Box>

          <Box>
            <Button {...buttonProps} variant="primaryBlack" onPress={onReserve} disabled={disabled}>
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
