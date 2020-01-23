import { Flex, Spacer, Sans } from "App/Components"
import { toggleShowSizeSelection } from "App/Redux/actions"
import { ReserveButton } from "App/Scenes/Product/Components"
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"
import { TouchableOpacity, Dimensions } from "react-native"
import { color } from "App/Utils"
import { DownChevronIcon } from "Assets/icons"

const twoButtonWidth = Dimensions.get("window").width / 2 - 12

export const SelectionButtonsComponent = props => {
  const { displayConfirmation, productState, toggleShowSizeSelection, productID } = props
  const { variant, showSizeSelection } = productState

  return (
    <Wrapper>
      <Flex px={8} alignContent="center" justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
        <TouchableOpacity onPress={() => toggleShowSizeSelection(!showSizeSelection)}>
          <SizeSelectionButton p={2}>
            <Sans size="1" color="black">
              {variant.size}
            </Sans>
            <Spacer mr={1} />
            <DownChevronIcon color={color("black")} rotate={showSizeSelection} />
          </SizeSelectionButton>
        </TouchableOpacity>
        <ReserveButton
          variantInStock={!!variant.reservable}
          productID={productID}
          variant={variant}
          displayConfirmation={displayConfirmation}
          width={twoButtonWidth}
        ></ReserveButton>
      </Flex>
    </Wrapper>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleShowSizeSelection,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { productState } = state
  return { productState }
}

export const SelectionButtons = connect(mapStateToProps, mapDispatchToProps)(SelectionButtonsComponent)

const SizeSelectionButton = styled.View`
  height: 48;
  border: 1px solid ${color("black")};
  border-width: 1;
  border-radius: 28;
  background-color: white;
  width: ${twoButtonWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Wrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 48;
  width: 100%;
  margin-bottom: 8;
`
