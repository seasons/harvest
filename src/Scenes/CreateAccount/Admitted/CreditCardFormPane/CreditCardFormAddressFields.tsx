import React from "react"
import { FakeTextInput, Flex, Sans, Spacer, TextInput } from "App/Components"

interface Props {
  name: string
  setName: (x: string) => void
  address1: string
  setAddress1: (x: string) => void
  address2: string
  setAddress2: (x: string) => void
  city: string
  setCity: (x: string) => void
  state: string
  setIsStatePickerVisible: (x: boolean) => void
  zipCode: string
  setZipCode: (x: string) => void
}

export const CreditCardFormAddressFields: React.FC<Props> = ({
  name,
  setName,
  address1,
  setAddress1,
  address2,
  setAddress2,
  city,
  setCity,
  state,
  setIsStatePickerVisible,
  zipCode,
  setZipCode,
}) => {
  return (
    <>
      <TextInput
        autoFocus={false}
        autoCapitalize="words"
        currentValue={name}
        headerText="Name"
        onChangeText={(_, val) => setName(val)}
      />
      <Spacer mb={3} />
      <TextInput
        autoFocus={false}
        autoCapitalize="words"
        currentValue={address1}
        headerText="Address 1"
        onChangeText={(_, val) => setAddress1(val)}
      />
      <Spacer mb={3} />
      <Flex flexDirection="row">
        <TextInput
          autoFocus={false}
          autoCapitalize="words"
          currentValue={address2}
          headerText="Address 2"
          onChangeText={(_, val) => setAddress2(val)}
          style={{ flex: 1 }}
        />
        <Spacer width={9} />
        <TextInput
          autoFocus={false}
          autoCapitalize="words"
          currentValue={city}
          headerText="City"
          onChangeText={(_, val) => setCity(val)}
          style={{ flex: 1 }}
        />
      </Flex>
      <Spacer mb={3} />
      <Flex flexDirection="row">
        <FakeTextInput
          currentValue={state}
          headerText="State"
          onPress={() => {
            setIsStatePickerVisible(true)
          }}
          style={{ flex: 1 }}
        />
        <Spacer width={9} />
        <TextInput
          autoFocus={false}
          currentValue={zipCode}
          headerText="ZIP"
          keyboardType="number-pad"
          onChangeText={(_, val) => setZipCode(val)}
          style={{ flex: 1 }}
        />
      </Flex>
    </>
  )
}
