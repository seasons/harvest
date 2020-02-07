import { Box, Flex, Radio, Sans, Spacer, TextInput } from "App/Components"
import stripe, { PaymentCardTextField, StripeToken } from "tipsi-stripe"
import { FlatList } from "react-native"
import React from "react"

interface CreditCardFormProps {
  navigator?: NavigatorIOS
  params?: PaymentCardTextFieldParams
  onSubmit: (t: StripeToken, p: PaymentCardTextFieldParams) => void
}

export class EditView extends React.Component {
  private paymentInfo: PaymentCardTextField

  state = {
    sameAsDeliveryRadioSelected: false,
  }

  componentDidMount() {
    if (this.paymentInfo.value) {
      this.paymentInfo.value.setParams(this.state.params)
      this.paymentInfo.value.focus()
    }
  }

  handleSameAsDeliveryAddress = () => {
    this.setState({
      sameAsDeliveryRadioSelected: !this.state.sameAsDeliveryRadioSelected,
    })
  }

  sections = () => {
    const sections = ["Header", "Delivery address", "Billing address", "Payment information"]

    return sections
  }

  tokenizeCardAndSubmit = async () => {
    this.setState({ isLoading: true, isError: false })

    const { params } = this.state

    try {
      const token = await stripe.createTokenWithCard({ ...params })
      this.props.onSubmit(token, this.state.params)
      this.setState({ isLoading: false })
      this.props.navigator.pop()
    } catch (error) {
      console.warn("CreditCardForm.tsx", error)
      this.setState({ isError: true, isLoading: false })
    }
  }

  renderItem = ({ item: section }) => {
    switch (section) {
      case "Header":
        return (
          <Box px={2} mt={100}>
            <Sans size="3">Payment & shipping</Sans>
          </Box>
        )
      case "Delivery address":
        return (
          <Box px={2}>
            <Sans size="2">Delivery address</Sans>
            <Spacer mb={1} />
            <TextInput placeholder="Address" textContentType="fullStreetAddress" key="deliveryAddress" />
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="Unit" textContentType="streetAddressLine2" />
              <Spacer ml={1} />
              <TextInput placeholder="Zipcode" textContentType="postalCode" />
            </Flex>
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput placeholder="City" textContentType="addressCity" />
              <Spacer ml={1} />
              <TextInput placeholder="State" textContentType="addressState" />
            </Flex>
          </Box>
        )
      case "Billing address":
        return (
          <Box px={2}>
            <Sans size="2">Billing address</Sans>
            <Spacer mb={2} />
            <Radio
              selected={this.state.sameAsDeliveryRadioSelected}
              onSelect={() => this.handleSameAsDeliveryAddress()}
              label="Same as Delivery Address"
            />
            {!this.state.sameAsDeliveryRadioSelected && (
              <>
                <Spacer mb={2} />
                <TextInput placeholder="Address" textContentType="fullStreetAddress" />
                <Spacer mb={1} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <TextInput placeholder="Unit" textContentType="streetAddressLine2" />
                  <Spacer ml={1} />
                  <TextInput placeholder="Zipcode" textContentType="postalCode" />
                </Flex>
                <Spacer mb={1} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <TextInput placeholder="City" textContentType="addressCity" />
                  <Spacer ml={1} />
                  <TextInput placeholder="State" textContentType="addressState" />
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
              <TextInput placeholder="Expiration date" />
              <Spacer ml={1} />
              <TextInput placeholder="Zipcode" textContentType="postalCode" />
            </Flex>
          </Box>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <FlatList
        data={this.sections()}
        ItemSeparatorComponent={() => <Spacer mb={3} />}
        keyExtractor={(item, index) => item + String(index)}
        renderItem={item => this.renderItem(item)}
        ListFooterComponent={() => <Spacer mb={100} />}
      />
    )
  }
}
