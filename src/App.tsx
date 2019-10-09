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
import { storeAsyncStorageData, getAsyncStorageData } from "./helpers/asyncStorage"

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
const App = (Component: React.ComponentType, cacheData) => {
  const initialState = cacheData
  console.log("initialState???", initialState)

  const reducer = (state, action) => {
    const items = state.bag.items || []
    switch (action.type) {
      case "addItemToBag":
        items.push(action.item)
        const bagWithItem = {
          ...state,
          bag: { ...state.bag, items },
        }
        storeAsyncStorageData(bagWithItem)
        return bagWithItem
      case "removeItemFromBag":
        const bagWithoutItem = {
          ...state,
          bag: { ...state.bag, items: items.filter(bagItem => bagItem.id === action.item.id) },
        }
        storeAsyncStorageData(bagWithoutItem)
        return bagWithoutItem
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

const registerNavigation = cacheData => {
  Navigation.registerComponent("Initializing", () => App(Initializing, cacheData), () => Initializing)
  Navigation.registerComponent("Welcome", () => App(Welcome, cacheData), () => Welcome)
  Navigation.registerComponent("Notifications", () => App(Notifications, cacheData), () => Notifications)
  Navigation.registerComponent("Home", () => App(Home, cacheData), () => Home)
  Navigation.registerComponent("Product", () => App(Product, cacheData), () => Product)
  Navigation.registerComponent("SignIn", () => App(SignIn, cacheData), () => SignIn)
  Navigation.registerComponent("Browse", () => App(Browse, cacheData), () => Browse)
  Navigation.registerComponent("Bag", () => App(Bag, cacheData), () => Bag)
  Navigation.registerComponent("Account", () => App(Profile, cacheData), () => Profile)
  Navigation.registerComponent(
    "Account.PaymentAndShipping",
    () => App(PaymentAndShipping, cacheData),
    () => PaymentAndShipping
  )

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

export function start() {
  getAsyncStorageData().then(data => registerNavigation(data))
}
