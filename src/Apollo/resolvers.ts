import { GET_LOCAL_BAG } from "App/Scenes/Bag/BagQueries"

import { ApolloCache, gql, Resolvers } from "@apollo/client"

export const typeDefs = gql`
  type LocalProduct {
    productID: ID!
    variantID: ID!
  }
  extend type Query {
    localBagItems: [LocalProduct!]!
    isInBag(productID: ID!): Boolean!
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

export const resolvers: any = {
  localBagItems: (_, __, { cache }) => {
    const queryResult = cache.readQuery({
      query: GET_LOCAL_BAG,
    })
    return queryResult
  },
  isInBag: (_, product, { cache }): boolean => {
    const queryResult = cache.readQuery({
      query: GET_LOCAL_BAG,
    })
    if (queryResult) {
      const { localBagItems } = queryResult
      return !!localBagItems.find((item) => item.productID === product.productID)
    }
    return false
  },
  Mutation: {
    addOrRemoveFromLocalBag: (_, product, { cache }) => {
      const queryResult = cache.readQuery({
        query: GET_LOCAL_BAG,
      })
      if (queryResult) {
        const { localBagItems } = queryResult
        const hasItem = !!localBagItems.find((item) => item.productID === product.productID)

        const data = {
          localBagItems: hasItem
            ? localBagItems.filter((i) => i.productID !== product.productID)
            : [...localBagItems, { ...product, __typename: "LocalProduct" }],
        }
        cache.writeQuery({ query: GET_LOCAL_BAG, data })
        return data.localBagItems
      }
      return []
    },
  },
}
