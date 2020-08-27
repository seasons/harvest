import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink, Observable } from "apollo-link"
import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import unfetch from "unfetch"
import introspectionQueryResultData from "../fragmentTypes.json"
import { getAccessTokenFromSession, getNewToken } from "App/utils/auth"
import { config, Env } from "App/utils/config"
import * as Sentry from "@sentry/react-native"
import { createUploadLink } from "apollo-upload-client"
import { Platform } from "react-native"

export const setupApolloClient = async () => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })

  const cache = new InMemoryCache({ fragmentMatcher })

  const link = createUploadLink({
    uri: config.get(Env.MONSOON_ENDPOINT) || "http://localhost:4000/",
    // FIXME: unfetch here is being used for this fix https://github.com/jhen0409/react-native-debugger/issues/432
    fetch: unfetch,
  })

  const authLink = setContext(async (_, { headers: oldHeaders }) => {
    const headers = { ...oldHeaders, application: "Harvest", platform: Platform.OS }

    // get the authentication token from local storage if it exists
    const accessToken = await getAccessTokenFromSession()
    if (accessToken) {
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }
    } else {
      return {
        headers,
      }
    }
    // return the headers to the context so createUploadLink can read them
  })

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
    if (graphQLErrors) {
      console.log("graphQLErrors", graphQLErrors)
      Sentry.captureException(graphQLErrors)
    }
    if (networkError) {
      console.log("networkError", JSON.stringify(networkError))
      // User access token has expired
      if (networkError.statusCode === 401) {
        // We assume we have both tokens needed to run the async request
        // Let's refresh token through async request
        return new Observable((observer) => {
          getNewToken()
            .then((userSession) => {
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
            .catch((error) => {
              // No refresh or client token available, we force user to login
              observer.error(error)
            })
        })
      }
    }
  })

  return new ApolloClient({
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
}
