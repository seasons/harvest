import { Sans, Spacer, Flex, Box } from "App/Components"
import React, { useState } from "react"
import { ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native"
import { color } from "App/utils"

type Item = { label: string; value: string }

interface MultiSelectionTableProps {
  // Items must have unique values
  itemCornerRadius?: number
  items: Item[]
  onTap: (item: Item, index: number) => void
  selectedItemIndices: number[]
  style?: ViewStyle
}

export const MultiSelectionTable: React.FC<MultiSelectionTableProps> = ({ items, onTap, selectedItemIndices }) => {
  const [width, setWidth] = useState(0)

  const itemHeight = 60
  const itemCornerRadius = itemHeight / 2
  const minimumInterItemSpacing = 8

  // Use to measure the width. Has potential to break depending on parent rendering order.
  if (width === 0) {
    return <Box height={1} flex={1} onLayout={(e) => setWidth(e.nativeEvent.layout.width)} />
  }

  const data = items.map((item, index) => ({
    isSelected: selectedItemIndices.includes(index),
    item,
  }))

  const renderItem = ({ isSelected, item }: { isSelected: boolean; item: Item }, index: number) => {
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
      <TouchableOpacity onPress={() => onTap(item, index)} key={index}>
        <Flex height={itemHeight + interItemSpacing} width={itemHeight} justifyContent="center" verticalAlign="center">
          <Flex
            justifyContent="center"
            verticalAlign="center"
            height={itemHeight}
            width={itemHeight}
            style={[
              {
                backgroundColor: color("white100"),
                borderColor: color(isSelected ? "black100" : "black10"),
                borderRadius: itemCornerRadius,
                borderWidth: 1,
              },
              shadowStyle,
            ]}
          >
            <Sans
              size="2"
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
    )
  }

  const itemsPerRow = Math.floor((width - itemHeight) / (itemHeight + minimumInterItemSpacing)) + 1
  const interItemSpacing = (width - itemsPerRow * itemHeight) / (itemsPerRow - 1)
  const numRows = Math.ceil(items.length / itemsPerRow)

  return (
    <Box>
      {[...Array(numRows).keys()].map((
        row // map each row index to a Flex box
      ) => (
        <Flex flexDirection="row" key={row.toString()}>
          {data.slice(row * itemsPerRow, (row + 1) * itemsPerRow).flatMap((datum, index, array) => {
            const dataIndex = index + itemsPerRow * row
            const view = renderItem(datum, dataIndex) // render each item
            return array.length - 1 !== index // check for the last item
              ? [view, <Spacer key={"s" + dataIndex} width={interItemSpacing} />] // insert a spacer
              : view
          })}
        </Flex>
      ))}
    </Box>
  )
}