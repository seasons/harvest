import { Box, Button, Container, Sans, Spacer, Flex, CloseButton } from "App/Components"
import { color } from "App/utils"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useState } from "react"
import { Dimensions, FlatList, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { areIndicesEqual, Index, Item, Section, sections } from "./Sections"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"

const UPDATE_STYLE_PREFERENCES = gql`
  mutation setStylePreferences($styles: [String!], $patterns: [String!], $colors: [String!], $brands: [String!]) {
    addCustomerDetails(
      details: {
        stylePreferences: {
          create: {
            styles: { set: $styles }
            patterns: { set: $patterns }
            colors: { set: $colors }
            brands: { set: $brands }
          }
        }
      }
    ) {
      id
    }
  }
`

const windowWidth = Dimensions.get("window").width

export const initialSelectedItemIndicesFrom = (params: any) => {
  if (params?.initialSelectedItemIndices) {
    return params?.initialSelectedItemIndices
  } else {
    const stylePreferences = params?.stylePreferences
    const initialStyles = stylePreferences?.styles || []
    const initialPatterns = stylePreferences?.patterns || []
    const initialColors = stylePreferences?.colors || []
    const initialBrands = stylePreferences?.brands || []

    // The values selected by the user are stored in the server. In this block, get the index of each `value` in
    // the `sections` array. Assumes that the order of the `sections` is: styles, patterns, colors, brands.
    return [initialStyles, initialPatterns, initialColors, initialBrands].flatMap((items: any[], index: number) => {
      const titles = sections[index].items.map((item) => item.title)
      return items
        .map((item) => ({
          sectionIndex: index,
          itemIndex: titles.indexOf(item),
        }))
        .filter((item) => item.itemIndex != -1)
    })
  }
}

export const EditStylePreferences: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const [selectedItemIndices, setSelectedItemIndices] = useState(initialSelectedItemIndicesFrom(route?.params))
  const insets = useSafeAreaInsets()

  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [updateStylePreferences] = useMutation(UPDATE_STYLE_PREFERENCES, {
    onCompleted: () => {
      setIsMutating(false)
      navigation.goBack()
    },
    onError: (err) => {
      console.log("Error EditStylePreferences.tsx", err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "There seems to have been an issue saving your preferences. Please try again.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const selectedItemsIn = (section: number): string[] =>
    selectedItemIndices
      .filter(({ sectionIndex }) => sectionIndex === section)
      .map(({ sectionIndex, itemIndex }) => sections[sectionIndex].items[itemIndex].title)

  const handleUpdateStylePreferences = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)

    await updateStylePreferences({
      variables: {
        styles: selectedItemsIn(0),
        patterns: selectedItemsIn(1),
        colors: selectedItemsIn(2),
        brands: selectedItemsIn(3),
      },
    })
  }

  const renderSection = ({ title, items }: Section, sectionIndex: number) => {
    return (
      <Flex width="100%" key={sectionIndex.toString()}>
        <Spacer mb={4} />
        <Sans size="3">{title}</Sans>
        <Spacer mb={2} />
        <Spacer mb={0.5} />
        <Flex flexWrap="wrap" flexDirection="row" width="100%" justifyContent="space-between">
          {items?.map((item, itemIndex) => renderItem(item, { sectionIndex, itemIndex }))}
        </Flex>
      </Flex>
    )
  }

  const renderItem = (item: Item, index: Index) => {
    const isSelected = selectedItemIndices?.some((i) => areIndicesEqual(i, index))
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
            flexDirection="row"
            justifyContent="center"
            py={2}
            style={[
              {
                backgroundColor: color(isSelected ? "black04" : "white100"),
                borderColor: color(isSelected ? "black100" : "black10"),
                borderWidth: 1,
                borderRadius: 4,
                flex: 1,
              },
              shadowStyle,
            ]}
            width={(windowWidth - 16 * 2 - 8) / 2}
          >
            {!!item.decoration?.color && (
              <>
                <Box backgroundColor={item.decoration?.color} width={10} height={10} borderRadius={2} />
                <Spacer mr={1} />
              </>
            )}
            <Sans size="3">{item.title}</Sans>
          </Flex>
        </Flex>
      </TouchableOpacity>
    )
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <CloseButton variant="light" />
      <FlatList
        data={sections}
        extraData={selectedItemIndices}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => item.title + index}
        ListHeaderComponent={() => (
          <Box mt={5}>
            <Spacer mb={5} />
            <Sans size="7">Style preferences</Sans>
          </Box>
        )}
        ListFooterComponent={() => <Spacer height={100 + insets.bottom - 8} />}
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
              disabled={[0, 1, 2, 3].some((section) => selectedItemsIn(section).length === 0)}
              loading={isMutating}
              onPress={handleUpdateStylePreferences}
              size="large"
              variant="primaryBlack"
            >
              Save
            </Button>
          </Box>
        </Flex>
        <Spacer height={insets.bottom} />
      </FadeBottom2>
    </Container>
  )
}
