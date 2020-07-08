import { Box, Container, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import { screenTrack } from "App/utils/track"
import { Measurements } from "App/Scenes/CreateAccount/Undetermined"

const GET_PREFERENCES = gql`
  query GetUserPreferences {
    me {
      customer {
        id
        detail {
          phoneNumber
          birthday
          height
          weight
          bodyType
          averageSpend
          topSizes
          waistSizes
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
      <Separator color={color("black10")} />
      <Box mb={1} />
      {Array.isArray(value) ? (
        value.map((text) => (
          <Sans key={text} size="2" color="black50">
            {text}
          </Sans>
        ))
      ) : (
        <Sans size="2" color="black50">
          {value}
        </Sans>
      )}
      <Spacer mb={4} />
    </Box>
  )
}

export const PersonalPreferences = screenTrack()(({ navigation }) => {
  const [sections, setSections] = useState([])
  const { loading, error, data } = useQuery(GET_PREFERENCES)

  useEffect(() => {
    if (data && data.me && data.me.customer && data.me.customer.detail) {
      const sectionsArray = []
      const details = data.me.customer.detail

      if (details.birthday) {
        const birthdayAsDate = DateTime.fromISO(details.birthday).toUTC().toLocaleString(DateTime.DATE_FULL)
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

      if (details.weight && details.weight?.length == 2) {
        sectionsArray.push({ title: "Weight", value: `${details.weight[0]}-${details.weight[1]} lbs` })
      }

      if (details.bodyType) {
        sectionsArray.push({ title: "Body type", value: details.bodyType })
      }

      if (details.topSizes) {
        sectionsArray.push({
          title: "Preferred top sizes",
          value: details.topSizes
            .sort((a, b) => Measurements.topSizes.indexOf(a) < Measurements.topSizes.indexOf(b))
            .join(", "),
        })
      }

      if (details.waistSizes) {
        sectionsArray.push({
          title: "Preferred waist sizes",
          value: `${details.waistSizes.sort((a, b) => a > b).join(", ")} in`,
        })
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
    console.error("error PersonalPreferences.tsx: ", error)
    return null
  }

  const renderItem = (item) => {
    return <AccountSection title={item.title} value={item.value} />
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <FlatList
        data={sections}
        ListHeaderComponent={() => (
          <Box px={2}>
            <Spacer mb={80} />
            <Sans size="3">Personal preferences</Sans>
            <Spacer mb={3} />
          </Box>
        )}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => renderItem(item)}
      />
    </Container>
  )
})
