import { GET_BAG } from "App/Apollo/Queries"
import { Flex, Sans, Spacer } from "App/Components"
import { BAG_NUM_ITEMS } from "App/Redux/reducer"
import { GreenCheck } from "Assets/svgs"
import { get } from "lodash"
import React from "react"
import styled from "styled-components/native"

import { useQuery } from "@apollo/react-hooks"

export const Confirmation = ({ type }) => {
  const { data } = useQuery(GET_BAG, {
    fetchPolicy: "cache-and-network",
  })
  const items = get(data, "me.bag", [])

  const remainingPieces = BAG_NUM_ITEMS - items.length
  let text = "Added to bag"
  let subtext = `(${remainingPieces} slots remaining)`
  if (type === "want") {
    text = "Got it!"
    subtext = "We'll let you know when it's back in stock."
  }
  return (
    <ConfirmationWrapper alignContent="center" justifyContent="center" flexDirection="column">
      <Flex flexDirection="row" alignContent="center" justifyContent="center">
        <Flex alignContent="center" justifyContent="center" flexDirection="column">
          <Flex flexDirection="row" alignContent="center" justifyContent="center">
            <GreenCheck />
          </Flex>
          <Spacer mb={2} />
          <Sans size="2" color="white" textAlign="center">
            {text}
          </Sans>
          <Spacer mb={1} />
          <Sans size="2" color="gray" textAlign="center">
            {subtext}
          </Sans>
        </Flex>
      </Flex>
    </ConfirmationWrapper>
  )
}

const ConfirmationWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.8);
`
