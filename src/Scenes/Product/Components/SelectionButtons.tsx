import { Flex, Sans, Spacer } from "App/Components"
import { AddToBagButton } from "App/Scenes/Product/Components"
import { color, space } from "App/utils"
import { DownChevronIcon } from "Assets/icons"
import React from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { Schema, useTracking } from "App/utils/track"

interface Props {
  toggleShowVariantPicker: (show: boolean) => void
  showVariantPicker: boolean
  selectedVariant: any
  bottom?: number
}

const twoButtonWidth = Dimensions.get("window").width / 2 - space(2) - space(0.5)

export const SelectionButtons: React.FC<Props> = (props) => {
  const tracking = useTracking()
  const { bottom = 0, selectedVariant, showVariantPicker, toggleShowVariantPicker } = props
  const inStock = selectedVariant && selectedVariant.reservable > 0

  if (!selectedVariant) {
    return null
  }

  return (
    <Wrapper style={{ bottom }}>
      <Flex px={2} justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
        <TouchableWithoutFeedback
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.SizeButtonTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            toggleShowVariantPicker(!showVariantPicker)
          }}
        >
          <VariantSelectionButton p={2} inStock={inStock}>
            <Flex
              px={2}
              style={{ width: "100%" }}
              flexDirection="row"
              justifyContent={inStock ? "center" : "space-between"}
            >
              <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
                <Sans size="1" color="black">
                  {selectedVariant.sizeDisplay}
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
          <AddToBagButton variantInStock={inStock} width={twoButtonWidth} selectedVariant={selectedVariant} />
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
  width: ${(p) => (p.inStock ? twoButtonWidth : "100%")};
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
