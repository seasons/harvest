import React from "react"
import { Box, Container, Flex, Spacer, FakeTextInput } from "App/Components"
import { DateTime } from "luxon"
import { padStart } from "lodash"

const formattedPhoneNumber = (phoneNumber: string) => {
  const suffix = phoneNumber.slice(-10)
  return `(${suffix.substring(0, 3)}) ${suffix.substring(3, 6)}-${suffix.substring(6)}`
}

const formattedDateTime = (dateTime: string) => {
  const date = DateTime.fromISO(dateTime)
  return [date.month, date.day, date.year].map((i) => padStart(i, 2, "0")).join("/")
}

export const PersonalTab: React.FC<{
  createdAt: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}> = ({ createdAt, firstName, lastName, email, phoneNumber }) => {
  return (
    <Container insetsTop={false} insetsBottom={false}>
      <Box p={2} pt={4}>
        <Flex flexDirection="row">
          <FakeTextInput currentValue={firstName} disabled headerText="First name" style={{ flex: 1 }} />
          <Spacer mr={9} />
          <FakeTextInput currentValue={lastName} disabled headerText="Last name" style={{ flex: 1 }} />
        </Flex>
        <Spacer mb={4} />
        <FakeTextInput currentValue={email} disabled headerText="Email" />
        <Spacer mb={4} />
        <FakeTextInput currentValue={formattedPhoneNumber(phoneNumber)} disabled headerText="Phone number" />
        <Spacer mb={4} />
        <FakeTextInput currentValue={formattedDateTime(createdAt)} disabled headerText="Joined" />
      </Box>
    </Container>
  )
}
