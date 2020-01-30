import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, PopUp, FixedButton, Flex, Sans, Spacer, TextInput, Theme } from "App/Components"
import { CloseXIcon } from "Assets/icons"
import { color } from "App/Utils"
import styled from "styled-components/native"

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
      console.log(error)
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

    if (result.data && result.data.addProductRequest) {
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

  const insets = useSafeArea()

  return (
    <Theme>
      <Container style={{ paddingTop: insets.top, paddingBottom: insets.bottom, background: color("black100") }}>
        <CloseButton onPress={() => props.navigation.dismiss()}>
          <Box p="14px">
            <CloseXIcon />
          </Box>
        </CloseButton>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
            <Box style={{ marginTop: 8 }} m={2}>
              <Sans size="3" color="white" weight="medium">
                Submit an item
              </Sans>
              <Spacer mb={14} />
              <Sans size="2" color="rgba(255, 255, 255, 0.5)" weight="medium">
                Recommend something for us to carry by pasting the link to the item below.
              </Sans>
              <Spacer mb={32} />
              <TextInput
                placeholder="Your link goes here"
                variant="dark"
                textContentType="link"
                onChangeText={(_, val) => onURLChange(val)}
              />
              <Spacer mb={1} />
              <TextInput
                style={{ height: 240, paddingTop: 16 }}
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
          <FixedButton disabled={isNextButtonDisabled} variant={"primaryBlack"} onPress={handleNextBtnPressed}>
            Next
          </FixedButton>
        </KeyboardAvoidingView>
      </Container>
      <PopUp
        buttonText="Got it"
        note="We couldn’t find anything using this URL. Double check and try again."
        title="Your link didn’t work!"
        theme="light"
        show={showError}
        onClose={() => setShowError(false)}
      />
    </Theme>
  )
}

const Container = styled(Box)`
  background: black;
  flex: 1;
`

const CloseButton = styled(TouchableOpacity)`
  background-color: rgba(255, 255, 255, 0.2);
  width: 40;
  height: 40;
  border-radius: 20;
  margin-left: auto;
  margin-right: 20;
  margin-top: 12;
`
