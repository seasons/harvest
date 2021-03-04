/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceStatus, LineItemIdentityType, CreditNoteReasonCode, CreditNoteStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetUserPaymentData
// ====================================================

export interface GetUserPaymentData_me_customer_paymentPlan {
  __typename: "PaymentPlan";
  id: string;
  planID: string;
  price: number | null;
  name: string | null;
}

export interface GetUserPaymentData_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  name: string | null;
  company: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string;
}

export interface GetUserPaymentData_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  phoneNumber: string | null;
  shippingAddress: GetUserPaymentData_me_customer_detail_shippingAddress | null;
}

export interface GetUserPaymentData_me_customer_invoices_lineItems {
  __typename: "LineItem";
  id: string;
  dateFrom: any | null;
  isTaxed: boolean | null;
  taxAmount: number | null;
  taxRate: number | null;
  discountAmount: number | null;
  description: string;
  entityDescription: string | null;
  entityType: LineItemIdentityType;
  entityId: string | null;
  amount: number | null;
}

export interface GetUserPaymentData_me_customer_invoices_billingAddress {
  __typename: "ChargebeeAddress";
  firstName: string | null;
  lastName: string | null;
  line1: string | null;
  line2: string | null;
  line3: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
}

export interface GetUserPaymentData_me_customer_invoices_creditNotes {
  __typename: "CreditNote";
  id: string;
  reasonCode: CreditNoteReasonCode | null;
  date: any | null;
  total: number | null;
  status: CreditNoteStatus | null;
}

export interface GetUserPaymentData_me_customer_invoices_discounts {
  __typename: "Discount";
  amount: number;
  description: string | null;
}

export interface GetUserPaymentData_me_customer_invoices {
  __typename: "Invoice";
  id: string;
  status: InvoiceStatus | null;
  closingDate: any | null;
  dueDate: any | null;
  amount: number | null;
  lineItems: (GetUserPaymentData_me_customer_invoices_lineItems | null)[] | null;
  billingAddress: GetUserPaymentData_me_customer_invoices_billingAddress | null;
  creditNotes: (GetUserPaymentData_me_customer_invoices_creditNotes | null)[] | null;
  discounts: (GetUserPaymentData_me_customer_invoices_discounts | null)[] | null;
}

export interface GetUserPaymentData_me_customer_billingInfo {
  __typename: "BillingInfo";
  id: string;
  brand: string;
  city: string | null;
  expiration_month: number;
  expiration_year: number;
  last_digits: string;
  name: string | null;
  postal_code: string | null;
  state: string | null;
  street1: string | null;
  street2: string | null;
}

export interface GetUserPaymentData_me_customer {
  __typename: "Customer";
  id: string;
  paymentPlan: GetUserPaymentData_me_customer_paymentPlan | null;
  detail: GetUserPaymentData_me_customer_detail | null;
  invoices: (GetUserPaymentData_me_customer_invoices | null)[] | null;
  billingInfo: GetUserPaymentData_me_customer_billingInfo | null;
}

export interface GetUserPaymentData_me_activeReservation_customer_billingInfo {
  __typename: "BillingInfo";
  id: string;
  last_digits: string;
  street1: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
}

export interface GetUserPaymentData_me_activeReservation_customer {
  __typename: "Customer";
  id: string;
  billingInfo: GetUserPaymentData_me_activeReservation_customer_billingInfo | null;
}

export interface GetUserPaymentData_me_activeReservation {
  __typename: "Reservation";
  id: string;
  customer: GetUserPaymentData_me_activeReservation_customer;
}

export interface GetUserPaymentData_me {
  __typename: "Me";
  id: string;
  customer: GetUserPaymentData_me_customer | null;
  activeReservation: GetUserPaymentData_me_activeReservation | null;
}

export interface GetUserPaymentData {
  me: GetUserPaymentData_me | null;
}
