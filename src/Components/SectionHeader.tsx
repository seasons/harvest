import { Flex, Sans, Separator, Spacer } from "App/Components"
import React from "react"
import { TouchableOpacity } from "react-native"

export const SectionHeader: React.FC<{ title: string; rightText?: string; onPressRightText?: () => void }> = ({
  title,
  rightText,
  onPressRightText,
}) => {
  return (
    <>
      <Flex
        flexDirection="row"
        style={{ flex: 1 }}
        alignItems="center"
        justifyContent={!!rightText ? "space-between" : "flex-start"}
        width="100%"
      >
        <Sans size="4" color="black">
          {title}
        </Sans>
        {!!rightText && (
          <>
            {!!onPressRightText ? (
              <TouchableOpacity onPress={onPressRightText}>
                <Sans size="4" color="blue">
                  {rightText}
                </Sans>
              </TouchableOpacity>
            ) : (
              <Sans size="4" color="black">
                {rightText}
              </Sans>
            )}
          </>
        )}
      </Flex>
      <Spacer mb={1} />
      <Separator />
    </>
  )
}
