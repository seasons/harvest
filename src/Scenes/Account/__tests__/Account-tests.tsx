import React from "react"
import { PaymentAndShipping } from ".."
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
import { GetPaymentDataFixture } from "./__fixtures__/AccountFixture"
import { waitForLoad } from "App/testUtils/waitForLoad"
import { AccountSection } from "../PersonalPreferences/PersonalPreferences"
import { GET_PAYMENT_DATA } from "../PaymentAndShipping/PaymentAndShipping"
import * as AuthContext from "App/Navigation/AuthContext"

beforeEach(() => {
  const authContextValues = {
    signIn: () => null,
    signOut: () => null,
    userSession: null,
    authState: { authInitializing: true, isSignedIn: false, userSession: "1234" },
  }
  jest.spyOn(AuthContext, "useAuthContext").mockImplementation(() => authContextValues)
})

describe("PaymentAndShipping", () => {
  const paymentAndShippingMocks = [
    {
      request: {
        query: GET_PAYMENT_DATA,
      },
      result: {
        data: {
          ...GetPaymentDataFixture,
        },
      },
    },
  ]

  it("renders properly", async () => {
    const component = mount(
      <MockedProvider mocks={paymentAndShippingMocks} addTypename={false}>
        <PaymentAndShipping navigation={null} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component.find(AccountSection).length).toEqual(4)
    expect(component.text()).toContain(
      "Payment & ShippingShipping address1 Bedford AvenueApt 5ABROOKLYN, New York, 11211Billing address1 Bedford AvenueBrooklynBrooklyn, New York, 11211Payment info4242Phone number123-456-1234"
    )
    expect(component).toMatchSnapshot()
  })
})
