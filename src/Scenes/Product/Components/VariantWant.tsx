import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React, { useState } from "react"
import { Dimensions, Text, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { SmallGreenCheck, LeftTabCorner, RightTabCorner } from "Assets/svgs"
import { Flex, PopUp, Sans, Theme } from "App/Components"
import { color } from "App/Utils"

const ADD_PRODUCT_VARIANT_WANT = gql`
  mutation AddProductVariantWant($variantID: ID!) {
    addProductVariantWant(variantID: $variantID) {
      id
    }
  }
`
const THANKS_MESSAGE = " Thanks! We'll let you know"

interface VariantWantProps {
  variantID: string
  productVariantWantExists: boolean
}

export const VariantWant = (props: VariantWantProps) => {
  const { productVariantWantExists, variantID } = props
  const [shouldShowGreenCheck, setShouldShowGreenCheck] = useState(productVariantWantExists)
  const [plainText, setPlainText] = useState(
    productVariantWantExists ? THANKS_MESSAGE : "Want this item? "
  )
  const [underlinedText, setUnderlinedText] = useState(productVariantWantExists ? "" : "Let us know!")
  const [showError, setShowError] = useState(false)

  const [addProductVariantWant] = useMutation(ADD_PRODUCT_VARIANT_WANT, {
    onError: error => {
      console.error("error VariantWant.tsx: ", error)
      setShowError(true)
    },
  })

  const handleWantVariant = async () => {
    try {
      const result = await addProductVariantWant({
        variables: {
          variantID
        }
      })
      if (result && result.data && result.data.addProductVariantWant) {
        setShouldShowGreenCheck(true)
        setPlainText(THANKS_MESSAGE)
        setUnderlinedText("")
      } else {
        setShowError(true)
      }
    } catch (e) {
      setShowError(true)
    }
  }

  const { width } = Dimensions.get("window")
  const popUpData = {
    buttonText: "Got it",
    note: "We couldn’t save that you want this item! Try again.",
    title: "Something went wrong!",
    onClose: () => setShowError(false),
  }

  return (
    <>
      <Theme>
        <Container style={{ width }}>
          <LeftCorner />
          <RightCorner />
          <TextContainer>
            {shouldShowGreenCheck && <SmallGreenCheck />}
            <Text>
              <Sans size="2" color="white">
                {plainText}
              </Sans>
              <TouchableWithoutFeedback onPress={handleWantVariant}>
                <Sans style={{ textDecorationLine: "underline" }} size="2" color={color("white")}>
                  {underlinedText}
                </Sans>
              </TouchableWithoutFeedback>
            </Text>
          </TextContainer>
        </Container>
        <PopUp data={popUpData} show={showError} />
      </Theme>
    </>
  )
}

const Container = styled(Flex)`
  position: absolute;
  background: black;
  bottom: 0;
  height: 52;
`

const TextContainer = styled(Flex)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20;
`

const LeftCorner = styled(LeftTabCorner)`
  position: absolute;
  bottom: 52;
  left: 0;
`

const RightCorner = styled(RightTabCorner)`
  position: absolute;
  bottom: 52;
  right: 0;
`
