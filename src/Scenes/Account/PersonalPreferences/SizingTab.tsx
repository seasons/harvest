import React, { useState } from "react"
import { InitialMeasurements } from "../EditMeasurements"
import { Box, Container, Sans, Flex, Spacer, Button } from "App/Components"
import { FlatList } from "react-native"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { color } from "App/utils/color"
import { Measurements } from "App/Scenes/CreateAccount/Undetermined"
import { MultiSelectionTable } from "App/Components/MultiSelectionTable"
import { space } from "App/utils/space"

enum Section {
  Height_Weight,
  TopSizes,
  WaistSizes,
}

const parseMeasurements = (rawMeasurements: InitialMeasurements) => {
  const height = rawMeasurements?.height
  const weightRange = rawMeasurements?.weight
  const measurements = { height: null, weight: null, topSizeIndices: null, waistSizeIndices: null }

  if (height) {
    measurements.height = Measurements.heights.find((item) => item.value == height)
  }

  if (weightRange && weightRange?.length == 2) {
    measurements.weight = Measurements.weights.find(
      (item) => item.value[0] == weightRange[0] && item.value[1] == weightRange[1]
    )
  }

  return measurements
}

export const SizingTab: React.FC<{ navigation: any; rawMeasurements: InitialMeasurements }> = ({
  navigation,
  rawMeasurements,
}) => {
  const [footerBoxHeight, setFooterBoxHeight] = useState(0)
  const measurements = parseMeasurements(rawMeasurements)

  const renderSection = (section: Section) => {
    switch (section) {
      case Section.Height_Weight:
        return (
          <Flex flexDirection="row">
            <Box style={{ flex: 0.5, marginRight: 6 }}>
              <Sans color="black100" size="1">
                Height
              </Sans>
              <Spacer mb={1} />
              <UninteractableBoxPicker text={measurements.height?.label} />
            </Box>
            <Box style={{ flex: 0.5, marginLeft: 6 }}>
              <Sans color="black100" size="1">
                Weight
              </Sans>
              <Spacer mb={1} />
              <UninteractableBoxPicker text={measurements.weight?.label} />
            </Box>
          </Flex>
        )
      case Section.TopSizes:
        return (
          <>
            <Sans color="black100" size="1">
              What are your preferred top sizes?
            </Sans>
            <Spacer mb={1} />
            <MultiSelectionTable disabled items={Measurements.topSizes} selectedItems={rawMeasurements.topSizes} />
          </>
        )
      case Section.WaistSizes:
        return (
          <>
            <Sans color="black100" size="1">
              Your preferred waist size?
            </Sans>
            <Spacer mb={1} />
            <MultiSelectionTable disabled items={Measurements.waistSizes} selectedItems={rawMeasurements.waistSizes} />
          </>
        )
    }
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <FlatList
        data={[Section.Height_Weight, Section.TopSizes, Section.WaistSizes]}
        keyboardDismissMode="interactive"
        ItemSeparatorComponent={() => <Spacer mb={5} />}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={() => <Spacer mb={4} />}
        ListFooterComponent={() => <Spacer height={footerBoxHeight + space(4)} />}
        renderItem={({ item }) => renderSection(item)}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16, flex: 1 }}
      />
      <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Spacer mb={2} />
        <Flex p={2} flexDirection="row" onLayout={(e) => setFooterBoxHeight(e.nativeEvent.layout.height - 16)}>
          <Button
            block
            onPress={() =>
              navigation.navigate("Modal", {
                screen: "EditMeasurements",
                params: { measurements },
              })
            }
            variant="primaryWhite"
          >
            Edit
          </Button>
        </Flex>
      </FadeBottom2>
    </Container>
  )
}

const UninteractableBoxPicker: React.FC<{ text: string }> = ({ text }) => (
  <Flex
    height={48}
    style={{
      borderColor: color("black10"),
      borderWidth: 1,
      padding: 12,
      borderRadius: 4,
    }}
  >
    <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
      <Sans size="1">{text}</Sans>
    </Flex>
  </Flex>
)
