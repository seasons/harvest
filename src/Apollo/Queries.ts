import gql from "graphql-tag"

const commonProductVariantFragment = gql`
  fragment CommonProductVariant on ProductVariant {
    id
    manufacturerSizes {
      display
    }
    internalSize {
      top {
        id
        letter
        sleeve
        shoulder
        chest
        neck
        length
      }
      bottom {
        type
        value
      }
      productType
      display
    }
    total
    reservable
    nonReservable
    reserved
    isInBag
    isSaved
    isWanted
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($productID: ID!) {
    product(where: { id: $productID }) {
      id
      slug
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
        products(first: 5, where: { id_not: $productID }) {
          id
          images {
            id
            url
          }
          brand {
            name
          }
          variants {
            ...CommonProductVariant
          }
        }
      }
      outerMaterials
      innerMaterials
      images {
        id
        url
      }
      type
      variants {
        ...CommonProductVariant
      }
    }
  }
  ${commonProductVariantFragment}
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
        images {
          id
          url
        }
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
              images {
                id
                url
              }
            }
          }
        }
      }
    }
  }
`
