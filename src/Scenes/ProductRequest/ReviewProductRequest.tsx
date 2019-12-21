import { Box, Container, Flex, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
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

const ADD_PRODUCT_REQUEST = gql`
  mutation AddProductRequest($url: String!) {
    addProductRequest(url: $url) {
      id
      sku
      brand
      description
      images
      name
      price
      priceCurrency
      productID
      url
    }
  }
`

export const ReviewProductRequestComponent: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const productRequest = get(navigation, "state.params.productRequest")
  console.log("GOT IT");
  console.log(productRequest);
  const insets = useSafeArea()
  const { images } = productRequest;
  const shouldDisplayImages = images.length >= 4;
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
                    style={{ flex: 3 }}
                    source={{ uri: images[0] }}
                  />
                  <Box style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                    {images.slice(1, 4).map((image: String) =>
                      <ImageContainer
                        resizeMode="contain"
                        style={{ flex: 1 }}
                        source={{ uri: image }}
                      />
                    )}
                  </Box>
                </>
                : null
              }
            </Box>
          </Box>
        </ScrollView>
      </>
    </Container >
  )
}

const ImageContainer = styled(Image)`
  border-width: 1px;
  border-color: rgba(240, 240, 240, 1);
  margin: 4px;
`

const mapStateToProps = state => {
  return {}
}

export const ReviewProductRequest = connect(mapStateToProps)(ReviewProductRequestComponent)
