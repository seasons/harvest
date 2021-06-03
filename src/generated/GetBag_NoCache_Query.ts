/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus, PaymentPlanTier, PauseType, ReservationStatus, ReservationPhase, BagItemStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBag_NoCache_Query
// ====================================================

export interface GetBag_NoCache_Query_me_customer_invoices {
  __typename: "Invoice";
  id: string;
  subscriptionId: string | null;
}

export interface GetBag_NoCache_Query_me_customer_user {
  __typename: "User";
  id: string;
}

export interface GetBag_NoCache_Query_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  city: string | null;
  state: string | null;
  address1: string | null;
  zipCode: string;
}

export interface GetBag_NoCache_Query_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: GetBag_NoCache_Query_me_customer_detail_shippingAddress | null;
}

export interface GetBag_NoCache_Query_me_customer_membership_subscription {
  __typename: "CustomerMembershipSubscriptionData";
  id: string;
  nextBillingAt: any | null;
  currentTermStart: any;
  currentTermEnd: any;
}

export interface GetBag_NoCache_Query_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  tier: PaymentPlanTier | null;
  price: number | null;
  itemCount: number | null;
  pauseWithItemsPrice: number | null;
}

export interface GetBag_NoCache_Query_me_customer_membership_pauseRequests {
  __typename: "PauseRequest";
  id: string;
  pauseType: PauseType;
  resumeDate: any | null;
  pauseDate: any | null;
  pausePending: boolean;
}

export interface GetBag_NoCache_Query_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  subscription: GetBag_NoCache_Query_me_customer_membership_subscription | null;
  plan: GetBag_NoCache_Query_me_customer_membership_plan | null;
  pauseRequests: GetBag_NoCache_Query_me_customer_membership_pauseRequests[] | null;
}

export interface GetBag_NoCache_Query_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  shouldPayForNextReservation: boolean | null;
  invoices: (GetBag_NoCache_Query_me_customer_invoices | null)[] | null;
  user: GetBag_NoCache_Query_me_customer_user;
  detail: GetBag_NoCache_Query_me_customer_detail | null;
  membership: GetBag_NoCache_Query_me_customer_membership | null;
}

export interface GetBag_NoCache_Query_me_activeReservation_returnedPackage_shippingLabel {
  __typename: "Label";
  id: string;
  trackingURL: string | null;
}

export interface GetBag_NoCache_Query_me_activeReservation_returnedPackage {
  __typename: "Package";
  id: string;
  shippingLabel: GetBag_NoCache_Query_me_activeReservation_returnedPackage_shippingLabel;
}

export interface GetBag_NoCache_Query_me_activeReservation_sentPackage_shippingLabel {
  __typename: "Label";
  id: string;
  trackingURL: string | null;
}

export interface GetBag_NoCache_Query_me_activeReservation_sentPackage {
  __typename: "Package";
  id: string;
  shippingLabel: GetBag_NoCache_Query_me_activeReservation_sentPackage_shippingLabel;
}

export interface GetBag_NoCache_Query_me_activeReservation {
  __typename: "Reservation";
  id: string;
  returnAt: any | null;
  shipped: boolean;
  returnedAt: any | null;
  createdAt: any;
  status: ReservationStatus;
  phase: ReservationPhase;
  updatedAt: any;
  returnedPackage: GetBag_NoCache_Query_me_activeReservation_returnedPackage | null;
  sentPackage: GetBag_NoCache_Query_me_activeReservation_sentPackage | null;
}

export interface GetBag_NoCache_Query_me_bag_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetBag_NoCache_Query_me_bag_productVariant_product_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBag_NoCache_Query_me_bag_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
  websiteUrl: string | null;
  logoImage: GetBag_NoCache_Query_me_bag_productVariant_product_brand_logoImage | null;
}

export interface GetBag_NoCache_Query_me_bag_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBag_NoCache_Query_me_bag_productVariant_product_variants_price {
  __typename: "ProductVariantPrice";
  id: string;
  retailPrice: number | null;
}

export interface GetBag_NoCache_Query_me_bag_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  hasRestockNotification: boolean;
  displayShort: string | null;
  displayLong: string | null;
  price: GetBag_NoCache_Query_me_bag_productVariant_product_variants_price;
}

export interface GetBag_NoCache_Query_me_bag_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: GetBag_NoCache_Query_me_bag_productVariant_product_modelSize | null;
  brand: GetBag_NoCache_Query_me_bag_productVariant_product_brand;
  images: GetBag_NoCache_Query_me_bag_productVariant_product_images[];
  variants: GetBag_NoCache_Query_me_bag_productVariant_product_variants[] | null;
}

export interface GetBag_NoCache_Query_me_bag_productVariant_price {
  __typename: "ProductVariantPrice";
  id: string;
  buyNewPrice: number | null;
  buyNewEnabled: boolean;
  buyNewAvailableForSale: boolean | null;
  buyUsedAvailableForSale: boolean | null;
  buyUsedPrice: number | null;
  buyUsedEnabled: boolean;
}

export interface GetBag_NoCache_Query_me_bag_productVariant {
  __typename: "ProductVariant";
  id: string;
  purchased: boolean;
  product: GetBag_NoCache_Query_me_bag_productVariant_product;
  price: GetBag_NoCache_Query_me_bag_productVariant_price;
}

export interface GetBag_NoCache_Query_me_bag {
  __typename: "BagItem";
  id: string;
  position: number | null;
  saved: boolean | null;
  status: BagItemStatus;
  productVariant: GetBag_NoCache_Query_me_bag_productVariant;
}

export interface GetBag_NoCache_Query_me {
  __typename: "Me";
  id: string | null;
  customer: GetBag_NoCache_Query_me_customer | null;
  activeReservation: GetBag_NoCache_Query_me_activeReservation | null;
  bag: GetBag_NoCache_Query_me_bag[] | null;
}

export interface GetBag_NoCache_Query {
  me: GetBag_NoCache_Query_me | null;
  __typename: "Query";
}
