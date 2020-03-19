import { TabBar } from "App/Components/TabBar"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Check } from "Assets/svgs"
import get from "lodash/get"
import React, { useState } from "react"
import { Dimensions, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Button, Flex, Handle, Radio, Sans, Separator, Spacer, Container } from "../../Components"

enum FilterView {
  Tops = 0,
  Bottoms = 1,
}

export const Filters = screenTrack()((props: any) => {
  const currentFilters = get(props, "route.params.sizeFilters", [])
  const [sizeFilters, setSizeFilters] = useState(currentFilters)
  const [currentView, setCurrentView] = useState<FilterView>(FilterView.Tops)
  const tracking = useTracking()
  const insets = useSafeArea()

  const filterData = {
    tops: ["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"],
    bottoms: ["26", "27", "28", "29", "30", "31", "32", "33", "34"],
  }
  const screenWidth = Dimensions.get("window").width
  const buttonWidth = (screenWidth - 39) / 2
  const buttonHeight = 48

  const renderItem = ({ item }) => {
    const isSelected = sizeFilters.includes(item)

    const handlePress = () => {
      tracking.trackEvent({
        actionName: Schema.ActionNames.FilterTapped,
        actionType: Schema.ActionTypes.Tap,
        filterValue: item,
      })
      if (sizeFilters.includes(item)) {
        setSizeFilters(sizeFilters.filter((f) => f !== item))
      } else {
        setSizeFilters([...sizeFilters, item])
      }
    }

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <Box px={2}>
          <Spacer mt={20} />
          <Flex flexDirection="row">
            <Radio borderRadius={4} selected={isSelected} onSelect={handlePress}>
              <Check color={color("black100")} />
            </Radio>
            <Sans color={color("black100")} ml={2} size="1" weight="medium">
              {item}
            </Sans>
          </Flex>
          <Spacer mt={20} />
          <Separator color={color("black15")} />
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <Container insetsTop={false}>
      <Handle style={{ marginTop: space(2) }} />
      <Flex flexDirection="row" alignItems="center" px={2}>
        <Sans size="3" color={color("black100")} weight="medium" py={2}>
          Filter by size
        </Sans>
        <Box ml="auto">
          <TouchableOpacity
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.FiltersCleared,
                actionType: Schema.ActionTypes.Tap,
              })
              setSizeFilters([])
            }}
          >
            <Sans size="1" color={color("black50")} ml="auto">
              Clear
            </Sans>
          </TouchableOpacity>
        </Box>
      </Flex>
      <TabBar
        spaceEvenly
        tabs={["Tops", "Bottoms"]}
        activeTab={currentView}
        goToPage={(page: FilterView) => {
          tracking.trackEvent({
            actionName: page === 0 ? Schema.ActionNames.TopsTabTapped : Schema.ActionNames.BottomsTabTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          setCurrentView(page)
        }}
      />
      <FlatList
        data={currentView === FilterView.Tops ? filterData.tops : filterData.bottoms}
        keyExtractor={(_item, index) => String(index)}
        renderItem={(item) => {
          return renderItem(item)
        }}
        ListFooterComponent={() => <Spacer mb={buttonHeight + space(4)} />}
      />
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
              filters: sizeFilters,
            })
            props.navigation.navigate("Browse", { sizeFilters })
          }}
        >
          Apply
        </Button>
      </Box>
    </Container>
  )
})
