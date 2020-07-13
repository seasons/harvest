import { Box, Flex, Radio, Sans, Separator, Spacer } from "App/Components"
import { GreenCheck } from "Assets/svgs"
import { color } from "App/utils/color"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { Plan } from "./ChoosePlanPane"

interface PlanTileProps {
  description: string
  inputKey: Plan
  price: number
  shouldSelect: (key: Plan) => void
  selected: boolean
  subtitle: string
  title: string
}

export const PlanTile: React.FC<PlanTileProps> = ({
  description,
  inputKey,
  price,
  shouldSelect,
  selected,
  subtitle,
  title,
}) => {
  const strokeColor = selected ? color("black100") : color("black10")

  return (
    <TouchableOpacity onPress={() => shouldSelect(inputKey)}>
      <StyledBox style={{ borderColor: strokeColor }}>
        <Flex p={2} flexDirection="row" justifyContent="space-between">
          <Sans color="black100" size="1">
            {title}
          </Sans>
          <Radio width={24} height={24} selected={selected} onSelect={() => shouldSelect(inputKey)}>
            <GreenCheck width={24} height={24} strokeWidth={4} />
          </Radio>
        </Flex>
        <Separator color={strokeColor} />
        <Box p={2}>
          <Sans color="black100" size="3">
            ${price}
          </Sans>
          <Sans color="black50" size="1">
            per \ month
          </Sans>
          <Spacer mb={3} />
          <Sans color="black100" size="1">
            {subtitle}
          </Sans>
          <Sans color="black50" size="1">
            {description}
          </Sans>
        </Box>
        <Spacer mb={1} />
      </StyledBox>
    </TouchableOpacity>
  )
}

const StyledBox = styled(Box)`
  margin-left: 16;
  margin-right: 16;
  margin-top: 8;
  margin-bottom: 8;

  border-width: 1;
  border-radius: 8;

  background-color: white;

  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8;
  shadow-offset: 0px 2px;

  elevation: 6;
`
