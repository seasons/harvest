import gql from "graphql-tag"

export const GET_BROWSE_CATEGORIES_AND_BRANDS = gql`
  query GetBrowseCategoriesAndBrands {
    categories(where: { visible: true }, orderBy: position_ASC) {
      id
      slug
      name
      children {
        id
        slug
      }
      position
    }
    brands(orderBy: name_ASC, where: { products_some: { id_not: null }, name_not: null, published: true }) {
      id
      slug
      name
    }
  }
`

export const GET_BROWSE_PRODUCTS = gql`
  query GetBrowseProducts(
    $categoryName: String!
    $brandNames: [String]
    $colors: [String]
    $first: Int!
    $skip: Int!
    $orderBy: ProductOrderByInput!
    $tops: [String]
    $bottoms: [String]
    $available: Boolean
    $forSaleOnly: Boolean
  ) {
    productsConnection(
      category: $categoryName
      tops: $tops
      colors: $colors
      bottoms: $bottoms
      availableOnly: $available
      forSaleOnly: $forSaleOnly
      brands: $brandNames
      orderBy: $orderBy
      first: $first
      skip: $skip
      where: { status: Available }
    ) {
      aggregate {
        count
      }
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
          rentalPrice
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
            displayLong
            displayShort
          }
        }
      }
    }
  }
`
