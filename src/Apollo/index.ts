import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink, Observable } from "apollo-link"
import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import { HttpLink } from "apollo-link-http"
import { getAccessTokenFromSession, getNewToken } from "App/Utils/auth"
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

const errorLink = onError(({ networkError, operation, forward }) => {
  if (networkError) {
    // User access token has expired
    if (networkError.statusCode === 401) {
      // We assume we have both tokens needed to run the async request
      // Let's refresh token through async request
      return new Observable(observer => {
        getNewToken()
          .then(userSession => {
            operation.setContext(({ headers = {} }) => ({
              headers: {
                // Re-add old headers
                ...headers,
                // Switch out old access token for new one
                authorization: `Bearer ${userSession.token}` || null,
              },
            }))
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            }

            // Retry last failed request
            forward(operation).subscribe(subscriber)
          })
          .catch(error => {
            // No refresh or client token available, we force user to login
            observer.error(error)
          })
      })
    }
  }
})

export const apolloClient = new ApolloClient({
  // Provide required constructor fields
  cache,
  // link: authLink.concat(link),
  link: ApolloLink.from([authLink, errorLink, link]),
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
