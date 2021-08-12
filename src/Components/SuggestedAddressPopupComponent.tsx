import { color } from "App/utils"
import React from "react"
import { Sans, Spacer } from "App/Components"

export const SuggestedAddressPopupComponent = ({
  suggestedAddress,
  type,
}: {
  suggestedAddress: any
  type: "Reservation" | "Shipping"
}) => {
  const editShippingDetailText =
    "The address you entered is not recognized by UPS. Please use the suggested address above or enter a different one."
  const reservationDetailText =
    "The address you entered is not recognized by UPS. In order to place your reservation, please use the suggested address above or tap edit to enter a different value."
  return (
    <>
      <Spacer mt={2} />
      <Sans size="5" color={color("black100")}>
        We suggest using this Address
      </Sans>
      <Spacer mb={2} />
      <Sans size="4" color={color("black50")}>
        {suggestedAddress.street1}
      </Sans>
      {!!suggestedAddress.street2 ? (
        <>
          <Sans size="4" color={color("black50")}>
            {suggestedAddress.street2}
          </Sans>
        </>
      ) : null}
      <Sans size="4" color={color("black50")}>
        {suggestedAddress.city}, {suggestedAddress.state} {suggestedAddress.zip.split("-")?.[0]}
      </Sans>
      <Spacer mb={2} />
      <Sans size="4" color={color("black50")}>
        {type === "Shipping" ? editShippingDetailText : reservationDetailText}
      </Sans>
    </>
  )
}
