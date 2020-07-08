import { Container, Box, Sans, Spacer, Flex } from "App/Components"
import LottieView from "lottie-react-native"
import React, { useEffect, useState } from "react"

import gql from "graphql-tag"
import { useLazyQuery } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const CHECK_PAYMENT_PROCESSED = gql`
  query checkPaymentProcessed {
    me {
      customer {
        id
        billingInfo {
          id
        }
      }
    }
  }
`

interface ProcessingPaymentPaneProps {
  process: boolean
  onProcessingComplete: () => void
}

enum CheckStatus {
  Waiting,
  Processing,
  Processed,
}

export const ProcessingPaymentPane: React.FC<ProcessingPaymentPaneProps> = ({ process, onProcessingComplete }) => {
  const [checkStatus, setCheckStatus] = useState(CheckStatus.Waiting)

  const { showPopUp, hidePopUp } = usePopUpContext()
  const errorPopUpData = {
    title: "Oops! Try again!",
    note: "There was an error communicating with our server. Please try again.",
    buttonText: "Retry",
    onClose: () => {
      hidePopUp()
      runQuery()
    },
  }

  const [runQuery, { data }] = useLazyQuery(CHECK_PAYMENT_PROCESSED, {
    onCompleted: () => {
      const customer = data?.me?.customer
      if (customer) {
        if (customer?.billingInfo) {
          onProcessingComplete()
          // Allow FlatList to transition before hiding spinner
          setTimeout(() => {
            setCheckStatus(CheckStatus.Processed)
          }, 3000)
        } else {
          // Wait 0.5s and check again
          setTimeout(() => {
            runQuery()
          }, 500)
        }
      }
    },
    onError: (err) => {
      console.log("****\n\n", err, "\n\n****")
      showPopUp(errorPopUpData)
    },
  })

  useEffect(() => {
    if (checkStatus === CheckStatus.Waiting && process) {
      checkPaymentProcessed()
    }
  }, [process, checkStatus])

  const checkPaymentProcessed = async () => {
    if (checkStatus == CheckStatus.Processing || checkStatus == CheckStatus.Processed) {
      return
    }

    setCheckStatus(CheckStatus.Processing)
    runQuery()
  }

  const showSpinner = checkStatus === CheckStatus.Processing

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Flex p={3} flexDirection="column" alignItems="center" justifyContent="center" flex={1}>
        {showSpinner && <Loader />}
        <Spacer mb={2} />
        <Sans size="1">Processing payment...</Sans>
        <Spacer mb={1} />
        <Sans size="1" color="black50">
          Give us a few seconds to process your payment and finish creating your account
        </Sans>
        <Spacer mb={2} />
      </Flex>
    </Container>
  )
}

const Loader: React.FC = () => {
  return (
    <LottieView
      source={require("assets/animations/logo-loader.json")}
      autoPlay
      loop
      style={{ width: 80, height: 80, alignSelf: "center" }}
    />
  )
}
