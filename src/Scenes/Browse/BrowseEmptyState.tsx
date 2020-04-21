import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { Schema, useTracking } from "App/utils/track"
import { color } from "App/utils"
import React from "react"
import styled from "styled-components/native"

export const BrowseEmptyState: React.FC<{ setSizeFilters: (size) => void; setCurrentCategory: (cat) => void }> = ({
  setSizeFilters,
  setCurrentCategory,
}) => {
  const tracking = useTracking()
  return (
    <Wrapper>
      <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center" flexDirection="column">
        <Box>
          <Sans size="3" style={{ textAlign: "center" }}>
            No matches
          </Sans>
          <Spacer mb={1} />
          <Sans size="2" color={color("black50")} style={{ textAlign: "center" }}>
            There are no products that match your filters.
          </Sans>
        </Box>
        <Spacer mb={2} />
        <Button
          size="small"
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.FiltersCleared,
              actionType: Schema.ActionTypes.Tap,
            })
            setSizeFilters([])
            setCurrentCategory("all")
          }}
        >
          Clear filters
        </Button>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`
