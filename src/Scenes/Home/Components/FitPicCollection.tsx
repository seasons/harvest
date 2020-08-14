import React, { useImperativeHandle, useState, useRef, useEffect } from "react"
import { Sans, Box, Spacer, Flex, FadeInImage } from "App/Components"
import { Dimensions, findNodeHandle, TouchableWithoutFeedback, View } from "react-native"
import { Homepage_fitPics as FitPics } from "src/generated/Homepage"
import { SharedElement } from "react-navigation-shared-element"

export interface FitPicCollectionProps {
  items: FitPics[]
  navigation: any
  // The parent against which to measure this view's layout.
  parentRef: React.MutableRefObject<any>
}

export interface FitPicCollectionRef {
  getLayout: () => { y: number; height: number }
}

const screenWidth = Dimensions.get("screen").width

export const FitPicCollection = React.forwardRef<FitPicCollectionRef, FitPicCollectionProps>(
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
        () => console.log("[Warning FitPicCollection.tsx] Failed to measure layout.")
      )
    }

    useEffect(measureLayout, [boxRef, parentRef])

    const onPress = (index: number) => navigation.navigate("FitPicDetail", { item: items[index] })

    const renderItem = (item: FitPics, index: number) => {
      const imageWidth = (screenWidth - 35) / 2
      const imageHeight = imageWidth * (5 / 4)

      return (
        <TouchableWithoutFeedback onPress={() => onPress(index)} key={index}>
          <Box mb="3px">
            <SharedElement id={`fitpic.photo.${item.id}`}>
              <FadeInImage
                source={{
                  uri: item.image.url,
                }}
                style={{ width: imageWidth, height: imageHeight }}
              />
            </SharedElement>
          </Box>
        </TouchableWithoutFeedback>
      )
    }

    return (
      <Box mb={3} pl={2} pr={2} ref={boxRef} onLayout={() => measureLayout()}>
        <Sans size="1">Seasons Fit Check</Sans>
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
