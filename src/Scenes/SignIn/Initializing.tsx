import gql from "graphql-tag"
import React, { useEffect } from "react"
import { Query } from "react-apollo"
import { View } from "react-native"
import Auth0 from "react-native-auth0"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"

import AsyncStorage from "@react-native-community/async-storage"

const auth0 = new Auth0({
  domain: "seasons-staging.auth0.com",
  clientId: "fcHPQx7KYqpkqI2yn31fcLgt7nuU2S5D",
})

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const GET_USER = gql`
  {
    me {
      user {
        email
        firstName
        lastName
      }
    }
  }
`

export class Initializing extends React.Component<Props> {
  async componentDidMount() {}

  async navigateTo() {
    const { navigation } = this.props
    try {
      let userSession = await AsyncStorage.getItem("userSession")
      userSession = JSON.parse(userSession)

      if (userSession && userSession.token) {
        navigation.navigate("Home")
      } else {
        navigation.navigate("Auth")
      }
    } catch (err) {
      console.log("error: ", err)
      navigation.navigate("Auth")
    }
  }

  async getRefreshToken() {
    let userSession = await AsyncStorage.getItem("userSession")
    userSession = JSON.parse(userSession)

    const newToken = await auth0.auth.refreshToken({
      refreshToken: userSession.refreshToken,
    })

    userSession.token = newToken.accessToken
    await AsyncStorage.setItem("userSession", JSON.stringify(userSession))
  }

  render() {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (error) {
            this.getRefreshToken()
          } else if (data) {
            this.navigateTo()
          }
          return <View />
        }}
      </Query>
    )
  }
}
