/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserPaymentData
// ====================================================

export interface GetUserPaymentData_me_customer_detail_shippingAddress {
  __typename: "Location";
  name: string;
  company: string | null;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export interface GetUserPaymentData_me_customer_detail {
  __typename: "CustomerDetail";
  phoneNumber: string | null;
  shippingAddress: GetUserPaymentData_me_customer_detail_shippingAddress | null;
}

export interface GetUserPaymentData_me_customer_billingInfo {
  __typename: "BillingInfo";
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
  detail: GetUserPaymentData_me_customer_detail | null;
  billingInfo: GetUserPaymentData_me_customer_billingInfo | null;
}

export interface GetUserPaymentData_me_activeReservation_customer_billingInfo {
  __typename: "BillingInfo";
  last_digits: string;
  street1: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
}

export interface GetUserPaymentData_me_activeReservation_customer {
  __typename: "Customer";
  billingInfo: GetUserPaymentData_me_activeReservation_customer_billingInfo | null;
}

export interface GetUserPaymentData_me_activeReservation {
  __typename: "Reservation";
  customer: GetUserPaymentData_me_activeReservation_customer;
}

export interface GetUserPaymentData_me {
  __typename: "Me";
  customer: GetUserPaymentData_me_customer;
  activeReservation: GetUserPaymentData_me_activeReservation | null;
}

export interface GetUserPaymentData {
  me: GetUserPaymentData_me | null;
}
