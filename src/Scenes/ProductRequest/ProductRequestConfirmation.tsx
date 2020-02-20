import { get } from "lodash"
import React from "react"
import { ScrollView } from "react-native"
import { Box, Container, FixedButton, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { ProductRequestGallery } from "./Components"

export const ProductRequestConfirmation = ({ navigation, route }) => {
  const productRequest = get(route, "params.productRequest")
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

  return (
    <Container insetsTop>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <ScrollView>
        <Box px={2}>
          <Spacer mb={60} />
          <Sans size="3" color="black">
            Review Your Link
          </Sans>
          <Spacer mb={2} />
          <Separator />
          <Spacer mb={3} />
          <ProductRequestGallery images={images}></ProductRequestGallery>
          <Spacer mb={3} />
          {primarySections.map((section, index) => (
            <Box key={index}>
              <Sans size="1" color="black">
                {section[0]}
              </Sans>
              <Sans size="1" color="gray">
                {section[1]}
              </Sans>
              <Spacer mb={2} />
            </Box>
          ))}
          <Spacer mb={8} />
          <Separator />
          {miscellaneousSections.map((section, index) => (
            <Box key={index}>
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
            </Box>
          ))}
          <Spacer mb={112} />
        </Box>
      </ScrollView>
      <FixedButton block disabled={false} variant="secondaryBlack" onPress={handleSubmitBtnPressed}>
        Submit
      </FixedButton>
    </Container>
  )
}
