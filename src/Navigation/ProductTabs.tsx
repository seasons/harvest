import { GET_BAG, GET_PRODUCT } from "App/Apollo/Queries"
import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { setVariant, togglePopUp, toggleShowSizeSelection } from "App/Redux/actions"
import { ReserveButton } from "App/Scenes/Product/Components"
import { color } from "App/Utils"
import { BackArrowIcon, DownChevronIcon, SaveIcon } from "Assets/icons"
import { CircledSaveIcon } from "Assets/icons/CircledSaveIcon"
import gql from "graphql-tag"
import { head } from "lodash"
import React from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"

import { useMutation, useQuery } from "@apollo/react-hooks"

import { SizePicker } from "./SizePicker"

const SAVE_ITEM = gql`
  mutation SaveItem($item: ID!, $save: Boolean!) {
    saveProduct(item: $item, save: $save) {
      id
    }
  }
`

export const ProductTabsComponent = props => {
  const {
    displayConfirmation,
    showLoader,
    productState,
    setVariant,
    toggleShowSizeSelection,
    togglePopUp,
    productID,
    navigation,
  } = props
  const { variant, showSizeSelection } = productState

  if (!productID) {
    return null
  }

  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      productID,
    },
  })
  const [saveItem] = useMutation(SAVE_ITEM, {
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          productID,
        },
      },
      {
        query: GET_BAG,
      },
    ],
  })

  const { product } = data || { product: { isSaved: false } }
  const selectedVariant = head((product.variants || []).filter(a => a.id === variant.id))
  const { isSaved } = selectedVariant || product

  console.log("Selected Variant: ", selectedVariant)

  const renderVariantSelectionList = () => {
    return (
      <Selection>
        <ScrollView>
          <Box p={2}>
            <Spacer mb={2} />
            <Separator color={color("gray")} />
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
      </Selection>
    )
  }

  const handleSaveButton = () => {
    saveItem({
      variables: {
        item: variant.id,
        save: !isSaved,
      },
    })
    const updateText = isSaved ? "been removed from" : "added to"
    togglePopUp(true, {
      icon: <CircledSaveIcon />,
      title: "Saved for later",
      note: `The ${product.name}, size ${variant.size} has ${updateText} your saved items.`,
      buttonText: "Got It",
    })
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
              <Box ml={1}>
                <BackArrowIcon />
              </Box>
            </TouchableOpacity>
            <Spacer mr={2} />
            <TouchableOpacity onPress={() => handleSaveButton()}>
              <SaveIcon enabled={isSaved} />
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
              showLoader={showLoader}
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
      togglePopUp,
      toggleShowSizeSelection,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { productState } = state
  return { productState }
}

export const ProductTabs = connect(mapStateToProps, mapDispatchToProps)(ProductTabsComponent)

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
