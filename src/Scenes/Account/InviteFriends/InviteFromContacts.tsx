import { Box, Button, Container, FixedBackArrow, Flex, Radio, Sans, Separator, Spacer } from "App/Components"
import { defaultVariant, getColorsForVariant, TextInput } from "App/Components/TextInput"
import { themeProps } from "App/Components/Theme"
import { fontFamily } from "App/Components/Typography"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Check } from "Assets/svgs"
import React, { useEffect, useRef, useState } from "react"
import { FlatList, KeyboardAvoidingView, Linking, Text, TouchableWithoutFeedback } from "react-native"
import Contacts from "react-native-contacts"
import { ScrollView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"

export interface Contact {
  name: string
  phoneNumbers: string[]
  emails: string[]
}

export const InviteFromContacts = screenTrack()(({ route, navigation }) => {
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [searchText, setSearchText] = useState("")
  const textInputRef = useRef(null)
  const insets = useSafeAreaInsets()
  const referralLink = route.params.referralLink

  useEffect(() => {
    textInputRef.current?.focus?.()
    Contacts.getAll().then((contacts) => {
      const mappedContacts = contacts.map((contact) => {
        return {
          name: contact.givenName,
          phoneNumbers: contact.phoneNumbers.map((phoneNumber) => formattedPhoneNumber(phoneNumber.number)),
          emails: contact.emailAddresses.map((email) => email.email),
        } as Contact
      })
      setContacts(mappedContacts)
      setFilteredContacts(mappedContacts)
    })
  }, [])

  const formattedPhoneNumber = (phoneNumber: string) => {
    const onlyNums = phoneNumber.replace(/\D/g, "")
    return `(${onlyNums.substring(0, 3)}) ${onlyNums.substring(3, 6)}-${onlyNums.substring(6)}`
  }

  const searchContacts = (searchText: string) => {
    if (searchText == "") {
      setFilteredContacts(contacts)
    } else {
      const lowerCasedSearchText = searchText.toLowerCase()
      setFilteredContacts(contacts.filter((contact) => contact.name.toLowerCase().includes(lowerCasedSearchText)))
    }
  }

  const renderItem = ({ item }) => {
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
          <TouchableWithoutFeedback onPress={() => textInputRef?.current?.focus?.()}>
            <AnimatedBox
              alignSelf="stretch"
              mx={2}
              px={1}
              style={{
                height,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: animation.borderColor,
                backgroundColor: animation.backgroundColor,
                justifyContent: "center",
              }}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {selectedContacts.map((contact) => {
                  return (
                    <>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: fontFamily.sans.medium.toString(),
                          fontSize: themeProps.typeSizes[1].fontSize,
                          textAlignVertical: "center",
                          backgroundColor: "black",
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 4,
                          marginVertical: 8,
                        }}
                      >
                        {contact.name}
                      </Text>
                      <Spacer mx={0.5} />
                    </>
                  )
                })}
                <TextInput
                  autoCompleteType="postal-code"
                  currentValue={searchText}
                  textContentType="name"
                  hideBottomBar
                  ref={textInputRef}
                  onChangeText={(input, text) => {
                    searchContacts(text)
                    setSearchText(text)
                  }}
                  style={{ flexGrow: 1 }}
                />
              </ScrollView>
            </AnimatedBox>
          </TouchableWithoutFeedback>
          <Spacer mb={2} />
        </Flex>

        <FlatList
          data={filteredContacts}
          keyExtractor={(_item, index) => String(index)}
          renderItem={(item) => {
            return renderItem(item)
          }}
          ListFooterComponent={() => <Spacer mb={60} />}
        />
        {selectedContacts.length > 0 && (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Math.max(insets.bottom - 8, 8)}>
            <Box style={{ margin: 16, marginBottom: insets.bottom + 16 }}>
              <Button
                variant="primaryBlack"
                onPress={() => {
                  const body = `Here’s my referral link for Seasons. Get $50 off your first month when you sign-up: ${referralLink}`
                  Linking.openURL(`sms://${selectedContacts[0].phoneNumbers[0]}&body=${body}`)
                }}
                block
              >
                Send Invite
              </Button>
            </Box>
          </KeyboardAvoidingView>
        )}
      </Container>
    </>
  )
})

const AnimatedBox = animated(Box)
