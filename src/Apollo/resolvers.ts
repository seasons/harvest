import { GET_LOCAL_BAG } from "App/Scenes/Bag/BagQueries"

import { ApolloCache, gql, Resolvers } from "@apollo/client"

export const typeDefs = gql`
  type LocalProduct {
    productID: ID!
    variantID: ID!
  }
  extend type Query {
    isLoggedIn: Boolean!
    localBagItems: [LocalProduct!]!
  }

  extend type Product {
    isInBag: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromLocalBag(productID: ID!, variantID: ID!): [LocalProduct!]!
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
    addOrRemoveFromLocalBag: (_, product, { cache }): string[] => {
      const queryResult = cache.readQuery({
        query: GET_LOCAL_BAG,
      })
      if (queryResult) {
        const { localBagItems } = queryResult
        const hasItem = localBagItems.indexOf((item) => item.productID === product.productID) !== -1

        const data = {
          localBagItems: hasItem
            ? localBagItems.filter((i) => i.productID !== product.productID)
            : [...localBagItems, product],
        }
        cache.writeQuery({ query: GET_LOCAL_BAG, data })
        return data.localBagItems
      }
      return []
    },
  },
}
