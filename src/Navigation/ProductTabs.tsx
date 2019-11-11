import React from "react"
import styled from "styled-components/native"
import { color } from "App/Utils"
import { ReserveButton } from "App/Scenes/Product/Components"
import { Flex, Spacer, Sans, Button, Separator, Box } from "App/Components"
import { TouchableOpacity } from "react-native"
import { BackArrowIcon, DownChevronIcon, SaveIcon } from "Assets/icons"
import { NavigationActions } from "react-navigation"
import { ScrollView } from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setVariant, toggleShowSizeSelection } from "App/Redux/actions"
import { SizePicker } from "./SizePicker"
import gql from "graphql-tag"

export const ProductTabsComponent = props => {
  const { displayConfirmation, productState, setVariant, toggleShowSizeSelection, productID, navigation } = props
  const { variant, showSizeSelection } = productState

  if (!productID) {
    return null
  }

  const renderVariantSelectionList = () => {
    return (
      <Selection>
        <ScrollView>
          <Box p={2}>
            <Spacer mb={2} />
            <Separator color={color("gray")} />
            <SizePicker productID={productID} setVariant={setVariant} productState={productState} />
            <Spacer mb={2} />
          </Box>
        </ScrollView>
        <Button onPress={() => toggleShowSizeSelection(false)}>Cancel</Button>
      </Selection>
    )
  }

  const handleSaveButton = () => {
    // FIXME: Handle save
    const SAVE_ITEM = gql`
      mutation SaveItem($item: ID!, $options: ReserveItemsOptions) {
        saveItem(items: $item, options: $options) {
          id
        }
      }
    `
  }
  return (
    <>
      <Flex style={{ backgroundColor: color("black") }}>
        <Flex px={2} pt={17} alignContent="center" justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
          <Flex alignItems="center" flexWrap="nowrap" flexDirection="row" style={{ width: 94 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(NavigationActions.back())
              }}
            >
              <BackArrowIcon />
            </TouchableOpacity>
            <Spacer mr={4} />
            <TouchableOpacity onPress={() => handleSaveButton()}>
              <SaveIcon />
            </TouchableOpacity>
          </Flex>
          <TouchableOpacity onPress={() => toggleShowSizeSelection(!showSizeSelection)}>
            <SizeSelectionButton p={2}>
              <StyledSans size="2" color="white">
                {variant.abbreviated.toUpperCase()}
              </StyledSans>
              <Spacer mr={3} />
              <StyledDownChevronIcon rotate={showSizeSelection} />
            </SizeSelectionButton>
          </TouchableOpacity>
          <Flex flexDirection="row">
            <ReserveButton
              productID={productID}
              variant={variant}
              displayConfirmation={displayConfirmation}
            ></ReserveButton>
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
