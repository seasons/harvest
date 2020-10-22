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
  query GetProduct($where: ProductWhereInput!) {
    me {
      customer {
        id
        status
        membership {
          id
          plan {
            id
            itemCount
          }
        }
      }
      bag {
        id
      }
    }
    products(first: 1, where: $where) {
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
        products(first: 5, orderBy: createdAt_DESC, where: { AND: [{ NOT: [$where] }, { status: Available }] }) {
          id
          type
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
      largeImages: images(size: Large) {
        imageId: id
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