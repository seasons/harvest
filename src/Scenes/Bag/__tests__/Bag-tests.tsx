import React from "react"
import { Bag } from ".."
import renderer from "react-test-renderer"

// describe("Profile", () => {
//   it("renders properly", () => {
//     const component = renderer.create(<Profile />)
//     expect(component).toMatchSnapshot()
//   })
// })

describe("Bag", () => {
  it("renders properly", () => {
    const component = renderer.create(<Bag />)
    expect(component).toMatchSnapshot()
  })
})
