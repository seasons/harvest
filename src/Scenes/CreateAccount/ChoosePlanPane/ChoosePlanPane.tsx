import { PlanTile } from "./PlanTile"
import { Box, Button, Container, Sans, Spacer } from "App/Components"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

import gql from "graphql-tag"
import { useLazyQuery } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const CHARGEBEE_CHECKOUT = gql`
  query chargebeeCheckout($planID: PlanID!) {
    hostedChargebeeCheckout(planID: $planID) {
      id
      type
      url
      state
      embed
      created_at
      expires_at
    }
  }
`

interface ChoosePlanPaneProps {
  onChoosePlan: (checkoutUrl: string) => void
}

export enum Plan {
  Essential = "Essential",
  AllAccess = "AllAccess",
  None = "None",
}

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({ onChoosePlan }) => {
  const [footerBoxHeight, setFooterBoxHeight] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(Plan.None)
  const insets = useSafeArea()

  const [isMutating, setIsMutating] = useState(false)
  const errorPopUpContext = usePopUpContext()
  const showErrorPopUp = errorPopUpContext.showPopUp
  const hideErrorPopUp = errorPopUpContext.hidePopUp
  const [runQuery, { called, loading, data }] = useLazyQuery(CHARGEBEE_CHECKOUT, {
    onCompleted: () => {
      setIsMutating(false)
      if (data) {
        onChoosePlan(data.hostedChargebeeCheckout.url)
      }
    },
    onError: (err) => {
      console.log("****\n\n", err, "\n\n****")
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue choosing your plan. Please retry.",
        buttonText: "Close",
        onClose: () => hideErrorPopUp(),
      }
      showErrorPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const _onChoosePlan = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)
    runQuery({
      variables: {
        planID: selectedPlan,
      },
    })
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer mb={5} />
          <Spacer mb={4} />
          <Box p={2}>
            <Sans color="black100" size="3">
              You're in.{"\n"}
              Let's choose your plan
            </Sans>
            <Spacer mb={1} />
            <Sans color="black50" size="2">
              Don't worry, you can change your plan from your profile settings at any time.
            </Sans>

            <Spacer mb={2} />
          </Box>
          <PlanTile
            description="A monthly wardrobe refresh to make getting dressed more exciting. The must have."
            inputKey={Plan.Essential}
            price={155}
            shouldSelect={setSelectedPlan}
            selected={selectedPlan == Plan.Essential}
            subtitle="1 swap, 3 items per month"
            title="Essential"
          />
          <PlanTile
            description="Experience that new-clothes feeling every week."
            inputKey={Plan.AllAccess}
            price={195}
            shouldSelect={setSelectedPlan}
            selected={selectedPlan == Plan.AllAccess}
            subtitle="Unlimited swaps, 3 items at a time"
            title="All Access"
          />

          <Box height={footerBoxHeight} />
        </ScrollView>
      </Box>
      <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Box p={2} onLayout={(e) => setFooterBoxHeight(e.nativeEvent.layout.height)}>
          <Button block disabled={selectedPlan === Plan.None} onPress={_onChoosePlan} variant="primaryBlack">
            Choose plan
          </Button>
          <Box style={{ height: insets.bottom }} />
        </Box>
      </FadeBottom2>
    </Container>
  )
}
