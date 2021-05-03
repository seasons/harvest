import gql from "graphql-tag"

import { ProductBuyCTA_ProductFragment, ProductBuyCTA_ProductVariantFragment } from "@seasons/eclipse"
import { ProductMeasurementsFragment_ProductVariant } from "./Components/ProductMeasurements"

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
    ...ProductBuyCTA_ProductVariantFragment
  }
  ${ProductBuyCTA_ProductVariantFragment}
`

export const GET_PRODUCT = gql`
  query GetProduct($where: ProductWhereInput!) {
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
        id
        ...ProductMeasurementsFragment_ProductVariant
        ...CommonProductVariant
      }
      ...ProductBuyCTA_ProductFragment
    }
  }
  ${ProductMeasurementsFragment_ProductVariant}
  ${ProductBuyCTA_ProductFragment}
  ${commonProductVariantFragment}
`
