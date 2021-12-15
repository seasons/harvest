import { OrderFragment_Order } from "@seasons/eclipse"
import gql from "graphql-tag"
import { BagFragment_Me } from "./Bag"
import { BagSectionFragment_BagSection } from "./Components/BagSection/BagSection"
import { BagTabPrimaryCTAFragment_Me } from "./Components/BagTabPrimaryCTA/BagTabPrimaryCTA"
import { BuyTabFragment_Me } from "./Components/Tabs/BuyTab"

export const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($input: SubmitOrderInput!) {
    submitOrder(input: $input) {
      id
      ...OrderFragment_Order
    }
  }
  ${OrderFragment_Order}
`

export const CREATE_DRAFT_ORDER = gql`
  mutation ProductVariantCreateDraftOrder($input: CreateDraftedOrderInput!) {
    createDraftedOrder(input: $input) {
      id
      ...OrderFragment_Order
    }
  }
  ${OrderFragment_Order}
`

export const GET_LOCAL_BAG_ITEMS = gql`
  query GetLocalBagItems($ids: [ID!]) {
    productVariants(where: { id_in: $ids }) {
      id
      displayShort
      product {
        id
        slug
        name
        rentalPrice
        retailPrice
        brand {
          id
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

export const GetBag_NoCache_Query = gql`
  query GetBag_NoCache_Query {
    me {
      bagSections {
        ...BagSectionFragment_BagSection
      }
      ...BagFragment_Me
      ...BuyTabFragment_Me
      ...BagTabPrimaryCTAFragment_Me
    }
  }
  ${BagSectionFragment_BagSection}
  ${BuyTabFragment_Me}
  ${BagFragment_Me}
  ${BagTabPrimaryCTAFragment_Me}
`

export const ADD_TO_BAG = gql`
  mutation AddToBag($id: ID!) {
    addToBag(item: $id) {
      id
    }
  }
`

export const DELETE_BAG_ITEM = gql`
  mutation deleteBagItem($itemID: ID!) {
    deleteBagItem(itemID: $itemID)
  }
`
