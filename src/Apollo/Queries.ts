import gql from "graphql-tag"

export const GET_PRODUCT = gql`
  query GetProduct($productID: ID!) {
    product(where: { id: $productID }) {
      id
      name
      description
      retailPrice
      modelSize
      modelHeight
      color {
        name
      }
      secondaryColor {
        name
      }
      brand {
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
        modelSize
        modelHeight
        brand {
          name
        }
        images
      }
    }
  }
`

export const GET_BAG = gql`
  query GetBagAndSavedItems {
    me {
      bag {
        id
        productVariant {
          id
          product {
            id
          }
        }
        position
        saved
        status
      }
      savedItems {
        id
        productVariant {
          id
          product {
            id
          }
        }
        saved
      }
    }
  }
`
