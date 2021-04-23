import { Sans, Flex, Box } from "App/Components"
import React from "react"
import { ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native"
import { color } from "App/utils"

type Item = { label: string; value: string }

interface MultiSelectionTableProps {
  disabled?: boolean
  items: Item[]
  onTap?: (item: Item, index: number) => void
  selectedItems: any[]
  style?: ViewStyle
  itemHeight?: number
  itemWidth?: number
}

export const MultiSelectionTable: React.FC<MultiSelectionTableProps> = ({
  disabled = false,
  items,
  onTap,
  selectedItems,
  itemHeight = 60,
  itemWidth = 60,
}) => {
  const _items =
    items?.map((item) => ({
      isSelected: selectedItems?.includes(item.value),
      item,
    })) || []

  const Item = ({ isSelected, item }: { isSelected: boolean; item: Item }, index: number) => {
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
      <Box p="2px">
        <TouchableOpacity disabled={disabled} onPress={() => onTap?.(item, index)} key={index}>
          <Flex height={itemHeight} width={itemWidth} justifyContent="center" alignItems="center">
            <Flex
              justifyContent="center"
              alignItems="center"
              height={itemHeight}
              width={itemWidth}
              style={[
                {
                  backgroundColor: color(isSelected ? "black04" : "white100"),
                  borderColor: color(isSelected ? "black100" : "black10"),
                  borderRadius: 4,
                  borderWidth: 1,
                },
                shadowStyle,
              ]}
            >
              <Sans
                size="4"
                color="black100"
                style={{
                  textAlign: "center",
                }}
              >
                {item.label}
              </Sans>
            </Flex>
          </Flex>
        </TouchableOpacity>
      </Box>
    )
  }

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      {_items.map((i) => {
        return <Item item={i.item} key={i.item.value} isSelected={i.isSelected} />
      })}
    </Flex>
  )
}
