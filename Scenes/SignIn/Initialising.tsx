import React from "react"
import { View, Text, StyleSheet, AsyncStorage } from "react-native"

import { goToAuth, goHome } from "../../Navigation"

const USER_KEY = "NEED_KEY"

export class Initialising extends React.Component {
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY)
      console.log("user: ", user)
      if (user) {
        goHome()
      } else {
        goToAuth()
      }
    } catch (err) {
      console.log("error: ", err)
      goToAuth()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
