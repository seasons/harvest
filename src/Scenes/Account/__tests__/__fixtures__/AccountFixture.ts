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
        last_digits: "4242",
        street1: "1 Bedford Avenue",
        street2: "Brooklyn",
        city: "Brooklyn",
        state: "New York",
        postal_code: "11211",
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
