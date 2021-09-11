import gql from "graphql-tag"

export const GET_PAYMENT_DATA = gql`
  query GetUserPaymentData {
    me {
      id
      customer {
        id
        paymentPlan {
          id
          planID
          price
          name
        }
        detail {
          id
          phoneNumber
          shippingAddress {
            id
            name
            company
            address1
            address2
            city
            state
            zipCode
          }
        }
        invoices {
          id
          status
          closingDate
          dueDate
          price
          lineItems {
            id
            dateFrom
            isTaxed
            taxAmount
            taxRate
            discountAmount
            description
            price
          }
          billingAddress {
            firstName
            lastName
            line1
            line2
            line3
            city
            state
            zip
          }
          creditNotes {
            id
            reasonCode
            date
            total
            status
          }
          discounts {
            amount
            description
          }
        }
        billingInfo {
          id
          brand
          city
          expiration_month
          expiration_year
          last_digits
          name
          postal_code
          state
          street1
          street2
        }
      }
      activeReservation {
        id
        customer {
          id
          billingInfo {
            id
            last_digits
            street1
            street2
            city
            state
            postal_code
          }
        }
      }
    }
  }
`
