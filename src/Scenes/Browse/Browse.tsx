import { Box, Button, FixedButton, Flex, Sans, VariantSizes, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import get from "lodash/get"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList, Text, TouchableWithoutFeedback } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { useQuery } from "@apollo/react-hooks"
import { BrowseLoader } from "./Loader"

const IMAGE_HEIGHT = 240

const GET_PRODUCTS = gql`
  query getProducts($name: String!, $first: Int!, $skip: Int!) {
    categories(where: { visible: true }) {
      id
      slug
      name
      children {
        slug
      }
    }
    products(category: $name, first: $first, skip: $skip, where: { status: Available }) {
      id
      name
      description
      images
      modelSize
      modelHeight
      externalURL
      tags
      retailPrice
      status
      createdAt
      updatedAt
      brand {
        name
      }
      variants {
        id
        size
        total
        reservable
        nonReservable
        reserved
        isSaved
      }
    }
  }
`

const renderItem = ({ item }, i, navigation) => {
  const itemWidth = Dimensions.get("window").width / 2 - 2
  const product = item

  const image = get(product, "images[0]", { url: "" })
  const resizedImage = imageResize(image.url, "large")
  const isLeft = i % 2 === 0

  const brandName = get(product, "brand.name")

  if (!product) {
    return null
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
      <Box mr={isLeft ? 0.0 : "4px"} mb={0.5} width={itemWidth}>
        <FadeInImage source={{ uri: resizedImage }} style={{ width: "100%", height: IMAGE_HEIGHT }} />
        <Box my={0.5} mx={1}>
          {brandName && <Sans size="0">{brandName}</Sans>}
          <VariantSizes size="0" variants={product.variants} />
        </Box>
        <Spacer mb={0.5} />
      </Box>
    </TouchableWithoutFeedback>
  )
}

export const Browse = (props: any) => {
  console.log("PROPS: ", props)
  const [currentCategory, setCurrentCategory] = useState("all")
  const [sortFilters, setSortFilters] = useState([])
  const [sizeFilters, setSizeFilters] = useState([])
  const { data, loading, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: 10,
      skip: 0,
    },
  })
  let scrollViewEl = null

  useEffect(() => {
    const browseFilter = props && props.screenProps && props.screenProps.browseFilter
    if (browseFilter && browseFilter !== currentCategory) {
      setCurrentCategory(props.screenProps.browseFilter)
    }
  }, [props.screenProps.browseFilter])

  const insets = useSafeArea()
  const loaderStyle = useSpring({ opacity: loading && !data ? 1 : 0 })
  const containerStyle = useSpring({ opacity: loading && !data ? 0 : 1 })
  const { navigation } = props
  let products = data && data.products
  console.log("SORT: ", sortFilters)
  // if (props && props.sortFilters && props.sortFilters.length > 0) {
  //   const sortFilter = props.sortFilters[0]
  //   if (sortFilter === "Alphabetical") {
  //     products = [...products].sort((a, b) => {
  //       const aName = get(a, "brand.name")
  //       const bName = get(b, "brand.name")
  //       if (aName > bName) return -1
  //       if (aName < bName) return 1
  //       return 0
  //     })
  //   }
  // }
  const categories = (data && data.categories) || []
  const filtersButtonSize = { height: 36, width: 84 }

  const onCategoryPress = item => {
    if (item.slug !== currentCategory) {
      setCurrentCategory(item.slug)
    }
    scrollViewEl.scrollToOffset({ offset: 0, animated: true })
  }

  const onFilterBtnPress = () => {
    const onFiltersModalDismiss = (sortFilters: Array<string>, sizeFilters: Array<string>) => {
      setSortFilters(sortFilters)
      setSizeFilters(sizeFilters)
    }
    props.navigation.navigate('FiltersModal', { onFiltersModalDismiss })
  }

  // products.forEach(p => { console.log(p); console.log('\n') })

  return (
    <Container>
      <LoaderContainer mt={insets.top} style={[loaderStyle]}>
        <BrowseLoader imageHeight={IMAGE_HEIGHT} />
      </LoaderContainer>
      <AnimatedFlex flexDirection="column" flex={1} pt={insets.top} style={[containerStyle]}>
        <Box flex={1} flexGrow={1}>
          <FlatList
            data={products}
            ref={ref => (scrollViewEl = ref)}
            keyExtractor={(item, index) => item.id + index}
            renderItem={(item, i) => renderItem(item, i, navigation)}
            numColumns={2}
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
                      products: [...prev.products, ...fetchMoreResult.products],
                    })
                  },
                })
              }
            }}
          />
          <FixedButtonContainer>
            <Button
              borderRadius={3}
              height={36}
              width={84}
              onPress={onFilterBtnPress}>
              Filters
            </Button>
          </FixedButtonContainer>
        </Box>
        <Box height={60} mb={insets.bottom}>
          <CategoryPicker
            data={[{ slug: "all", name: "All" }, ...categories]}
            renderItem={({ item }) => {
              const selected = currentCategory == item.slug
              return (
                <TouchableOpacity onPress={() => onCategoryPress(item)}>
                  <Category mr={3} mt={1} selected={selected}>
                    <Sans size="1" style={{ opacity: selected ? 1.0 : 0.5 }}>
                      {item.name}
                    </Sans>
                  </Category>
                </TouchableOpacity>
              )
            }}
            contentContainerStyle={{
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            keyExtractor={({ slug }) => slug}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </Box>
      </AnimatedFlex>
    </Container >
  )
}

const CategoryPicker = styled.FlatList`
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top-color: #e5e5e5;
  border-style: solid;
  border-top-width: 1px;
`

const LoaderContainer = animated(styled(Box)`
  flex: 1;
  position: absolute;
  left: 0;
  top: 0;
`)

const AnimatedFlex = animated(Flex)

const Category = styled(Box)`
  ${p =>
    p.selected &&
    `
    border-bottom-color: black;
    border-bottom-width: 3px;
  `};
`

const FixedButtonContainer = styled(Box)`
  position: absolute; 
  align-self: center; 
  bottom: 16; 
  width: 84; 
  height: 36;
`