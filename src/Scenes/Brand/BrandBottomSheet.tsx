import { Handle, Box, Spacer, Sans, ProductGridItem } from "App/Components"
import { NAV_HEIGHT } from "App/helpers/constants"
import { color, space } from "App/utils"
import React, { useState, useRef, useMemo } from "react"
import { Dimensions } from "react-native"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"
import { ReadMore } from "App/Components/ReadMore"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const dimensions = Dimensions.get("window")

interface BrandBottomSheetProps {
  data: any
  loading: boolean
  fetchMore: any
}

export const BrandBottomSheet: React.FC<BrandBottomSheetProps> = ({ data, loading, fetchMore }) => {
  const [readMoreExpanded, setReadMoreExpanded] = useState(false)
  const [flatListHeight, setFlatListHeight] = useState(0)
  const insets = useSafeAreaInsets()
  const bottomSheetRef: React.MutableRefObject<ScrollBottomSheet<string>> = useRef(null)

  const products = data?.brand?.products
  const basedIn = data?.brand?.basedIn
  const description = data?.brand?.description
  const images = data?.brand?.images

  const hasImages = images?.length > 0

  const numColumns = 2

  const imageContentHeight = dimensions.width
  const topSnapPoint = 20

  const snapPoints = hasImages ? [topSnapPoint, dimensions.height - imageContentHeight - NAV_HEIGHT] : [topSnapPoint]
  const initialSnapPoint = hasImages ? 1 : 0

  const content = useMemo(() => {
    return (
      <ScrollBottomSheet<string>
        topInset={95}
        componentType="FlatList"
        enableOverScroll
        ListHeaderComponent={() => (
          <Box px={2}>
            <Spacer mb={1} />
            <Sans size="3" style={{ textDecorationLine: "underline" }}>
              {data?.brand?.name}
            </Sans>
            {!!basedIn && (
              <Sans size="2" color={color("black50")}>
                {basedIn}
              </Sans>
            )}
            {!!description && (
              <>
                <Spacer mb={3} />
                <Sans size="2">About</Sans>
                <Spacer mb={0.5} />
                <ReadMore
                  readMoreExpanded={readMoreExpanded}
                  setReadMoreExpanded={setReadMoreExpanded}
                  content={description}
                  maxChars={100}
                />
              </>
            )}
            <Spacer mb={3} />
          </Box>
        )}
        ListFooterComponent={() => <Spacer mb={3} />}
        containerStyle={{
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: images?.length > 0 ? 25 : insets.top + 60,
        }}
        snapPoints={snapPoints}
        initialSnapIndex={initialSnapPoint}
        renderHandle={() => (
          <Handle style={{ marginTop: space(2), marginBottom: space(1) }} backgroundColor="black10" />
        )}
        keyExtractor={(item, index) => item?.id + index}
        data={products}
        numColumns={numColumns}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (!loading) {
            fetchMore({
              variables: {
                skip: products.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!prev) {
                  return []
                }

                if (!fetchMoreResult) {
                  return prev
                }

                return Object.assign({}, prev, {
                  brand: {
                    ...prev.brand,
                    products: [...prev.brand.products, ...fetchMoreResult.brand.products],
                  },
                })
              },
            })
          }
        }}
        renderItem={({ item }, i) => <ProductGridItem product={item} addLeftSpacing={i % numColumns !== 0} />}
        onLayout={(e) => {
          if (!flatListHeight) {
            setFlatListHeight(e.nativeEvent.layout.height)
          }
        }}
        ref={bottomSheetRef}
        animationConfig={{
          duration: 200,
        }}
      />
    )
  }, [products, flatListHeight, readMoreExpanded, setReadMoreExpanded, snapPoints, initialSnapPoint])

  return <>{content}</>
}
