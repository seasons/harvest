import { App } from "./src/App"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import React from "react"
import { AppRegistry } from "react-native"
import { ApolloProvider } from "@apollo/react-hooks"
import AsyncStorage from "@react-native-community/async-storage"
import Config from "react-native-config"
import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import introspectionQueryResultData from "./src/fragmentTypes.json"
import * as Sentry from "@sentry/react-native"
import "react-native-gesture-handler"
// import "./src/setupAnalytics"

// https://github.com/facebook/react-native/issues/25701#issuecomment-513450639
global.Blob = null

if (!__DEV__) {
  Sentry.init({
    dsn: "https://6e163b9f771f4c53951c546a4ac64891@sentry.io/1824125",
  })
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const cache = new InMemoryCache({ fragmentMatcher })

console.log("Monsoon Endpoint:", Config.MONSOON_ENDPOINT)

const link = new HttpLink({
  uri: Config.MONSOON_ENDPOINT || "http://localhost:4000/",
  // uri: "https://monsoon.seasons.nyc",
  // uri: "http://localhost:4000",
  // uri: "http://eb37214e.ngrok.io",
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    const data = await AsyncStorage.getItem("userSession")
    const userSession = JSON.parse(data)
    const accessToken = userSession ? userSession.token : ""
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    }
  } catch (e) {
    return {
      headers,
    }
  }
})

export const apolloClient = new ApolloClient({
  // Provide required constructor fields
  cache,
  link: authLink.concat(link),
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

const AppContainer = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  )
}

AppRegistry.registerComponent("seasons", () => AppContainer)
