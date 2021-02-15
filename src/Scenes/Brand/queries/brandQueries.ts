import gql from "graphql-tag"

export const GET_BRAND = gql`
  query GetBrandAndProducts($brandID: ID!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    brand(where: { id: $brandID }) {
      id
      name
      since
      description
      websiteUrl
      basedIn
      images {
        id
        url
      }
      products(first: $first, skip: $skip, orderBy: $orderBy, where: { status: Available }) {
        id
        slug
        name
        description
        images(size: Thumb) {
          id
          url
        }
        modelHeight
        externalURL
        retailPrice
        status
        createdAt
        updatedAt
        variants {
          id
          displayShort
          displayLong
          total
          reservable
          nonReservable
          reserved
          isSaved
        }
      }
    }
  }
`
