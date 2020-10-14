import gql from "graphql-tag"
import React, { useState, useEffect } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { Box, FixedButton, Flex, Sans, Spacer, TextInput, FixedBackArrow, Container } from "App/Components"
import { color, space } from "App/utils"
import * as Sentry from "@sentry/react-native"
import { screenTrack, useTracking, Schema } from "App/utils/track"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"

const ADD_PRODUCT_REQUEST = gql`
  mutation AddProductRequest($reason: String!, $url: String!) {
    addProductRequest(reason: $reason, url: $url) {
      id
      sku
      brand
      description
      images
      name
      price
      priceCurrency
      productID
      url
    }
  }
`

export const ProductRequest = screenTrack()((props: any) => {
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
  const [isMutating, setIsMutating] = useState(false)
  const [likeReason, setLikeReason] = useState("")
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [url, setURL] = useState("")
  const tracking = useTracking()

  const pupUpData = {
    buttonText: "Got it",
    note: "We couldn’t find anything using this URL. Double check and try again.",
    title: "Your link didn’t work!",
    onClose: () => hidePopUp(),
  }

  const [addProductRequest] = useMutation(ADD_PRODUCT_REQUEST, {
    onError: (error) => {
      console.error(error)
      Keyboard.dismiss()
      Sentry.captureException(error)
      showPopUp(pupUpData)
    },
  })

  useEffect(() => {
    return setIsMutating(false)
  }, [])

  const onURLChange = (val) => {
    setURL(val)
    setIsNextButtonDisabled(val === "" || likeReason === "")
  }

  const onLikeReasonChange = (val) => {
    setLikeReason(val)
    setIsNextButtonDisabled(url === "" || val === "")
  }

  const handleNextBtnPressed = async () => {
    setIsMutating(true)
    tracking.trackEvent({
      actionName: Schema.ActionNames.NextButtonTapped,
      actionType: Schema.ActionTypes.Tap,
    })

    const result = await addProductRequest({
      variables: {
        reason: likeReason,
        url,
      },
    })

    if (result && result.data && result.data.addProductRequest) {
      const productRequest = result.data.addProductRequest
      if (productRequest.name) {
        props.navigation.navigate("ProductRequestConfirmation", {
          productRequest,
        })
        setIsMutating(false)
      } else {
        // Means that we failed to scrape the product information from the URL
        // and just stored the URL for now
        props.navigation.navigate("FinishProductRequest")
        setIsMutating(false)
      }
    } else {
      Keyboard.dismiss()
      showPopUp(pupUpData)
    }
  }

  return (
    <Container backgroundColor="black100" insetsBottom={false}>
      <FixedBackArrow navigation={props.navigation} variant="blackBackground" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <Box px={2}>
            <Spacer mb={80} />
            <Sans size="3" color="white" weight="medium">
              Submit an item
            </Sans>
            <Spacer mb={14} />
            <Sans size="2" color={color("black25")} weight="medium">
              Recommend something for us to carry by pasting the link to the item below.
            </Sans>
            <Spacer mb={4} />
            <TextInput placeholder="Your link goes here" variant="dark" onChangeText={(_, val) => onURLChange(val)} />
            <Spacer mb={1} />
            <TextInput
              style={{ height: 240, paddingTop: space(2) }}
              placeholder="Tell us why you like this"
              variant="dark"
              multiline={true}
              onChangeText={(_, val) => onLikeReasonChange(val)}
            />
          </Box>
        </Flex>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
        <FixedButton
          block
          disabled={isNextButtonDisabled || isMutating}
          loading={isMutating}
          variant="primaryWhite"
          onPress={handleNextBtnPressed}
        >
          Submit
        </FixedButton>
      </KeyboardAvoidingView>
    </Container>
  )
})
