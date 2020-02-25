import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import stripe, { PaymentCardTextField, StripeToken } from "tipsi-stripe"
import { Box, Flex, Radio, Sans, Spacer, TextInput } from "App/Components"

interface CreditCardFormProps {
  navigator?: NavigatorIOS
  params?: PaymentCardTextFieldParams
  onSubmit: (t: StripeToken, p: PaymentCardTextFieldParams) => void
}

interface EditViewProps {
  paymentInfo?: PaymentCardTextField
}

export const EditView: React.FC<EditViewProps> = ({ paymentInfo }) => {
  const [sameAsDeliveryRadioSelected, setSameAsDeliveryRadioSelected] = useState(false)

  // if (paymentInfo?.value) {
  //   paymentInfo.value.setParams(this.state.params)
  //   paymentInfo.value.focus()
  // }

  const handleSameAsDeliveryAddress = () => {
    setSameAsDeliveryRadioSelected(!sameAsDeliveryRadioSelected)
  }

  const sections = ["Delivery address", "Billing address", "Payment information"]

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

  const renderItem = ({ item: section }) => {

    switch (section) {
      case "Delivery address":
        return (
          <Box px={2}>
            <Sans size="2">Delivery address</Sans>
            <Spacer mb={1} />
            <TextInput placeholder="Address" textContentType="fullStreetAddress" key="deliveryAddress" />
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
              <TextInput placeholder="Address 2" textContentType="streetAddressLine2" style={{ flex: 1 }} />
              <Spacer ml={1} />
              <TextInput placeholder="Zipcode" textContentType="postalCode" style={{ flex: 1 }} />
            </Flex>
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="City" textContentType="addressCity" style={{ flex: 1 }} />
              <Spacer ml={1} />
              <TextInput placeholder="State" textContentType="addressState" style={{ flex: 1 }} />
            </Flex>
          </Box>
        )
      case "Billing address":
        return (
          <Box px={2}>
            <Sans size="2">Billing address</Sans>
            <Spacer mb={2} />
            <Radio
              selected={sameAsDeliveryRadioSelected}
              onSelect={handleSameAsDeliveryAddress}
              label="Same as Delivery Address"
            />
            {!sameAsDeliveryRadioSelected && (
              <>
                <Spacer mb={2} />
                <TextInput placeholder="Address" textContentType="fullStreetAddress" />
                <Spacer mb={1} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <TextInput placeholder="Unit" textContentType="streetAddressLine2" style={{ flex: 1 }} />
                  <Spacer ml={1} />
                  <TextInput placeholder="Zipcode" textContentType="postalCode" style={{ flex: 1 }} />
                </Flex>
                <Spacer mb={1} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <TextInput placeholder="City" textContentType="addressCity" style={{ flex: 1 }} />
                  <Spacer ml={1} />
                  <TextInput placeholder="State" textContentType="addressState" style={{ flex: 1 }} />
                </Flex>
              </>
            )}
          </Box>
        )
      case "Payment information":
        return (
          <Box px={2}>
            <Sans size="2">Payment information</Sans>
            <Spacer mb={1} />
            <TextInput placeholder="Full name" textContentType="name" />
            <Spacer mb={1} />
            <TextInput placeholder="Card number" textContentType="creditCardNumber" />
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="Expiration date" style={{ flex: 1 }} />
              <Spacer ml={1} />
              <TextInput placeholder="Zipcode" textContentType="postalCode" style={{ flex: 1 }} />
            </Flex>
          </Box>
        )
      default:
        return null
    }
  }

  const insets = useSafeArea()
  return (
    <FlatList
      data={sections}
      ListHeaderComponent={() => (
        <Box px={2} mt={insets.top}>
          <Spacer mb={2} />
          <Sans size="3">Payment & Shipping</Sans>
          <Spacer mb={3} />
        </Box>
      )}
      ItemSeparatorComponent={() => <Spacer mb={3} />}
      keyExtractor={(item, index) => item + String(index)}
      renderItem={renderItem}
      ListFooterComponent={() => <Spacer mb={100} />}
    />
  )
}
