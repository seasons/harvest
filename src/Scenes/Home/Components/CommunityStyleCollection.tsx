import React, { useImperativeHandle, useState, useRef, useLayoutEffect, useEffect } from "react"
import { Sans, Box, Spacer, Flex, FadeInImage } from "App/Components"
import { Dimensions, findNodeHandle, View } from "react-native"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"

interface Item {
  author: string
  id: string
  url: string
}

export interface CommunityStyleCollectionProps {
  items: Item[]
  // The parent against which to measure this view's layout.
  parentRef: React.MutableRefObject<any>
}

export interface CommunityStyleCollectionRef {
  getLayout: () => { y: number; height: number }
}

const width = Dimensions.get("window").width

export const CommunityStyleCollection = React.forwardRef<CommunityStyleCollectionRef, CommunityStyleCollectionProps>(
  ({ items, parentRef }, ref) => {
    const [layout, setLayout] = useState(null as { y: number; height: number })
    const boxRef: React.MutableRefObject<View> = useRef(null)
    useImperativeHandle(ref, () => ({
      getLayout: () => layout,
    }))

    useEffect(() => {
      if (!parentRef?.current) {
        return
      }

      boxRef?.current?.measureLayout(
        findNodeHandle(parentRef.current),
        (_x, y, _width, height) => setLayout({ y, height }),
        () => console.log("Failed to measure layout")
      )
    }, [boxRef, parentRef])

    const renderItem = (_item: any, index: number) => {
      return (
        <Box key={index} mb="3px">
          <FadeInImage
            source={{
              uri: "https://c.stocksy.com/a/5yw900/z9/2371629.jpg",
            }}
            style={{ width: (width - 35) / 2, height: 240 }}
          />
        </Box>
      )
    }

    return (
      <Box mb={3} pl={2} pr={2} ref={boxRef}>
        <Sans size="1">Community style</Sans>
        <Sans size="1" color="black50">
          Add a photo below to be featured
        </Sans>
        <Spacer mb={2} />
        <Flex flexWrap="wrap" flexDirection="row" width="100%" justifyContent="space-between">
          {[...Array(15).keys()].map(renderItem)}
        </Flex>
      </Box>
    )
  }
)
