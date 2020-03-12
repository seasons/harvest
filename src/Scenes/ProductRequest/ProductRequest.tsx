import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { Box, PopUp, FixedButton, Flex, Sans, Spacer, TextInput, FixedBackArrow, Container } from "App/Components"
import { color, space } from "App/utils"

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

export const ProductRequest = (props: any) => {
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
  const [likeReason, setLikeReason] = useState("")
  const [showError, setShowError] = useState(false)
  const [url, setURL] = useState("")

  const [addProductRequest] = useMutation(ADD_PRODUCT_REQUEST, {
    onError: error => {
      console.error(error)
      Keyboard.dismiss()
      setShowError(true)
    },
  })

  const onURLChange = val => {
    setURL(val)
    setIsNextButtonDisabled(val === "" || likeReason === "")
  }

  const onLikeReasonChange = val => {
    setLikeReason(val)
    setIsNextButtonDisabled(url === "" || val === "")
  }

  const handleNextBtnPressed = async () => {
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
      } else {
        // Means that we failed to scrape the product information from the URL
        // and just stored the URL for now
        props.navigation.navigate("FinishProductRequest")
      }
    } else {
      Keyboard.dismiss()
      setShowError(true)
    }
  }

  const pupUpData = {
    buttonText: "Got it",
    note: "We couldn’t find anything using this URL. Double check and try again.",
    title: "Your link didn’t work!",
    onClose: () => setShowError(false),
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
            <Sans size="2" color={color("black15")} weight="medium">
              Recommend something for us to carry by pasting the link to the item below.
            </Sans>
            <Spacer mb={4} />
            <TextInput
              placeholder="Your link goes here"
              variant="dark"
              textContentType="link"
              onChangeText={(_, val) => onURLChange(val)}
            />
            <Spacer mb={1} />
            <TextInput
              style={{ height: 240, paddingTop: space(2) }}
              placeholder="Tell us why you like this"
              variant="dark"
              textContentType="whyLike"
              multiline={true}
              onChangeText={(_, val) => onLikeReasonChange(val)}
            />
          </Box>
        </Flex>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
        <FixedButton block disabled={isNextButtonDisabled} variant="primaryWhite" onPress={handleNextBtnPressed}>
          Next
        </FixedButton>
      </KeyboardAvoidingView>
      <PopUp data={pupUpData} show={showError} />
    </Container>
  )
}
