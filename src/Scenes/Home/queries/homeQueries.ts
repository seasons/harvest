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
      internalSize {
        id
        display
      }
    }
  }
`

export const GET_HOMEPAGE = gql`
  query Homepage($firstFitPics: Int!, $skipFitPics: Int) {
    homepage {
      sections {
        title
        type
        results {
          ... on Brand {
            id
            name
            since
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
              internalSize {
                id
                display
              }
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
      createdAt
    }
  }
  ${HomePageProductFragment}
`