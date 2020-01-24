import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import { getAccessTokenFromSession } from "App/Utils/auth"
import Config from "react-native-config"

import introspectionQueryResultData from "../fragmentTypes.json"

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const cache = new InMemoryCache({ fragmentMatcher })

console.log("Monsoon Endpoint:", Config.MONSOON_ENDPOINT)

const link = new HttpLink({
  uri: "http://localhost:4000",
  //   uri: "https://monsoon.seasons.nyc",
  //   uri: "https://monsoon-staging.seasons.nyc",
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    const accessToken = await getAccessTokenFromSession()
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
