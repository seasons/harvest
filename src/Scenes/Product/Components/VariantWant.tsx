import { Flex, Sans } from "App/Components"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { CheckCircled, LeftTabCorner, RightTabCorner } from "Assets/svgs"
import gql from "graphql-tag"
import React from "react"
import { Dimensions, Text, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import { useMutation } from "@apollo/react-hooks"
import { useNavigation } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"

import { GET_PRODUCT } from "../Queries"

const ADD_PRODUCT_VARIANT_WANT = gql`
  mutation AddProductVariantWant($variantID: ID!) {
    addProductVariantWant(variantID: $variantID) {
      id
    }
  }
`
interface VariantWantProps {
  isWanted: boolean
  productID: string
  variantID: string
  productSlug: string
  setShowWantedConfirmation: (bool) => void
}

export const VariantWant = (props: VariantWantProps) => {
  const tracking = useTracking()
  const navigation = useNavigation()
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { isWanted, productID, variantID, productSlug, setShowWantedConfirmation } = props

  const popUpData = {
    buttonText: "Got it",
    note: "We couldn’t save that you want this item! Try again.",
    title: "Something went wrong!",
    onClose: () => hidePopUp(),
  }
  const [addProductVariantWant] = useMutation(ADD_PRODUCT_VARIANT_WANT, {
    onError: (error) => {
      Sentry.captureException(error)
      console.error("error VariantWant.tsx: ", error)
      showPopUp(popUpData)
    },
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          where: { id: productID, slug: productSlug },
        },
      },
    ],
  })

  const handleWantVariant = async () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.ProductWanted,
      actionType: Schema.ActionTypes.Tap,
      variantID,
      productID,
      productSlug,
    })

    if (!authState?.userSession) {
      return navigation.navigate("Modal", { screen: "SignInModal" })
    }

    try {
      const result = await addProductVariantWant({
        variables: {
          variantID,
        },
      })
      if (!result?.data?.addProductVariantWant) {
        showPopUp(popUpData)
      } else {
        setShowWantedConfirmation(true)
      }
    } catch (e) {
      console.log("error VariantWant.tsx ", e)
      showPopUp(popUpData)
    }
  }

  if (!variantID) {
    return null
  }

  const { width } = Dimensions.get("window")

  return (
    <Container style={{ width }}>
      <LeftCorner />
      <RightCorner />
      <TextContainer>
        {isWanted && <CheckCircled width={16} height={16} strokeWidth={6} />}
        <Text>
          <Sans size="2" color={color("white100")}>
            {isWanted ? " Thanks! We'll let you know" : "Want this item? "}
          </Sans>
          <TouchableWithoutFeedback onPress={handleWantVariant}>
            <Sans style={{ textDecorationLine: "underline" }} size="2" color={color("white100")}>
              {isWanted ? "" : "Let us know!"}
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
