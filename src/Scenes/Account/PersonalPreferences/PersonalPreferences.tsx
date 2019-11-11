import { Box, Container, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/Utils"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"

const GET_PREFERENCES = gql`
  query getUser {
    me {
      customer {
        detail {
          phoneNumber
          birthday
          height
          weight
          bodyType
          averageSpend
          averageTopSize
          averageWaistSize
          profession
          partyFrequency
          travelFrequency
          shoppingFrequency
          style
          phoneOS
          commuteStyle
          preferredPronouns
          averagePantLength
        }
      }
    }
  }
`

export const AccountSection: React.FC<{ title: string; value: string | [string] }> = ({ title, value }) => {
  return (
    <Box key={title} px={2}>
      <Sans size="2">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("gray")} />
      <Box mb={1} />
      {Array.isArray(value) ? (
        value.map(text => (
          <Sans key={text} size="2" color="gray">
            {text}
          </Sans>
        ))
      ) : (
        <Sans size="2" color="gray">
          {value}
        </Sans>
      )}
      <Spacer mb={2} />
    </Box>
  )
}

export const PersonalPreferences: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const insets = useSafeArea()
  const [sections, setSections] = useState([])
  const { loading, error, data } = useQuery(GET_PREFERENCES)

  useEffect(() => {
    if (data && data.me && data.me.customer && data.me.customer.detail) {
      const sectionsArray = []
      const details = data.me.customer.detail

      if (details.birthday) {
        const birthdayAsDate = DateTime.fromISO(details.birthday)
          .toUTC()
          .toLocaleString(DateTime.DATE_FULL)
        sectionsArray.push({ title: "Birthday", value: birthdayAsDate })
      }

      if (details.preferredPronouns) {
        sectionsArray.push({ title: "Preferred pronouns", value: details.preferredPronouns })
      }

      if (details.height) {
        const feet = Math.floor(details.height / 12)
        const inches = details.height % 12
        sectionsArray.push({ title: "Height", value: `${feet} ft ${inches} in` })
      }

      if (details.weight) {
        sectionsArray.push({ title: "Weight", value: details.weight })
      }

      if (details.bodyType) {
        sectionsArray.push({ title: "Body type", value: details.bodyType })
      }

      if (details.averageTopSize) {
        sectionsArray.push({ title: "Average top size", value: details.averageTopSize })
      }

      if (details.averageWaistSize) {
        sectionsArray.push({ title: "Average waist size", value: `${details.averageWaistSize} in` })
      }

      if (details.averagePantLength) {
        sectionsArray.push({ title: "Average pant length", value: `${details.averagePantLength} in` })
      }

      // page 2

      if (details.profession) {
        sectionsArray.push({ title: "Profession", value: details.profession })
      }

      if (details.commuteStyle) {
        sectionsArray.push({ title: "Commute style", value: details.commuteStyle })
      }

      if (details.partyFrequency) {
        sectionsArray.push({ title: "Party frequency", value: details.partyFrequency })
      }

      if (details.travelFrequency) {
        sectionsArray.push({ title: "Travel frequency", value: details.travelFrequency })
      }

      if (details.shoppingFrequency) {
        sectionsArray.push({ title: "Shopping frequency", value: details.shoppingFrequency })
      }

      if (details.averageSpend) {
        sectionsArray.push({ title: "Spending average", value: details.averageSpend })
      }

      if (details.style) {
        sectionsArray.push({ title: "Style", value: details.style })
      }

      if (details.phoneOS) {
        sectionsArray.push({ title: "Phone type", value: details.phoneOS })
      }

      setSections(sectionsArray)
    }
  }, [data])

  if (loading) {
    return <Loader />
  }

  if (error) {
    console.log("error PersonalPreferences.tsx: ", error)
    return null
  }

  const renderItem = item => {
    return <AccountSection title={item.title} value={item.value} />
  }

  return (
    <Container>
      <Box mt={insets.top}>
        <FixedBackArrow navigation={navigation} />
        <FlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box px={2} mt={4}>
              <Spacer mb={80} />
              <Sans size="3">Personal preferences</Sans>
              <Spacer mb={3} />
            </Box>
          )}
          keyExtractor={item => item.title}
          renderItem={({ item }) => renderItem(item)}
        />
      </Box>
    </Container>
  )
}
