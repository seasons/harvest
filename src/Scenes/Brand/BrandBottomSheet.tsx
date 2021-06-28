import { Box, Flex, Handle, ProductGridItem, Sans, Spacer } from "App/Components"
import { CarouselPageDots } from "App/Components/CarouselPageDots"
import { ReadMore } from "App/Components/ReadMore"
import { Spinner } from "App/Components/Spinner"
import { color, space } from "App/utils"
import { DateTime } from "luxon"
import React, { useMemo, useRef, useState } from "react"
import { Dimensions, FlatList, Linking, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"

const dimensions = Dimensions.get("window")

interface BrandBottomSheetProps {
  data: any
  loading: boolean
  fetchMore: any
  pageLength: number
  currentImage: number
  setProductCount: (count: number) => void
}

export const BRAND_SNAP_PADDING = 70

const MetaDataCarousel = ({ data }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => item?.title + index}
      renderItem={({ item, index }) => (
        <Flex flexDirection="row" flexWrap="nowrap">
          {index !== 0 && <Box style={{ height: "100%", width: 1, backgroundColor: color("black10") }} />}
          {item?.title === "Website" ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item?.text)
              }}
            >
              <Box ml={index === 0 ? 0 : 3} mr={3}>
                <Sans size="4" color="black50">
                  {item?.title}
                </Sans>
                <Sans size="4">{item?.text}</Sans>
              </Box>
            </TouchableOpacity>
          ) : (
            <Box ml={index === 0 ? 0 : 3} mr={3}>
              <Sans size="4" color="black50">
                {item?.title}
              </Sans>
              <Sans size="4">{item?.text}</Sans>
            </Box>
          )}
        </Flex>
      )}
    />
  )
}

export const BrandBottomSheet: React.FC<BrandBottomSheetProps> = ({
  data,
  loading,
  fetchMore,
  pageLength,
  currentImage,
  setProductCount,
}) => {
  const [readMoreExpanded, setReadMoreExpanded] = useState(false)
  const [flatListHeight, setFlatListHeight] = useState(0)
  const insets = useSafeAreaInsets()
  const bottomSheetRef: React.MutableRefObject<ScrollBottomSheet<string>> = useRef(null)

  const brand = data?.brand
  const products = brand?.products?.edges
  const description = brand?.description
  const images = brand?.images

  const hasImages = images?.length > 0

  const numColumns = 2

  const imageContentHeight = dimensions.width
  const topSnapPoint = 0
  const secondSnapPoint = imageContentHeight - insets.top - BRAND_SNAP_PADDING

  const snapPoints = hasImages ? [topSnapPoint, secondSnapPoint] : [topSnapPoint]
  const initialSnapPoint = hasImages ? 1 : 0
  const aggregateCount = data?.brand?.products?.aggregate?.count

  const metaData = []
  if (brand?.basedIn) {
    metaData.push({
      title: "Headquarters",
      text: brand?.basedIn,
    })
  }
  if (brand?.websiteUrl) {
    metaData.push({
      title: "Website",
      text: brand?.websiteUrl,
    })
  }
  if (brand?.since) {
    metaData.push({
      title: "Since",
      text: DateTime.fromISO(brand?.since).year,
    })
  }

  const content = useMemo(() => {
    return (
      <ScrollBottomSheet<string>
        topInset={BRAND_SNAP_PADDING}
        componentType="FlatList"
        enableOverScroll
        ListHeaderComponent={() => (
          <Box px={2}>
            <Spacer mb={1} />
            <Flex
              flexDirection="row"
              alignItems="flex-start"
              flexWrap="nowrap"
              justifyContent={!!hasImages ? "space-between" : "flex-start"}
            >
              <Sans size="7" style={{ textDecorationLine: "underline" }}>
                {brand?.name}
              </Sans>
              {!!hasImages && (
                <Box pt={0.5}>
                  <CarouselPageDots slideCount={images?.length} currentSlide={currentImage - 1} />
                </Box>
              )}
            </Flex>
            {!!description && (
              <>
                <Spacer mb={3} />
                <Sans size="4">About</Sans>
                <Spacer mb={0.5} />
                <ReadMore
                  readMoreExpanded={readMoreExpanded}
                  setReadMoreExpanded={setReadMoreExpanded}
                  content={description}
                  maxChars={100}
                />
              </>
            )}
            {metaData?.length > 0 && (
              <Box mt={3}>
                <MetaDataCarousel data={metaData} />
              </Box>
            )}
            <Spacer mb={3} />
          </Box>
        )}
        ListFooterComponent={() => (
          <Box>
            {!!aggregateCount && aggregateCount > products?.length && products?.length > 0 && (
              <Flex py={3} flexDirection="row" justifyContent="center" alignItems="center">
                <Spinner />
              </Flex>
            )}
            <Spacer mb={3} />
          </Box>
        )}
        containerStyle={{
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: insets.top + BRAND_SNAP_PADDING,
        }}
        snapPoints={snapPoints}
        initialSnapIndex={initialSnapPoint}
        renderHandle={() => (
          <Handle style={{ marginTop: space(2), marginBottom: space(1) }} backgroundColor="black10" />
        )}
        keyExtractor={(item, index) => item?.node?.id + index}
        data={products}
        numColumns={numColumns}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (!loading) {
            fetchMore({
              variables: {
                skip: products.length,
              },
            }).then(() => {
              setProductCount(products.length + pageLength)
            })
          }
        }}
        renderItem={({ item }, i) => <ProductGridItem product={item?.node} addLeftSpacing={i % numColumns !== 0} />}
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
  }, [
    products,
    flatListHeight,
    readMoreExpanded,
    setReadMoreExpanded,
    snapPoints,
    initialSnapPoint,
    metaData,
    aggregateCount,
    fetchMore,
    setProductCount,
  ])

  return <>{content}</>
}
