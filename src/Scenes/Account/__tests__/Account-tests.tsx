import React from "react"
import { Profile, PaymentAndShipping } from ".."
import renderer from "react-test-renderer"

// describe("Profile", () => {
//   it("renders properly", () => {
//     const component = renderer.create(<Profile />)
//     expect(component).toMatchSnapshot()
//   })
// })

describe("PaymentAndShipping", () => {
  it("renders properly", () => {
    const component = renderer.create(<PaymentAndShipping />)
    expect(component).toMatchSnapshot()
  })
})
// test("Profile renders correctly", () => {
//   const tree = renderer.create(<Profile />).toJSON()
//   expect(tree).toMatchSnapshot()
// })

// test("PaymentAndShipping renders correctly", () => {
//   const tree = renderer.create(<PaymentAndShipping />).toJSON()
//   expect(tree).toMatchSnapshot()
// })
