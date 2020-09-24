import React from "react"
import { Text } from "react-native"
import styled from "styled-components/native"
import { Box, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import { SeasonsLogoSVG } from "Assets/svgs"

export interface MembershipCardProps {
  memberName: string
  planTier: string
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ memberName, planTier }) => {
  let backgroundColor
  let planTierColor
  let planName
  switch (planTier) {
    case "Essential":
      backgroundColor = color("white100")
      planTierColor = color("black100")
      planName = "Essential"
      break
    case "AllAccess":
      backgroundColor = color("black100")
      planTierColor = color("white100")
      planName = "All Access"
      break
  }

  if (!memberName || !planTier || !backgroundColor || !planTierColor) {
    return null
  }

  return (
    <Card backgroundColor={backgroundColor}>
      <Box px={3}>
        <Spacer mt={3} />
        <Flex flexDirection="column" justifyContent="space-between">
          <SeasonsLogoSVG width={28} height={28} />
          <Spacer mt={104} />
          <Flex flexDirection="row" justifyContent="space-between">
            <Text style={{ letterSpacing: 2 }}>
              <Sans color={planTierColor} size="1">
                {planName}
              </Sans>
            </Text>
            <Sans color={color("black50")} size="1">
              {memberName}
            </Sans>
          </Flex>
        </Flex>
        <Spacer mt={3} />
      </Box>
    </Card>
  )
}

const Card = styled(Box)`
  background-color: ${(props) => props.backgroundColor};
  height: 200;
  border-radius: 8;
  shadow-offset: 0px 6px;
  shadow-color: ${color("black100")};
  shadow-opacity: 0.1;
  shadow-radius: 12;
`
