import gql from "graphql-tag"

export const GET_PRODUCT = gql`
  query GetProduct($productID: ID!) {
    product(where: { id: $productID }) {
      id
      slug
      name
      description
      retailPrice
      modelSize
      modelHeight
      brand {
        name
      }
      images
      variants {
        id
        size
        total
        reservable
        nonReservable
        reserved
      }
    }
  }
`
