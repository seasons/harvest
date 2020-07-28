import React, { useImperativeHandle, useState } from "react"
import { Sans, Box, Spacer, Flex, FadeInImage } from "App/Components"
import { Dimensions } from "react-native"

interface Item {
  author: string
  id: string
  url: string
}

export interface CommunityStyleCollectionProps {
  items: Item[]
}

export interface CommunityStyleCollectionRef {
  getLayout: () => { y: number; height: number }
}

const width = Dimensions.get("window").width

export const CommunityStyleCollection = React.forwardRef<CommunityStyleCollectionRef, CommunityStyleCollectionProps>(
  ({ items }, ref) => {
    const [layout, setLayout] = useState(null as { y: number; height: number })

    useImperativeHandle(ref, () => ({
      getLayout: () => layout,
    }))

    const renderItem = (item: any, index: number) => {
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
      <Box
        mb={3}
        pl={2}
        pr={2}
        onLayout={({
          nativeEvent: {
            layout: { y, height },
          },
        }) => setLayout({ y, height })}
      >
        <Sans size="1">Community style</Sans>
        <Sans size="1" color="black50">
          Add a photo below to be featured
        </Sans>
        <Spacer mb={2} />
        <Flex flexWrap="wrap" flexDirection="row" width="100%" justifyContent="space-between">
          {[...Array(1).keys()].map(renderItem)}
        </Flex>
      </Box>
    )
  }
)
