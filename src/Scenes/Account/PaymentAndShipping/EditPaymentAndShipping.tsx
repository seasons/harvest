import gql from "graphql-tag"
import { space } from "App/utils"
import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { Dimensions, Keyboard, KeyboardAvoidingView } from "react-native"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  Box,
  Button,
  Container,
  Flex,
  FixedBackArrow,
  Sans,
  Spacer,
  TextInput,
  SuggestedAddressPopupComponent,
} from "App/Components"
import { GetUserPaymentData_me_customer_detail_shippingAddress } from "src/generated/getUserPaymentData"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { screenTrack } from "App/utils/track"
import * as Sentry from "@sentry/react-native"
import analytics from "@segment/analytics-react-native"
import { GET_PAYMENT_DATA } from "./queries"

export const UPDATE_PHONE_AND_SHIPPING = gql`
  mutation updatePaymentAndShipping($shippingAddress: AddressInput!, $phoneNumber: String!) {
    updatePaymentAndShipping(shippingAddress: $shippingAddress, phoneNumber: $phoneNumber)
  }
`

const PHONE_NUMBER = "Phone number"
const SHIPPING_ADDRESS = "Shipping address"

export const EditPaymentAndShipping: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ navigation, route }) => {
  const { showPopUp, hidePopUp } = usePopUpContext()
  const currentShippingAddress: GetUserPaymentData_me_customer_detail_shippingAddress = route?.params?.shippingAddress
  const currentPhoneNumber = route?.params?.phoneNumber
  const insets = useSafeAreaInsets()
  const [isMutating, setIsMutating] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    address1: currentShippingAddress?.address1 || "",
    address2: currentShippingAddress?.address2 || "",
    city: currentShippingAddress?.city || "",
    state: currentShippingAddress?.state || "",
    zipCode: currentShippingAddress?.zipCode || "",
  })
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber)

  const [updatePaymentAndShipping] = useMutation(UPDATE_PHONE_AND_SHIPPING, {
    onError: (error) => {
      let popUpData = {
        buttonText: "Got it",
        note: "Please make sure your address is valid. If you're having trouble contact us.",
        title: "Something went wrong!",
        onClose: () => hidePopUp(),
      }
      if (error.toString().includes("shipping address is invalid")) {
        popUpData = {
          title: "Your shipping address is invalid",
          note: "Please check if your shipping address looks valid. If you're having trouble contact us.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      } else if (error.toString().includes("billing address is invalid")) {
        popUpData = {
          title: "Your billing address is invalid",
          note: "Please check if your billing address looks valid. If you're having trouble contact us.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      }
      if (error.message === "Need to Suggest Address") {
        const suggestedAddress = error.graphQLErrors?.[0]?.extensions?.suggestedAddress
        if (!!suggestedAddress) {
          popUpData = {
            buttonText: "Use address",
            //@ts-ignore
            component: <SuggestedAddressPopupComponent suggestedAddress={suggestedAddress} type="Shipping" />,
            secondaryButtonText: "Close",
            secondaryButtonOnPress: () => hidePopUp(),
            onClose: () => {
              setShippingAddress({
                address1: suggestedAddress.street1,
                address2: suggestedAddress.street2,
                city: suggestedAddress.city,
                state: suggestedAddress.state,
                zipCode: suggestedAddress.zip,
              })
              handleSaveBtnPressed({
                shippingAddressOveride: {
                  street1: suggestedAddress.street1,
                  street2: suggestedAddress.street2,
                  city: suggestedAddress.city,
                  state: suggestedAddress.state,
                  postalCode: suggestedAddress.zip,
                },
              })
              hidePopUp()
            },
          }
        }
      }
      Sentry.captureException(error)
      Keyboard.dismiss()
      showPopUp(popUpData)
      console.log("Error EditView.tsx: ", error)
    },
    onCompleted: (data) => {
      const userId = data?.customer?.user?.id
      if (!!userId) {
        analytics.identify(userId, { state: shippingState })
      }
    },
  })

  const {
    address1: shippingAddress1,
    address2: shippingAddress2,
    city: shippingCity,
    state: shippingState,
    zipCode: shippingZipCode,
  } = shippingAddress

  const handleSaveBtnPressed = async ({ shippingAddressOveride }) => {
    setIsMutating(true)
    const result = await updatePaymentAndShipping({
      variables: {
        phoneNumber,
        shippingAddress: !!shippingAddressOveride
          ? shippingAddressOveride
          : {
              city: shippingCity,
              postalCode: shippingZipCode,
              state: shippingState,
              street1: shippingAddress1,
              street2: shippingAddress2,
            },
      },
      refetchQueries: [
        {
          query: GET_PAYMENT_DATA,
        },
      ],
    })
    setIsMutating(false)
    if (result) {
      navigation.goBack()
    }
  }

  const handleCancelBtnPressed = () => navigation.goBack()

  const sections = [SHIPPING_ADDRESS, PHONE_NUMBER]

  const screenWidth = Dimensions.get("window").width
  const buttonWidth = (screenWidth - 40) / 2
  const renderItem = ({ item: section }) => {
    switch (section) {
      case SHIPPING_ADDRESS:
        return (
          <>
            <Sans size="4">{SHIPPING_ADDRESS}</Sans>
            <Spacer mb={2} />
            <TextInput
              currentValue={shippingAddress1}
              placeholder="Address 1"
              onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, address1: text })}
            />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
              <TextInput
                currentValue={shippingAddress2}
                placeholder="Address 2"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, address2: text })}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={shippingZipCode}
                placeholder="Zipcode"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, zipCode: text })}
              />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput
                currentValue={shippingCity}
                placeholder="City"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => {
                  setShippingAddress({ ...shippingAddress, city: text })
                }}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={shippingState}
                placeholder="State"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => {
                  setShippingAddress({ ...shippingAddress, state: text })
                }}
              />
            </Flex>
          </>
        )
      case PHONE_NUMBER:
        return (
          <>
            <Sans size="4">{PHONE_NUMBER}</Sans>
            <Spacer mb={2} />
            <TextInput
              currentValue={phoneNumber}
              placeholder="Phone number"
              onChangeText={(inputKey, text) => setPhoneNumber(text)}
            />
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box px={2} style={{ flex: 1 }}>
        <KeyboardAwareFlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box mt={insets.top}>
              <Spacer mb={2} />
              <Sans size="7">Edit shipping address</Sans>
              <Spacer mb={4} />
            </Box>
          )}
          ItemSeparatorComponent={() => <Spacer mb={3} />}
          keyExtractor={(item, index) => item + String(index)}
          renderItem={renderItem}
          ListFooterComponent={() => <Spacer mb={space(1) * 8 + 50} />}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={space(2)} style={{ bottom: space(2) }}>
        <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
          <Button variant="primaryWhite" width={buttonWidth} onPress={handleCancelBtnPressed}>
            Cancel
          </Button>
          <Spacer ml={1} />
          <Button
            loading={isMutating}
            disabled={isMutating}
            variant="secondaryBlack"
            width={buttonWidth}
            onPress={handleSaveBtnPressed}
          >
            Save
          </Button>
        </Flex>
      </KeyboardAvoidingView>
    </Container>
  )
})
