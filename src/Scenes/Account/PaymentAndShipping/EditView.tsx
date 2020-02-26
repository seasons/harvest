import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import stripe, { PaymentCardTextField, StripeToken } from "tipsi-stripe"
import { Box, Button, Flex, Radio, Sans, Spacer, TextInput } from "App/Components"
import { useMutation } from "react-apollo"

interface CreditCardFormProps {
  navigator?: NavigatorIOS
  params?: PaymentCardTextFieldParams
  onSubmit: (t: StripeToken, p: PaymentCardTextFieldParams) => void
}

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
  onCancelBtnPressed: () => void,
  onSaveBtnPressed: () => void,
}

export const EditView: React.FC<EditViewProps> = (props) => {
  const { onCancelBtnPressed, onSaveBtnPressed } = props
  const [sameAsDeliveryRadioSelected, setSameAsDeliveryRadioSelected] = useState(false)

  const [validateAddress] = useMutation(VALIDATE_ADDRESS, {
    onError: error => {
      console.error("error EditView.tsx: ", error)
    },
  })

  // if (paymentInfo?.value) {
  //   paymentInfo.value.setParams(this.state.params)
  //   paymentInfo.value.focus()
  // }

  const handleSameAsDeliveryAddress = async () => {
    setSameAsDeliveryRadioSelected(!sameAsDeliveryRadioSelected)

    const result = await validateAddress({
      variables: {
        input: {
          location: {
            slug: "Kevin's Address",
            name: "Kevin's Address",
            address1: "6420 15th Ave",
            city: "Brooklyn",
            state: "NY",
            zipCode: "11219"
          }
        }
      }
    })
    console.log(result)
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
            <TextInput placeholder="Address" textContentType="fullStreetAddress" key="deliveryAddress" />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
              <TextInput placeholder="Address 2" textContentType="streetAddressLine2" style={{ flex: 1 }} />
              <Spacer ml={1} />
              <TextInput placeholder="Zipcode" textContentType="postalCode" style={{ flex: 1 }} />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="City" textContentType="addressCity" style={{ flex: 1 }} />
              <Spacer ml={1} />
              <TextInput placeholder="State" textContentType="addressState" style={{ flex: 1 }} />
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
            {!sameAsDeliveryRadioSelected && (
              <>
                <Spacer mb={2} />
                <TextInput placeholder="Address" textContentType="fullStreetAddress" />
                <Spacer mb={2} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <TextInput placeholder="Unit" textContentType="streetAddressLine2" style={{ flex: 1 }} />
                  <Spacer ml={1} />
                  <TextInput placeholder="Zipcode" textContentType="postalCode" style={{ flex: 1 }} />
                </Flex>
                <Spacer mb={2} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <TextInput placeholder="City" textContentType="addressCity" style={{ flex: 1 }} />
                  <Spacer ml={1} />
                  <TextInput placeholder="State" textContentType="addressState" style={{ flex: 1 }} />
                </Flex>
              </>
            )}
          </>
        )
      case PAYMENT_INFORMATION:
        return (
          <>
            <Sans size="1">{PAYMENT_INFORMATION}</Sans>
            <Spacer mb={2} />
            <TextInput placeholder="Full name" textContentType="name" />
            <Spacer mb={2} />
            <TextInput placeholder="Card number" textContentType="creditCardNumber" />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="Expiration date" style={{ flex: 1 }} />
              <Spacer ml={1} />
              <TextInput placeholder="Zipcode" textContentType="postalCode" style={{ flex: 1 }} />
            </Flex>
          </>
        )
      case FINISH_BUTTONS:
        return (
          <Flex flexDirection="row" justifyContent="space-between">
            <Button variant="primaryWhite" size="large" width={buttonWidth} onPress={onCancelBtnPressed}>
              Cancel
            </Button>
            <Button variant="secondaryBlack" size="large" width={buttonWidth} onPress={onSaveBtnPressed}>
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
