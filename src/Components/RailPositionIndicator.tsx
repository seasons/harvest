import React from "react"
import { Flex } from "./Flex"
import { Box } from "./Box"
import styled from "styled-components/native"
import { color } from "App/Utils"

export const RailPositionIndicator = ({ length, currentPage }) => {
  return (
    <Wrapper>
      <Flex flexDirection="row" flexWrap="nowrap" style={{ flex: 1, backgroundColor: "yellow" }}>
        {Array.apply(null, { length }).map((_e, i) => {
          const backgroundColor = i === currentPage - 1 ? color("black") : color("lightGray")
          return (
            <Flex
              flexDirection="row"
              style={{
                flex: 1,
                height: 5,
                width: 100,
                backgroundColor,
              }}
              key={i}
            />
          )
        })}
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  height: 5;
  width: 100%;
`
