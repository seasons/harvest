import gql from "graphql-tag"

const commonProductVariantFragment = gql`
  fragment CommonProductVariant on ProductVariant {
    id
    total
    reservable
    nonReservable
    reserved
    isInBag
    isSaved
    isWanted
    manufacturerSizes {
      id
      display
    }
    internalSize {
      id
      productType
      display
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
        id
        type
        value
      }
    }
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
        id
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
        products(first: 5, orderBy: createdAt_DESC, where: { AND: [{ id_not: $productID }, { status: Available }] }) {
          id
          images(size: Thumb) {
            id
            url
          }
          brand {
            id
            name
          }
          variants {
            ...CommonProductVariant
          }
        }
      }
      outerMaterials
      innerMaterials
      images(size: Thumb) {
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
              images(size: Thumb) {
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
