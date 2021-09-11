import { Box, Sans, Spacer, Separator, Flex } from "App/Components"
import React from "react"
import { color } from "App/utils"
import { TouchableOpacity } from "react-native"

export const AccountSection: React.FC<{ title: string; value: string | [string]; onEdit: () => void }> = ({
  title,
  value,
  onEdit,
}) => {
  return (
    <Box key={title} px={2}>
      <Flex flexDirection="row" justifyContent={!!onEdit ? "space-between" : "flex-start"} alignItems="center">
        <Sans size="4">{title}</Sans>
        {!!onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Sans size="4" style={{ textDecorationLine: "underline" }}>
              Edit
            </Sans>
          </TouchableOpacity>
        )}
      </Flex>
      <Box mb={1} />
      <Separator color={color("black10")} />
      <Box mb={1} />
      {Array.isArray(value) ? (
        value.map((text) => (
          <Sans key={text} size="4" color="black50">
            {text}
          </Sans>
        ))
      ) : (
        <Sans size="4" color="black50">
          {value}
        </Sans>
      )}
      <Spacer mb={4} />
    </Box>
  )
}
