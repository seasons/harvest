import { useNavigation } from "@react-navigation/native"
import { Container, Box, Spacer, Sans, FixedBackArrow, FadeInImage, Flex, Button } from "App/Components"
import { Dimensions, ScrollView } from "react-native"
import React from "react"
import { ListCheck } from "Assets/svgs/ListCheck"
import { space } from "App/utils"

const windowWidth = Dimensions.get("window").width
const slideHeight = windowWidth * 0.84

interface Props {
  listText?: string[]
  caption: string
  title: string
  imageURL: string
  topButtonOnPress: () => void
  bottomButtonOnPress: () => void
  topButtonText: string
  bottomButtonText: string
}

export const ImageWithInfoView: React.FC<Props> = ({
  listText,
  caption,
  title,
  imageURL,
  topButtonOnPress,
  bottomButtonOnPress,
  topButtonText,
  bottomButtonText,
}) => {
  const navigation = useNavigation()
  const uri = imageURL + "?w=850&fit=clip&fm=jpg"

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteTransparent" />
      <ScrollView>
        <FadeInImage source={{ uri }} style={{ width: windowWidth, height: slideHeight }} />
        <Box px={2} pt={4} pb={140}>
          <Sans size="7">{title}</Sans>
          <Spacer mb={1} />
          <Sans size="4" color="black50">
            {caption}
          </Sans>
          <Spacer mb={4} />
          {listText?.map((text, index) => {
            return (
              <Flex key={index} flexDirection="row" pb={2} alignItems="center">
                <ListCheck />
                <Spacer mr={2} />
                <Sans size="4" color="black50" style={{ textDecorationLine: "underline" }}>
                  {text}
                </Sans>
              </Flex>
            )
          })}
        </Box>
      </ScrollView>
      <Flex flexDirection="column" px={2} style={{ position: "absolute", bottom: space(3), left: 0 }}>
        <Button block variant="primaryBlack" onPress={topButtonOnPress}>
          {topButtonText}
        </Button>
        <Spacer mb={1} />
        <Button block variant="secondaryWhite" onPress={bottomButtonOnPress}>
          {bottomButtonText}
        </Button>
        <Spacer mb={2} />
      </Flex>
    </Container>
  )
}
