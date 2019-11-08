import { Container, Sans, Spacer, Box, Separator, FixedBackArrow } from "App/Components"
import React, { useState, useEffect } from "react"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import { FlatList } from "react-native"
import { color } from "App/Utils"
import { DateTime } from "luxon"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"

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
          shippingAddress {
            name
            company
            address1
            address2
            city
            state
            zipCode
          }
        }
      }
    }
  }
`

const AccountSection: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <Box key={title} px={2}>
      <Sans size="2">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("gray")} />
      <Box mb={1} />
      <Sans size="2" color="gray">
        {value}
      </Sans>
      <Spacer mb={2} />
    </Box>
  )
}

export const PersonalPreferences: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const [sections, setSections] = useState([])
  const { loading, error, data } = useQuery(GET_PREFERENCES)

  useEffect(() => {
    if (data && data.me && data.me.customer && data.me.customer.detail) {
      const sectionsArray = []
      const details = data.me.customer.detail

      if (details.birthday) {
        const birthdayAsDate = DateTime.fromISO(details.birthday).toLocaleString(DateTime.DATE_FULL)
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

      // page 3

      if (details.shippingAddress) {
        const shippingAddress = details.shippingAddress
        if (shippingAddress.name) {
          sectionsArray.push({ title: "Full name", value: shippingAddress.name })
        }

        if (shippingAddress.company) {
          sectionsArray.push({ title: "Company", value: shippingAddress.company })
        }

        if (shippingAddress.address1) {
          sectionsArray.push({ title: "Address", value: shippingAddress.address1 })
        }

        if (shippingAddress.address2) {
          sectionsArray.push({ title: "Apt, suite #", value: shippingAddress.address2 })
        }

        if (shippingAddress.city) {
          sectionsArray.push({ title: "City", value: shippingAddress.city })
        }

        if (shippingAddress.state) {
          sectionsArray.push({ title: "State", value: shippingAddress.state })
        }

        if (shippingAddress.zipCode) {
          sectionsArray.push({ title: "Zipcode", value: shippingAddress.zipCode })
        }
      }

      setSections(sectionsArray)
    }
  }, [data])

  if (loading) {
    return null
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
      <>
        <FixedBackArrow navigation={navigation} />
        <FlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box px={2}>
              <Spacer mb={80} />
              <Sans size="3">Personal preferences</Sans>
              <Spacer mb={3} />
            </Box>
          )}
          keyExtractor={item => item.title}
          renderItem={({ item }) => renderItem(item)}
        />
      </>
    </Container>
  )
}
