import React, { useState } from "react"
import { Box, Container, Sans, Flex, Spacer, Button } from "App/Components"
import { FlatList, Dimensions } from "react-native"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { color } from "App/utils/color"
import { initialSelectedItemIndicesFrom } from "../EditStylePreferences/EditStylePreferences"
import { Section, Item, Index, areIndicesEqual, sections } from "../EditStylePreferences/Sections"

const windowWidth = Dimensions.get("window").width

export const StyleTab: React.FC<{ navigation: any; rawStylePreferences: any }> = ({
  navigation,
  rawStylePreferences,
}) => {
  const [footerBoxHeight, setFooterBoxHeight] = useState(0)
  const selectedItemIndices = initialSelectedItemIndicesFrom({ stylePreferences: rawStylePreferences })

  const renderSection = ({ title, items }: Section, sectionIndex: number) => {
    return (
      <Flex width="100%" key={sectionIndex.toString()}>
        <Spacer mb={4} />
        <Sans size="0.5">{title}</Sans>
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
      <Flex key={index.itemIndex + " " + index.sectionIndex} py={0.5} alignItems="center" justifyContent="center">
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
          <Sans size="0.5">{item.title}</Sans>
        </Flex>
      </Flex>
    )
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <FlatList
        data={sections}
        extraData={selectedItemIndices}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => item.title + index}
        ListFooterComponent={() => <Spacer height={footerBoxHeight} />}
        renderItem={({ item, index }) => renderSection(item, index)}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16, flex: 1 }}
      />
      <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Spacer mb={2} />
        <Flex p={2} flexDirection="row" onLayout={(e) => setFooterBoxHeight(e.nativeEvent.layout.height)}>
          <Button
            block
            onPress={() =>
              navigation.navigate("Modal", {
                screen: "EditStylePreferences",
                params: { initialSelectedItemIndices: selectedItemIndices },
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
