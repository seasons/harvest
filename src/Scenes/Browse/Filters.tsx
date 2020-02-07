import { WhiteCheck } from "Assets/svgs"
import get from "lodash/get"
import React, { useState } from "react"
import { Dimensions, SectionList, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"

import { Box, Button, Flex, Radio, Sans, Separator, Spacer, Theme } from "../../Components"

const FILTER_BY = "Filter by"
const SORT_BY = "Sort by"

export const Filters = (props: any) => {
  const currentSortFilter = get(props, "navigation.state.params.sortFilter", "")
  const currentSizeFilters = get(props, "navigation.state.params.sizeFilters", [])
  const [sortFilter, setSortFilter] = useState(currentSortFilter)
  const [sizeFilters, setSizeFilters] = useState(currentSizeFilters)

  const handleCancelBtnPressed = () => {
    props.navigation.dismiss()
  }

  const handleApplyBtnPressed = () => {
    props.navigation.navigate("Browse", { sortFilter, sizeFilters })
  }

  const filterSections = [
    {
      title: SORT_BY,
      data: ["Alphabetical", "Recently added"],
    },
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
  const isApplyButtonDisabled = !(sortFilter !== "" || sizeFilters.length > 0)
  const separatorColor = "#272727"

  const renderSectionHeader = ({ section }) => {
    return (
      <>
        {section.title !== SORT_BY ? <Spacer mt={2} /> : null}
        <Spacer mt={2} />
        <Sans color="white" size="1" weight="medium">
          {section.title}
        </Sans>
        <Spacer mt={2} />
        <Separator color={separatorColor} />
      </>
    )
  }

  const renderItem = ({ item, section }) => {
    const isSortBySection = section.title === SORT_BY
    const isSelected = isSortBySection ? sortFilter === item : sizeFilters.includes(item)
    // Use the default border radius for the sort by section
    const radioButtonBorderRadius = isSortBySection ? undefined : 4
    const handlePress = () => {
      if (section.title === SORT_BY) {
        setSortFilter(sortFilter !== item ? item : "")
      } else if (section.title == FILTER_BY) {
        if (sizeFilters.includes(item)) {
          setSizeFilters(sizeFilters.filter(f => f !== item))
        } else {
          setSizeFilters([...sizeFilters, item])
        }
      }
    }

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <Box>
          <Spacer mt={20} />
          <Flex flexDirection="row">
            <Radio borderRadius={radioButtonBorderRadius} selected={isSelected} onSelect={handlePress}>
              {!isSortBySection ? <WhiteCheck /> : null}
            </Radio>
            <Sans color="white" ml={2} size="1" weight="medium">
              {item}
            </Sans>
          </Flex>
          <Spacer mt={20} />
          <Separator color={separatorColor} />
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <Theme>
      <Container style={{ paddingTop: insets.top }}>
        <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <HeaderContainer px={2}>
            <Sans size="3" color="white" weight="medium" py={2}>
              Add Filters
            </Sans>
          </HeaderContainer>
          <Box px={2}>
            <SectionList
              contentContainerStyle={{ paddingBottom: insets.bottom + buttonBottom + buttonHeight }}
              sections={filterSections}
              stickySectionHeadersEnabled={false}
              keyExtractor={item => item}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
            />
          </Box>
        </Flex>
        <Box style={{ position: "absolute", left: 16, bottom: buttonBottom }}>
          <Button size="medium" variant="secondaryBlack" width={buttonWidth} onPress={handleCancelBtnPressed}>
            Cancel
          </Button>
        </Box>
        <Box style={{ position: "absolute", left: screenWidth / 2 + 3.5, bottom: buttonBottom }}>
          <Button
            disabled={isApplyButtonDisabled}
            size="medium"
            variant="primaryWhite"
            width={buttonWidth}
            onPress={handleApplyBtnPressed}
          >
            Apply
          </Button>
        </Box>
      </Container>
    </Theme>
  )
}

const Container = styled(Box)`
  background: black;
  flex: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`

const HeaderContainer = styled(Box)`
  border-color: #272727;
  border-style: solid;
  border-bottom-width: 1px;
`
