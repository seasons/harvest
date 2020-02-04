import gql from "graphql-tag"
import React, { useState } from "react"
import get from "lodash/get"
import { useMutation } from "react-apollo"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { Dimensions, Text, Keyboard, SectionList, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Button, PopUp, FixedButton, Flex, Sans, Radio, Separator, Spacer, TextInput, Theme } from "../../Components"
import { color } from "../../Utils"
import styled from "styled-components/native"
import { size } from "styled-system"

const FILTER_BY = "Filter by"
const SORT_BY = "Sort by"


export const Filters = (props: any) => {
  const onFiltersModalDismiss = get(props, "navigation.state.params.onFiltersModalDismiss")
  const currentSortFilter = get(props, "navigation.state.params.sortFilter")
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
            <Sans color="white" size="1" weight="medium" ml={2}>
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
          <Button size="medium" variant={"secondaryLight"} width={buttonWidth} onPress={handleCancelBtnPressed}>
            Cancel
          </Button>
        </Box>
        <Box style={{ position: 'absolute', left: screenWidth / 2 + 3.5, bottom: buttonBottom }}>
          <Button variant={"primaryGray"} width={buttonWidth} onPress={handleApplyBtnPressed}>
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
