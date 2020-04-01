import { Box, Button, Flex, Sans } from "App/Components"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import React from "react"
import { ScrollView } from "react-native"
import styled from "styled-components/native"
import { VariantList } from "./VariantList"

export const VariantPicker = props => {
  const tracking = useTracking()
  const { selectedVariant, setSelectedVariant, toggleShowVariantPicker, height, product } = props

  return (
    <Flex style={{ flex: 1, height: height + 28, position: "relative" }}>
      <LeftCorner />
      <RightCorner />
      <FixedButtonWrapper px={2}>
        <Button
          variant="secondaryBlack"
          width="100%"
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.SizePickerCancelTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            toggleShowVariantPicker(false)
          }}
        >
          Cancel
        </Button>
      </FixedButtonWrapper>
      <Box style={{ backgroundColor: color("black100"), top: 28 }}>
        <Flex justifyContent="center" flexDirection="row" p={2}>
          <Sans size="1" color={color("white100")}>
            Select size
          </Sans>
        </Flex>
        <StyledScrollview>
          <Box px={2}>
            <VariantList
              product={product}
              setSelectedVariant={setSelectedVariant}
              selectedVariant={selectedVariant}
              onSizeSelected={() => {
                toggleShowVariantPicker(false)
              }}
            />
          </Box>
          <Box style={{ paddingBottom: 180 }} />
        </StyledScrollview>
      </Box>
    </Flex>
  )
}

const LeftCorner = styled(LeftTabCorner)`
  position: absolute;
  top: 0;
  left: 0;
`

const RightCorner = styled(RightTabCorner)`
  position: absolute;
  top: 0;
  right: 0;
`

const FixedButtonWrapper = styled(Box)`
  position: absolute;
  left: 0;
  bottom: ${space(2)};
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
