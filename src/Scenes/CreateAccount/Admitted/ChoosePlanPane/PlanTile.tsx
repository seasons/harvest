import { Box, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils/color"
import React from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import styled from "styled-components/native"

interface PlanTileProps {
  shouldSelect: (plan: any) => void
  selected: boolean
  plan: any
  selectedColor?: string
}

const { width: screenWidth } = Dimensions.get("window")

export const PlanTile: React.FC<PlanTileProps> = ({ shouldSelect, selected, plan, selectedColor }) => {
  const { price, tagline, name } = plan
  const cardWidth = screenWidth / 2 - 36

  return (
    <TouchableOpacity onPress={() => shouldSelect(plan)}>
      <StyledBox style={{ width: cardWidth }}>
        {selected && <PlanSelectionBorder style={{ borderColor: selectedColor }} />}
        <Flex p={2} flexDirection="row" justifyContent="space-between">
          <Sans color="black100" size="1">
            {name}
          </Sans>
        </Flex>
        <Box p={2}>
          <Sans color="black100" size="3">
            ${price / 100}
          </Sans>
          <Sans color="black50" size="1">
            per month
          </Sans>
          <Spacer mb={3} />
          <Sans color="black50" size="0.5">
            {tagline}
          </Sans>
        </Box>
        <Spacer mb={1} />
      </StyledBox>
    </TouchableOpacity>
  )
}

const StyledBox = styled(Box)`
  margin-left: 12;
  margin-right: 12;
  margin-top: 8;
  margin-bottom: 8;
  height: 250px;
  border-radius: 8;

  background-color: ${color("black04")};
  z-index: 10;
  elevation: 6;
`

const PlanSelectionBorder = styled(Box)`
  position: absolute;
  border-radius: 8;
  border-width: 1px;
  height: 270px;
  width: ${screenWidth / 2 - 16};
  background: transparent;
  z-index: 0;
  left: -10;
  top: -10;
`
