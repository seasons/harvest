import React from "react"
import styled from "styled-components/native"
import { color, space } from "App/Utils"
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
  const { productState, setVariant, toggleShowSizeSelection } = props

  console.log("productSTate in ProductTabsComponent", props)

  // FIXME: use real sizes
  const sizes = [
    { size: "small", abbreviated: "s", id: 1, stock: 0 },
    { size: "medium", abbreviated: "m", id: 2, stock: 2 },
    { size: "large", abbreviated: "l", id: 3, stock: 1 },
    { size: "x-large", abbreviated: "xl", id: 4, stock: 3 },
    { size: "xx-large", abbreviated: "xxl", id: 5, stock: 3 },
  ]

  const renderSizes = () => {
    return sizes.map(size => {
      return (
        <Box key={size.id}>
          <Spacer mb={2} />
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
            <Flex flexDirection="row" alignItems="center">
              <Radio
                selected={productState.variant.id === size.id}
                disabled={size.stock === 0}
                onSelect={() => setVariant(size)}
              />
              <Spacer mr={1} />
              <Sans color={size.stock ? "white" : "gray"} size="2">
                {capitalize(size.size)}
              </Sans>
            </Flex>
            <Sans color="gray" size="2">
              {size.stock ? "(" + size.stock + " left)" : "(Out of stock)"}
            </Sans>
          </Flex>
          <Spacer mb={2} />
          <Separator color={color("gray")} />
        </Box>
      )
    })
  }

  const renderSelection = () => {
    return null
    return (
      <Selection m={2}>
        <ScrollView>
          <Separator color={color("gray")} />
          {renderSizes()}
        </ScrollView>
        <Button onPress={() => toggleShowSizeSelection(!productState.showSizeSelection)}>Cancel</Button>
      </Selection>
    )
  }

  const handleSaveButton = () => {
    // FIXME: Handle handleSaveButton
  }

  return (
    <>
      <Flex flex={1}>
        <Flex px={2} pt={17} alignContent="center" justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
          <Flex alignItems="center" flexWrap="nowrap" flexDirection="row" style={{ width: 114 }}>
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
            <ReserveButton
              product={productState.product}
              displayReserveConfirmation={productState.displayReserveConfirmation}
            ></ReserveButton>
          </Flex>
        </Flex>
      </Flex>
      {renderSelection()}
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
  top: 15;
`

const StyledSans = styled(Sans)`
  position: absolute;
  left: 15;
  top: 8;
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
  padding-left: ${space(2)}px;
  padding-right: ${space(2)}px;
  flex: 1;
  padding-bottom: ${space(2)}px;
`
