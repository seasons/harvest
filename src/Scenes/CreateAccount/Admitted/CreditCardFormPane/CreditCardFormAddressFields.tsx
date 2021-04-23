import React from "react"
import { FakeTextInput, Flex, Spacer, TextInput } from "App/Components"

interface Address {
  name: string
  address1: string
  address2: string
  city: string
  state: string
  zipCode: string
}

interface Props {
  address: Address
  setAddress: (x: Address) => void
  setIsStatePickerVisible: (x: boolean) => void
}

export const CreditCardFormAddressFields: React.FC<Props> = ({ setIsStatePickerVisible, address, setAddress }) => {
  return (
    <>
      <TextInput
        autoFocus={false}
        autoCapitalize="words"
        currentValue={address.name}
        headerText="Name"
        onChangeText={(_, val) => setAddress({ ...address, name: val })}
      />
      <Spacer mb={3} />
      <TextInput
        autoFocus={false}
        autoCapitalize="words"
        currentValue={address.address1}
        headerText="Address 1"
        onChangeText={(_, val) => setAddress({ ...address, address1: val })}
      />
      <Spacer mb={3} />
      <Flex flexDirection="row">
        <TextInput
          autoFocus={false}
          autoCapitalize="words"
          currentValue={address.address2}
          headerText="Address 2"
          onChangeText={(_, val) => setAddress({ ...address, address2: val })}
          style={{ flex: 1 }}
        />
        <Spacer width={9} />
        <TextInput
          autoFocus={false}
          autoCapitalize="words"
          currentValue={address.city}
          headerText="City"
          onChangeText={(_, val) => setAddress({ ...address, city: val })}
          style={{ flex: 1 }}
        />
      </Flex>
      <Spacer mb={3} />
      <Flex flexDirection="row">
        <FakeTextInput
          currentValue={address.state}
          headerText="State"
          onPress={() => {
            setIsStatePickerVisible(true)
          }}
          style={{ flex: 1 }}
        />
        <Spacer width={9} />
        <TextInput
          autoFocus={false}
          currentValue={address.zipCode}
          headerText="ZIP"
          keyboardType="number-pad"
          onChangeText={(_, val) => setAddress({ ...address, zipCode: val })}
          style={{ flex: 1 }}
        />
      </Flex>
    </>
  )
}
