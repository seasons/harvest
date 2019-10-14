import React from "react"
import { Box, Sans, Button } from "App/Components"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import { styled } from "Components/platform/primitives"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"

interface JustAddedRailProps {
  items: any
  componentId: string
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export const JustAddedRail: React.FC<JustAddedRailProps> = ({ items, componentId, navigation }) => {
  return (
    <Box my={2} style={{ position: "relative" }}>
      <Sans size="2">Just Added</Sans>
      <Box mt={2}>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: item.id })}>
                <Box mr={2}>
                  <ImageContainer source={{ uri: item.imageUrl }}></ImageContainer>
                  <Box m={1}>
                    <Sans size="1" mt={0.3}>
                      {item.brandName}
                    </Sans>
                    <Sans size="1" color="gray" mt={0.3} numberOfLines={1} clipMode={"tail"}>
                      {item.productName}
                    </Sans>
                    <Sans size="1" color="gray" mt={0.3}>
                      {item.price}
                    </Sans>
                  </Box>
                </Box>
              </TouchableWithoutFeedback>
            )
          }}
          keyExtractor={({ colorway }) => colorway.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        <ReserveButtonContainer>
          <Box m={1} my={2}>
            <Button size="small">Reserve</Button>
          </Box>
        </ReserveButtonContainer>
      </Box>
    </Box>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`

const ReserveButtonContainer = styled.View`
  display: flex;
  align-items: flex-end;
  align-content: flex-end;
  background-color: white;
  position: absolute;
  width: 150;
  height: 100;
  bottom: 0;
  right: 0;
  padding-right: 5;
`
