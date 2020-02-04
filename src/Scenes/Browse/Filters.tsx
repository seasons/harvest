import get from "lodash/get"
import React, { useState } from "react"
import { Dimensions, SectionList, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Button, Flex, Radio, Sans, Separator, Spacer, Theme } from "../../Components"
import styled from "styled-components/native"

const FILTER_BY = "Filter by"
const SORT_BY = "Sort by"

export const Filters = (props: any) => {
  const currentSortFilter = get(props, "navigation.state.params.sortFilter", "")
  const currentSizeFilters = get(props, "navigation.state.params.sizeFilters", [])
  const [sortFilter, setSortFilter] = useState(currentSortFilter)
  const [sizeFilters, setSizeFilters] = useState(currentSizeFilters)

  const handleCancelBtnPressed = async () => {
    props.navigation.dismiss()
  }

  const handleApplyBtnPressed = async () => {
    props.navigation.navigate('Browse', { sortFilter, sizeFilters })
  }

  const filterSections = [
    {
      title: SORT_BY,
      data: ['Alphabetical', 'Recently added']
    },
    {
      title: FILTER_BY,
      data: ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large']
    }
  ]

  const insets = useSafeArea()
  const screenWidth = Dimensions.get('window').width
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
    const isSelected = section.title === SORT_BY
      ? sortFilter === item
      : sizeFilters.includes(item)
    return (
      <TouchableWithoutFeedback onPress={() => {
        if (section.title === SORT_BY) {
          setSortFilter(sortFilter !== item ? item : "")
        } else if (section.title == FILTER_BY) {
          if (sizeFilters.includes(item)) {
            setSizeFilters(sizeFilters.filter(f => f !== item))
          } else {
            setSizeFilters([...sizeFilters, item])
          }
        }
      }}>
        <Box>
          <Spacer mt={20} />
          <Flex flexDirection="row">
            <Radio selected={isSelected} />
            <Sans color="white" ml={2} size="1" weight="medium">
              {item}
            </Sans>
          </Flex>
          <Spacer mt={20} />
          <Separator color={separatorColor} />
        </Box>
      </TouchableWithoutFeedback >
    )
  }

  return (
    <Theme>
      <Container pl={2} pr={2} style={{ paddingTop: insets.top + 60, paddingBottom: insets.bottom }}>
        <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <Box>
            <Sans size="3" color="white" weight="medium">
              Add Filters
              </Sans>
            <Spacer mb={64} />
          </Box>
          <SectionList
            contentContainerStyle={{ paddingBottom: buttonBottom + buttonHeight }}
            sections={filterSections}
            stickySectionHeadersEnabled={false}
            keyExtractor={item => item}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
        </Flex>
        <Box style={{ position: 'absolute', left: 16, bottom: buttonBottom }}>
          <Button
            size="medium"
            variant={"secondaryLight"}
            width={buttonWidth}
            onPress={handleCancelBtnPressed}>
            Cancel
          </Button>
        </Box>
        <Box style={{ position: 'absolute', left: screenWidth / 2 + 3.5, bottom: buttonBottom }}>
          <Button
            disabled={isApplyButtonDisabled}
            variant={"primaryLight"}
            width={buttonWidth}
            onPress={handleApplyBtnPressed}>
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
`
