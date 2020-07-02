import { Box, Button, Container, FixedBackArrow, Sans, Spacer, Flex } from "App/Components"
import { color } from "App/utils"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useState } from "react"
import { Dimensions, FlatList, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const UPDATE_STYLE_PREFERENCES = gql`
  mutation setStylePreferences($styles: [String!], $patterns: [String!]) {
    addCustomerDetails(
      details: { stylePreferences: { create: { styles: { set: $styles }, patterns: { set: $patterns } } } }
    ) {
      id
    }
  }
`

const sections: Section[] = [
  {
    title: "What styles are you most interested in?",
    items: ["Shirts", "Tees", "Jeans", "Pants", "Shorts", "Sweaters", "Hoodies", "Outerwear"],
  },
  {
    title: "Which of these patterns are you interested in?",
    items: ["Solids", "Stripes", "Plaid", "Floral", "Checkers", "Polka-Dots"], // more?
  },
]

type Section = {
  title: string
  items: string[]
}

type Index = {
  sectionIndex: number
  itemIndex: number
}

const areIndicesEqual = (index1: Index, index2: Index) =>
  index1.sectionIndex === index2.sectionIndex && index1.itemIndex === index2.itemIndex

export const EditStylePreferences: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const stylePreferences = route?.params?.stylePreferences
  const initialStyles = stylePreferences?.styles || []
  const initialPatterns = stylePreferences?.patterns || []

  const initialSelectedItemIndices = [initialStyles, initialPatterns].flatMap((items: any[], index: number) =>
    items.map((item) => ({
      sectionIndex: index,
      itemIndex: sections[index].items.indexOf(item),
    }))
  )

  const [selectedItemIndices, setSelectedItemIndices] = useState(initialSelectedItemIndices)
  const insets = useSafeArea()

  const [isMutating, setIsMutating] = useState(false)
  const errorPopUpContext = usePopUpContext()
  const showErrorPopUp = errorPopUpContext.showPopUp
  const hideErrorPopUp = errorPopUpContext.hidePopUp
  const [updateStylePreferences] = useMutation(UPDATE_STYLE_PREFERENCES, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("****\n\n", err, "\n\n****")
      const popUpData = {
        title: "Oops! Try again!",
        note: "There seems to have been an issue saving your preferences. Please try again.",
        buttonText: "Close",
        onClose: () => hideErrorPopUp(),
      }
      showErrorPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const handleUpdateStylePreferences = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)

    const selectedItemsIn = (section: number) =>
      selectedItemIndices
        .filter(({ sectionIndex }) => sectionIndex === section)
        .map(({ sectionIndex, itemIndex }) => sections[sectionIndex].items[itemIndex])

    await updateStylePreferences({
      variables: {
        styles: selectedItemsIn(0),
        patterns: selectedItemsIn(1),
      },
    })
  }

  const renderSection = ({ title, items }: Section, sectionIndex: number) => {
    return (
      <Flex width="100%" key={sectionIndex.toString()}>
        <Spacer mb={4} />
        <Sans size="1">{title}</Sans>
        <Spacer mb={2} />
        <Spacer mb={0.5} />
        <Flex flexWrap="wrap" flexDirection="row" width="100%" justifyContent="space-between">
          {items.map((title, itemIndex) => renderItem(title, { sectionIndex, itemIndex }))}
        </Flex>
      </Flex>
    )
  }

  const renderItem = (title: string, index: Index) => {
    const isSelected = selectedItemIndices.some((i) => areIndicesEqual(i, index))
    const shadowStyle = isSelected
      ? {
          shadowColor: color("black100"),
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,

          elevation: 3,
        }
      : {}
    return (
      <TouchableOpacity
        key={index.itemIndex + " " + index.sectionIndex}
        onPress={() =>
          setSelectedItemIndices(
            isSelected ? selectedItemIndices.filter((i) => !areIndicesEqual(i, index)) : [...selectedItemIndices, index]
          )
        }
      >
        <Flex py={0.5} alignItems="center" justifyContent="center">
          <Flex
            alignItems="center"
            justifyContent="center"
            style={[
              {
                backgroundColor: color("white100"),
                borderColor: isSelected ? color("black100") : color("black10"),
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              },
              shadowStyle,
            ]}
            width={(Dimensions.get("window").width - 16 * 2 - 8) / 2}
            py={2}
          >
            <Sans size="1">{title}</Sans>
          </Flex>
        </Flex>
      </TouchableOpacity>
    )
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <FlatList
        data={sections}
        extraData={selectedItemIndices}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => item.title + index}
        ListHeaderComponent={() => (
          <Box mt={insets.top}>
            <Spacer mb={3} />
            <Sans size="3">Style preferences</Sans>
          </Box>
        )}
        ListFooterComponent={() => <Spacer height={100} />}
        renderItem={({ item, index }) => renderSection(item, index)}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16, flex: 1 }}
      />
      <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Spacer mb={2} />
        <Flex p={2} flexDirection="row">
          <Box flex={1}>
            <Button block variant="primaryWhite" size="large" onPress={navigation.goBack}>
              Cancel
            </Button>
          </Box>
          <Spacer mr={1} />
          <Box flex={1}>
            <Button
              block
              disabled={[0, 1].some(
                (section) => selectedItemIndices.filter((item) => item.sectionIndex === section).length === 0
              )}
              loading={isMutating}
              onPress={handleUpdateStylePreferences}
              size="large"
              variant="primaryBlack"
            >
              Save
            </Button>
          </Box>
        </Flex>
      </FadeBottom2>
    </Container>
  )
}
