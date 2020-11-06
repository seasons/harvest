import { Box, Container, FixedBackArrow, Flex, Radio, Sans, Separator, Spacer } from "App/Components"
import { defaultVariant, getColorsForVariant, TextInput } from "App/Components/TextInput"
import { themeProps } from "App/Components/Theme"
import { fontFamily } from "App/Components/Typography"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Check } from "Assets/svgs"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList, Text, TouchableWithoutFeedback } from "react-native"
import Contacts from "react-native-contacts"
import { animated, useSpring } from "react-spring"

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export interface Contact {
  name: string
  phoneNumbers: string[]
  emails: string[]
}

export const InviteFromContacts = screenTrack()(({ route, navigation }) => {
  const [contacts, setContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const referralLink = "Test"

  useEffect(() => {
    console.log("fetching")
    Contacts.getAll().then((contacts) => {
      setContacts(
        contacts.map((contact) => {
          return {
            name: contact.givenName,
            phoneNumbers: contact.phoneNumbers.map((phoneNumber) => formattedPhoneNumber(phoneNumber.number)),
            emails: contact.emailAddresses.map((email) => email.email),
          } as Contact
        })
      )
    })
  }, [])

  const formattedPhoneNumber = (phoneNumber: string) => {
    const onlyNums = phoneNumber.replace(/\D/g, "")
    return `(${onlyNums.substring(0, 3)}) ${onlyNums.substring(3, 6)}-${onlyNums.substring(6)}`
  }

  const renderItem = ({ item }) => {
    console.log("toggling")
    const isSelected = selectedContacts.includes(item)

    const handlePress = () => {
      if (isSelected) {
        setSelectedContacts(selectedContacts.filter((f) => f !== item))
      } else {
        setSelectedContacts([...selectedContacts, item])
      }
    }

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <Box px={2}>
          <Spacer mt={20} />
          <Flex flexDirection="row">
            <Radio borderRadius={4} selected={isSelected} onSelect={handlePress}>
              <Check color={color("black100")} />
            </Radio>
            <Flex flexDirection="column">
              <Sans color={color("black100")} ml={2} size="1" weight="medium">
                {item.name}
              </Sans>
              <Sans color={color("black50")} ml={2} size="1" weight="medium">
                {item.phoneNumbers[0]}
              </Sans>
            </Flex>
          </Flex>
          <Spacer mt={20} />
          <Separator color={color("black10")} />
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  const variant = defaultVariant
  const height = 40
  const variantColors = getColorsForVariant(variant)
  const animation = useSpring(variantColors.inactive)
  const placeholderColor = variant === "light" ? color("black50") : color("black25")

  return (
    <>
      <Container insetsBottom={false}>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Flex alignItems="center">
          <Spacer mb={1} />
          <Sans size="2">Invite Contacts</Sans>
          <Spacer mb={2} />
          <Separator />
          <Spacer mb={2} />
          <TouchableWithoutFeedback onPress={() => console.log("hi")}>
            <AnimatedBox
              alignSelf="stretch"
              mx={2}
              px={2}
              style={{
                height,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: animation.borderColor,
                backgroundColor: animation.backgroundColor,
              }}
            >
              <Spacer height={10} />
              <Flex flexDirection="row" alignItems="center">
                <Text
                  style={{
                    color: variantColors.active.color,
                    fontFamily: fontFamily.sans.medium.toString(),
                    fontSize: themeProps.typeSizes[1].fontSize,
                    textAlignVertical: "center",
                  }}
                >
                  {"Test"}
                </Text>
                <Text
                  style={{
                    color: variantColors.active.color,
                    fontFamily: fontFamily.sans.medium.toString(),
                    fontSize: themeProps.typeSizes[1].fontSize,
                    textAlignVertical: "center",
                  }}
                >
                  {"Test"}
                </Text>
                <TextInput
                  autoCompleteType="postal-code"
                  currentValue={"test"}
                  keyboardType="number-pad"
                  textContentType="postalCode"
                  hideBottomBar
                />
              </Flex>

              <Spacer height={12} />
            </AnimatedBox>
          </TouchableWithoutFeedback>
          <Spacer mb={2} />
          <TextInput
            autoCompleteType="postal-code"
            currentValue={"test"}
            keyboardType="number-pad"
            textContentType="postalCode"
          />
        </Flex>

        <FlatList
          data={contacts}
          keyExtractor={(_item, index) => String(index)}
          renderItem={(item) => {
            return renderItem(item)
          }}
          ListFooterComponent={() => <Spacer mb={60} />}
        />
      </Container>
    </>
  )
})

const AnimatedBox = animated(Box)
