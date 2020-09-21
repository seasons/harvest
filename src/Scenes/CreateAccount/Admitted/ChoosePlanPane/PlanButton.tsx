import { Flex, Sans } from "App/Components"
import { color } from "App/utils/color"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import styled from "styled-components/native"

interface PlanButtonProps {
  shouldSelect: (plan: any) => void
  selected: boolean
  plan: any
  selectedColor?: string
}

export const PlanButton: React.FC<PlanButtonProps> = ({ shouldSelect, selected, plan, selectedColor }) => {
  const { price, itemCount } = plan

  return (
    <PlanSelectionBorder width="100%" p={0.5} selected={selected} selectedColor={selectedColor}>
      <TouchableOpacity onPress={() => shouldSelect(plan)}>
        <StyledFlex
          alignItems="center"
          flexDirection="row"
          width="100%"
          height={48}
          px={2}
          justifyContent="space-between"
        >
          <Sans color="black100" size="1">
            {itemCount} items
          </Sans>
          <Text>
            <Sans color="black50" size="0.5">
              per \ month
            </Sans>
            <Sans color="black100" size="1">
              {"  "}${price / 100}
            </Sans>
          </Text>
        </StyledFlex>
      </TouchableOpacity>
    </PlanSelectionBorder>
  )
}

const StyledFlex = styled(Flex)`
  border-radius: 28;

  background-color: ${color("black04")};
  z-index: 10;
  elevation: 6;
`

const PlanSelectionBorder = styled(Flex)<{ selected: boolean; selectedColor: string }>`
  border-radius: 28;
  border-color: ${(p) => (p.selected ? p.selectedColor : color("white100"))};
  border-width: 1px;
  background: ${color("white100")};
  z-index: 0;
`
