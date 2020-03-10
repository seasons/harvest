import React from "react"
import { Sans, Box, Separator, Spacer } from "App/Components"
import { color } from "App/utils"

export const FaqSection = ({ section }) => {
  return (
    <Box key={section.title}>
      <Box px={2}>
        <Sans size="3">{section.title}</Sans>
      </Box>
      <Spacer mb={3} />
      <Separator />
      <Box px={2}>
        {section.subsections.map(subsection => {
          return (
            <Box key={subsection.title}>
              <Spacer mb={3} />
              <Sans size="2">{subsection.title}</Sans>
              <Spacer mb={1} />
              <Sans size="2" color={color("black50")}>
                {subsection.text}
              </Sans>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
