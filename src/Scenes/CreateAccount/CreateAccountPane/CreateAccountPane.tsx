import { Box, Button, CloseButton, Container, Flex, Sans, Spacer, TextInput } from "App/Components"
import { color } from "App/utils"
import { DatePickerPopUp } from "./DatePickerPopUp"
import React, { useEffect, useRef, useState, MutableRefObject } from "react"
import { Text } from "Components/Typography"
import { FakeTextInput } from "./FakeTextInput"
import { Keyboard, KeyboardEvent, ScrollView, TouchableWithoutFeedback } from "react-native"
import { isValidEmail } from "App/helpers/regex"

interface CreateAccountPaneProps {
    onAuth: (credentials, profile) => void
}

export const CreateAccountPane: React.FC<CreateAccountPaneProps> = (props) => {
    // Fields

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [zipCode, setZipCode] = useState("")

    const [formValid, setFormValid] = useState(false)

    // Keyboard handling

    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const [scrollViewHeight, setScrollViewHeight] = useState(0)
    const [keyboardBoxMinY, setKeyboardBoxMinY] = useState(0)
    const [footerBoxHeight, setFooterBoxHeight] = useState(0)
    const scrollViewRef: MutableRefObject<ScrollView> = useRef();

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", onKeyboardDidShow)
        Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

        return () => {
            Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow)
            Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide)
        }
    }, [])

    const onKeyboardDidShow = (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height)
    }

    const onKeyboardDidHide = () => {
        if (scrollViewRef) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
            setTimeout(() => {
                setKeyboardHeight(0)
            }, 200);
        } else {
            setKeyboardHeight(0)
        }
    }

    const onFocusTextInput = (index: number) => {
        if (!scrollViewRef.current) { return }
        scrollViewRef.current.scrollTo({ x: 0, y: index * 56, animated: true })
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
        setDateOfBirth(dateOfBirth)
        setIsDatePickerVisible(false)
        validateForm()
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
            && password.length
            && dateOfBirth.length
            && zipCode.length == 5
        )
    }

    const onPressSignUpButton = () => {

    }

    // Layout

    return (
        <Container insetsBottom={false} insetsTop={false}>
            <CloseButton />
            <Flex style={{ flex: 1 }}>
                <Flex flexDirection="column" style={{ flex: 1, justifyContent: "space-between" }}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode="interactive" onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)} ref={scrollViewRef}>
                        <Spacer mb={5} />
                        <Box p={4} pb={5}>
                            <Sans color={color("black100")} size="3">
                                Create an account
                            </Sans>
                            <Spacer mb={1} />
                            <Sans color={color("black50")} size="2">
                                You'll use this to sign into the app, choose your plan, and manage your membership.
                            </Sans>
                            <Spacer mb={5} />
                            <TextInput
                                placeholder="Full Name"
                                variant="light"
                                inputKey="full-name"
                                autoCapitalize="words"
                                onChangeText={(_, val) => {
                                    setName(val)
                                    validateForm()
                                }}
                                onFocus={() => onFocusTextInput(0)}
                            />
                            <Spacer mb={2} />
                            <TextInput
                                placeholder="Email"
                                variant="light"
                                inputKey="email"
                                keyboardType="email-address"
                                onChangeText={(_, val) => {
                                    setEmail(val)
                                    validateForm()
                                }}
                                onFocus={() => onFocusTextInput(1)}
                            />
                            <Spacer mb={2} />
                            <TextInput
                                secureTextEntry
                                placeholder="Password"
                                variant="light"
                                inputKey="password"
                                onChangeText={(_, val) => {
                                    setPassword(val)
                                    validateForm()
                                }}
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
                                onChangeText={(_, val) => {
                                    onZipCodeChange(val)
                                    validateForm()
                                }}
                                onFocus={() => onFocusTextInput(4)}
                            />
                            <Spacer mb={4} />
                            <Button block variant="primaryBlack" disabled={!formValid} onPress={() => onPressSignUpButton()}>
                                Sign up
                            </Button>
                            <Spacer mb={3} />
                            <Flex flexDirection="row" justifyContent="center">
                                <Text>
                                    <Sans size="2" color={color("black50")}>
                                        Already have an account?
                                        </Sans>{" "}
                                    <TouchableWithoutFeedback>
                                        <Sans style={{ textDecorationLine: "underline" }} size="2" color={color("black100")}>
                                            Login
                                        </Sans>
                                    </TouchableWithoutFeedback>
                                </Text>
                            </Flex>
                        </Box>
                        <Box
                            height={Math.max(0, keyboardHeight - Math.max(0, scrollViewHeight - keyboardBoxMinY) - footerBoxHeight)}
                            onLayout={e => setKeyboardBoxMinY(e.nativeEvent.layout.y)}
                        />
                    </ScrollView>
                    <Box p={4} pb={5} onLayout={e => setFooterBoxHeight(e.nativeEvent.layout.height)}>
                        <Text style={{ textAlign: "center" }}>
                            <Sans size="1" color="gray">
                                By creating an account, you agree to our
                            </Sans>{" "}
                        </Text>
                        <Text style={{ textAlign: "center" }}>
                            <TouchableWithoutFeedback>
                                <Sans style={{ textDecorationLine: "underline" }} size="1" color={color("black50")}>
                                    Privacy Policy
                                </Sans>
                            </TouchableWithoutFeedback>
                            <Sans size="1" color="gray">
                                {" & "}
                            </Sans>
                            <TouchableWithoutFeedback>
                                <Sans style={{ textDecorationLine: "underline" }} size="1" color={color("black50")}>
                                    Terms of Service
                                </Sans>
                            </TouchableWithoutFeedback>
                        </Text>
                        <Spacer mb={2} />
                    </Box>
                </Flex>
            </Flex>

            <DatePickerPopUp buttonText="Done" onRequestClose={closeDatePicker} title="Date of Birth" visible={isDatePickerVisible} />
        </Container >
    )
}