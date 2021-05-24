import { Sans, Spacer, Handle } from "App/Components"
import React from "react"

interface Props {}

export const ReservationFeedbackHeader: React.FC<Props> = ({}) => {
  return (
    <>
      <Spacer mb={2} />
      <Handle backgroundColor="black10" />
      <Spacer mb={5} />
      <Sans size="5">Rate & review your return</Sans>
      <Spacer mb={1} />
      <Sans size="4" color="black50">
        Earn rewards & help us improve your experience by sharing feedback on your last order.
      </Sans>
    </>
  )
}
