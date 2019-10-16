import React from "react"
import styled from "styled-components/native"
import { color } from "App/Utils"
import { ReserveButton } from "App/Scenes/Product/Components"
import { Flex, Spacer, Sans } from "App/Components"
import { TouchableWithoutFeedback } from "react-native"
import { BackArrowIcon, DownChevronIcon, SaveIcon } from "Assets/icons"
import { useStateValue } from "App/helpers/StateProvider"

export const ProductTabs = props => {
  const [{ productState }, dispatch]: any = useStateValue()

  const handleSaveButton = () => {
    // FIXME: Handle handleSaveButton
  }

  return (
    <FooterNav>
      <Flex p={2} justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
        <Flex alignItems="center" flexWrap="nowrap" flexDirection="row" style={{ width: 114 }}>
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <BackArrowIcon />
          </TouchableWithoutFeedback>
          <Spacer mr={4} />
          <TouchableWithoutFeedback onPress={() => handleSaveButton()}>
            <SaveIcon />
          </TouchableWithoutFeedback>
        </Flex>
        <TouchableWithoutFeedback onPress={() => dispatch({
          type: "toggleShowSizeSelection",
          showSizeSelection: !productState.showSizeSelection,
        })>
          <SizeSelectionButton p={2}>
            <StyledSans size="2" color="white">
              {productState.sizeSelection.abbreviated.toUpperCase()}
            </StyledSans>
            <Spacer mr={3} />
            <StyledDownChevronIcon rotate={productState.showSizeSelection} />
          </SizeSelectionButton>
        </TouchableWithoutFeedback>
        <ReserveButton
          product={productState.product}
          displayReserveConfirmation={productState.displayReserveConfirmation}
        ></ReserveButton>
      </Flex>
    </FooterNav>
  )
}

const StyledDownChevronIcon = styled(DownChevronIcon)`
  position: absolute;
  right: 15;
  top: 15;
`

const StyledSans = styled(Sans)`
  position: absolute;
  left: 15;
  top: 8;
`

const FooterNav = styled.View`
  background-color: black;
`

const SizeSelectionButton = styled.View`
  border-radius: 30;
  width: 88;
  border: 1px solid ${color("gray")};
  border-width: 1;
  border-radius: 28;
  position: relative;
`
