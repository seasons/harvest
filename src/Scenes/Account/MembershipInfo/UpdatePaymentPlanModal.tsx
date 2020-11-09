import { CloseButton, Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import { ChoosePlanPane } from "App/Scenes/CreateAccount/Admitted"
import { GET_PLANS } from "App/Scenes/CreateAccount/CreateAccount"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { screenTrack } from "App/utils/track"

export const UpdatePaymentPlanModal = screenTrack()(({ navigation, route }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { data } = useQuery(GET_PLANS, {
    variables: {
      where: { status: "active" },
    },
  })

  useEffect(() => {
    const customersPlan = data?.me?.customer?.membership?.plan
    if (customersPlan) {
      setSelectedPlan(customersPlan)
    }
  }, [data, setSelectedPlan])

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
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        data={data}
        onComplete={() => navigation.goBack()}
        headerText="Let's choose your plan"
        source="UpdatePaymentPlanModal"
      />
    </Container>
  )
})
