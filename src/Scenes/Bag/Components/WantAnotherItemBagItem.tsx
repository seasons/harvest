import { useNavigation } from "@react-navigation/native"
import { Box, Flex, Separator } from "App/Components"
import {
  GetBagAndSavedItems_paymentPlans,
  GetBagAndSavedItems_me_customer_membership_plan,
} from "App/generated/GetBagAndSavedItems"
import { Schema } from "App/Navigation"
import { Sans } from "Components/Typography"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const WantAnotherItemBagItem: React.FC<{
  plan: GetBagAndSavedItems_me_customer_membership_plan
  paymentPlans: (GetBagAndSavedItems_paymentPlans | null)[] | null
}> = ({ plan, paymentPlans }) => {
  const navigation = useNavigation()
  const itemCount = plan?.itemCount
  const nextItem = itemCount === 2 ? "3rd" : "2nd"

  const nextPlan = paymentPlans?.find((p) => p.tier === plan?.tier && p.itemCount === plan?.itemCount + 1)
  const priceIncrease = (nextPlan?.price - plan?.price) / 100 || 30

  return (
    <>
      <Separator />
      <Box p={2}>
        <EmptyBagItemContainer>
          <Flex pt="84px" flexDirection="column" alignItems="center">
            <Flex flexWrap="nowrap" flexDirection="column" alignItems="center">
              <TouchableOpacity
                onPress={() => navigation.navigate("Modal", { screen: Schema.PageNames.UpdatePaymentPlanModal })}
              >
                <Sans size="2" color="black100" textAlign="center">
                  {`Want a ${nextItem} item?`}
                </Sans>
                <Sans size="2" color="black50" textAlign="center" style={{ textDecorationLine: "underline" }}>
                  {`Add a slot for $${priceIncrease}`}
                </Sans>
              </TouchableOpacity>
            </Flex>
          </Flex>
        </EmptyBagItemContainer>
      </Box>
    </>
  )
}

const EmptyBagItemContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
  height: 270;
`
