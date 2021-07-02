import React from "react"
import { Box, Button, Separator, Flex, Sans, Spacer } from "App/Components"
import { PopUp } from "../PopUp"
import gql from "graphql-tag"
import { PauseModal_Query_pauseReasons } from "App/generated/PauseModal_Query"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { space } from "App/utils"
import { Dimensions } from "react-native"

export const PauseReasonPupUpFragment_Query = gql`
  fragment PauseReasonPupUpFragment_Query on Query {
    pauseReasons {
      id
      reason
    }
  }
`

interface Props {
  pauseReasons: PauseModal_Query_pauseReasons[]
  setReasonID: (x: string) => void
  setShowReasonPopUp: (x: boolean) => void
  onSubmit: () => void
  show: boolean
  reasonID: string
}

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const PauseReasonPupUp: React.FC<Props> = ({
  reasonID,
  pauseReasons,
  setReasonID,
  show,
  setShowReasonPopUp,
  onSubmit,
}) => {
  const insets = useSafeAreaInsets()

  return (
    <PopUp show={show}>
      <Box pb={insets.bottom + space(4)} style={{ width: windowWidth }}>
        <Spacer mb={4} />
        <Box px={2}>
          <Sans size="4" style={{ textAlign: "center" }}>
            Why are you pausing?
          </Sans>
        </Box>
        <Spacer mb={2} />
        <Separator />
        <Spacer mb={2} />
        <Box px={2}>
          {pauseReasons?.map((pauseReason, index) => {
            return (
              <Box mb={2} key={index}>
                <Button
                  block
                  selected={reasonID === pauseReason.id}
                  variant="tertiaryWhite"
                  onPress={() => setReasonID(pauseReason.id)}
                >
                  {pauseReason.reason}
                </Button>
              </Box>
            )
          })}

          <Flex flexDirection="row" mt={1}>
            <Button
              block
              variant="tertiaryWhite"
              onPress={() => setShowReasonPopUp(false)}
              width={windowWidth / 2 - space(2) - space(0.5)}
            >
              Nevermind
            </Button>
            <Spacer mr={1} />
            <Button
              block
              disabled={!reasonID}
              variant="primaryBlack"
              onPress={onSubmit}
              width={windowWidth / 2 - space(2) - space(0.5)}
            >
              Submit & pause
            </Button>
          </Flex>
        </Box>
      </Box>
    </PopUp>
  )
}
