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
import { ProductRequestGallery } from "./Components"
import { Image, ScrollView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import styled from "styled-components/native"

export const ProductRequestConfirmationComponent: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const productRequest = get(navigation, "state.params.productRequest")
  const { brand, description, images, name, price, priceCurrency, productID, sku } = productRequest;
  const primarySections = [['Name', name], ['Description', description]];
  const miscellaneousSections = [['Brand', brand], ['SKU', sku], ['Retail Price', `$${price}`]];

  const handleSubmitBtnPressed = () => {
    navigation.navigate('FinishProductRequest');
  }

  const insets = useSafeArea()

  return (
    <Container>
      <>
        <FixedBackArrow navigation={navigation} />
        <ScrollView>
          <Box p={2} mt={insets.top} mb={insets.bottom}>
            <Spacer mb={60} />
            <Sans size="3" color="black">
              Review Your Link
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={24} />
            <ProductRequestGallery images={images}>
            </ProductRequestGallery>
            <Spacer mb={24} />
            {primarySections.map(section =>
              <>
                <Sans size="1" color="black">
                  {section[0]}
                </Sans>
                <Sans size="1" color="gray">
                  {section[1]}
                </Sans>
                <Spacer mb={16} />
              </>
            )}
            <Spacer mb={8} />
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
          mb={insets.bottom}
          variant={"primaryDark"}
          onPress={handleSubmitBtnPressed} >
          Submit
        </FixedButton>
      </>
    </Container >
  )
}

const mapStateToProps = state => {
  return {}
}

export const ProductRequestConfirmation = connect(mapStateToProps)(ProductRequestConfirmationComponent)
