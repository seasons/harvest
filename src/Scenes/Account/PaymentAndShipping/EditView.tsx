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
  mutation updateCustomerInfo($billingInfo: BillingInfoCreateInput, $detail: CustomerDetailCreateInput) {
    updateCustomerInfo(billingInfo: $billingInfo, detail: $detail) {
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
  const { billingInfo, shippingAddress, onFinishedEditing } = props
  const [shippingAddress1, setShippingAddress1] = useState(shippingAddress?.address1 || "")
  const [shippingAddress2, setShippingAddress2] = useState(shippingAddress?.address2 || "")
  const [shippingCity, setShippingCity] = useState(shippingAddress?.city || "")
  const [shippingState, setShippingState] = useState(shippingAddress?.state || "")
  const [shippingZipCode, setShippingZipCode] = useState(shippingAddress?.zipCode || "")

  const [billingAddress1, setBillingAddress1] = useState(billingInfo?.street1 || "")
  const [billingAddress2, setBillingAddress2] = useState(billingInfo?.street2 || "")
  const [billingCity, setBillingCity] = useState("")
  const [billingState, setBillingState] = useState(billingInfo?.state || "")
  const [billingZipCode, setBillingZipCode] = useState(billingInfo?.postal_code || "")

  const [name, setName] = useState(billingInfo?.name || "")
  const [cardNumber, setCardNumber] = useState(billingInfo?.last_digits ? `**** **** **** ${billingInfo?.last_digits}` : "")
  const [expirationDate, setExpriationDate] = useState(
    billingInfo?.expiration_month && billingInfo?.expiration_year
      ? `${billingInfo?.expiration_month}/${billingInfo?.expiration_year}`
      : ""
  )
  const [sameAsDeliveryRadioSelected, setSameAsDeliveryRadioSelected] = useState(false)

  // console.log("SHIPPING CITY:", shippingCity, ",BILLING CITY:", billingCity)

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
      setBillingAddress1("")
      setBillingAddress2("")
      setBillingZipCode("")
      setBillingCity("")
      setBillingState("")
    } else {
      setBillingAddress1(shippingAddress1)
      setBillingAddress2(shippingAddress2)
      setBillingZipCode(shippingZipCode)
      setBillingCity(shippingCity)
      setBillingState(shippingState)
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
    // console.log(name, cardNumber, expirationDate, billingZipCode)
    console.log(billingAddress1, billingAddress2, billingZipCode, billingCity, billingState, name, cardNumber, expirationDate)
    if (billingAddress1 && billingZipCode && billingCity && billingState && name && cardNumber && expirationDate) {
      const expirationDateInfo = getExpirationMonthAndYear(expirationDate)
      console.log(expirationDateInfo)
      if (expirationDateInfo) {
        const result = await updateCustomerInfo({
          variables: {
            billingInfo: {
              name,
              last_digits: cardNumber,
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
      }
    }
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
            <TextInput currentValue={shippingAddress1} placeholder="Address 1" onChangeText={(inputKey, text) => { setShippingAddress1(text) }} />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
              <TextInput currentValue={shippingAddress2} placeholder="Address 2" style={{ flex: 1 }} onChangeText={(inputKey, text) => { setShippingAddress2(text) }} />
              <Spacer ml={1} />
              <TextInput currentValue={shippingZipCode} placeholder="Zipcode" style={{ flex: 1 }} onChangeText={(inputKey, text) => { setShippingZipCode(text) }} />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={shippingCity} placeholder="City" style={{ flex: 1 }} onChangeText={(inputKey, text) => { setShippingCity(text) }} />
              <Spacer ml={1} />
              <TextInput currentValue={shippingState} placeholder="State" style={{ flex: 1 }} onChangeText={(inputKey, text) => { setShippingState(text) }} />
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
            <TextInput currentValue={billingAddress1} placeholder="Address 1" onChangeText={(inputKey, text) => { setBillingAddress1(text) }} />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={billingAddress2} placeholder="Address 2" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingAddress2(text)} />
              <Spacer ml={1} />
              <TextInput currentValue={billingZipCode} placeholder="Zipcode" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingZipCode(text)} />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={billingCity} placeholder="City" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingCity(text)} />
              <Spacer ml={1} />
              <TextInput currentValue={billingState} placeholder="State" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingState(text)} />
            </Flex>
          </>
        )
      case PAYMENT_INFORMATION:
        return (
          <>
            <Sans size="1">{PAYMENT_INFORMATION}</Sans>
            <Spacer mb={2} />
            <TextInput currentValue={name} placeholder="Full name" onChangeText={(inputKey, text) => setName(text)} />
            <Spacer mb={2} />
            <TextInput currentValue={cardNumber} placeholder="Card number" onChangeText={(inputKey, text) => setCardNumber(text)} />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput currentValue={expirationDate} placeholder="Expiration date" style={{ flex: 1 }} onChangeText={(inputKey, text) => setExpriationDate(text)} />
              <Spacer ml={1} />
              <TextInput currentValue={billingZipCode} placeholder="CVV" style={{ flex: 1 }} onChangeText={(inputKey, text) => setBillingZipCode(text)} />
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
