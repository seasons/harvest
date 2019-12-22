import { get } from "lodash"
import React from "react"
import { ScrollView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"

import { Box, Container, FixedButton, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { ProductRequestGallery } from "./Components"

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
