import gql from "graphql-tag"

export const GET_PRODUCT = gql`
  query GetProduct($productID: ID!) {
    product(where: { id: $productID }) {
      id
      name
      description
      retailPrice
      modelSize {
        display
      }
      modelHeight
      color {
        id
        name
      }
      secondaryColor {
        id
        name
      }
      brand {
        id
        slug
        name
        logo
        since
      }
      outerMaterials
      innerMaterials
      images
      isSaved
      variants {
        id
        size
        total
        reservable
        nonReservable
        reserved
        isSaved
        isWanted
      }
    }
  }
`

export const GET_COLLECTION = gql`
  query GetCollection($collectionID: ID!) {
    collection(where: { id: $collectionID }) {
      id
      slug
      descriptionTop
      descriptionBottom
      images
      title
      subTitle
      products {
        id
        slug
        name
        description
        retailPrice
        modelSize {
          display
        }
        modelHeight
        brand {
          name
        }
        images
      }
    }
  }
`

export const ACTIVE_RESERVATION = gql`
  query ActiveReservation {
    me {
      activeReservation {
        id
        shipped
        createdAt
        products {
          id
          seasonsUID
          inventoryStatus
          productStatus
          productVariant {
            size
            product {
              name
              retailPrice
              brand {
                name
              }
              images
            }
          }
        }
      }
    }
  }
`
