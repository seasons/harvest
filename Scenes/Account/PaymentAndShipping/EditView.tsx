import React from "react"
import { Sans, Box, Separator, Spacer, TextInput } from "../../../components"

const sections = [
  { title: "Delivery address", inputs: ["138 Mulberry St", "New York, New York 1234"] },
  { title: "Billing address", inputs: ["138 Mulberry St", "New York, New York 1234"] },
  { title: "Payment info", inputs: ["Visa 1234"] },
  { title: "Phone number", inputs: ["555 555 5555"] },
]

export class EditView extends React.Component {
  render() {
    return (
      <>
        {sections.map(section => {
          return (
            <Box mb={4} key={section.title}>
              <Sans size="2">{section.title}</Sans>
              <Spacer mb={2} />
              <Separator />
              <Spacer mb={2} />
              {section.inputs.map((string, index) => (
                <Sans color="gray" size="2" key={section.title + index}>
                  {string}
                </Sans>
              ))}
            </Box>
          )
        })}
      </>
    )
  }
}
