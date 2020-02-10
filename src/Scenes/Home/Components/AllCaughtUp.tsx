import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import styled from "styled-components/native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"

export const AllCaughtUp: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  return (
    <>
      <Spacer mt={3} />
      <LeftCorner />
      <RightCorner />
      <Box style={{ backgroundColor: color("black100"), height: 350, overflow: "visible" }}>
        <Spacer mb={60} />
        <Flex justifyContent="center" flexDirection="column">
          <Sans size="2" color={color("white100")} style={{ textAlign: "center" }}>
            You're all caught up!
          </Sans>
          <Spacer mb={0.5} />
          <Sans size="2" color={color("black50")} style={{ textAlign: "center" }}>
            Browse our entire collection
          </Sans>
          <Spacer mb={3} />
          <Flex justifyContent="center" flexDirection="row">
            <Button variant="secondaryBlack" onPress={() => navigation.navigate("Browse")}>
              Browse
            </Button>
          </Flex>
        </Flex>
        <Box style={{ height: 1000, backgroundColor: color("black100") }} />
      </Box>
    </>
  )
}

const LeftCorner = styled(LeftTabCorner)`
  position: absolute;
  top: -4;
  left: 0;
`

const RightCorner = styled(RightTabCorner)`
  position: absolute;
  top: -4;
  right: 0;
`
