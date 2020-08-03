import React, { useImperativeHandle, useState, useRef, useEffect } from "react"
import { Sans, Box, Spacer, Flex, FadeInImage } from "App/Components"
import { Dimensions, findNodeHandle, TouchableWithoutFeedback, View } from "react-native"
import { Homepage_communityStyle as CommunityStyle } from "src/generated/Homepage"

export interface CommunityStyleCollectionProps {
  items: CommunityStyle[]
  navigation: any
  // The parent against which to measure this view's layout.
  parentRef: React.MutableRefObject<any>
}

export interface CommunityStyleCollectionRef {
  getLayout: () => { y: number; height: number }
}

const width = Dimensions.get("window").width

export const CommunityStyleCollection = React.forwardRef<CommunityStyleCollectionRef, CommunityStyleCollectionProps>(
  ({ items, navigation, parentRef }, ref) => {
    const [layout, setLayout] = useState(null as { y: number; height: number })
    const boxRef: React.MutableRefObject<View> = useRef(null)
    useImperativeHandle(ref, () => ({
      getLayout: () => layout,
    }))

    const measureLayout = () => {
      if (!parentRef?.current) {
        return
      }

      boxRef?.current?.measureLayout(
        findNodeHandle(parentRef.current),
        (_x, y, _width, height) => setLayout({ y, height }),
        () => console.log("[Warning CommunityStyleCollection.tsx] Failed to measure layout.")
      )
    }

    useEffect(measureLayout, [boxRef, parentRef])

    const onPress = (index: number) => {
      navigation.navigate("Modal", { screen: "CommunityStyleDetail", params: { item: items[index] } })
    }

    const renderItem = (item: CommunityStyle, index: number) => {
      return (
        <TouchableWithoutFeedback onPress={() => onPress(index)} key={index}>
          <Box mb="3px">
            <FadeInImage
              source={{
                uri: item.image.url,
              }}
              style={{ width: (width - 35) / 2, height: 240 }}
            />
          </Box>
        </TouchableWithoutFeedback>
      )
    }

    return (
      <Box mb={3} pl={2} pr={2} ref={boxRef} onLayout={() => measureLayout()}>
        <Sans size="1">Community style</Sans>
        <Sans size="1" color="black50">
          Add a photo below to be featured
        </Sans>
        <Spacer mb={2} />
        <Flex flexWrap="wrap" flexDirection="row" width="100%" justifyContent="space-between">
          {items.map(renderItem)}
        </Flex>
      </Box>
    )
  }
)
