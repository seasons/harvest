import React from "react"
import { Box, Container, Flex, Spacer, FadeInImage, Sans } from "App/Components"
import { TouchableOpacity } from "react-native"
import { color } from "App/utils"
import { CloseXSVG, More } from "Assets/svgs"
import { useActionSheet } from "@expo/react-native-action-sheet"

export interface CommunityStyle {
  author: string
  location: string
  id: string
  url: string
}

interface CommunityStyleDetailProps {
  navigation: any
  route: any
}

export const CommunityStyleDetail: React.FC<CommunityStyleDetailProps> = ({ navigation, route }) => {
  const actionSheet = useActionSheet()
  const showActionSheet = () => {
    actionSheet.showActionSheetWithOptions(
      {
        options: ["Report Post", "Cancel"],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (index) => {}
    )
  }
  return (
    <Container insetsTop={false}>
      <Flex flexGrow={1} justifyContent="center">
        <Flex flexDirection="row" justifyContent="flex-end">
          <CloseButton onRequestClose={navigation?.goBack} />
          <Spacer mr={2} />
        </Flex>

        <Spacer mb={36} />

        <FadeInImage
          source={{
            uri: route?.params?.item?.url,
          }}
          style={{ height: 484 }}
        />

        <Spacer mb={5} />

        <Box pl={2} pr={2}>
          <Sans size="0.5">{route?.params?.item?.author}</Sans>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Sans size="0.5" color="black50">
              {route?.params?.item?.location}
            </Sans>
            <TouchableOpacity onPress={showActionSheet} hitSlop={{ top: 30, bottom: 30, left: 10, right: 10 }}>
              <More />
            </TouchableOpacity>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}

const CloseButton: React.FC<{
  onRequestClose: () => void
}> = ({ onRequestClose }) => (
  <TouchableOpacity onPress={onRequestClose}>
    <Box
      backgroundColor={color("white100")}
      borderWidth={1}
      borderColor={color("black10")}
      borderRadius={20}
      height="40"
      width="40"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CloseXSVG variant={"light"} />
    </Box>
  </TouchableOpacity>
)
