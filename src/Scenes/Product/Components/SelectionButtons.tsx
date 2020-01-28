import { Flex, Spacer, Sans } from "App/Components"
import { AddToBagButton } from "App/Scenes/Product/Components"
import React from "react"
import styled from "styled-components/native"
import { TouchableWithoutFeedback, Dimensions } from "react-native"
import { color } from "App/Utils"
import { DownChevronIcon } from "Assets/icons"

const twoButtonWidth = Dimensions.get("window").width / 2 - 12

export const SelectionButtons = props => {
  const { variant, showVariantPicker, toggleShowVariantPicker, productID, setPopUp } = props
  const inStock = variant && !!variant.stock

  if (!variant) {
    return <></>
  }

  return (
    <Wrapper>
      <Flex px={8} justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
        <TouchableWithoutFeedback onPress={() => toggleShowVariantPicker(!showVariantPicker)}>
          <VariantSelectionButton p={2} inStock={inStock}>
            <Flex
              px={2}
              style={{ width: "100%" }}
              flexDirection="row"
              justifyContent={inStock ? "center" : "space-between"}
            >
              <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
                <Sans size="1" color="black">
                  {variant.size}
                </Sans>
                <Spacer mr={1} />
                <DownChevronIcon color={color("black")} rotate={showVariantPicker} />
              </Flex>
              {!inStock && (
                <Sans size="1" color="gray">
                  Unavailable
                </Sans>
              )}
            </Flex>
          </VariantSelectionButton>
        </TouchableWithoutFeedback>
        {inStock && (
          <AddToBagButton
            variantInStock={inStock}
            productID={productID}
            variant={variant}
            setPopUp={setPopUp}
            width={twoButtonWidth}
          ></AddToBagButton>
        )}
      </Flex>
    </Wrapper>
  )
}

const VariantSelectionButton = styled.View<{ inStock: boolean }>`
  height: 48;
  border: 1px solid ${color("black")};
  border-width: 1;
  border-radius: 28;
  background-color: white;
  width: ${p => (p.inStock ? twoButtonWidth : "100%")};
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
