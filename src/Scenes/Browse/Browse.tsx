import { useQuery } from "@apollo/client"
import { useFocusEffect } from "@react-navigation/native"
import { Box, Flex, ProductGridItem } from "App/Components"
import { Spinner } from "App/Components/Spinner"
import { color } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import React, { useEffect, useRef, useState } from "react"
import { FlatList, StatusBar, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { BrowseEmptyState } from "./BrowseEmptyState"
import { CategoryPicker } from "./CategoryPicker"
import { ProductGridItemSkeleton } from "../Product/Components"
import { GetBrowseProducts } from "App/generated/GetBrowseProducts"
import { Sans, Spacer } from "@seasons/eclipse"
import { BrowseFilters, EMPTY_BROWSE_FILTERS } from "./Filters"
import { GET_BROWSE_PRODUCTS } from "./queries/browseQueries"
import { useScrollToTop } from "@react-navigation/native"
import { CloseXIcon } from "Assets/icons"

const PAGE_LENGTH = 16

export const Browse = screenTrack()((props: any) => {
  const currentFilters = props?.route?.params?.filters || EMPTY_BROWSE_FILTERS
  const routeCategorySlug = props?.route?.params?.categorySlug || "all"
  const [productCount, setProductCount] = useState(PAGE_LENGTH)
  const [edges, setEdges] = useState(new Array(PAGE_LENGTH).fill({ node: { id: "" } }))
  const [categoryItems, setCategoryItems] = useState(new Array(PAGE_LENGTH).fill({ slug: "" }))
  const [filters, setFilters] = useState<BrowseFilters>(currentFilters)
  const [currentCategory, setCurrentCategory] = useState(routeCategorySlug)
  const routeCategoryIdx = categoryItems.findIndex(({ slug }) => slug === routeCategorySlug)
  const tracking = useTracking()
  const scrollViewEl = useRef(null)

  useScrollToTop(scrollViewEl)

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content")
    }, [])
  )

  useEffect(() => {
    setFilters(currentFilters)
  }, [currentFilters])

  useEffect(() => {
    if (routeCategorySlug !== currentCategory) {
      setCurrentCategory(routeCategorySlug)
    }
    if (scrollViewEl) {
      scrollViewEl?.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [routeCategorySlug])

  const { previousData, data = previousData, loading, fetchMore } = useQuery<GetBrowseProducts>(GET_BROWSE_PRODUCTS, {
    variables: {
      colors: filters.colorFilters,
      tops: filters.topSizeFilters,
      bottoms: filters.bottomSizeFilters,
      available: filters.availableOnly,
      forSaleOnly: filters.forSaleOnly,
      brandNames: filters.designerFilters,
      categoryName: currentCategory,
      first: productCount,
      skip: 0,
      orderBy: "publishedAt_DESC",
    },
  })

  const products = data?.productsConnection?.edges
  const designers = data?.brands
  const categories = data?.categories

  useEffect(() => {
    if (products) {
      setEdges(products)
    }
    if (categories) {
      setCategoryItems([{ slug: "all", name: "All" }, ...categories])
    }
  }, [data])

  const filtersButtonHeight = 36
  const numFiltersSelected = [
    ...filters.topSizeFilters,
    ...filters.bottomSizeFilters,
    ...filters.designerFilters,
    ...filters.colorFilters,
  ].length
  const numColumns = 2

  const filtersButtonText = numFiltersSelected > 0 ? `Filters +${numFiltersSelected}` : "Filters"

  const onCategoryPress = (item) => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.CategoryTapped,
      actionType: Schema.ActionTypes.Tap,
      category: item.slug,
    })
    if (item.slug !== currentCategory) {
      setProductCount(PAGE_LENGTH)
      setCurrentCategory(item.slug)
    }
    scrollViewEl?.current?.scrollToOffset({ offset: 0, animated: true })
  }

  const onFilterBtnPress = () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.FiltersButtonTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    props.navigation.navigate("Modal", { screen: "FiltersModal", params: { filters, designers } })
  }

  const reachedEnd = products?.length >= data?.productsConnection?.aggregate?.count

  return (
    <>
      <Container insetsBottom={false}>
        <Flex flexDirection="column" style={{ flex: 1 }}>
          <Box style={{ flex: 1, flexGrow: 1 }}>
            <Flex justifyContent="space-between" width="100%" flexWrap="nowrap" flexDirection="row" alignItems="center">
              <TouchableOpacity
                onPress={() => {
                  setFilters({
                    ...filters,
                    availableOnly: !filters.availableOnly,
                  })
                }}
              >
                <Flex flexWrap="nowrap" flexDirection="row" alignItems="center" px="12px" py="6px">
                  <SelectBox active={filters.availableOnly}>
                    <SelectX />
                  </SelectBox>
                  <Spacer mr={1} />
                  <Sans size="4">Available now</Sans>
                </Flex>
              </TouchableOpacity>
              <TouchableOpacity onPress={onFilterBtnPress}>
                <Flex px="12px" py="6px">
                  <Sans size="4" style={{ textDecorationLine: "underline" }}>
                    {filtersButtonText}
                  </Sans>
                </Flex>
              </TouchableOpacity>
            </Flex>
            <Box height={56}>
                <CategoryPicker
                  items={categoryItems}
                  onCategoryPress={onCategoryPress}
                  currentCategory={currentCategory}
                  initialScrollIndex={routeCategoryIdx}
                />
             </Box>
            <FlatList
              contentContainerStyle={
                products?.length
                  ? {
                      paddingBottom: filtersButtonHeight,
                    }
                  : { flex: 1 }
              }
              ListEmptyComponent={() => (
                <BrowseEmptyState setCurrentCategory={setCurrentCategory} setFilters={setFilters} />
              )}
              data={edges}
              ref={scrollViewEl}
              keyExtractor={(item, index) => item?.node?.id + index}
              renderItem={({ item }, index) => {
                const node = item?.node
                return (
                  <Box key={node?.id + index}>
                    {node?.id ? (
                      <ProductGridItem showBrandName product={node} addLeftSpacing={index % numColumns !== 0} />
                    ) : (
                      <ProductGridItemSkeleton addLeftSpacing={index % numColumns !== 0} />
                    )}
                  </Box>
                )
              }}
              numColumns={numColumns}
              ListFooterComponent={() => (
                <>
                  {!reachedEnd && (
                    <Flex style={{ height: 40 }} flexDirection="row" justifyContent="center">
                      <Spinner />
                    </Flex>
                  )}
                </>
              )}
              onEndReachedThreshold={0.7}
              onEndReached={() => {
                if (!loading && !reachedEnd && products?.length) {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.BrowsePagePaginated,
                    actionType: Schema.ActionTypes.Swipe,
                    pageNumber: Math.ceil(products.length / PAGE_LENGTH) + 1,
                  })
                  fetchMore({
                    variables: {
                      skip: products.length,
                    },
                  }).then(() => {
                    setProductCount(products.length + PAGE_LENGTH)
                  })
                }
              }}
            />
          </Box>
          
        </Flex>
      </Container>
    </>
  )
})

const SelectX = styled(CloseXIcon)`
  top: 1;
  right: -1;
`

const SelectBox = styled(Box)<{ active: boolean }>`
  height: 16;
  width: 16;
  position: relative;
  background-color: ${(p) => (p.active ? color("black100") : color("white100"))};
  border-width: 1;
  border-color: ${color("black100")};
`
