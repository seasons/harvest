import { CloseButton, Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import { ChoosePlanPane } from "App/Scenes/CreateAccount/Admitted"
import { GET_PLANS } from "App/Scenes/CreateAccount/CreateAccount"
import { screenTrack } from "App/utils/track"
import React from "react"
import { useQuery } from "react-apollo"

export const UpdatePaymentPlanModal = screenTrack()(({ navigation, route }) => {
  const { data } = useQuery(GET_PLANS, {
    variables: {
      where: { status: "active" },
    },
  })

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
        paneType={0}
        data={data}
        onComplete={() => navigation.goBack()}
        headerText="Let's choose your plan"
        source={"UpdatePaymentPlanModal"}
        discount={route?.params?.discount}
        discountType={route?.params?.discountType}
      />
    </Container>
  )
})
