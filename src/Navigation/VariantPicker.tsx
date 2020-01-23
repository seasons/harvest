import { Box, Button, Flex, Spacer } from "App/Components"
import { setVariant, toggleShowSizeSelection } from "App/Redux/actions"
import { color } from "App/Utils"
import React from "react"
import { ScrollView } from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { SizePicker } from "./SizePicker"

export const VariantPickerComponent = props => {
  const { productState, setVariant, toggleShowSizeSelection, productID, height } = props

  if (!productID) {
    return null
  }

  console.log("productID", productID)

  return (
    <Flex style={{ flex: 1, backgroundColor: color("black"), height }}>
      <ScrollView>
        <Box px={2}>
          <SizePicker
            productID={productID}
            setVariant={setVariant}
            productState={productState}
            onSizeSelected={() => {
              toggleShowSizeSelection(false)
            }}
          />
          <Spacer mb={2} />
        </Box>
      </ScrollView>
      <Button onPress={() => toggleShowSizeSelection(false)}>Cancel</Button>
    </Flex>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setVariant,
      toggleShowSizeSelection,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { productState } = state
  return { productState }
}

export const VariantPicker = connect(mapStateToProps, mapDispatchToProps)(VariantPickerComponent)
