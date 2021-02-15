import { FixedButton } from "App/Components"
import * as AuthContext from "App/Navigation/AuthContext"
import { waitForLoad } from "App/testUtils/waitForLoad"
import { mount } from "enzyme"
import React from "react"

import { MockedProvider } from "@apollo/client/testing"

import { Bag } from "../"
import { GET_BAG } from "../BagQueries"
import { BagItem } from "../Components/BagItem"
import { BagFixture } from "./__fixtures__/BagFixture"

const mocks = [
  {
    request: {
      query: GET_BAG,
    },
    result: {
      data: {
        ...BagFixture,
      },
    },
  },
]

beforeEach(() => {
  const authContextValues = {
    signIn: () => null,
    signOut: () => null,
    resetStore: () => null,
    userSession: null,
    authState: { authInitializing: true, isSignedIn: false, userSession: "1234" },
  }
  jest.spyOn(AuthContext, "useAuthContext").mockImplementation(() => authContextValues)
})

describe("Bag", () => {
  it("renders properly", async () => {
    const component = await mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Bag navigation={null} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component).toMatchSnapshot()
    expect(component.find(BagItem).length).toEqual(3)
    expect(component.text()).toContain("Stone Island")
  })

  it("renders the Reserve button if no reservation", async () => {
    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Bag navigation={null} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component.find(FixedButton).text()).toContain("Reserve")
  })
})
