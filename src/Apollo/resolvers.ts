import { GET_LOCAL_BAG } from "App/Scenes/Bag/BagQueries"

import { ApolloCache, gql, Resolvers } from "@apollo/client"

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    localBagItems: [ID!]!
  }

  extend type Product {
    isInBag: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromLocalBag(id: ID!): [ID!]!
  }
`

type ResolverFn = (parent: any, args: any, { cache }: { cache: ApolloCache<any> }) => any

interface ResolverMap {
  [field: string]: ResolverFn
}

interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
}

export const resolvers = {
  localBagItems: (customer, _, { cache }) => {
    const queryResult = cache.readQuery({
      query: GET_LOCAL_BAG,
    })
    return queryResult
  },
  Mutation: {
    addOrRemoveFromLocalBag: (_, { id }: { id: string }, { cache }): string[] => {
      const queryResult = cache.readQuery({
        query: GET_LOCAL_BAG,
      })
      if (queryResult) {
        const { localBagItems } = queryResult
        const data = {
          localBagItems: localBagItems.includes(id) ? localBagItems.filter((i) => i !== id) : [...localBagItems, id],
        }
        cache.writeQuery({ query: GET_LOCAL_BAG, data })
        return data.localBagItems
      }
      return []
    },
  },
}
