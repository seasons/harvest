import { Box, Button, Container, Flex, Sans, Spacer, TextInput } from "App/Components"
import { isValidEmail } from "App/helpers/regex"
import { DatePickerPopUp } from "./DatePickerPopUp"
import { FakeTextInput } from "./FakeTextInput"
import React, { useEffect, useRef, useState, MutableRefObject } from "react"
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Text } from "Components/Typography"

interface CreateAccountPaneProps {
    navigation: any
    onAuth: (credentials, profile) => void
}

export const CreateAccountPane: React.FC<CreateAccountPaneProps> = ({
    navigation,
    onAuth,
}) => {
    // Fields

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [zipCode, setZipCode] = useState("")

    const [formValid, setFormValid] = useState(false)

    // Keyboard handling

    const scrollViewRef: MutableRefObject<ScrollView> = useRef()

    const onFocusTextInput = (index: number) => {
        if (!scrollViewRef.current) { return }
        scrollViewRef.current.scrollTo({ y: index * 50, animated: true })
    }

    // Date picker popup

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

    const showDatePicker = () => {
        setIsDatePickerVisible(true)
    }

    const closeDatePicker = (date: Date) => {
        const dateOfBirth = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
            .map(i => String(i).padStart(2, "0"))
            .join("-")
        setIsDatePickerVisible(false)
        setDateOfBirth(dateOfBirth)
    }

    // Form/field validation

    // Returns whether every character in the string is a digit (i.e. empty string returns true, but any spaces returns false)
    const isWholeNumber = (s: string) => {
        if (s.length == 0) {
            return true
        }

        const isDigit = (c: String) => c >= '0' && c <= '9'
        const reducer = (accumulator: boolean, currentValue: string) => accumulator && isDigit(currentValue)
        return Array.from(s).reduce(reducer, true)
    }

    const onZipCodeChange = (val) => {
        if (val.length > 5 || !isWholeNumber(val)) {
            // revert to previous valid value
            setZipCode(zipCode)
        } else {
            setZipCode(val)
        }
    }

    const validateForm = () => {
        // TODO: More stringent name, password, dob, & zipcode checking
        setFormValid(
            name.length && name.trim().split(' ').length >= 2
            && isValidEmail(email)
            && password.trim().length
            && dateOfBirth.length
            && zipCode.length == 5
        )
    }

    useEffect(validateForm, [name, email, password, dateOfBirth, zipCode])

    const onPressSignUpButton = () => {
        // TODO: authorize
        Keyboard.dismiss()
        onAuth(null, null)
    }

    // Layout

    return (
        <Container insetsBottom={false} insetsTop={false}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={52}>
                <ScrollView style={{ paddingTop: 85, paddingHorizontal: 16, overflow: "visible" }} showsVerticalScrollIndicator={false} keyboardDismissMode="interactive" ref={scrollViewRef}>
                    <Sans color="black100" size="3">
                        Let's create your account
                    </Sans>
                    <Spacer mb={1} />
                    <Sans color="black50" size="2">
                        You'll use this to sign into the app, choose your plan, and manage your membership.
                    </Sans>
                    <Spacer mb={5} />
                    <TextInput
                        placeholder="Full Name"
                        variant="light"
                        inputKey="full-name"
                        autoCapitalize="words"
                        onChangeText={(_, val) => setName(val)}
                        onFocus={() => onFocusTextInput(0)}
                    />
                    <Spacer mb={2} />
                    <TextInput
                        placeholder="Email"
                        variant="light"
                        inputKey="email"
                        keyboardType="email-address"
                        onChangeText={(_, val) => setEmail(val)}
                        onFocus={() => onFocusTextInput(1)}
                    />
                    <Spacer mb={2} />
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        variant="light"
                        inputKey="password"
                        onChangeText={(_, val) => setPassword(val)}
                        onFocus={() => onFocusTextInput(2)}
                    />
                    <Spacer mb={2} />
                    <FakeTextInput
                        placeholder="Date of Birth"
                        currentValue={dateOfBirth}
                        variant="light"
                        onPress={() => {
                            Keyboard.dismiss()
                            showDatePicker()
                        }}
                    />
                    <Spacer mb={2} />
                    <TextInput
                        placeholder="ZIP Code"
                        currentValue={zipCode}
                        variant="light"
                        inputKey="zip-code"
                        keyboardType="number-pad"
                        onChangeText={(_, val) => onZipCodeChange(val)}
                        onFocus={() => onFocusTextInput(4)}
                    />
                    <Spacer height={100} />
                </ScrollView>
                <Box p={2} style={{ backgroundColor: "transparent" }}>
                    <Button
                        block
                        disabled={!formValid}
                        onPress={() => onPressSignUpButton()}
                        variant="primaryBlack"
                    >
                        Create my account
                    </Button>
                </Box>
            </KeyboardAvoidingView>
            <Box p={2} style={{ paddingBottom: useSafeArea().bottom + 16, backgroundColor: "white" }}>
                <Flex flexDirection="row" justifyContent="center">
                    <Text>
                        <Sans size="2" color="black50">
                            Already have an account?
                        </Sans>{" "}
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("Modal", { screen: "SignInModal" })}>
                            <Sans style={{ textDecorationLine: "underline" }} size="2" color="black100">
                                Login
                            </Sans>
                        </TouchableWithoutFeedback>
                    </Text>
                </Flex>
            </Box>

            <DatePickerPopUp
                onRequestClose={closeDatePicker}
                visible={isDatePickerVisible}
            />
        </Container>
    )
}


/**
<Text style={{ textAlign: "center" }}>
                            <Sans size="1" color="gray">
                                By creating an account, you agree to our
                            </Sans>{" "}
                        </Text>
                        <Text style={{ textAlign: "center" }}>
                            <TouchableWithoutFeedback>
                                <Sans style={{ textDecorationLine: "underline" }} size="1" color="black50">
                                    Privacy Policy
                                </Sans>
                            </TouchableWithoutFeedback>
                            <Sans size="1" color="gray">
                                {" & "}
                            </Sans>
                            <TouchableWithoutFeedback>
                                <Sans style={{ textDecorationLine: "underline" }} size="1" color="black50">
                                    Terms of Service
                                </Sans>
                            </TouchableWithoutFeedback>
                        </Text>
                        /* <Spacer mb={2} />
 */