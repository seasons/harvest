import React from "react"
import { Bag } from ".."
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
import { GET_BAG } from "../BagQueries"
import { BagFixture, BagFixtureWithReservation } from "./__fixtures__/BagFixture"
import { BagItem } from "../Components/BagItem"
import { waitForLoad } from "App/testUtils/waitForLoad"
import { FixedButton } from "App/Components"

// jest.mock("App/Navigation/AuthProvider", () => {
//   AuthContext: null
// })

jest.doMock("../../Navigation/AuthProvider", () => {
  return {
    AuthContext: {
      Consumer: props => props.children(null),
    },
  }
})

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

const mockWithReservation = [
  {
    request: {
      query: GET_BAG,
    },
    result: {
      data: {
        ...BagFixtureWithReservation,
      },
    },
  },
]

describe("Bag", () => {
  it("renders properly", async () => {
    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Bag navigation={null} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component).toMatchSnapshot()
    expect(component.find(BagItem).length).toEqual(3)
    expect(component.text()).toContain("All Saints")
  })

  it("renders the FAQ button if user has a reservation", async () => {
    const component = mount(
      <MockedProvider mocks={mockWithReservation} addTypename={false}>
        <Bag navigation={null} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component.find(FixedButton).text()).toContain("FAQ")
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
