import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import React from "react"
import styled from "styled-components/native"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import { Schema, useTracking } from "App/utils/track"

export interface HomeFooterProps {
  navigation: any
  bottom?: number
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ bottom = 0, navigation }) => {
  const tracking = useTracking()

  return (
    <>
      <Spacer mt={3} />
      <LeftCorner />
      <RightCorner />
      <Box style={{ backgroundColor: color("black100"), height: 280 + bottom, overflow: "visible" }}>
        <Spacer mb={60} />
        <Flex justifyContent="center" flexDirection="column">
          <Sans size="2" color={color("white100")} style={{ textAlign: "center" }}>
            Browse our entire collection
          </Sans>
          <Spacer mb={0.5} />
          <Sans size="2" color={color("black50")} style={{ textAlign: "center" }}>
            See all categories, brands and sizes.
          </Sans>
          <Spacer mb={3} />
          <Flex justifyContent="center" flexDirection="row">
            <Button
              variant="secondaryBlack"
              onPress={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.BrowseButtonTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                navigation.navigate("BrowseStack")
              }}
            >
              Browse
            </Button>
          </Flex>
        </Flex>
        <Spacer mb={80 + bottom} />
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
