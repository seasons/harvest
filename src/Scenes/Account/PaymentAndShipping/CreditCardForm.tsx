import React, { Component } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import stripe, { PaymentCardTextField, StripeToken } from "tipsi-stripe"
import { Box, Button, Sans } from "App/Components"

export interface PaymentCardTextFieldParams {
  number: string
  expMonth: string
  expYear: string
  cvc: string
  name?: string
  addressLine1?: string
  addressLine2?: string
  addressCity?: string
  addressState?: string
  addressZip?: string
}

export interface StripeToken {
  tokenId: string
  created: number
  livemode: 1 | 0
  card: any
  bankAccount: any
  extra: any
}

interface CreditCardFormProps {
  navigation?: NavigationType
  params?: PaymentCardTextFieldParams
  onSubmit: (t: StripeToken, p: PaymentCardTextFieldParams) => void
}

interface CreditCardFormState {
  valid: boolean
  params: PaymentCardTextFieldParams
  isLoading: boolean
  isError: boolean
}

export class CreditCardForm extends Component<CreditCardFormProps, CreditCardFormState> {
  private paymentInfo: PaymentCardTextField

  constructor(props) {
    super(props)

    this.paymentInfo = (React as any).createRef()
    this.state = { valid: null, params: { ...this.props.params }, isLoading: false, isError: false }
  }

  componentDidMount() {
    if (this.paymentInfo.value) {
      this.paymentInfo.value.setParams(this.state.params)
      this.paymentInfo.value.focus()
    }
  }

  handleFieldParamsChange = (valid, params: PaymentCardTextFieldParams) => {
    this.setState({ valid, params })
  }

  tokenizeCardAndSubmit = async () => {
    this.setState({ isLoading: true, isError: false })

    const { params } = this.state

    try {
      const token = await stripe.createTokenWithCard({ ...params })
      this.props.onSubmit(token, this.state.params)
      this.setState({ isLoading: false })
      this.props.navigation.pop()
    } catch (error) {
      console.warn("CreditCardForm.tsx", error)
      this.setState({ isError: true, isLoading: false })
    }
  }

  render() {
    const buttonComponent = (
      <Box m={4}>
        <Button
          disabled={!this.state.valid}
          width={100}
          onPress={this.state.valid ? () => this.tokenizeCardAndSubmit() : null}
        >
          Add credit card
        </Button>
      </Box>
    )

    // const styles = StyleSheet.create({
    //   field: {
    //     fontFamily: Fonts.GaramondRegular,
    //     height: 40,
    //     fontSize: theme.fontSizes[3],
    //     width: "100%",
    //     borderColor: this.state.isError ? theme.colors.red100 : theme.colors.purple100,
    //     borderWidth: 1,
    //     borderRadius: 0,
    //   },
    // })

    const errorText = "There was an error. Please try again."

    return (
      <>
        <ScrollView scrollEnabled={false}>
          <Box m={4}>
            <Sans size="3" mb={2}>
              Card Information
            </Sans>
            <PaymentCardTextField
              ref={this.paymentInfo}
              onParamsChange={this.handleFieldParamsChange}
              numberPlaceholder="Card number"
              expirationPlaceholder="MM/YY"
              cvcPlaceholde="CVC"
            />
            {this.state.isError && (
              <Sans size="2" mt={3} color="red100">
                {errorText}
              </Sans>
            )}
            <Sans mt="6" size="3" color="black60" textAlign="center">
              Registration is free.
              {"\n"}A credit card is required to bid. Artsy will never charge this card without your permission, and you
              are not required to use this card to pay if you win.
            </Sans>
          </Box>
        </ScrollView>
      </>
    )
  }
}
