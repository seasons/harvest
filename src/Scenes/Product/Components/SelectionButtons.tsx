import { Button, Flex, Sans, Spacer } from "App/Components"
import { GetProduct } from "App/generated/GetProduct"
import { AddToBagButton } from "App/Scenes/Product/Components"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { DownChevronIcon } from "Assets/icons"
import { WhiteListCheck } from "Assets/svgs/WhiteListCheck"
import React, { useEffect, useState } from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

interface Props {
  toggleShowVariantPicker: (show: boolean) => void
  setShowSizeWarning: (show: boolean) => void
  showVariantPicker: boolean
  selectedVariant: any
  bottom?: number
  data: GetProduct
  onNotifyMe: () => void
  hasNotification: boolean
  isMutatingNotify: boolean
}

const twoButtonWidth = Dimensions.get("window").width / 2 - space(2) - space(0.5)

export const SelectionButtons: React.FC<Props> = (props) => {
  const tracking = useTracking()
  const [loaded, setLoaded] = useState(false)
  const {
    hasNotification,
    bottom = 0,
    selectedVariant,
    showVariantPicker,
    toggleShowVariantPicker,
    data,
    isMutatingNotify,
    onNotifyMe,
    setShowSizeWarning,
  } = props
  const inStock = selectedVariant && selectedVariant.reservable > 0

  useEffect(() => {
    // Wait to load the buttons until we know their state so user doesn't see the state change on load
    if (typeof selectedVariant?.reservable === "number" && !loaded) {
      setLoaded(true)
    }
  }, [setLoaded, selectedVariant])

  if (!loaded) {
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
          <VariantSelectionButton>
            <Flex px={2} style={{ width: "100%" }} flexDirection="row" justifyContent="center">
              <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
                <Sans size="4" color="black">
                  {selectedVariant?.display?.long}
                </Sans>
                <Spacer mr={1} />
                <DownChevronIcon color={color("black")} rotate={showVariantPicker} />
              </Flex>
            </Flex>
          </VariantSelectionButton>
        </TouchableWithoutFeedback>
        {inStock ? (
          <AddToBagButton
            setShowSizeWarning={setShowSizeWarning}
            variantInStock={inStock}
            width={twoButtonWidth}
            selectedVariant={selectedVariant}
            data={data}
          />
        ) : (
          <StyledButton
            Icon={hasNotification ? WhiteListCheck : null}
            width={twoButtonWidth}
            onPress={onNotifyMe}
            loading={isMutatingNotify}
          >
            Notify me
          </StyledButton>
        )}
      </Flex>
    </Wrapper>
  )
}

const VariantSelectionButton = styled.View`
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
  left: 0;
  height: 48;
  width: 100%;
  z-index: 1;
  margin-bottom: ${space(2)};
`

const StyledButton = styled(Button)`
  & {
    path {
      stroke: ${color("white100")};
    }
  }
`
