import { Box, Flex, Sans, Spacer, Button, Theme } from "App/Components"
import React from "react"
import { color } from "App/Utils"
import { goToBrowse } from "../../../Navigation"
import { BagPlaceHolderSVG } from "../../../../assets/svgs/BagPlaceHolder"

export const EmptyState = () => {
  return (
    <Theme>
      <Box>
        <Flex justifyContent="center" flexDirection="row">
          <BagPlaceHolderSVG />
        </Flex>
        <Spacer mb={3} />
        <Sans size="2" color={color("gray")} style={{ textAlign: "center" }}>
          You haven’t reserved anything yet. When you add an item, it’ll appear here
        </Sans>
        <Spacer mb={3} />
        <Flex justifyContent="center" flexDirection="row">
          <Button size="medium" variant="primaryDark" onPress={() => goToBrowse()}>
            Browse
          </Button>
        </Flex>
      </Box>
    </Theme>
  )
}
