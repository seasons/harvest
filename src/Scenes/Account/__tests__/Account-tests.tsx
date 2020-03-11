import { MockedProvider } from "@apollo/react-testing"
import { mount } from "enzyme"
import React from "react"
import { EditPaymentAndShipping, PaymentAndShipping } from ".."
import * as AuthContext from "App/Navigation/AuthContext"
import { waitForLoad } from "App/testUtils/waitForLoad"
import { GetChargebeeUpdatePaymentPageDataFixture, GetPaymentDataFixture } from "./__fixtures__/AccountFixture"
import { GET_CHARGEBEE_UPDATE_PAYMENT_PAGE } from "../PaymentAndShipping/EditPaymentAndShipping"
import { GET_PAYMENT_DATA } from "../PaymentAndShipping/PaymentAndShipping"
import { AccountSection } from "../PersonalPreferences/PersonalPreferences"

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
      "Payment & ShippingShipping address1 Bedford AvenueApt 5ABROOKLYN, New York, 11211Billing address1 Bedford AvenueBrooklynBrooklyn, New York, 11211Payment infoVISA 4242Phone number123-456-1234Edit"
    )
    expect(component).toMatchSnapshot()
  })
})

describe("EditPaymentAndShipping", () => {
  const editPaymentAndShippingMocks = [
    {
      request: {
        query: GET_CHARGEBEE_UPDATE_PAYMENT_PAGE,
      },
      result: {
        data: {
          ...GetChargebeeUpdatePaymentPageDataFixture,
        },
      },
    },
  ]
  it("renders properly", async () => {
    const route = {
      params: {
        billingInfo: GetPaymentDataFixture.me.customer.billingInfo,
        shippingAddress: GetPaymentDataFixture.me.customer.detail.shippingAddress,
      },
    }
    const component = mount(
      <MockedProvider mocks={editPaymentAndShippingMocks} addTypename={false}>
        <EditPaymentAndShipping navigation={null} route={route} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component.text()).toContain(
      "Payment & ShippingShipping addressBilling addressSame as Delivery AddressPhone numberEdit Billing InfoCancelSave"
    )
    expect(component).toMatchSnapshot()
  })
})
