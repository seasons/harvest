import { WhiteCheck } from "Assets/svgs"
import get from "lodash/get"
import React, { useState } from "react"
import { Dimensions, SectionList, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { Box, Button, Flex, Radio, Sans, Separator, Spacer, Theme } from "../../Components"
import { useTracking, Schema, screenTrack } from "App/utils/track"
import { color } from "App/utils"

const FILTER_BY = "Filter by"

export const Filters = screenTrack()((props: any) => {
  const currentSizeFilters = get(props, "route.params.sizeFilters", [])
  const [sizeFilters, setSizeFilters] = useState(currentSizeFilters)
  const tracking = useTracking()

  const filterSections = [
    {
      title: FILTER_BY,
      data: ["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"],
    },
  ]

  const insets = useSafeArea()
  const screenWidth = Dimensions.get("window").width
  const buttonBottom = insets.bottom + 40
  const buttonWidth = (screenWidth - 39) / 2
  const buttonHeight = 48

  const renderItem = ({ item }) => {
    const isSelected = sizeFilters.includes(item)
    // Use the default border radius for the sort by section
    const handlePress = () => {
      tracking.trackEvent({
        actionName: Schema.ActionNames.FilterTapped,
        actionType: Schema.ActionTypes.Tap,
        filterValue: item,
      })
      if (sizeFilters.includes(item)) {
        setSizeFilters(sizeFilters.filter(f => f !== item))
      } else {
        setSizeFilters([...sizeFilters, item])
      }
    }

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <Box>
          <Spacer mt={20} />
          <Flex flexDirection="row">
            <Radio borderRadius={4} selected={isSelected} onSelect={handlePress}>
              <WhiteCheck />
            </Radio>
            <Sans color={color("black50")} ml={2} size="1" weight="medium">
              {item}
            </Sans>
          </Flex>
          <Spacer mt={20} />
          <Separator color={color("black50")} />
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <Theme>
      <Container>
        <Handle style={{ marginTop: 12, marginBottom: insets.top }} />
        <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <HeaderContainer px={2}>
            <Flex flexDirection="row" alignItems="center">
              <Sans size="3" color={color("white100")} weight="medium" py={2}>
                Filter By
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
                  <Sans size="2" color={color("white100")} weight="medium" ml="auto">
                    Clear
                  </Sans>
                </TouchableOpacity>
              </Box>
            </Flex>
          </HeaderContainer>
          <Box px={2} flex={1}>
            <SectionList
              contentContainerStyle={{ paddingBottom: insets.bottom + buttonBottom + buttonHeight }}
              sections={filterSections}
              stickySectionHeadersEnabled={false}
              keyExtractor={item => item}
              renderItem={renderItem}
            />
          </Box>
        </Flex>
        <Box style={{ position: "absolute", left: 16, bottom: buttonBottom }}>
          <Button
            variant="secondaryBlack"
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
        <Box style={{ position: "absolute", left: screenWidth / 2 + 3.5, bottom: buttonBottom }}>
          <Button
            variant="primaryWhite"
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
    </Theme>
  )
})

const Container = styled(Box)`
  background: black;
  flex: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`

const HeaderContainer = styled(Box)`
  border-color: ${color("black50")};
  border-style: solid;
  border-bottom-width: 1px;
`

const Handle = styled(Box)`
  width: 40px;
  height: 5px;
  border-radius: 100;
  background: white;
  opacity: 0.5;
  margin: auto;
`
