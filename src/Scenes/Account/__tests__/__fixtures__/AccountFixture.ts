export const GetUserFixture = {
  me: {
    customer: {
      user: {
        firstName: "Santa",
        lastName: "Claus",
      },
      detail: {
        shippingAddress: {
          city: "BROOKLYN",
          state: "New York",
        },
      },
    },
  },
}

export const GetPaymentDataFixture = {
  me: {
    customer: {
      detail: {
        phoneNumber: "123-456-1234",
        shippingAddress: {
          name: "Santa Claus",
          company: "Seasons",
          address1: "1 Bedford Avenue",
          address2: "Apt 5A",
          city: "BROOKLYN",
          state: "New York",
          zipCode: "11211",
        },
      },
      billingInfo: {
        brand: "VISA",
        city: "Brooklyn",
        expiration_month: 1,
        expiration_year: 2025,
        last_digits: "4242",
        name: "Santa Claus",
        postal_code: "11211",
        state: "New York",
        street1: "1 Bedford Avenue",
        street2: "Brooklyn",
      },
    },
    activeReservation: {
      customer: {
        billingInfo: {
          last_digits: "4242",
          street1: "1 Bedford Avenue",
          street2: "Brooklyn",
          city: "Brooklyn",
          state: "New York",
          postal_code: "11211",
        },
      },
    },
  },
}

export const GetChargebeeUpdatePaymentPageDataFixture = {
  chargebeeUpdatePaymentPage: {
    __typename: "ChargebeeHostedPagePayload",
    "created_at": 1583200000,
    "embed": false,
    "expires_at": 1583300000,
    "id": "alsdjfaklsjdfkladsjf",
    "object": "hosted_page",
    "resource_version": 1583300000,
    "state": "created",
    "type": "manage_payment_sources",
    "updated_at": 1583300000,
    "url": "https://chargebee.com/pages/v3/alsdjfaklsjdfkladsjf/"
  }
}