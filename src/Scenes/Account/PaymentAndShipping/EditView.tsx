import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import stripe, { PaymentCardTextField, StripeToken } from "tipsi-stripe"
import { Box, Button, Flex, Radio, Sans, Spacer, TextInput } from "App/Components"
import {
  GetUserPaymentData_me_customer_detail,
  GetUserPaymentData_me_customer_billingInfo,
  GetUserPaymentData_me_customer_detail_shippingAddress
} from "src/generated/getUserPaymentData"
import { useMutation } from "react-apollo"

interface CreditCardFormProps {
  navigator?: NavigatorIOS
  params?: PaymentCardTextFieldParams
  onSubmit: (t: StripeToken, p: PaymentCardTextFieldParams) => void
}

const UPDATE_CUSTOMER_INFO = gql`
  mutation updateCustomerInfo($currentBillingInfo: BillingInfoCreateInput, $detail: CustomerDetailCreateInput) {
    updateCustomerInfo(billingInfo: $currentBillingInfo, detail: $detail) {
      id
    }
  }
`
const VALIDATE_ADDRESS = gql`
  mutation validateAddress($input: ValidateAddressInput!) {
    validateAddress(input: $input) {
      code
      isValid
      text
    }
  }
`
const BILLING_ADDRESS = "Billing address"
const DELIVERY_ADDRESS = "Delivery address"
const FINISH_BUTTONS = "Finish buttons"
const PAYMENT_INFORMATION = "Payment information"

interface EditViewProps {
  billingInfo?: GetUserPaymentData_me_customer_billingInfo,
  shippingAddress?: GetUserPaymentData_me_customer_detail_shippingAddress,
  onFinishedEditing: () => void,
}

export const EditView: React.FC<EditViewProps> = (props) => {
  const {
    billingInfo: currentBillingInfo,
    shippingAddress: currnetShippingAddress,
    onFinishedEditing
  } = props

  const [shippingAddress, setShippingAddress] = useState({
    address1: currnetShippingAddress?.address1 || "",
    address2: currnetShippingAddress?.address2 || "",
    city: currnetShippingAddress?.city || "",
    state: currnetShippingAddress?.state || "",
    zipCode: currnetShippingAddress?.zipCode || ""
  })

  const [billingInfo, setBillingInfo] = useState({
    address1: currentBillingInfo?.street1 || "",
    address2: currentBillingInfo?.street2 || "",
    cardNumber: currentBillingInfo?.last_digits ? `**** **** **** ${currentBillingInfo?.last_digits}` : "",
    city: currentBillingInfo?.city || "",
    expirationDate: currentBillingInfo?.expiration_month && currentBillingInfo?.expiration_year
      ? `${currentBillingInfo?.expiration_month}/${currentBillingInfo?.expiration_year}`
      : "",
    name: currentBillingInfo?.name || "",
    state: currentBillingInfo?.state || "",
    zipCode: currentBillingInfo?.postal_code || ""
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
    cardNumber,
    city: billingCity,
    expirationDate,
    name,
    state: billingState,
    zipCode: billingZipCode,
  } = billingInfo

  const [updateCustomerInfo] = useMutation(UPDATE_CUSTOMER_INFO, {
    onError: error => {
      console.error("error EditView.tsx: ", error)
    },
  })
  const [validateAddress] = useMutation(VALIDATE_ADDRESS, {
    onError: error => {
      console.error("error EditView.tsx: ", error)
    },
  })

  const handleSameAsDeliveryAddress = () => {
    if (sameAsDeliveryRadioSelected) {
      setBillingInfo({
        address1: "",
        address2: "",
        cardNumber: "",
        city: "",
        expirationDate: "",
        name: "",
        state: "",
        zipCode: "",
      })
    } else {
      setBillingInfo({
        ...billingInfo,
        address1: shippingAddress1,
        address2: shippingAddress2,
        city: shippingCity,
        state: shippingState,
        zipCode: shippingZipCode,
      })
      console.log("SET BILLING CITY:", shippingCity)
    }
    setSameAsDeliveryRadioSelected(!sameAsDeliveryRadioSelected)

    // const result = await validateAddress({
    //   variables: {
    //     input: {
    //       location: {
    //         slug: "Kevin's Address",
    //         name: "Kevin's Address",
    //         address1: "6420 15th Ave",
    //         city: "Brooklyn",
    //         state: "NY",
    //         zipCode: "11219"
    //       }
    //     }
    //   }
    // })
    // console.log(result)
  }

  const getExpirationMonthAndYear = (expirationDate) => {
    const expirationDateInfo = expirationDate.split("/")
    console.log(expirationDateInfo)
    if (expirationDateInfo.length != 2) return null

    const expirationMonth = parseInt(expirationDateInfo[0])
    const expirationYear = parseInt(expirationDateInfo[1])

    if (isNaN(expirationMonth) || isNaN(expirationYear)) return null

    return {
      expirationMonth,
      expirationYear
    }
  }

  const handleSaveBtnPressed = async () => {
    if (!billingAddress1 || !billingZipCode || !billingCity || !billingState || !name || !cardNumber || !expirationDate) {
      return
    }

    // Make sure card number has correct number of digits
    const formattedCardNumber = cardNumber.replace(" ", "")
    if (formattedCardNumber.length !== 16) return

    // Make sure expiration date is correctly formatted
    const expirationDateInfo = getExpirationMonthAndYear(expirationDate)
    if (!expirationDateInfo) return

    const result = await updateCustomerInfo({
      variables: {
        currentBillingInfo: {
          brand: "Visa",
          name,
          last_digits: formattedCardNumber.substring(12),
          expiration_month: expirationDateInfo.expirationMonth,
          expiration_year: expirationDateInfo.expirationYear,
          postal_code: billingZipCode,
          street1: billingAddress1,
          street2: billingAddress2,
          city: billingCity,
          state: billingState,
        }
      }
    })
    console.log(result)

    // console.log(name, cardNumber, expirationDate, billingZipCode)
    // console.log(billingAddress1, billingAddress2, billingZipCode, billingCity, billingState, name, cardNumber, expirationDate)

    // onFinishedEditing()
  }

  const sections = [DELIVERY_ADDRESS, BILLING_ADDRESS, PAYMENT_INFORMATION, FINISH_BUTTONS]

  // const tokenizeCardAndSubmit = async () => {
  //   this.setState({ isLoading: true, isError: false })

  //   const { params } = this.state

  //   try {
  //     const token = await stripe.createTokenWithCard({ ...params })
  //     this.props.onSubmit(token, this.state.params)
  //     this.setState({ isLoading: false })
  //     this.props.navigator.pop()
  //   } catch (error) {
  //     console.warn("CreditCardForm.tsx", error)
  //     this.setState({ isError: true, isLoading: false })
  //   }
  // }
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
            <TextInput currentValue={billingAddress1} placeholder="Address 1" onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo, address1: text })} />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={billingAddress2} placeholder="Address 2" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo, address2: text })} />
              <Spacer ml={1} />
              <TextInput currentValue={billingZipCode} placeholder="Zipcode" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo, zipCode: text })} />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={billingCity} placeholder="City" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo, city: text })} />
              <Spacer ml={1} />
              <TextInput currentValue={billingState} placeholder="State" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo, state: text })} />
            </Flex>
          </>
        )
      case PAYMENT_INFORMATION:
        return (
          <>
            <Sans size="1">{PAYMENT_INFORMATION}</Sans>
            <Spacer mb={2} />
            <TextInput currentValue={name} placeholder="Full name" onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo, name: text })} />
            <Spacer mb={2} />
            <TextInput currentValue={cardNumber} placeholder="Card number" onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo, cardNumber: text })} />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={expirationDate} placeholder="Expiration date" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo, expirationDate: text })} />
              <Spacer ml={1} />
              <TextInput currentValue={billingZipCode} placeholder="CVV" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingInfo({ ...billingInfo })} />
            </Flex>
          </>
        )
      case FINISH_BUTTONS:
        return (
          <Flex flexDirection="row" justifyContent="space-between">
            <Button variant="primaryWhite" size="large" width={buttonWidth} onPress={onFinishedEditing}>
              Cancel
            </Button>
            <Button variant="secondaryBlack" size="large" width={buttonWidth} onPress={handleSaveBtnPressed}>
              Save
            </Button>
          </Flex>
        )
      default:
        return null
    }
  }

  const insets = useSafeArea()
  return (
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
  )
}
