import { Box, Sans, Separator, Spacer } from "App/Components"

import React from "react"

const sections = [
  { title: "Delivery address", textLines: ["138 Mulberry St", "New York, New York 1234"] },
  { title: "Billing address", textLines: ["138 Mulberry St", "New York, New York 1234"] },
  { title: "Payment info", textLines: ["Visa 1234"] },
  { title: "Phone number", textLines: ["555 555 5555"] },
]

export class DisplayView extends React.Component {
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
              {section.textLines.map((string, index) => (
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
