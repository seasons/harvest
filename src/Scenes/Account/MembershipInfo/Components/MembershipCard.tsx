import React from "react"
import { Text } from "react-native"
import styled from "styled-components/native"
import { Box, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import { SeasonsLogoSVG } from "../../../../../assets/svgs"

export interface MembershipCardProps {
  memberName: string
  planName: string
}

export const MembershipCard: React.FC<MembershipCardProps> = ({
  memberName,
  planName,
}) => {
  let backgroundColor
  let planNameColor
  switch (planName) {
    case "Essential":
      backgroundColor = color("white100")
      planNameColor = color("black100")
      break;
    case "All Access":
      backgroundColor = color("black100")
      planNameColor = color("white100")
      break;
  }

  if (!backgroundColor || !planNameColor) {
    return null
  }

  return (
    <Card backgroundColor={backgroundColor} >
      <Box px={3}>
        <Spacer mt={3} />
        <Flex flexDirection="column" justifyContent="space-between" >
          <SeasonsLogoSVG width={28} height={28} />
          <Spacer mt={104} />
          <Flex flexDirection="row" justifyContent="space-between" >
            <Text style={{ letterSpacing: 2 }}>
              <Sans color={planNameColor} size="1" >
                {planName.toUpperCase()}
              </Sans>
            </Text>
            <Sans color={color("black50")} size="1">
              {memberName}
            </Sans>
          </Flex>
        </Flex>
        <Spacer mt={3} />
      </Box>
    </Card >
  )
}

const Card = styled(Box)`
  background-color: ${props => props.backgroundColor};
  height: 200;
  border-radius: 8;
  shadow-offset: 0px 6px;
  shadow-color: ${color("black100")};
  shadow-opacity: 0.1;
  shadow-radius: 12;
`