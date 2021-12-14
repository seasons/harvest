import React, { useState } from "react"
import { Box, Separator, Flex, Sans, Spacer, Button } from "App/Components"
import { PopUp } from "App/Components/PopUp"
import { Text } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils/color"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useMutation } from "@apollo/client"
import { ADD_TO_BAG, GetBag_NoCache_Query } from "App/Scenes/Bag/BagQueries"
import { useAuthContext } from "App/Navigation/AuthContext"
import { GET_PRODUCT } from "../Queries"
import { MAXIMUM_ITEM_COUNT } from "App/helpers/constants"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { useNavigation } from "@react-navigation/native"
import { CheckCircled } from "Assets/svgs"
import { ADD_OR_REMOVE_FROM_LOCAL_BAG } from "App/queries/clientQueries"
import { Spinner } from "App/Components/Spinner"

const getSuggestedVariant = (selectedVariant, variants, fit) => {
  const selectedSizeIndex = variants?.findIndex((v) => v?.id === selectedVariant?.id)
  if (fit === "RunsBig") {
    return variants?.[selectedSizeIndex - 1]
  } else {
    return variants?.[selectedSizeIndex + 1]
  }
}

export const SizeWarning = ({ data, show, selectedVariant, setShowSizeWarning, setSelectedVariant }) => {
  const { authState } = useAuthContext()
  const navigation = useNavigation()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const isUserSignedIn = authState?.isSignedIn
  const product = data?.products?.[0]
  const [isMutatingCTA, setIsMutatingCTA] = useState(false)
  const [isMutatingSecondaryButton, setIsMutatingSecondaryButton] = useState(false)
  const productFit = product.productFit
  const runsSmall = !!productFit && productFit === "RunsSmall"
  const category = product?.category?.name?.toLowerCase()
  const selectedSize = selectedVariant?.displayLong
  const suggestedVariant = getSuggestedVariant(selectedVariant, product.variants, productFit)
  const suggestSizeDisplay = suggestedVariant?.displayLong
  const me = data?.me

  const mutationSettings = {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
      {
        query: GET_PRODUCT,
        variables: { where: { id: product?.id } },
      },
    ],
    onError: (err) => {
      setIsMutatingCTA(false)
      setIsMutatingSecondaryButton(false)
      if (err && err.graphQLErrors) {
        console.log("error SizeWarning.tsx ", err)
        if (err.toString().includes("already in bag")) {
          showPopUp({
            title: "Item is already in your bag",
            note: "Looks like you've already added it!",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        } else if (err.toString().includes("Bag is full")) {
          showPopUp({
            title: "Your bag is full",
            note: "Remove one or more items from your bag to continue adding this item.",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        } else {
          showPopUp({
            title: "Oops, sorry!",
            note: "An unexpected error occurred, please try again.",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        }
      }
    },
  }

  const sharedOnComplete = (res) => {
    setShowSizeWarning(false)
    const bagItemCount = authState?.isSignedIn ? me?.bag?.length : res.addOrRemoveFromLocalBag.length
    if (bagItemCount >= MAXIMUM_ITEM_COUNT && isUserSignedIn) {
      showPopUp({
        icon: <CheckCircled />,
        title: "Added to bag",
        note: "Your bag is full. Place your reservation.",
        buttonText: "Got It",
        secondaryButtonText: "Go to bag",
        secondaryButtonOnPress: () => {
          navigation.navigate("BagStack")
          hidePopUp()
        },
        onClose: () => hidePopUp(),
      })
    }
  }

  const [addSelectedVariant] = useMutation(isUserSignedIn ? ADD_TO_BAG : ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    ...mutationSettings,
    variables: {
      id: selectedVariant?.id,
      productID: product?.id,
      variantID: selectedVariant?.id,
    },
    onCompleted: (res) => {
      sharedOnComplete(res)
      setIsMutatingCTA(false)
    },
  })
  const [addRecommendVariant] = useMutation(isUserSignedIn ? ADD_TO_BAG : ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    ...mutationSettings,
    variables: {
      id: suggestedVariant?.id,
      productID: product?.id,
      variantID: suggestedVariant?.id,
    },
    onCompleted: (res) => {
      setSelectedVariant(suggestedVariant)
      sharedOnComplete(res)
      setIsMutatingCTA(false)
    },
  })

  let text
  if (runsSmall) {
    text = `The measurements of this ${category} are smaller than the average ${selectedSize?.toLowerCase()}.${
      !!suggestedVariant ? " We recommend going a size up." : ""
    }`
  } else {
    text = `The measurements of this ${category} are larger than the average ${selectedSize?.toLowerCase()}.${
      !!suggestedVariant ? " We recommend going a size down." : ""
    }`
  }

  let buttonText
  if (!!suggestedVariant && suggestedVariant?.reservable === 0) {
    buttonText = `${suggestSizeDisplay} (unavailable)`
  } else if (!!suggestedVariant) {
    buttonText = `Add ${suggestSizeDisplay}`
  } else {
    buttonText = `Add ${selectedSize}`
  }

  const CancelButton = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setShowSizeWarning(false)}>
        <Sans size="4" style={{ textAlign: "center", textDecorationLine: "underline", width: "100%" }}>
          Cancel
        </Sans>
      </TouchableWithoutFeedback>
    )
  }

  const onCTAPress = () => {
    if (isMutatingCTA || isMutatingSecondaryButton) {
      return
    }
    setIsMutatingCTA(true)
    !!suggestedVariant ? addRecommendVariant() : addSelectedVariant()
  }

  const onSecondaryPress = () => {
    if (isMutatingCTA || isMutatingSecondaryButton) {
      return
    }
    setIsMutatingSecondaryButton(true)
    addSelectedVariant()
  }

  return (
    <PopUp show={show}>
      <Spacer mb={4} />
      <Sans size="4" style={{ textAlign: "center" }}>
        {`Heads up, this `}
        <Text style={{ textDecorationLine: "underline" }}>{runsSmall ? "runs small" : "runs big"}</Text>
      </Sans>
      <Spacer mb={2} />
      <Separator />
      <Spacer mb={3} />
      <Box px={2}>
        <Button
          block
          disabled={!!suggestedVariant && suggestedVariant?.reservable === 0}
          loading={isMutatingCTA}
          onPress={onCTAPress}
        >
          {buttonText}
        </Button>
        <Spacer mb={2} />
        <Sans size="3" style={{ textAlign: "center" }} color="black50">
          {text}
        </Sans>
        <Spacer mb={3} />
        {suggestSizeDisplay ? (
          <Flex flexDirection="row" justifyContent="space-between">
            <Box style={{ width: "49%" }}>
              <CancelButton />
            </Box>
            <MiddleSeperator />
            <Box style={{ width: "49%" }}>
              {isMutatingSecondaryButton ? (
                <Flex width="100%" height={25} justifyContent="center" flexDirection="row" alignItems="center">
                  <Spinner />
                </Flex>
              ) : (
                <TouchableWithoutFeedback onPress={onSecondaryPress}>
                  <Sans size="4" style={{ textAlign: "center", textDecorationLine: "underline", width: "100%" }}>
                    {`Add ${selectedSize}`}
                  </Sans>
                </TouchableWithoutFeedback>
              )}
            </Box>
          </Flex>
        ) : (
          <Flex flexDirection="row" justifyContent="center">
            <CancelButton />
          </Flex>
        )}
      </Box>
      <Spacer mb={4} />
    </PopUp>
  )
}

const MiddleSeperator = styled(Box)`
  height: 100%;
  width: 1px;
  background-color: ${color("black10")};
`
