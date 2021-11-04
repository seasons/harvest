import gql from "graphql-tag"
import { HomeBottomSheetFragment_Query } from "../Components/HomeBottomSheet"

const HomePageProductFragment_Product = gql`
  fragment HomePageProductFragment_Product on Product {
    id
    slug
    modelSize {
      id
      display
    }
    brand {
      id
      slug
      name
    }
    images(size: Thumb) {
      id
      url
    }
    variants {
      id
      reservable
      displayShort
    }
  }
`

// Traits we pass to segment on homepage renders
const CustomerTraitsFragment_Customer = gql`
  fragment CustomerTraitsFragment_Customer on Customer {
    bagItems {
      id
    }
    admissions {
      id
      admissable
      authorizationsCount
    }
    user {
      id
      createdAt
    }
    detail {
      id
      shippingAddress {
        id
        state
      }
    }
  }
`

export const HomepageNoCache_Query = gql`
  query HomepageNoCache_Query {
    reservationFeedback {
      id
      feedbacks {
        id
        isCompleted
        questions {
          id
          options
          question
          responses
          type
        }
        variant {
          id
          product {
            id
            name
            retailPrice
            images(size: Thumb) {
              id
              url
            }
          }
        }
      }
    }
    me {
      id
      customer {
        id
        status
        shouldRequestFeedback
        ...CustomerTraitsFragment_Customer
      }
      recentlyViewedProducts {
        id
        slug
        images(size: Thumb) {
          id
          url
        }
        brand {
          id
          name
        }
        variants {
          id
          reservable
          displayShort
        }
      }
      savedItems {
        id
        productVariant {
          id
          product {
            id
            name
            modelSize {
              id
              display
            }
            brand {
              id
              name
            }
            images(size: Medium) {
              id
              url
            }
            variants {
              id
              reservable
              displayShort
            }
          }
        }
      }
    }
  }
  ${CustomerTraitsFragment_Customer}
`

export const Homepage_Query = gql`
  query Homepage_Query($firstFitPics: Int!, $skipFitPics: Int) {
    banner: view(viewID: "Banner") {
      id
      title
      caption
      type
      properties
    }
    featuredCollections: collections(orderBy: updatedAt_DESC, where: { published: true }, first: 5) {
      id
      slug
      title
      subTitle
      displayTextOverlay
      textOverlayColor
      images {
        id
        url
      }
    }
    collections(orderBy: updatedAt_DESC, placements: [Homepage], where: { published: true }) {
      id
      slug
      title
      products(first: 10, orderBy: updatedAt_DESC) {
        id
        name
        brand {
          id
          name
        }
        images(size: Thumb) {
          id
          url
        }
      }
    }
    blogPosts(count: 5) {
      id
      url
      name
      category
      image {
        id
        url
      }
    }
    upcomingProducts: products(first: 10, orderBy: publishedAt_DESC, where: { status: Upcoming }) {
      id
      slug
      name
      brand {
        id
        name
      }
      images(size: Medium) {
        id
        url
      }
    }
    justAddedOuterwear: products(
      first: 8
      category: "outerwear"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      id
      ...HomePageProductFragment_Product
    }

    justAddedAccessories: products(
      first: 16
      category: "accessories"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      id
      ...HomePageProductFragment_Product
    }
    justAddedTops: products(
      first: 8
      category: "tops"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      id
      ...HomePageProductFragment_Product
    }
    justAddedBottoms: products(
      first: 8
      category: "bottoms"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      id
      ...HomePageProductFragment_Product
    }
    fitPicsConnection(first: $firstFitPics, skip: $skipFitPics, orderBy: createdAt_DESC, where: { status: Published }) {
      aggregate {
        count
      }
      edges {
        node {
          id
          author
          location {
            id
            city
            state
          }
          image(size: Medium) {
            id
            url
          }
          includeInstagramHandle
          user {
            id
            customer {
              detail {
                instagramHandle
              }
            }
          }
          products {
            id
            slug
            name
            isSaved
            brand {
              id
              name
            }
            images {
              id
              url
            }
            variants(first: 1) {
              id
            }
          }
          createdAt
        }
      }
    }
    ...HomeBottomSheetFragment_Query
  }
  ${HomePageProductFragment_Product}
  ${HomeBottomSheetFragment_Query}
`
