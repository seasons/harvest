import { ApolloCache, gql, Resolvers } from "@apollo/client"

import { GET_CART_ITEMS } from "../"

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Customer {
    localBagItems: [BagItem!]
  }

  extend type Product {
    isInBag: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromLocalBag(id: ID!): [BagItem!]!
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
  Customer: {
    localBagItems: (customer, _, { cache }) => {
      const queryResult = cache.readQuery({
        query: GET_CART_ITEMS,
      })
      return queryResult
    },
  },
}
