import { Box, Flex, Sans } from "App/Components"
import { Spinner } from "App/Components/Spinner"
import { color } from "App/utils/color"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

interface TriageProgressScreenProps {
  done?: () => void
  start: boolean
}

const TriageProgressFooter = styled(Box)`
  position: absolute;
  bottom: 40;
  left: 10;
  right: 10;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

export const TriageProgressScreen: React.FC<TriageProgressScreenProps> = ({ start, done }) => {
  const steps = ["Verifying Account", "Checking Sizes", "Confirming Availability"]
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setCurrentStep((currentStep) => {
          console.log("Current step inside useEffect: ", currentStep)
          if (currentStep === steps.length - 1) {
            clearInterval(interval)
            console.log("Calling done")
            done?.()
            return currentStep
          } else {
            return currentStep + 1
          }
        })
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [start])

  return (
    <Flex flexDirection="row" alignItems="center" alignContent="center" height="100%">
      <Flex alignItems="center" alignContent="center" mx="auto" width="400px">
        <Box m={2} my={6} mr={4}>
          <Spinner />
        </Box>
        <Box mb={4} width="100%">
          <Sans size="2" textAlign="center">
            {steps[currentStep]}...
          </Sans>
        </Box>
      </Flex>
      <TriageProgressFooter px={3}>
        <Sans size="1" textAlign="center" color={color("black50")}>
          Give us a few seconds while we process your account and confirm membership availability
        </Sans>
      </TriageProgressFooter>
    </Flex>
  )
}
