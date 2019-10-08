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

const GET_BAG = gql`
  query GetBag {
    bag @client {
      items {
        id
        name
      }
    }
  }
`

export const resolvers = {
  Mutation: {
    addItemToBag: (_root, { item }, { cache }) => {
      const data = cache.readQuery({ query: GET_BAG })
      const items = data.bag.items || []
      items.push(item.id)

      const updatedData = {
        bag: {
          ...data.bag,
          items,
        },
      }
      cache.writeData({ data: updatedData })
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
  Query: {
    bag: (root, _args, { cache }) => {
      const bag = cache.readQuery({
        query: GET_BAG,
      })
      return bag
    },
  },
  Bag: {
    items: () => [],
  },
}
