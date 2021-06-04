import { Sans, Flex, Box, SansSize } from "App/Components"
import React from "react"
import { ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native"
import { color } from "App/utils"
import { themeProps } from "./Theme"

type Item = { label: string; value: string }

type MultiSectionButtonVariant = "grayBackground" | "whiteBackground"

interface MultiSelectionTableProps {
  disabled?: boolean
  items: Item[]
  onTap?: (item: Item, index: number) => void
  selectedItems: any[]
  style?: ViewStyle
  itemHeight?: number
  itemWidth?: number
  variant?: MultiSectionButtonVariant
  size?: SansSize
  padding?: string | number
}

export function getColorsForVariant(variant: MultiSectionButtonVariant) {
  const {
    colors: { black100, white100, black50, black10, black04 },
  } = themeProps

  switch (variant) {
    case "grayBackground":
      return {
        default: {
          backgroundColor: black04,
          borderColor: black04,
          color: black100,
        },
        active: {
          backgroundColor: black100,
          borderColor: black100,
          color: white100,
        },
        disabled: {
          backgroundColor: black10,
          borderColor: black10,
          color: black50,
        },
      }
    default:
      return {
        default: {
          backgroundColor: white100,
          borderColor: black10,
          color: black100,
        },
        active: {
          backgroundColor: black04,
          borderColor: black100,
          color: black100,
        },
        disabled: {
          backgroundColor: black10,
          borderColor: black10,
          color: black100,
        },
      }
  }
}

export const MultiSelectionTable: React.FC<MultiSelectionTableProps> = ({
  disabled = false,
  variant = "whiteBackground",
  itemHeight = 60,
  itemWidth = 60,
  size = "4",
  padding = "2px",
  selectedItems,
  items,
  onTap,
}) => {
  const _items =
    items?.map((item) => ({
      isSelected: selectedItems?.includes(item.value),
      item,
    })) || []
  const variantColors = getColorsForVariant(variant)

  return (
    <Flex flexDirection="row" flexWrap="wrap" width="100%">
      {_items.map(({ item, isSelected }: { isSelected: boolean; item: Item }, index) => {
        const shadowStyle = isSelected
          ? {
              shadowColor: color("black100"),
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,

              elevation: 3,
            }
          : {}

        return (
          <Flex p={padding} key={index}>
            <Box height={itemHeight} width={itemWidth}>
              <TouchableOpacity disabled={disabled} onPress={() => onTap?.(item, index)} key={index}>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                  style={[
                    {
                      backgroundColor: color(
                        isSelected ? variantColors.active.backgroundColor : variantColors.default.backgroundColor
                      ),
                      borderColor: color(
                        isSelected ? variantColors.active.borderColor : variantColors.default.borderColor
                      ),
                      borderRadius: 4,
                      borderWidth: 1,
                    },
                    shadowStyle,
                  ]}
                >
                  <Sans
                    size={size}
                    color={isSelected ? variantColors.active.color : variantColors.default.color}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </Sans>
                </Flex>
              </TouchableOpacity>
            </Box>
          </Flex>
        )
      })}
    </Flex>
  )
}
