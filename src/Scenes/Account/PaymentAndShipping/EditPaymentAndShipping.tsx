import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Button, Container, Flex, FixedBackArrow, PopUp, Radio, Sans, Spacer, TextInput } from "App/Components"
import { get } from "lodash"
import { chargebeeUpdatePaymentPage_chargebeeUpdatePaymentPage } from "src/generated/chargebeeUpdatePaymentPage"
import { GET_PAYMENT_DATA } from "./PaymentAndShipping"
import {
  GetUserPaymentData_me_customer_billingInfo,
  GetUserPaymentData_me_customer_detail_shippingAddress
} from "src/generated/getUserPaymentData"
import { useMutation, useQuery } from "react-apollo"

const UPDATE_PAYMENT_AND_SHIPPING = gql`
  mutation updatePaymentAndShipping($billingAddress: AddressInput!, $shippingAddress: AddressInput!) {
    updatePaymentAndShipping(billingAddress: $billingAddress, shippingAddress: $shippingAddress) 
  }
`

const BILLING_ADDRESS = "Billing address"
const DELIVERY_ADDRESS = "Delivery address"
const EDIT_BILLING_INFO = "Edit billing info"
const FINISH_BUTTONS = "Finish buttons"

export const EditPaymentAndShipping: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const billingInfo: GetUserPaymentData_me_customer_billingInfo = get(route, "params.billingInfo")
  const chargebeeUpdatePaymentHostedPage: chargebeeUpdatePaymentPage_chargebeeUpdatePaymentPage = get(route, "params.chargebeeUpdatePaymentHostedPage")
  const currentShippingAddress: GetUserPaymentData_me_customer_detail_shippingAddress = get(route, "params.shippingAddress")

  const [showError, setShowError] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    address1: currentShippingAddress?.address1 || "",
    address2: currentShippingAddress?.address2 || "",
    city: currentShippingAddress?.city || "",
    state: currentShippingAddress?.state || "",
    zipCode: currentShippingAddress?.zipCode || ""
  })

  const [billingAddress, setBillingAddress] = useState({
    address1: billingInfo?.street1 || "",
    address2: billingInfo?.street2 || "",
    city: billingInfo?.city || "",
    state: billingInfo?.state || "",
    zipCode: billingInfo?.postal_code || ""
  })
  const [sameAsDeliveryRadioSelected, setSameAsDeliveryRadioSelected] = useState(false)

  const {
    address1: shippingAddress1,
    address2: shippingAddress2,
    city: shippingCity,
    state: shippingState,
    zipCode: shippingZipCode,
  } = shippingAddress

  const {
    address1: billingAddress1,
    address2: billingAddress2,
    city: billingCity,
    state: billingState,
    zipCode: billingZipCode,
  } = billingAddress

  const [updatePaymentAndShipping] = useMutation(UPDATE_PAYMENT_AND_SHIPPING, {
    onError: error => {
      setShowError(true)
      console.log("error EditView.tsx: ", error)
    },
  })

  const handleSameAsDeliveryAddress = () => {
    if (sameAsDeliveryRadioSelected) {
      setBillingAddress({
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      })
    } else {
      setBillingAddress({
        address1: shippingAddress1,
        address2: shippingAddress2,
        city: shippingCity,
        state: shippingState,
        zipCode: shippingZipCode,
      })
      console.log("SET BILLING CITY:", shippingCity)
    }
    setSameAsDeliveryRadioSelected(!sameAsDeliveryRadioSelected)
  }

  const handleSaveBtnPressed = async () => {
    setIsMutating(true)
    const result = await updatePaymentAndShipping({
      variables: {
        billingAddress: {
          city: billingCity,
          postalCode: billingZipCode,
          state: billingState,
          street1: billingAddress1,
          street2: billingAddress2
        },
        shippingAddress: {
          city: shippingCity,
          postalCode: shippingZipCode,
          state: shippingState,
          street1: shippingAddress1,
          street2: shippingAddress2
        }
      },
      refetchQueries: [
        {
          query: GET_PAYMENT_DATA
        }
      ]
    })
    console.log("UPDATED INFO:", result)
    setIsMutating(false)
    if (result) {
      navigation.pop()
    }
  }

  const handleEditBillingInfoBtnPressed = () => {
    if (chargebeeUpdatePaymentHostedPage.url) {
      navigation.navigate("Webview", {
        uri: chargebeeUpdatePaymentHostedPage.url,
        variant: "whiteBackground"
      })
    }
  }

  const handleCancelBtnPressed = () => {
    navigation.pop()
  }

  const sections = [DELIVERY_ADDRESS, BILLING_ADDRESS, EDIT_BILLING_INFO, FINISH_BUTTONS]

  const screenWidth = Dimensions.get("window").width
  const buttonWidth = (screenWidth - 40) / 2
  const renderItem = ({ item: section }) => {
    switch (section) {
      case DELIVERY_ADDRESS:
        return (
          <>
            <Sans size="1">{DELIVERY_ADDRESS}</Sans>
            <Spacer mb={2} />
            <TextInput currentValue={shippingAddress1} placeholder="Address 1" onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, address1: text })} />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
              <TextInput currentValue={shippingAddress2} placeholder="Address 2" style={{ flex: 1 }} onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, address2: text })} />
              <Spacer ml={1} />
              <TextInput currentValue={shippingZipCode} placeholder="Zipcode" style={{ flex: 1 }} onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, zipCode: text })} />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={shippingCity} placeholder="City" style={{ flex: 1 }} onChangeText={(inputKey, text) => { setShippingAddress({ ...shippingAddress, city: text }) }} />
              <Spacer ml={1} />
              <TextInput currentValue={shippingState} placeholder="State" style={{ flex: 1 }} onChangeText={(inputKey, text) => { setShippingAddress({ ...shippingAddress, state: text }) }} />
            </Flex>
          </>
        )
      case BILLING_ADDRESS:
        return (
          <>
            <Sans size="1">{BILLING_ADDRESS}</Sans>
            <Spacer mb={2} />
            <Radio
              borderRadius={4}
              selected={sameAsDeliveryRadioSelected}
              onSelect={handleSameAsDeliveryAddress}
              label="Same as Delivery Address"
              labelSize="1"
            />
            <Spacer mb={2} />
            <TextInput currentValue={billingAddress1} placeholder="Address 1" onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, address1: text })} />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={billingAddress2} placeholder="Address 2" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, address2: text })} />
              <Spacer ml={1} />
              <TextInput currentValue={billingZipCode} placeholder="Zipcode" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, zipCode: text })} />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={billingCity} placeholder="City" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, city: text })} />
              <Spacer ml={1} />
              <TextInput currentValue={billingState} placeholder="State" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, state: text })} />
            </Flex>
          </>
        )
      case EDIT_BILLING_INFO:
        return (
          <Flex flexDirection="row" justifyContent="space-between">
            <Button variant="secondaryBlack" size="large" width={buttonWidth} onPress={handleEditBillingInfoBtnPressed}>
              Edit Billing Info
            </Button>
          </Flex>
        )
      case FINISH_BUTTONS:
        return (
          <Flex flexDirection="row" justifyContent="space-between">
            <Button variant="primaryWhite" size="large" width={buttonWidth} onPress={handleCancelBtnPressed}>
              Cancel
            </Button>
            <Button loading={isMutating} variant="secondaryBlack" size="large" width={buttonWidth} onPress={handleSaveBtnPressed}>
              Save
            </Button>
          </Flex>
        )
      default:
        return null
    }
  }

  const popUpData = {
    buttonText: "Got it",
    note: "Make sure your shipping and billing address are valid.",
    title: "Something went wrong!",
    onClose: () => setShowError(false)
  }

  const insets = useSafeArea()
  return (
    <Container insetsBottom={0}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box px={2}>
        <FlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box mt={insets.top}>
              <Spacer mb={2} />
              <Sans size="3">Payment & Shipping</Sans>
              <Spacer mb={6} />
            </Box>
          )}
          ItemSeparatorComponent={() => <Spacer mb={6} />}
          keyExtractor={(item, index) => item + String(index)}
          renderItem={renderItem}
          ListFooterComponent={() => <Spacer mb={2} />}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <PopUp data={popUpData} show={showError} insetsBottom={true} />
    </Container>
  )
}
