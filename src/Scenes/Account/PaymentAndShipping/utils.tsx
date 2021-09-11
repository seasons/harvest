import moment from "moment"

export const centsToDollars = (cents) => `\$${(cents / 100).toFixed(2)}`
export const formatInvoiceDate = (isoString, withYear = true) => {
  return moment(isoString).format(`MMM D${withYear ? ", YYYY" : ""}`)
}

export const getAdjustedInvoiceTotal = (invoice) =>
  centsToDollars(
    invoice.price -
      (invoice.creditNotes?.reduce((totalRefunded, curCreditNote) => totalRefunded + curCreditNote.total, 0) || 0)
  )
