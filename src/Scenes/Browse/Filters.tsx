import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Dimensions, Text, Keyboard, SectionList, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Button, PopUp, FixedButton, Flex, Sans, Spacer, TextInput, Theme } from "../../Components"
import { color } from "../../Utils"
import styled from "styled-components/native"

export const Filters = (props: any) => {
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
  const [likeReason, setLikeReason] = useState("")
  const [showError, setShowError] = useState(false)
  const [url, setURL] = useState("")

  const onURLChange = val => {
    setURL(val)
    setIsNextButtonDisabled(val === "" || likeReason === "")
  }

  const onLikeReasonChange = val => {
    setLikeReason(val)
    setIsNextButtonDisabled(url === "" || val === "")
  }

  const handleCancelBtnPressed = async () => {
    props.navigation.dismiss()
  }

  const handleApplyBtnPressed = async () => {
    props.navigation.dismiss()
  }

  const filterSections = [
    {
      title: 'Sort by',
      data: ['Alphabetical', 'Recently added']
    },
    {
      title: 'Filter by',
      data: ['X-Small', 'Small', 'Medium', 'Large', 'X-Large']
    }
  ]

  const insets = useSafeArea()
  const screenWidth = Dimensions.get('window').width
  const buttonBottom = insets.bottom + 40
  const buttonWidth = (screenWidth - 39) / 2

  const renderSectionHeader = ({ section }) => <Text style={{ color: 'white' }}>{section.title}</Text>
  const renderItem = ({ item }) => <Text style={{ color: 'white' }}>{item}</Text>

  return (
    <Theme>
      <Container pl={2} style={{ paddingTop: insets.top + 60, paddingBottom: insets.bottom, background: color("black") }}>
        <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <Box>
            <Sans size="3" color="white" weight="medium">
              Add Filters
              </Sans>
            <Spacer mb={64} />
            {/* <Sans size="2" color="rgba(255, 255, 255, 0.5)" weight="medium">
                Recommend something for us to carry by pasting the link to the item below.
              </Sans> */}
          </Box>
          <SectionList
            sections={filterSections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
        </Flex>
        <Box style={{ position: 'absolute', left: 16, bottom: buttonBottom }}>
          <Button variant={"secondaryLight"} width={buttonWidth} onPress={handleCancelBtnPressed}>
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
