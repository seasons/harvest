import { Box } from "App/Components"
import { GetBag_NoCache_Query_me } from "App/generated/GetBag_NoCache_Query"
import gql from "graphql-tag"
import React from "react"

import { BagHeaderText } from "./BagHeaderText"
import { BagSubheaderText } from "./BagSubheaderText"
import { DeliveryStatus } from "./DeliveryStatus"

export const BagTabHeaderFragment_Query = gql`
  fragment BagTabHeaderFragment_Query on Query {
    me {
      id
      nextFreeSwapDate
      activeReservation {
        id
        createdAt
        returnAt
      }
      customer {
        id
        membership {
          id
          plan {
            id
            tier
          }
        }
      }
    }
  }
`

export const BagTabHeader: React.FC<{
  me: GetBag_NoCache_Query_me
  atHome: boolean
}> = ({ me, atHome }) => {
  const activeReservation = me?.activeReservation

  return (
    <Box pt={4}>
      <BagHeaderText activeReservation={activeReservation} atHome={atHome} />
      <DeliveryStatus activeReservation={activeReservation} atHome={atHome} />
      <BagSubheaderText me={me} atHome={atHome} />
    </Box>
  )
}
