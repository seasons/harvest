import { Box, Flex, Sans } from "App/Components"
import { Spinner } from "App/Components/Spinner"
import gql from "graphql-tag"
import React, { useState } from "react"

import { useMutation } from "@apollo/client"

import { GetBag_NoCache_Query } from "../BagQueries"

const CANCEL_RETURN = gql`
  mutation CancelReturn {
    cancelReturn {
      id
    }
  }
`

export const BagReturnFlowSubtitle = () => {
  const [cancelingReturn, setCancelingReturn] = useState(false)
  const [cancelReturn] = useMutation(CANCEL_RETURN, {
    onCompleted: () => {
      setCancelingReturn(false)
    },
    onError: (e) => {
      setCancelingReturn(false)
    },
  })

  return (
    <Box px={2}>
      <Sans size="4" color="black50">
        Your bag will update after UPS scans the return label. Second thoughts?{" "}
        {cancelingReturn ? (
          <Flex flexDirection="row" width={130} height={20} justifyContent="center" alignItems="center">
            <Spinner size="small" />
          </Flex>
        ) : (
          <Sans
            size="4"
            onPress={async () => {
              setCancelingReturn(true)
              await cancelReturn({
                awaitRefetchQueries: true,
                refetchQueries: [{ query: GetBag_NoCache_Query }],
              })
            }}
            color="black50"
            style={{ textDecorationLine: "underline" }}
          >
            Cancel your return
          </Sans>
        )}
      </Sans>
    </Box>
  )
}
