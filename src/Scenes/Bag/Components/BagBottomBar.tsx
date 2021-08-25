import React from "react"

import { Box, Button, Flex, Sans, Separator } from "@seasons/eclipse"

export const BagBottomBar = ({ bagItems }) => {
  console.log(bagItems)

  return (
    <>
      <Separator />
      <Box height={80} pt={2} px={2}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Sans size="4" color="black50">
              Estimated total
            </Sans>
            <Flex flexDirection="row" alignItems="center">
              <Sans size="8">${120}</Sans>
              <Sans size="4" color="black50" mx={1} my={1}>
                + Tax
              </Sans>
            </Flex>
          </Box>

          <Box>
            <Button>Reserve</Button>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
