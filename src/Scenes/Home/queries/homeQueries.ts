import gql from "graphql-tag"

const HomePageProductFragment = gql`
  fragment HomePageProduct on Product {
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
const CustomerTraitsFragment = gql`
  fragment SegmentTraits on Customer {
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

export const GET_HOMEPAGE = gql`
  query Homepage($firstFitPics: Int!, $skipFitPics: Int) {
    banner: view(viewID: "Banner") {
      id
      title
      caption
      type
      properties
    }
    homepage {
      sections {
        title
        tagData {
          tagName
          description
        }
        type
        results {
          ... on Brand {
            id
            name
            since
          }
          ... on Category {
            id
            slug
            name
            image
          }
          ... on Product {
            id
            slug
            name
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
              internalSize {
                id
                display
              }
            }
          }
        }
      }
    }
    reservationFeedback {
      id
      comment
      rating
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
      customer {
        id
        status
        shouldRequestFeedback
        ...SegmentTraits
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
    blogPosts(count: 5) {
      id
      url
      name
      category
      imageURL
    }
    archivalProducts: products(
      where: { AND: [{ tags_some: { name: "Vintage" } }, { status: Available }] }
      first: 12
      orderBy: publishedAt_DESC
    ) {
      id
      slug
      name
      images(size: Thumb) {
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
      ...HomePageProduct
    }
    justAddedTops: products(
      first: 8
      category: "tops"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      ...HomePageProduct
    }
    justAddedBottoms: products(
      first: 8
      category: "bottoms"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      ...HomePageProduct
    }
    fitPicsCount: fitPicsConnection(where: { status: Published }) {
      aggregate {
        count
      }
    }
    fitPics(first: $firstFitPics, skip: $skipFitPics, orderBy: createdAt_DESC, where: { status: Published }) {
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
  ${HomePageProductFragment}
  ${CustomerTraitsFragment}
`
