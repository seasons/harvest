import { gql } from "@apollo/client"
import { ReservationHistoryTabFragment_Customer } from "./ReservationHistoryTab/ReservationHistoryTab"
import { SavedItemsTabFragment_Me } from "./SavedItemsTab/SavedItemsTab"

export const SavedTab_Query = gql`
  query SavedTab_Query {
    me {
      id
      ...SavedItemsTabFragment_Me
    }
  }
  ${SavedItemsTabFragment_Me}
`

export const ReservationHistoryTab_Query = gql`
  query ReservationHistoryTab_Query {
    me {
      id
      customer {
        ...ReservationHistoryTabFragment_Customer
      }
    }
  }
  ${ReservationHistoryTabFragment_Customer}
`
