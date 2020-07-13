import { Box, Button, CloseButton, Container, Flex, Sans, Spacer, TextInput } from "App/Components"
import { isWholeNumber } from "App/helpers/validation"
import { FakeTextInput } from "App/Components"
import React, { useState } from "react"
import { FlatList, Keyboard, KeyboardAvoidingView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { StatePickerPopUp } from "./StatePickerPopup"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"

const UPDATE_ADDRESS = gql`
  mutation updateShippingAddress(
    $name: String!
    $city: String!
    $zipCode: String!
    $state: String!
    $address1: String!
    $address2: String
  ) {
    addCustomerDetails(
      details: {
        shippingAddress: {
          create: {
            name: $name
            city: $city
            zipCode: $zipCode
            state: $state
            address1: $address1
            address2: $address2
          }
        }
      }
    ) {
      id
    }
  }
`

enum Row {
  Name,
  Address1,
  Address2_ZipCode,
  City_State,
}

export const EditShippingAddress: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const shippingAddress = route?.params?.shippingAddress
  const [name, setName] = useState((shippingAddress?.name as string) || "")
  const [address1, setAddress1] = useState((shippingAddress?.address1 as string) || "")
  const [address2, setAddress2] = useState((shippingAddress?.address2 as string) || "")
  const [zipCode, setZipCode] = useState((shippingAddress?.zipCode as string) || "")
  const [city, setCity] = useState((shippingAddress?.state as string) || "")
  const [state, setState] = useState((shippingAddress?.city as string) || "")

  const [isStatePickerVisible, setIsStatePickerVisible] = useState(false)
  const insets = useSafeArea()

  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [updateAddress] = useMutation(UPDATE_ADDRESS, {
    onCompleted: () => {
      setIsMutating(false)
      navigation.goBack()
    },
    onError: (err) => {
      console.log("Error EditShippingAddress.tsx", err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "Double check that your address is valid and try again.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const handleUpdateAddress = async () => {
    Keyboard.dismiss()

    if (isMutating) {
      return
    }

    setIsMutating(true)

    await updateAddress({
      variables: {
        name,
        city,
        zipCode,
        state,
        address1,
        address2,
      },
    })
  }

  const renderItem = (row: Row) => {
    switch (row) {
      case Row.Name:
        return (
          <TextInput
            autoCapitalize="words"
            currentValue={name}
            headerText="Name"
            onChangeText={(_, val) => setName(val)}
          />
        )
      case Row.Address1:
        return (
          <TextInput
            autoCapitalize="words"
            currentValue={address1}
            headerText="Address 1"
            onChangeText={(_, val) => setAddress1(val)}
          />
        )
      case Row.Address2_ZipCode:
        return (
          <Flex flexDirection="row">
            <TextInput
              autoCapitalize="words"
              currentValue={address2}
              headerText="Address 2"
              onChangeText={(_, val) => setAddress2(val)}
              style={{ flex: 1 }}
            />
            <Spacer width={9} />
            <TextInput
              currentValue={zipCode}
              headerText="ZIP"
              keyboardType="number-pad"
              onChangeText={(_, val) => setZipCode(val)}
              style={{ flex: 1 }}
            />
          </Flex>
        )
      case Row.City_State:
        return (
          <Flex flexDirection="row">
            <TextInput
              autoCapitalize="words"
              currentValue={city}
              headerText="City"
              onChangeText={(_, val) => setCity(val)}
              style={{ flex: 1 }}
            />
            <Spacer width={9} />
            <FakeTextInput
              currentValue={state}
              headerText="State"
              onPress={() => {
                Keyboard.dismiss()
                setIsStatePickerVisible(true)
              }}
              style={{ flex: 1 }}
            />
          </Flex>
        )
    }
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <CloseButton variant="light" />
      <FlatList
        data={[Row.Name, Row.Address1, Row.Address2_ZipCode, Row.City_State]}
        ItemSeparatorComponent={() => <Spacer mb={4} />}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => item + String(index)}
        ListHeaderComponent={() => (
          <Box mt={5}>
            <Spacer mb={5} />
            <Sans size="3">Shipping address</Sans>
            <Spacer mb={4} />
          </Box>
        )}
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16, overflow: "visible", flex: 1 }}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={insets.bottom - 16}>
        <FadeBottom2 width="100%">
          <Spacer mb={2} />
          <Flex p={2} flexDirection="row">
            <Box flex={1}>
              <Button block variant="primaryWhite" size="large" onPress={navigation.goBack}>
                Cancel
              </Button>
            </Box>
            <Spacer mr={1} />
            <Box flex={1}>
              <Button
                block
                disabled={
                  !name.trim() ||
                  !address1.trim() ||
                  !isWholeNumber(zipCode) ||
                  zipCode.length !== 5 ||
                  !city.trim() ||
                  !state
                }
                loading={isMutating}
                onPress={handleUpdateAddress}
                size="large"
                variant="primaryBlack"
              >
                Save
              </Button>
            </Box>
          </Flex>
          <Spacer height={insets.bottom + 8} />
        </FadeBottom2>
      </KeyboardAvoidingView>

      <StatePickerPopUp
        initialState={state}
        onRequestClose={(state) => {
          setState(state)
          setIsStatePickerVisible(false)
        }}
        visible={isStatePickerVisible}
      />
    </Container>
  )
}
