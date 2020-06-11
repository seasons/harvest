import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
import { waitForLoad } from "App/testUtils/waitForLoad"
import { GET_FAQ, Faq } from "../Faq"
import { FaqSection } from "../Components/FaqSection"

const FaqFixture = {
  faq: {
    sections: [
      {
        title: "Need to return your items?",
        subsections: [
          {
            title: "Ready to return your items?",
            text:
              "Pack up the pieces you want to return with the included hangers, attach the pre-paid shipping label and drop it off at your closest UPS or UPS pickup location.",
          },
          {
            title: "Did something not fit?",
            text: "We’re happy to help you find something that fits. Pack it up, send it back, and we’ll swap it out.",
          },
          {
            title: "Received the wrong item?",
            text:
              "Sorry about that! Pack it up, attach the pre-paid shipping label and send it back. We’ll get you the right one.",
          },
          {
            title: "Lost your return label?",
            text: "It happens. We understand. Contact us below and we’ll send you a new label.",
          },
        ],
      },
    ],
  },
}

describe("Faq", () => {
  const faqMocks = [
    {
      request: {
        query: GET_FAQ,
      },
      result: {
        data: {
          ...FaqFixture,
        },
      },
    },
  ]

  it("renders properly", async () => {
    const component = mount(
      <MockedProvider mocks={faqMocks} addTypename={false}>
        <Faq navigation={null} />
      </MockedProvider>
    )

    await waitForLoad(component)

    const faqSection = component.find(FaqSection)

    expect(faqSection.length).toEqual(1)
    expect(faqSection.text()).toContain(
      "Need to return your items?Ready for something new?We're happy to exchange for a different size pending availability. Pack it up, attach the pre-paid shipping label and drop it off at your closest UPS or UPS pickup point.Received the wrong item?Sorry about that! Pack it up, attach the pre-paid shipping label and send it back. We'll get you the right one.Did something not fit?We're happy to help you find something that fits. Pack it up, send it back, and we'll swap it out.Have feedback or thoughts?Contact us below. We'd love to hear from you."
    )
    expect(component).toMatchSnapshot()
  })
})
