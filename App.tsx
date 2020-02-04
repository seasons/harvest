import React from "react"
import { Bag } from "./Scenes/Bag"
import { Profile, PaymentAndShipping } from "./Scenes/Account"
import { Home } from "./Scenes/Home"
import { Browse } from "./Scenes/Browse"
import { Navigation } from "react-native-navigation"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import analytics from "@segment/analytics-react-native"
import { SignIn } from "./Scenes/SignIn"
import { Initialising } from "./Scenes/SignIn"

// Instantiate required constructor fields
const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "https://monsoon-staging.herokuapp.com",
})

const client = new ApolloClient({
  // Provide required constructor fields
  cache,
  link,

  // Provide some optional constructor fields
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
})

// Create the client as outlined in the setup guide
const Apollo = (Component: React.ComponentType) => {
  return props => (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  )
}

const setupAnalytics = async () => {
  await analytics.setup("6cdqrLXsben2gavsJ6oVIO9lWVKudY9m", {
    // Record screen views automatically!
    recordScreenViews: true,
    // Record certain application events automatically!
    trackAppLifecycleEvents: true,
  })
}

export function start() {
  Navigation.registerComponent("Initialising", () => Apollo(Initialising), () => Initialising)
  Navigation.registerComponent("Home", () => Apollo(Home), () => Home)
  Navigation.registerComponent("SignIn", () => Apollo(SignIn), () => SignIn)
  Navigation.registerComponent("Browse", () => Apollo(Browse), () => Browse)
  Navigation.registerComponent("Bag", () => Apollo(Bag), () => Bag)
  Navigation.registerComponent("Account", () => Apollo(Profile), () => Profile)
  Navigation.registerComponent("Account.PaymentAndShipping", () => Apollo(PaymentAndShipping), () => PaymentAndShipping)

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      layout: {
        componentBackgroundColor: "black",
        orientation: ["portrait"],
        direction: "ltr",
      },
      bottomTabs: {
        titleDisplayMode: "alwaysHide",
        backgroundColor: "black",
        hideShadow: true,
      },
      bottomTab: {
        iconColor: "#4D4D4D",
        selectedIconColor: "#fff",
      },
      topBar: {
        visible: false,
      },
    })

    Navigation.setRoot({
      root: {
        component: {
          name: "Initialising",
        },
      },
    })
  })

  setupAnalytics()
}
