import gql from "graphql-tag"

export const typeDefs = gql`
  extend type Query {
    bag: Bag!
  }

  extend type Mutation {
    addItemToBag(item: Product!): Bag
    removeItemFromBag(item: Product!): Bag
  }
`

export const resolvers = {
  Mutation: {
    addItemToBag: (_root, variables, { cache }) => {
      const query = gql`
        query GetBag {
          bag @client {
            items {
              id
            }
          }
        }
      `
      console.log("qeury!!!!", query)
      const bag = cache.readQuery({ query })
      console.log("bag????", bag)
      const data = { ...bag, items: bag.items.push(variables.item) }
      cache.writeData({ data })
      return null
    },
    removeItemFromBag: (_root, variables, { cache }) => {
      const query = gql`
        query GetBag {
          bag @client {
            items {
              id
            }
          }
        }
      `
      const bag = cache.readQuery({ query })
      const data = { ...bag, items: bag.items.filter(bagItem => bagItem.id === variables.item.id) }
      cache.writeData({ data })
      return null
    },
  },
}
