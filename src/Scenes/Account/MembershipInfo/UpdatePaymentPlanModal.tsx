import React from "react"
import { useQuery } from "react-apollo"
import { CloseButton, Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import { screenTrack } from "App/utils/track"
import { ChoosePlanPane } from "App/Scenes/CreateAccount/Admitted"
import { GET_PLANS } from "App/Scenes/CreateAccount/CreateAccount"

export const UpdatePaymentPlanModal = screenTrack()(({ navigation }) => {
  const { data } = useQuery(GET_PLANS, {
    variables: {
      where: { status: "active" },
    },
  })
  console.log("data", data)

  if (!data?.paymentPlans) {
    return (
      <>
        <CloseButton />
        <Loader />
      </>
    )
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <CloseButton variant="light" />
      <ChoosePlanPane
        faq={data?.faq}
        plans={data?.paymentPlans}
        onComplete={() => navigation.goBack()}
        headerText={"Let's choose your plan"}
      />
    </Container>
  )
})
