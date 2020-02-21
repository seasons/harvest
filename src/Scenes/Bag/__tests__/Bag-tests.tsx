import React from "react"
import { Bag } from ".."
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
import { GET_BAG } from "../BagQueries"
import { BagFixture } from "./__fixtures__/BagFixture"
import { BagItem } from "../Components/BagItem"
import { waitForLoad } from "App/testUtils/waitForLoad"

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
})
