import { App } from "./src/App"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import React from "react"
import { AppRegistry } from "react-native"
import { ApolloProvider } from "@apollo/react-hooks"
import AsyncStorage from "@react-native-community/async-storage"
import { MONSOON_ENDPOINT } from "react-native-dotenv"
import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import introspectionQueryResultData from "./src/fragmentTypes.json"

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const cache = new InMemoryCache({ fragmentMatcher })

console.log("Monsoon Endpoint:", MONSOON_ENDPOINT)

const link = new HttpLink({
  uri: MONSOON_ENDPOINT || "http://localhost:4000/",
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
