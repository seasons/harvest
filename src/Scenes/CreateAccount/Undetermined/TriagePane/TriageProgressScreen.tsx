import { Box, Flex, Sans } from "App/Components"
import { Spinner } from "App/Components/Spinner"
import React, { useEffect, useState } from "react"

interface TriageProgressScreenProps {
  done?: () => void
}

export const TriageProgressScreen: React.FC<TriageProgressScreenProps> = ({ done }) => {
  const steps = ["Verifying Account", "Checking Sizes", "Confirming Availability", "Done!"]
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep === steps.length) {
        clearInterval(interval)
        done?.()
      } else {
        setCurrentStep(currentStep + 1)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Flex flexDirection="column" alignItems="center" alignContent="center">
      <Flex>
        <Box m={2}>
          <Spinner />
        </Box>
        <Sans size="3" textAlign="center">
          {steps[currentStep]}
        </Sans>
      </Flex>
    </Flex>
  )
}
