import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
import { waitForLoad } from "App/testUtils/waitForLoad"
import { ReservationFeedback, ReservationFeedbackConfirmation, ReservationFeedbackFinish } from "../"

const VariantFeedbackFixture = {
  id: 123,
  isCompleted: false,
  questions: [
    {
      id: 1,
      question: "How many times did you wear this Engineered Garments Hoodie?",
      options: ["More than 6 times", "3-5 times", "1-2 times", "0 times"],
      responses: [],
      type: "MultipleChoice",
    },
    {
      id: 2,
      question: "Would you buy it at retail for $495?",
      options: ["Would buy at a discount", "Buy below retail", "Buy at retail", "Would only rent"],
      responses: [],
      type: "MultipleChoice",
    },
    {
      id: 3,
      question: "Did it fit as expected?",
      options: ["Fit too big", "Fit true to size", "Ran small", "Didn't fit at all"],
      responses: [],
      type: "MultipleChoice",
    }
  ],
  variant: {
    id: 123,
    product: {
      images: [
        { id: 1, url: "https://dl.airtable.com/.attachments/fe38470dce974a874d39c4737c610129/cf9627dc/JudyTurner_.Front-final.png" },
        { id: 2, url: "https://dl.airtable.com/.attachments/fe38470dce974a874d39c4737c610129/cf9627dc/JudyTurner_.Front-final.png" },
        { id: 3, url: "https://dl.airtable.com/.attachments/fe38470dce974a874d39c4737c610129/cf9627dc/JudyTurner_.Front-final.png" },
      ],
      name: "Engineered Garments Hoodie",
      retailPrice: 495,
    },
  }
}

const ReservationFeedbackFixture = {
  id: 123,
  comment: "Sample comment",
  rating: "Loved it",
  feedbacks: [
    VariantFeedbackFixture,
    VariantFeedbackFixture,
    VariantFeedbackFixture,
  ],
}

describe("ReservationFeedback", () => {
  it("renders properly", async () => {
    const route = {
      params: {
        reservationFeedback: ReservationFeedbackFixture,
      },
    }
    const component = mount(
      <MockedProvider>
        <ReservationFeedback navigation={null} route={route} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component.text()).toContain(
      "ReviewingItem 1 of 3Engineered Garments Hoodie1. How many times did you wear this Engineered Garments Hoodie?More than 6 times3-5 times1-2 times0 times2. Would you buy it at retail for $495?Would buy at a discountBuy below retailBuy at retailWould only rent3. Did it fit as expected?Fit too bigFit true to sizeRan smallDidn't fit at allContinue later"
    )
    expect(component).toMatchSnapshot()
  })
})

describe("ReservationFeedbackConfirmation", () => {
  it("renders properly", async () => {
    const route = {
      params: {
        reservationFeedback: ReservationFeedbackFixture,
      },
    }
    const component = mount(
      <MockedProvider>
        <ReservationFeedbackConfirmation navigation={null} route={route} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component.text()).toContain(
      "FinishAny other thoughts?SkipSubmitSomething went wrong!An issue occurred while trying to submit your comment. Please try again.Got it"
    )
    expect(component).toMatchSnapshot()
  })
})

describe("ReservationFeedbackFinish", () => {
  it("renders properly", async () => {
    const component = mount(
      <MockedProvider>
        <ReservationFeedbackFinish navigation={null} />
      </MockedProvider>
    )

    await waitForLoad(component)

    expect(component.text()).toContain(
      "Thank youThank you for helping us improve your experience with this feedback.Finish"
    )
    expect(component).toMatchSnapshot()
  })
})