import { Box, Button, Flex, Spacer } from "App/Components"
import { setVariant, toggleShowVariantPicker } from "App/Redux/actions"
import { color } from "App/Utils"
import React from "react"
import { ScrollView } from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"
import { SizePicker } from "./SizePicker"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"

export const VariantPickerComponent = props => {
  const { productState, setVariant, toggleShowVariantPicker, productID, height } = props

  if (!productID) {
    return null
  }

  return (
    <Flex style={{ flex: 1, backgroundColor: color("black"), height, position: "relative" }}>
      <LeftCorner />
      <RightCorner />
      <FixedButtonWrapper>
        <Button variant="transparentWhite" onPress={() => toggleShowVariantPicker(false)}>
          Cancel
        </Button>
      </FixedButtonWrapper>
      <StyledScrollview>
        <Box px={2}>
          <SizePicker
            productID={productID}
            setVariant={setVariant}
            productState={productState}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setVariant,
      toggleShowVariantPicker,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { productState } = state
  return { productState }
}

export const VariantPicker = connect(mapStateToProps, mapDispatchToProps)(VariantPickerComponent)

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
