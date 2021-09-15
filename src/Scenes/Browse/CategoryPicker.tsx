import React from "react"
import { Sans, Skeleton, Spacer, Box, Flex } from "App/Components"
import { TouchableOpacity, ScrollView } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"

type Props = {
  items: { slug: string; name: string }[]
  onCategoryPress: (category: { slug: string; name: string }) => void
  currentCategory: string
  initialScrollIndex?: number
}

export const CategoryPicker: React.FC<Props> = ({ items, onCategoryPress, currentCategory, initialScrollIndex }) => {
  const scrollViewRef = React.useRef(null)
  const [itemWidths, setItemWidths] = React.useState<Array<number | null>>(new Array(items.length).fill(null))

  const handleScrollToInitialScrollIndex = () => {
    if (Number.isInteger(initialScrollIndex) && scrollViewRef.current) {
      const offsetX = itemWidths
        .slice(0, initialScrollIndex)
        .reduce((agg, width) => (width && agg !== null ? agg + width : null), 0)

      if (offsetX !== null) {
        scrollViewRef.current.scrollTo({ x: offsetX, animated: false })
      }
    }
  }

  React.useEffect(() => {
    handleScrollToInitialScrollIndex()
  }, [itemWidths, initialScrollIndex])

  const handleItemLayout = (idx: number) => ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    setItemWidths((itemWidths) => {
      const newWidths = [...itemWidths]
      newWidths[idx] = width
      return newWidths
    })
  }

  return (
    <Root ref={scrollViewRef} showsHorizontalScrollIndicator={false} horizontal>
      {items?.map((item, index) => {
        const selected = currentCategory == item.slug
        return (
          <Box key={index} onLayout={handleItemLayout(index)}>
            {!!item.name ? (
              <TouchableOpacity onPress={() => onCategoryPress(item)}>
                <Category ml={index === 0 ? 2 : 0} mr={index === items.length - 1 ? 2 : 1} selected={selected}>
                  <Sans size="4" style={{ color: selected ? color("white100") : color("black100") }}>
                    {item.name}
                  </Sans>
                </Category>
              </TouchableOpacity>
            ) : (
              <Box mr={4}>
                <Spacer mb="5px" />
                <Skeleton width={50} height={15} />
              </Box>
            )}
          </Box>
        )
      })}
    </Root>
  )
}

const Root = styled(ScrollView)`
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  border-style: solid;
`

const Category = styled(Box)<{ selected: boolean }>`
  border: 1px ${color("black25")};
  ${(p) =>
    p.selected &&
    `
    background-color: ${color("black100")}
    border: 1px ${color("black100")}
    
  `};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
`
