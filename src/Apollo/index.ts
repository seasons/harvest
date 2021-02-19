import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import { getAccessTokenFromSession, getNewToken } from "App/utils/auth"
import { config, Env } from "App/utils/config"
import { isEmpty } from "lodash"
import { createUploadLink } from "apollo-upload-client"
import { Platform } from "react-native"

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from "@apollo/client"
import * as Sentry from "@sentry/react-native"

import { resolvers, typeDefs } from "./resolvers"

export const setupApolloClient = async () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          fitPicsCount: {
            read(newCount) {
              return newCount
            },
          },
          fitPics: {
            merge(existing = [], incoming = [], { args: { skipFitPics = 0 } }) {
              const merged = existing ? existing.slice(0) : []
              for (let i = 0; i < incoming.length; ++i) {
                merged[skipFitPics + i] = incoming[i]
              }
              existing = merged
              return existing
            },
          },
          productsConnection: {
            merge(existing = {}, incoming = {}, { args: { skip = 0 } }) {
              let mergedEdges = !isEmpty(existing) ? existing?.edges?.slice(0) : []
              if (incoming?.edges?.length > 0) {
                for (let i = 0; i < incoming?.edges?.length; ++i) {
                  mergedEdges[skip + i] = incoming?.edges?.[i]
                }
              }
              return { ...existing, ...incoming, edges: mergedEdges }
            },
          },
        },
      },
    },
  })

  const httpLink = createUploadLink({
    uri: config.get(Env.MONSOON_ENDPOINT) || "http://localhost:4000/", // Server URL (must be absolute)
  }) as any

  const authLink = setContext(async (_, { headers: oldHeaders }) => {
    const headers = { ...oldHeaders, application: "harvest", platform: Platform.OS }

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

  // @ts-ignore
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
    if (graphQLErrors) {
      console.log("graphQLErrors", graphQLErrors)

      for (const err of graphQLErrors) {
        // Add scoped report details and send to Sentry
        Sentry.withScope((scope) => {
          // Annotate whether failing operation was query/mutation/subscription
          scope.setTag("kind", operation.operationName)
          // Log query and variables as extras
          // (make sure to strip out sensitive data!)
          scope.setExtra("query", operation.query)
          scope.setExtra("variables", operation.variables)
          if (err.path) {
            // We can also add the path as breadcrumb
            scope.addBreadcrumb({
              category: "query-path",
              message: err.path.join(" > "),
              level: Sentry.Severity.Debug,
            })
          }
          Sentry.captureException(err)
        })
      }
    }

    if (networkError) {
      console.log("networkError", JSON.stringify(networkError))
      // User access token has expired
      if ((networkError as any).statusCode === 401) {
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
    link: ApolloLink.from([authLink, errorLink, httpLink]) as any,
    typeDefs,
    resolvers,
    cache,
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
