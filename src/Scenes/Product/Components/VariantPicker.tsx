import { Box, Button, Flex, Sans, Separator } from "App/Components"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import React from "react"
import { ScrollView } from "react-native"
import styled from "styled-components/native"
import { VariantList } from "./VariantList"

export const VariantPicker = (props) => {
  const tracking = useTracking()
  const { selectedVariant, setSelectedVariant, toggleShowVariantPicker, height, product, variantPickerHeight } = props

  return (
    <Flex style={{ flex: 1, height: height + 28, position: "relative" }}>
      <FixedButtonWrapper px={2}>
        <Button
          variant="primaryWhite"
          width="31%"
          borderRadius={7}
          borderColor="white"
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.SizePickerCancelTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            toggleShowVariantPicker(false)
          }}
        >
          <Sans size="5" style={{textDecorationLine:"underline"}}>
            Cancel
          </Sans>
        </Button>
      </FixedButtonWrapper>
      <VariantPickerFlex>
        <Flex justifyContent="center" flexDirection="row" p={2}>
          <Sans size="5" color={color("black100")}>
            Select size
          </Sans>
        </Flex>
        <Separator color="lightgrey"/>
        <StyledScrollview>
          <Box px={2}>
            <VariantList
              variantPickerHeight={variantPickerHeight}
              product={product}
              setSelectedVariant={setSelectedVariant}
              selectedVariant={selectedVariant}
              onSizeSelected={() => {
                toggleShowVariantPicker(false)
              }}
            />
          </Box>
        </StyledScrollview>
      </VariantPickerFlex>
    </Flex>
  )
}



const VariantPickerFlex= styled(Flex)`
  background-color: white;
  top: 15;
  border-radius: 25;
  padding-top: 15;
`

const FixedButtonWrapper = styled(Box)`
  position: absolute;
  left: 0;
  bottom: ${space(2)};
  width: 100%;
  z-index: 100;
  align-items: center
`

const StyledScrollview = styled(ScrollView)`
  position: relative;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 10;
`
