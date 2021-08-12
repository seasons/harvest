import React from "react"
import { Sans, Skeleton, Spacer, Box, Flex } from "App/Components"
import { TouchableOpacity, ScrollView } from "react-native"
import styled from "styled-components/native"

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
    <Root
      ref={scrollViewRef}
      contentContainerStyle={{
        padding: 0,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 0,
      }}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
        {items.map((item, index) => {
          const selected = currentCategory == item.slug
          return (
            <Box key={index} onLayout={handleItemLayout(index)}>
              {!!item.name ? (
                <TouchableOpacity onPress={() => onCategoryPress(item)}>
                  <Category mr={1} selected={selected}>
                    <Sans size="4" style={{ color: selected ? "white" :  "black"}}>
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
  ${(p) =>
    p.selected &&
    `
    backgroundColor: black
    border: 1px black
    
  `};
  border: 1px lightgrey;
  border-radius: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
`
