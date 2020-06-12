import { Box, Button, CloseButton, Container, Flex, Sans, Spacer, TextInput } from "App/Components"
import { color } from "App/utils"
import React, { useState } from "react"
import { Text } from "Components/Typography"
import { TouchableWithoutFeedback } from "react-native"
import { isValidEmail } from "App/helpers/regex"
import { ScrollView } from "react-native"

interface CreateAccountProps {
    onAuth: (credentials, profile) => void
    navigation: any
}

export const CreateAccount: React.FC<CreateAccountProps> = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [zipCode, setZipCode] = useState("")

    const [extraScrollHeight, setExtraScrollheight] = useState(0)

    const onDateOfBirthChange = (val) => {
        if (val.length === 2 || val.length === 5) {
            setDateOfBirth(val + "-")
        } else if (val.length > 10) {
            setDateOfBirth(val.slice(0, -1))
        } else {
            setDateOfBirth(val)
        }
    }

    return (
        <Container insetsBottom={false} insetsTop={false}>
            <CloseButton />
            <Flex style={{ flex: 1 }}>
                <Spacer mb={3} />
                <Flex flexDirection="column" style={{ flex: 1 }}>
                    <Box p={2} mt={5} style={{ backgroundColor: "red" }}>
                        <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode="interactive">
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
                                onChangeText={(_, val) => setName(val)}
                            />
                            <Spacer mb={2} />
                            <TextInput
                                placeholder="Email"
                                variant="light"
                                inputKey="email"
                                keyboardType="email-address"
                                onChangeText={(_, val) => setEmail(val)}
                            />
                            <Spacer mb={2} />
                            <TextInput
                                secureTextEntry
                                placeholder="Password"
                                variant="light"
                                inputKey="password"
                                onChangeText={(_, val) => setPassword(val)}
                            />
                            <Spacer mb={2} />
                            <TextInput
                                placeholder="Date of Birth"
                                currentValue={dateOfBirth}
                                variant="light"
                                inputKey="date-of-birth"
                                keyboardType="number-pad"
                                onChangeText={(_, val) => onDateOfBirthChange(val)}
                            />
                            <Spacer mb={2} />
                            <TextInput
                                placeholder="ZIP Code"
                                currentValue={zipCode}
                                variant="light"
                                inputKey="zip-code"
                                keyboardType="number-pad"
                                onChangeText={(_, val) => val.length <= 5 ? setZipCode(val) : setZipCode(val.slice(0, 5))}
                            />
                            <Spacer mb={4} />
                            <Button block variant="primaryBlack">
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
                        </ScrollView>
                    </Box>
                    <Box p={4} pb={5}>
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
        </Container>
    )
}