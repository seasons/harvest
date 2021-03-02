import gql from "graphql-tag"

const commonProductVariantFragment = gql`
  fragment CommonProductVariant on ProductVariant {
    id
    displayLong
    displayShort
    total
    reservable
    nonReservable
    reserved
    isInBag
    isSaved
    hasRestockNotification
    price {
      id
      buyNewPrice
      buyUsedAvailableForSale
      buyNewAvailableForSale
      buyNewEnabled
      buyUsedEnabled
      buyUsedPrice
    }
    manufacturerSizes {
      id
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
        waist
        rise
        hem
        inseam
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($where: ProductWhereInput!) {
    me {
      id
      customer {
        id
        status
        user {
          id
        }
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
      savedItems {
        id
      }
    }
    products(first: 1, where: $where) {
      id
      slug
      name
      productFit
      modelHeight
      category {
        id
        name
      }
      description
      retailPrice
      modelSize {
        id
        display
      }
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
        websiteUrl
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
        internalSize {
          id
          bottom {
            id
            waist
            rise
            hem
            inseam
          }
          top {
            id
            length
            sleeve
            shoulder
            chest
          }
        }
        ...CommonProductVariant
      }
    }
  }
  ${commonProductVariantFragment}
`
