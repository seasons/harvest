import { Box, Container, Flex, FixedButton, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { CloseXIcon } from "Assets/icons"
import { color } from "App/Utils"
import { get } from "lodash"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useMutation } from "react-apollo"
import * as Animatable from "react-native-animatable"
import { Image, ScrollView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import styled from "styled-components/native"

export const ReviewProductRequestComponent: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const productRequest = get(navigation, "state.params.productRequest")
  const { brand, description, images, name, price, priceCurrency, productID, sku } = productRequest;
  const miscellaneousSections = [['Brand', brand], ['SKU', sku], ['Retail Price', `$${price}`]];
  const shouldDisplayImages = images.length >= 4;

  const handleSubmitBtnPressed = () => {
    navigation.navigate('FinishProductRequest');
  }

  const insets = useSafeArea()

  return (
    <Container>
      <>
        <FixedBackArrow navigation={navigation} />
        <ScrollView>
          <Box p={2} mt={insets.top}>
            <Spacer mb={60} />
            <Sans size="3" color="black">
              Review Your Link
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={24} />
            <Box style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 256 }}>
              {shouldDisplayImages ?
                <>
                  <ImageContainer
                    resizeMode="contain"
                    style={{ flex: 3, marginRight: 8 }}
                    source={{ uri: images[0] }}
                  />
                  <Box style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                    {images.slice(1, 4).map((image: String, index: number) =>
                      <ImageContainer
                        resizeMode="contain"
                        style={{ flex: 1, marginBottom: index !== 2 ? 8 : 0 }}
                        source={{ uri: image }}
                      />
                    )}
                  </Box>
                </>
                : null
              }
            </Box>
            <Spacer mb={24} />
            <Sans size="1" color="black">
              Name
            </Sans>
            <Sans size="1" color="gray">
              {name}
            </Sans>
            <Spacer mb={16} />
            <Sans size="1" color="black">
              Description
            </Sans>
            <Sans size="1" color="gray">
              {description}
            </Sans>
            <Spacer mb={24} />
            <Separator />
            {miscellaneousSections.map(section =>
              <>
                <Spacer mb={24} />
                <Box style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Sans size="1" color="black">
                    {section[0]}
                  </Sans>
                  <Sans size="1" color="gray">
                    {section[1]}
                  </Sans>
                </Box>
                <Spacer mb={24} />
                <Separator />
              </>
            )}
            <Spacer mb={112} />
          </Box>
        </ScrollView>
        <FixedButton
          disabled={false}
          variant={"primaryDark"}
          onPress={handleSubmitBtnPressed} >
          Submit
        </FixedButton>
      </>
    </Container >
  )
}

const ImageContainer = styled(Image)`
  border-width: 1px;
  border-color: rgba(240, 240, 240, 1);
`

const mapStateToProps = state => {
  return {}
}

export const ReviewProductRequest = connect(mapStateToProps)(ReviewProductRequestComponent)
