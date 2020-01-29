import React from "react"
import { Box, Sans, Separator, Spacer } from "App/Components"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import { Loader } from "App/Components/Loader"
import { ScrollView } from "react-native"
import { FixedBackArrow } from "App/Components/FixedBackArrow"
import { useSafeArea } from "react-native-safe-area-context"

const GET_BILLING_INFO = gql`
  query GetBillingInfo {
    me {
      customer {
        detail {
          shippingAddress {
            address1
            address2
            city
            state
            zipCode
            locationType
          }
        }
        plan
        billingInfo {
          brand
          name
          last_digits
          expiration_month
          expiration_year
          street1
          street2
          city
          state
          country
          postal_code
        }
      }
    }
  }
`

export const DisplayView = props => {
  const insets = useSafeArea()
  const { data, loading } = useQuery(GET_BILLING_INFO)

  if (loading) {
    return <Loader />
  }

  let sections = [
    { title: "Delivery address", textLines: ["138 Mulberry St", "New York, New York 1234"] },
    { title: "Billing address", textLines: ["138 Mulberry St", "New York, New York 1234"] },
    { title: "Payment info", textLines: ["Visa 1234"] },
    { title: "Phone number", textLines: ["555 555 5555"] },
  ]

  if (data) {
    sections = []

    const { customer } = data.me
    const {
      detail: { shippingAddress },
    } = customer

    {
      const { address1, address2, city, state, zipCode } = shippingAddress

      sections.push({
        title: "Delivery address",
        textLines: [`${address1} ${address2}`, `${city}, ${state} ${zipCode}`],
      })
    }

    {
      const { billingInfo } = customer
      const { brand, last_digits, street1, street2, city, state, postal_code } = billingInfo

      sections.push({
        title: "Billing Address",
        textLines: [`${street1} ${street2 || ""}`, `${city}, ${state} ${postal_code}`],
      })

      sections.push({ title: "Payment info", textLines: [`${brand} ${last_digits}`] })
    }
  }

  return (
    <Box flex={1} mt={insets.top}>
      <FixedBackArrow navigation={props.navigation} />
      <ScrollView style={{ flex: 1, marginTop: insets.top }}>
        <Box px={2}>
          <Spacer mb={80} />
          <Sans size="3">Payment & Shipping</Sans>
          <Spacer mb={3} />
        </Box>

        <Box p={2}>
          {sections.map(section => {
            return (
              <Box mb={4} key={section.title}>
                <Sans size="2">{section.title}</Sans>
                <Spacer mb={2} />
                <Separator />
                <Spacer mb={2} />
                {section.textLines.map((string, index) => (
                  <Sans color="gray" size="2" key={section.title + index}>
                    {string}
                  </Sans>
                ))}
              </Box>
            )
          })}
        </Box>
      </ScrollView>
    </Box>
  )
}
