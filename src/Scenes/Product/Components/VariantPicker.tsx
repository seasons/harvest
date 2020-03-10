import { Box, Button, Flex, Sans } from "App/Components"
import { color } from "App/utils"
import React from "react"
import { ScrollView } from "react-native"
import styled from "styled-components/native"
import { VariantList } from "./VariantList"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"

export const VariantPicker = props => {
  const { selectedVariant, setSelectedVariant, toggleShowVariantPicker, productID, height } = props

  if (!productID) {
    return null
  }

  return (
    <Flex style={{ flex: 1, backgroundColor: color("black100"), height, position: "relative" }}>
      <LeftCorner />
      <RightCorner />
      <Flex justifyContent="center" flexDirection="row" p={2}>
        <Sans size="1" color={color("white100")}>
          Select size
        </Sans>
      </Flex>
      <FixedButtonWrapper px={2}>
        <Button variant="secondaryBlack" width="100%" size="medium" onPress={() => toggleShowVariantPicker(false)}>
          Cancel
        </Button>
      </FixedButtonWrapper>
      <StyledScrollview>
        <Box px={2}>
          <VariantList
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
            productID={productID}
            onSizeSelected={() => {
              toggleShowVariantPicker(false)
            }}
          />
        </Box>
        <Box style={{ paddingBottom: 68 }} />
      </StyledScrollview>
    </Flex>
  )
}

const LeftCorner = styled(LeftTabCorner)`
  position: absolute;
  top: -28;
  left: 0;
`

const RightCorner = styled(RightTabCorner)`
  position: absolute;
  top: -28;
  right: 0;
`

const FixedButtonWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`

const StyledScrollview = styled(ScrollView)`
  position: relative;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 10;
`
