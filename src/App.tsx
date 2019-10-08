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
import { StateProvider } from "App/helpers/StateProvider"

// Instantiate required constructor fields
const cache = new InMemoryCache()
// LocalState data in cache
cache.writeData({
  data: {
    bag: {
      __typename: "Bag",
      items: [],
    },
  },
})

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
const App = (Component: React.ComponentType) => {
  const initialState = {
    bag: { items: [] },
  }

  const reducer = (state, action) => {
    const items = state.bag.items || []
    switch (action.type) {
      case "addItemToBag":
        console.log("adding item", action.item)
        items.push(action.item)
        const newBag = {
          ...state,
          bag: { ...state.bag, items },
        }
        console.log("newBag", newBag)
      case "removeItemFromBag":
        items.push(action.item)
        return {
          ...state,
          bag: { ...state.bag, items: items.filter(bagItem => bagItem.id === action.item.id) },
        }
      default:
        return state
    }
  }

  return props => (
    <ApolloProvider client={client}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...props} />
      </StateProvider>
    </ApolloProvider>
  )
}

export function start() {
  Navigation.registerComponent("Initializing", () => App(Initializing), () => Initializing)
  Navigation.registerComponent("Welcome", () => App(Welcome), () => Welcome)
  Navigation.registerComponent("Notifications", () => App(Notifications), () => Notifications)
  Navigation.registerComponent("Home", () => App(Home), () => Home)
  Navigation.registerComponent("Product", () => App(Product), () => Product)
  Navigation.registerComponent("SignIn", () => App(SignIn), () => SignIn)
  Navigation.registerComponent("Browse", () => App(Browse), () => Browse)
  Navigation.registerComponent("Bag", () => App(Bag), () => Bag)
  Navigation.registerComponent("Account", () => App(Profile), () => Profile)
  Navigation.registerComponent("Account.PaymentAndShipping", () => App(PaymentAndShipping), () => PaymentAndShipping)

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
