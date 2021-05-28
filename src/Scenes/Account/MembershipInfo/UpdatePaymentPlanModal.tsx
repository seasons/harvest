import { CloseButton, Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import { ChoosePlanPane } from "App/Scenes/CreateAccount/Admitted"
import { CreateAccount_Cached_Query, CreateAccount_NoCache_Query } from "App/Scenes/CreateAccount/CreateAccount"
import React, { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { screenTrack } from "App/utils/track"
import { CreateAccount_NoCache_Query as CreateAccount_NoCache_Query_Type } from "App/generated/CreateAccount_NoCache_Query"
import { CreateAccount_Cached_Query as CreateAccount_Cached_Query_Type } from "App/generated/CreateAccount_Cached_Query"

export const UpdatePaymentPlanModal = screenTrack()(({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { previousData, data = previousData } = useQuery<CreateAccount_Cached_Query_Type>(CreateAccount_Cached_Query, {
    variables: {
      where: { status: "active" },
    },
  })
  const { previousData: previousDataNoCache, data: dataNoCache = previousDataNoCache } = useQuery<
    CreateAccount_NoCache_Query_Type
  >(CreateAccount_NoCache_Query)

  useEffect(() => {
    const customersPlan = dataNoCache?.me?.customer?.membership?.plan
    if (customersPlan) {
      setSelectedPlan(customersPlan)
    }
  }, [dataNoCache, setSelectedPlan])

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
        dataNoCache={dataNoCache}
        onComplete={() => navigation.goBack()}
        headerText="Let's choose your plan"
        source="UpdatePaymentPlanModal"
      />
    </Container>
  )
})
