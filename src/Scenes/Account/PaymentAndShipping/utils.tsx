import moment from "moment"

export const centsToDollars = (cents) => `\$${cents / 100}`
export const formatInvoiceDate = (isoString) => {
  return moment(isoString).format("MMM D, YYYY")
}
