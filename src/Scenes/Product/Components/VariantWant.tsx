import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React from "react"
import { Dimensions, Text, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { GreenCheck, LeftTabCorner, RightTabCorner } from "Assets/svgs"
import { GET_PRODUCT } from "App/Apollo/Queries"
import { Flex, Sans } from "App/Components"
import { color } from "App/utils"
import { useTracking, Schema } from "App/utils/track"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const ADD_PRODUCT_VARIANT_WANT = gql`
  mutation AddProductVariantWant($variantID: ID!) {
    addProductVariantWant(variantID: $variantID) {
      id
    }
  }
`
const VARIANT_WANT_HEIGHT = 52
const THANKS_MESSAGE = " Thanks! We'll let you know"

interface VariantWantProps {
  isWanted: boolean
  productID: string
  variantID: string
  productSlug: string
}

export const VariantWant = (props: VariantWantProps) => {
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { isWanted, productID, variantID, productSlug } = props
  const shouldShowGreenCheck = isWanted
  const plainText = isWanted ? THANKS_MESSAGE : "Want this item? "
  const underlinedText = isWanted ? "" : "Let us know!"

  const popUpData = {
    buttonText: "Got it",
    note: "We couldn’t save that you want this item! Try again.",
    title: "Something went wrong!",
    onClose: () => hidePopUp(),
  }
  const [addProductVariantWant] = useMutation(ADD_PRODUCT_VARIANT_WANT, {
    onError: error => {
      console.error("error VariantWant.tsx: ", error)
      showPopUp(popUpData)
    },
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          productID,
        },
      },
    ],
  })

  const handleWantVariant = async () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.ProductWanted,
      actionType: Schema.ActionTypes.Tap,
      variantID,
    })
    try {
      const result = await addProductVariantWant({
        variables: {
          variantID,
        },
      })
      if (!result?.data?.addProductVariantWant) {
        showPopUp(popUpData)
      }
    } catch (e) {
      console.log("error VariantWant.tsx ", e)
      showPopUp(popUpData)
    }
  }

  const { width } = Dimensions.get("window")

  return (
    <Container style={{ width }}>
      <LeftCorner />
      <RightCorner />
      <TextContainer>
        {shouldShowGreenCheck && <GreenCheck width={16} height={16} strokeWidth={6} />}
        <Text>
          <Sans size="2" color={color("white100")}>
            {plainText}
          </Sans>
          <TouchableWithoutFeedback onPress={handleWantVariant}>
            <Sans style={{ textDecorationLine: "underline" }} size="2" color={color("white100")}>
              {underlinedText}
            </Sans>
          </TouchableWithoutFeedback>
        </Text>
      </TextContainer>
    </Container>
  )
}

const Container = styled(Flex)`
  position: absolute;
  background: ${color("black100")};
  bottom: 0;
  height: ${VARIANT_WANT_HEIGHT};
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
  bottom: ${VARIANT_WANT_HEIGHT};
  left: 0;
`

const RightCorner = styled(RightTabCorner)`
  position: absolute;
  bottom: ${VARIANT_WANT_HEIGHT};
  right: 0;
`
