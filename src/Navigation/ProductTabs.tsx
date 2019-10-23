import React from "react"
import styled from "styled-components/native"
import { color } from "App/Utils"
import { ReserveButton } from "App/Scenes/Product/Components"
import { Flex, Spacer, Sans, Button, Separator, Box, Radio } from "App/Components"
import { TouchableOpacity } from "react-native"
import { BackArrowIcon, DownChevronIcon, SaveIcon } from "Assets/icons"
import { NavigationActions } from "react-navigation"
import { ScrollView } from "react-native"
import { capitalize } from "lodash"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setVariant, toggleShowSizeSelection } from "App/Redux/actions"

export const ProductTabsComponent = props => {
  const { productState, setVariant, toggleShowSizeSelection, productID, displayConfirmation } = props

  // FIXME: use real sizes
  const variants = [
    { size: "small", abbreviated: "s", id: 1, stock: 0 },
    { size: "medium", abbreviated: "m", id: 2, stock: 2 },
    { size: "large", abbreviated: "l", id: 3, stock: 1 },
    { size: "x-large", abbreviated: "xl", id: 4, stock: 3 },
    { size: "xx-large", abbreviated: "xxl", id: 5, stock: 3 },
  ]

  const renderVariantListItem = () => {
    return variants.map(variant => {
      return (
        <Box key={variant.id}>
          <Spacer mb={2} />
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
            <Flex flexDirection="row" alignItems="center">
              <Radio selected={productState.variant.id === variant.id} onSelect={() => setVariant(variant)} />
              <Spacer mr={1} />
              <Sans color={variant.stock ? "white" : "gray"} size="2">
                {capitalize(variant.size)}
              </Sans>
            </Flex>
            <Sans color="gray" size="2">
              {variant.stock ? "(" + variant.stock + " left)" : "(Out of stock)"}
            </Sans>
          </Flex>
          <Spacer mb={2} />
          <Separator color={color("gray")} />
        </Box>
      )
    })
  }

  const renderVariantSelectionList = () => {
    return (
      <Selection>
        <ScrollView>
          <Box p={2}>
            <Spacer mb={2} />
            <Separator color={color("gray")} />
            {renderVariantListItem()}
            <Spacer mb={2} />
          </Box>
        </ScrollView>
        <Button onPress={() => toggleShowSizeSelection(false)}>Cancel</Button>
      </Selection>
    )
  }

  const handleSaveButton = () => {
    // FIXME: Handle handleSaveButton
  }

  return (
    <>
      <Flex style={{ backgroundColor: color("black") }}>
        <Flex px={2} pt={17} alignContent="center" justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
          <Flex alignItems="center" flexWrap="nowrap" flexDirection="row" style={{ width: 94 }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.dispatch(NavigationActions.back())
              }}
            >
              <BackArrowIcon />
            </TouchableOpacity>
            <Spacer mr={4} />
            <TouchableOpacity onPress={() => handleSaveButton()}>
              <SaveIcon />
            </TouchableOpacity>
          </Flex>
          <TouchableOpacity onPress={() => toggleShowSizeSelection(!productState.showSizeSelection)}>
            <SizeSelectionButton p={2}>
              <StyledSans size="2" color="white">
                {productState.variant &&
                  productState.variant.abbreviated &&
                  productState.variant.abbreviated.toUpperCase()}
              </StyledSans>
              <Spacer mr={3} />
              <StyledDownChevronIcon rotate={productState.showSizeSelection} />
            </SizeSelectionButton>
          </TouchableOpacity>
          <Flex flexDirection="row">
            <ReserveButton productID={productID} displayConfirmation={displayConfirmation}></ReserveButton>
          </Flex>
        </Flex>
      </Flex>
      {renderVariantSelectionList()}
    </>
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

export const ProductTabs = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTabsComponent)

const StyledDownChevronIcon = styled(DownChevronIcon)`
  position: absolute;
  right: 15;
  top: 16;
`

const StyledSans = styled(Sans)`
  position: absolute;
  left: 15;
  top: 6;
`

const SizeSelectionButton = styled.View`
  border-radius: 30;
  width: 88;
  height: 40;
  border: 1px solid ${color("gray")};
  border-width: 1;
  border-radius: 28;
  position: relative;
`

const Selection = styled.View`
  flex: 1;
`
