import { Box, Sans, Separator, Spacer } from "App/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import { ShippingOption } from "App/Scenes/Order/Components"
import React, { useState } from "react"

import { ReservationPickupTimePicker } from "./ReservationPickupTimePicker"

export const ReservationShippingOptionsSection = ({
  shippingMethods,
  onShippingMethodSelected,
  onTimeWindowSelected,
}) => {
  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0)

  const selectedMethod = shippingMethods?.[selectedMethodIndex]

  return (
    <Box mb={4}>
      <Box px={2}>
        <SectionHeader title="Select shipping" />
        {shippingMethods?.map((method, index) => {
          return (
            <Box key={method?.id || index}>
              <ShippingOption
                method={method}
                index={index}
                selected={index === selectedMethodIndex}
                onSelect={() => {
                  setSelectedMethodIndex(index)
                  onShippingMethodSelected?.(method)
                }}
              />
              <Separator />
            </Box>
          )
        })}
        <Spacer mb={2} />
        <Sans size="3" color="black50">
          UPS Ground shipping averages 1-2 days in the NY metro area, 3-4 days for the Midwest + Southeast, and 5-7 days
          on the West coast.
        </Sans>
      </Box>
      <Box my={2}>
        {selectedMethod?.code === "Pickup" && (
          <ReservationPickupTimePicker
            timeWindows={selectedMethod?.timeWindows}
            onTimeWindowSelected={onTimeWindowSelected}
          />
        )}
      </Box>
    </Box>
  )
}
