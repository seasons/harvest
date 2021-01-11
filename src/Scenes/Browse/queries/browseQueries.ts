import gql from "graphql-tag"

export const GET_BROWSE_PRODUCTS = gql`
  query GetBrowseProducts(
    $categoryName: String!
    $brandNames: [String]
    $first: Int!
    $skip: Int!
    $orderBy: ProductOrderByInput!
    $tops: [String]
    $bottoms: [String]
    $available: Boolean
  ) {
    categories(where: { visible: true }, orderBy: updatedAt_ASC) {
      id
      slug
      name
      children {
        id
        slug
      }
    }
    brands(orderBy: name_ASC, where: { products_some: { id_not: null }, name_not: null }) {
      id
      slug
      name
    }
    productsCount: productsConnection(
      category: $categoryName
      tops: $tops
      bottoms: $bottoms
      availableOnly: $available
      brands: $brandNames
      orderBy: $orderBy
      where: { status: Available }
    ) {
      aggregate {
        count
      }
    }
    productsConnection(
      category: $categoryName
      tops: $tops
      bottoms: $bottoms
      availableOnly: $available
      brands: $brandNames
      orderBy: $orderBy
      first: $first
      skip: $skip
      where: { status: Available }
    ) {
      edges {
        node {
          id
          slug
          name
          description
          images(size: Thumb) {
            id
            url
          }
          modelSize {
            id
            display
          }
          modelHeight
          externalURL
          retailPrice
          status
          type
          createdAt
          updatedAt
          brand {
            id
            name
          }
          variants {
            id
            total
            reservable
            nonReservable
            reserved
            isSaved
            internalSize {
              id
              display
              top {
                id
                letter
              }
              bottom {
                id
                value
              }
            }
          }
        }
      }
    }
  }
`