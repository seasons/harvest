import React from "react"
import { Text } from "react-native"
import styled from "styled-components/native"
import { Box, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import { LogoIcon } from "Assets/icons/LogoIcon"

export interface MembershipCardProps {
  memberName: string
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ memberName }) => {
  let backgroundColor

  if (!memberName) {
    return <></>
  }

  return (
    <Card backgroundColor={backgroundColor}>
      <Box px={3}>
        <Spacer mt={3} />
        <Flex flexDirection="column" justifyContent="space-between">
          <LogoIcon width={60} height={60} />
          <Spacer mt={70} />
          <Flex flexDirection="row" justifyContent="space-between">
            <Sans color="black25" size="4">
              Membership card
            </Sans>
            <Sans color={color("white100")} size="4">
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
  background-color: ${color("black100")};
  height: 200;
  border-radius: 8;
  shadow-offset: 0px 6px;
  shadow-color: ${color("black100")};
  shadow-opacity: 0.1;
  shadow-radius: 12;
`
