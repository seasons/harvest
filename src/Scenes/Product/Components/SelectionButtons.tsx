import { Flex, Sans, Spacer } from "App/Components"
import { AddToBagButton } from "App/Scenes/Product/Components"
import { color, space } from "App/utils"
import { DownChevronIcon } from "Assets/icons"
import React from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

interface Props {
  productID: string
  toggleShowVariantPicker: (show: boolean) => void
  showVariantPicker: boolean
  selectedVariant: any
  setPopUp: ({ show: boolean, data: any }) => void
  navigation: any
  bottom?: number
}

const twoButtonWidth = Dimensions.get("window").width / 2 - space(2) - space(0.5)

export const SelectionButtons: React.FC<Props> = props => {
  const {
    bottom = 0,
    navigation,
    selectedVariant,
    showVariantPicker,
    toggleShowVariantPicker,
    productID,
    setPopUp,
  } = props
  const inStock = selectedVariant && !!selectedVariant.stock

  if (!selectedVariant) {
    return <></>
  }

  return (
    <Wrapper style={{ bottom }}>
      <Flex px={2} justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
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
                  {selectedVariant.size}
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
            setPopUp={setPopUp}
            width={twoButtonWidth}
            selectedVariant={selectedVariant}
          />
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
  left: 0;
  height: 48;
  width: 100%;
  margin-bottom: ${space(2)};
`
