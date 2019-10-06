import React from "react"
import { Bag } from "Scenes/Bag"
import { Profile, PaymentAndShipping } from "Scenes/Account"
import { Home } from "Scenes/Home"
import { Product } from "Scenes/Product"
import { Browse } from "Scenes/Browse"
import { Navigation } from "react-native-navigation"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { SignIn, Welcome, Initializing, Notifications } from "Scenes/SignIn"
import { resolvers, typeDefs } from "./resolvers"

// Instantiate required constructor fields
const cache = new InMemoryCache()
// LocalState data in cache
cache.writeData({
  data: {
    bag: { items: [{ id: "1213", __typename: "Product" }] },
  },
})

const link = new HttpLink({
  uri: "https://monsoon-staging.herokuapp.com",
})

const client = new ApolloClient({
  // Provide required constructor fields
  cache,
  link,
  typeDefs,
  resolvers,
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

export function start() {
  Navigation.registerComponent("Initializing", () => Apollo(Initializing), () => Initializing)
  Navigation.registerComponent("Welcome", () => Apollo(Welcome), () => Welcome)
  Navigation.registerComponent("Notifications", () => Apollo(Notifications), () => Notifications)
  Navigation.registerComponent("Home", () => Apollo(Home), () => Home)
  Navigation.registerComponent("Product", () => Apollo(Product), () => Product)
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
          name: "Initializing",
        },
      },
    })
  })
}
