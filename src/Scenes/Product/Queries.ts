import gql from "graphql-tag"

import {
  ProductBuyCTAFragment_Product,
  ProductBuyCTAFragment_ProductVariant,
  ProductConditionSectionFragment_PhysicalProductQualityReport,
} from "@seasons/eclipse"

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
    isInCart
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
      type
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
    nextReservablePhysicalProduct {
      id
      reports {
        id
        createdAt
        published
        ...ProductConditionSectionFragment_PhysicalProductQualityReport
      }
    }
    ...ProductBuyCTAFragment_ProductVariant
  }
  ${ProductBuyCTAFragment_ProductVariant}
  ${ProductConditionSectionFragment_PhysicalProductQualityReport}
`

export const Product_NoCache_Query = gql`
  query Product_NoCache_Query {
    me {
      id
      customer {
        id
        status
        user {
          id
        }
      }
      bag {
        id
      }
      savedItems {
        id
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($where: ProductWhereInput!) {
    products(first: 1, where: $where) {
      id
      slug
      name
      productFit
      modelHeight
      relatedProducts(take: 10) {
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
        color {
          id
        }
        retailPrice
        rentalPrice
        variants {
          ...CommonProductVariant
          isInCart
        }
      }
      category {
        id
        name
        productType
      }
      description
      retailPrice
      rentalPrice
      modelSize {
        id
        display
        type
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
          rentalPrice
          retailPrice
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
      ...ProductBuyCTAFragment_Product
    }
  }
  ${ProductMeasurementsFragment_ProductVariant}
  ${ProductBuyCTAFragment_Product}
  ${commonProductVariantFragment}
`
