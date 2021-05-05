import { AlphabetScrubber } from "App/Components/AlphabetScrubber"
import { TabBar } from "App/Components/TabBar"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import get from "lodash/get"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { groupBy, map, sortBy, toPairs } from "lodash"
import { Box, Button, Flex, Handle, Radio, Sans, Separator, Spacer, Container, Toggle } from "../../Components"
import { MultiSelectionTable } from "App/Components/MultiSelectionTable"

enum FilterView {
  Sizes = 0,
  Designers = 1,
}

export interface BrowseFilters {
  bottomSizeFilters: any[]
  topSizeFilters: any[]
  designerFilters: any[]
  availableOnly: boolean
}

const DESIGNER_ITEM_HEIGHT = 60
export const EMPTY_BROWSE_FILTERS = {
  bottomSizeFilters: [],
  topSizeFilters: [],
  designerFilters: [],
  availableOnly: false,
}

export const Filters = screenTrack()((props: any) => {
  const currentFilters = get(props, "route.params.filters", EMPTY_BROWSE_FILTERS)
  const designers = props?.route?.params?.designers
  const [filters, setFilters] = useState<BrowseFilters>(currentFilters)
  const [isMutatingToggle, setIsMutatingToggle] = useState(false)
  const [alphabet, setAlphabet] = useState([])
  const listRef = useRef(null)
  const [currentView, setCurrentView] = useState<FilterView>(FilterView.Sizes)
  const tracking = useTracking()
  const insets = useSafeAreaInsets()

  const filterData = {
    letter: [
      { label: "XS", value: "XS" },
      { label: "S", value: "S" },
      { label: "M", value: "M" },
      { label: "L", value: "L" },
      { label: "XL", value: "XL" },
      { label: "XXL", value: "XXL" },
    ],
    waist: [
      { label: "26", value: "26" },
      { label: "27", value: "27" },
      { label: "28", value: "28" },
      { label: "29", value: "29" },
      { label: "30", value: "30" },
      { label: "31", value: "31" },
      { label: "32", value: "32" },
      { label: "33", value: "33" },
      { label: "34", value: "34" },
      { label: "35", value: "35" },
      { label: "36", value: "36" },
    ],
  }
  const screenWidth = Dimensions.get("window").width
  const buttonWidth = (screenWidth - 39) / 2
  const buttonHeight = 48

  const sections = currentView === FilterView.Sizes ? [{ data: filterData }] : [{ data: designers }]

  const groupBrands = (brands) => {
    const brandPairs = toPairs(
      groupBy(brands, ({ name }) => {
        const char = name.charAt(0)
        if (char.match(/[a-z]/i)) {
          return char
        } else {
          return "#"
        }
      })
    )
    const groupedBrands: any = sortBy(
      map(brandPairs, ([letter, brandsForLetter], index) => ({
        data: brandsForLetter,
        letter: letter.toUpperCase(),
        index,
      })),
      ({ letter }) => letter
    )
    setAlphabet(groupedBrands.map((brand) => brand.letter))
  }

  useEffect(() => {
    if (designers) {
      groupBrands(designers)
    }
  }, [designers])

  const onChangeToggle = async (newValue) => {
    if (isMutatingToggle) {
      return
    }
    setFilters({
      ...filters,
      availableOnly: newValue,
    })
    setIsMutatingToggle(true)
    tracking.trackEvent({
      actionName: Schema.ActionNames.AvailableFilterToggled,
      actionType: Schema.ActionTypes.Tap,
      newValue,
    })

    setIsMutatingToggle(false)
  }

  const scrollTo = (touchedLetter) => {
    let index
    if (touchedLetter === "#") {
      index = 0
      listRef?.current?.scrollToOffset?.({ animated: false, offset: index })
    } else {
      index = designers.findIndex((item) => item["name"].charAt(0).toUpperCase().localeCompare(touchedLetter) === 0)
      if (index > -1) {
        listRef?.current?.scrollToOffset?.({ animated: false, offset: index * DESIGNER_ITEM_HEIGHT })
      }
    }
  }

  const renderItem = ({ item }) => {
    if (currentView === FilterView.Sizes) {
      return (
        <>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center" py={4} px={2}>
            <Box>
              <Sans size="4">Available now</Sans>
              <Sans size="4" color="black50">
                Styles currently in-stock
              </Sans>
            </Box>
            <Toggle
              disabled={false}
              onChange={(newValue) => onChangeToggle(newValue)}
              selected={filters.availableOnly}
            />
          </Flex>
          <Box px={2}>
            <Separator />
          </Box>
          <Flex pt={4}>
            <Box px={2}>
              <Sans size="4">Top sizes</Sans>
            </Box>
            <Box px="14px">
              <MultiSelectionTable
                items={item.data?.letter}
                onTap={(item) => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.FilterTapped,
                    actionType: Schema.ActionTypes.Tap,
                    filterValue: item.value,
                  })
                  // Recreate a new array reference so that the component reloads
                  setFilters({
                    ...filters,
                    topSizeFilters: [
                      ...(filters.topSizeFilters.includes(item.value)
                        ? filters.topSizeFilters.filter((i) => i !== item.value)
                        : filters.topSizeFilters.concat([item.value])),
                    ],
                  })
                }}
                selectedItems={filters.topSizeFilters}
              />
            </Box>
          </Flex>
          <Flex pt={4}>
            <Box px={2}>
              <Sans size="4">Bottom sizes</Sans>
            </Box>
            <Box px="14px">
              <MultiSelectionTable
                items={item.data?.waist}
                onTap={(item) => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.FilterTapped,
                    actionType: Schema.ActionTypes.Tap,
                    filterValue: item.value,
                  })
                  // Recreate a new array reference so that the component reloads
                  setFilters({
                    ...filters,
                    bottomSizeFilters: [
                      ...(filters.bottomSizeFilters.includes(item.value)
                        ? filters.bottomSizeFilters.filter((i) => i !== item.value)
                        : filters.bottomSizeFilters.concat([item.value])),
                    ],
                  })
                }}
                selectedItems={filters.bottomSizeFilters}
              />
              <Spacer mb={0.5} />
              <MultiSelectionTable
                items={item.data?.letter}
                onTap={(item) => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.FilterTapped,
                    actionType: Schema.ActionTypes.Tap,
                    filterValue: item.value,
                  })
                  // Recreate a new array reference so that the component reloads
                  setFilters({
                    ...filters,
                    bottomSizeFilters: [
                      ...(filters.bottomSizeFilters.includes(item.value)
                        ? filters.bottomSizeFilters.filter((i) => i !== item.value)
                        : filters.bottomSizeFilters.concat([item.value])),
                    ],
                  })
                }}
                selectedItems={filters.bottomSizeFilters}
              />
            </Box>
          </Flex>
          <Spacer mb={4} />
        </>
      )
    } else {
      return (
        <>
          {item?.data?.map((designer) => {
            const selected = filters.designerFilters.includes(designer.slug)
            return (
              <Flex pl={2} pr={6} flexDirection="column" key={designer.id}>
                <TouchableOpacity
                  onPress={() => {
                    tracking.trackEvent({
                      actionName: Schema.ActionNames.BrandTapped,
                      actionType: Schema.ActionTypes.Tap,
                      brandID: designer?.id,
                      brandSlug: designer?.slug,
                      brandName: designer?.name,
                    })
                    setFilters({
                      ...filters,
                      designerFilters: [
                        ...(selected
                          ? filters.designerFilters.filter((d) => d !== designer.slug)
                          : filters.designerFilters.concat([designer.slug])),
                      ],
                    })
                  }}
                >
                  <Spacer mb={2} />
                  <Flex justifyContent="flex-start" flexWrap="nowrap" flexDirection="row">
                    <Radio selected={selected} pointerEvents="none" />
                    <Spacer mr={1} />
                    <Sans size="4" style={{ textDecorationLine: "underline" }}>
                      {designer.name}
                    </Sans>
                  </Flex>
                  <Spacer mb={2} />
                </TouchableOpacity>
                <Separator />
              </Flex>
            )
          })}
        </>
      )
    }
  }

  return (
    <Container insetsTop={false}>
      <Handle style={{ marginTop: space(2) }} />
      <Flex flexDirection="row" alignItems="center" px={2}>
        <Sans size="5" color={color("black100")} weight="medium" py={2}>
          Filters
        </Sans>
        <Box ml="auto">
          <TouchableOpacity
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.FiltersCleared,
                actionType: Schema.ActionTypes.Tap,
              })
              setFilters(EMPTY_BROWSE_FILTERS)
            }}
          >
            <Sans size="4" color={color("black50")} ml="auto">
              Clear
            </Sans>
          </TouchableOpacity>
        </Box>
      </Flex>
      <TabBar
        spaceEvenly
        tabs={["Sizes", "Designers"]}
        activeTab={currentView}
        goToPage={(page: FilterView) => {
          tracking.trackEvent({
            actionName: page === 0 ? Schema.ActionNames.TopsTabTapped : Schema.ActionNames.BottomsTabTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          setCurrentView(page)
        }}
      />
      <Flex style={{ flex: 1, position: "relative" }}>
        {currentView === FilterView.Designers && <AlphabetScrubber alphabet={alphabet} scrollTo={scrollTo} />}
        <FlatList
          data={sections}
          ref={listRef}
          keyExtractor={(_item, index) => String(index)}
          renderItem={(item) => {
            return renderItem(item)
          }}
          ListFooterComponent={() => <Spacer mb={buttonHeight + space(4)} />}
        />
      </Flex>
      <Box style={{ position: "absolute", left: space(2), bottom: space(2) + insets.bottom }}>
        <Button
          variant="primaryWhite"
          width={buttonWidth}
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.FilterModalCanceled,
              actionType: Schema.ActionTypes.Tap,
            })
            props.navigation.goBack()
          }}
        >
          Cancel
        </Button>
      </Box>
      <Box style={{ position: "absolute", left: screenWidth / 2 + 3.5, bottom: space(2) + insets.bottom }}>
        <Button
          variant="secondaryBlack"
          width={buttonWidth}
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.FiltersApplied,
              actionType: Schema.ActionTypes.Tap,
              filters,
            })
            props.navigation.navigate("Browse", { filters })
          }}
        >
          Apply
        </Button>
      </Box>
    </Container>
  )
})
