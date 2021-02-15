import { TriageProgressScreen } from "App/Scenes/CreateAccount/Undetermined/TriagePane/TriageProgressScreen"
import { config, Env } from "App/utils/config"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client"
import { linkTo } from "@storybook/addon-links"
import { storiesOf } from "@storybook/react-native"

import Welcome from "./Welcome"
import { ReservationFeedbackConfirmation } from "App/Scenes/ReservationFeedback"

const apolloClient = new ApolloClient({
  uri: config.get(Env.MONSOON_ENDPOINT) || "http://localhost:4000/",
  cache: new InMemoryCache(),
})

storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />)

storiesOf("Create Account", module).add("Triage", () => {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <TriageProgressScreen start={true} done={() => {}} />
      </SafeAreaProvider>
    </ApolloProvider>
  )
})

storiesOf("Reservation Feedback Flow", module).add("Confirmation", () => {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <ReservationFeedbackConfirmation navigation={null} route={{ name: "ReservationConfirmation" }} />
      </SafeAreaProvider>
    </ApolloProvider>
  )
})
