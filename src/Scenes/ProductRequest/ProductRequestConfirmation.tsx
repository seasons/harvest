import { get } from "lodash"
import React from "react"
import { ScrollView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Container, FixedButton, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { ProductRequestGallery } from "./Components"

export const ProductRequestConfirmation: React.FC<{
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}> = ({ navigation }) => {
  const productRequest = get(navigation, "state.params.productRequest")
  const { brand, description, images, name, price, sku } = productRequest
  const primarySections = [
    ["Name", name],
    ["Description", description],
  ]
  const miscellaneousSections = [
    ["Brand", brand],
    ["SKU", sku],
    ["Retail Price", `$${price}`],
  ]

  const handleSubmitBtnPressed = () => {
    navigation.navigate("FinishProductRequest")
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
            <Spacer mb={3} />
            <ProductRequestGallery images={images}></ProductRequestGallery>
            <Spacer mb={3} />
            {primarySections.map(section => (
              <>
                <Sans size="1" color="black">
                  {section[0]}
                </Sans>
                <Sans size="1" color="gray">
                  {section[1]}
                </Sans>
                <Spacer mb={16} />
              </>
            ))}
            <Spacer mb={8} />
            <Separator />
            {miscellaneousSections.map(section => (
              <>
                <Spacer mb={3} />
                <Box style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                  <Sans size="1" color="black">
                    {section[0]}
                  </Sans>
                  <Sans size="1" color="gray">
                    {section[1]}
                  </Sans>
                </Box>
                <Spacer mb={3} />
                <Separator />
              </>
            ))}
            <Spacer mb={112} />
          </Box>
        </ScrollView>
        <FixedButton
          block
          disabled={false}
          mb={insets.bottom}
          variant="secondaryBlack"
          onPress={handleSubmitBtnPressed}
        >
          Submit
        </FixedButton>
      </>
    </Container>
  )
}
