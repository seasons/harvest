import { App } from "./src/App"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import React from "react"
import { AppRegistry } from "react-native"
import { restoreCache } from "./src/helpers/asyncStorage"
import { ApolloProvider } from "@apollo/react-hooks"

const cache = new InMemoryCache()

const link = new HttpLink({
  uri: "https://monsoon-staging.herokuapp.com",
})

export const apolloClient = new ApolloClient({
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

const ApolloApp = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App cacheData={null} />
    </ApolloProvider>
  )
}

AppRegistry.registerComponent("seasons", () => ApolloApp)
