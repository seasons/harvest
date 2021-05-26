/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ViewType, HomePageSectionType, Rating, QuestionType, CustomerStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: Homepage_Query
// ====================================================

export interface Homepage_Query_banner {
  __typename: "View";
  id: string;
  title: string;
  caption: string | null;
  type: ViewType | null;
  properties: any | null;
}

export interface Homepage_Query_homepage_sections_tagData {
  __typename: "ProductsByTagTagData";
  id: string;
  tagName: string | null;
  description: string | null;
}

export interface Homepage_Query_homepage_sections_results_Collection {
  __typename: "Collection" | "Brand";
}

export interface Homepage_Query_homepage_sections_results_Category {
  __typename: "Category";
  id: string;
  slug: string;
  name: string;
  image: any | null;
}

export interface Homepage_Query_homepage_sections_results_Product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_homepage_sections_results_Product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_Query_homepage_sections_results_Product_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Homepage_Query_homepage_sections_results_Product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  internalSize: Homepage_Query_homepage_sections_results_Product_variants_internalSize | null;
}

export interface Homepage_Query_homepage_sections_results_Product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: Homepage_Query_homepage_sections_results_Product_images[];
  brand: Homepage_Query_homepage_sections_results_Product_brand;
  variants: Homepage_Query_homepage_sections_results_Product_variants[] | null;
}

export type Homepage_Query_homepage_sections_results = Homepage_Query_homepage_sections_results_Collection | Homepage_Query_homepage_sections_results_Category | Homepage_Query_homepage_sections_results_Product;

export interface Homepage_Query_homepage_sections {
  __typename: "HomepageSection";
  id: string;
  title: string | null;
  type: HomePageSectionType;
  tagData: Homepage_Query_homepage_sections_tagData | null;
  results: Homepage_Query_homepage_sections_results[];
}

export interface Homepage_Query_homepage {
  __typename: "Homepage";
  sections: Homepage_Query_homepage_sections[];
}

export interface Homepage_Query_reservationFeedback_feedbacks_questions {
  __typename: "ProductVariantFeedbackQuestion";
  id: string;
  options: string[];
  question: string;
  responses: string[];
  type: QuestionType;
}

export interface Homepage_Query_reservationFeedback_feedbacks_variant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_reservationFeedback_feedbacks_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  retailPrice: number | null;
  images: Homepage_Query_reservationFeedback_feedbacks_variant_product_images[];
}

export interface Homepage_Query_reservationFeedback_feedbacks_variant {
  __typename: "ProductVariant";
  id: string;
  product: Homepage_Query_reservationFeedback_feedbacks_variant_product;
}

export interface Homepage_Query_reservationFeedback_feedbacks {
  __typename: "ProductVariantFeedback";
  id: string;
  isCompleted: boolean;
  questions: Homepage_Query_reservationFeedback_feedbacks_questions[] | null;
  variant: Homepage_Query_reservationFeedback_feedbacks_variant;
}

export interface Homepage_Query_reservationFeedback {
  __typename: "ReservationFeedback";
  id: string;
  comment: string | null;
  rating: Rating | null;
  feedbacks: Homepage_Query_reservationFeedback_feedbacks[] | null;
}

export interface Homepage_Query_me_customer_bagItems {
  __typename: "BagItem";
  id: string;
}

export interface Homepage_Query_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
}

export interface Homepage_Query_me_customer_user {
  __typename: "User";
  id: string;
  createdAt: any;
}

export interface Homepage_Query_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  state: string | null;
}

export interface Homepage_Query_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: Homepage_Query_me_customer_detail_shippingAddress | null;
}

export interface Homepage_Query_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  shouldRequestFeedback: boolean | null;
  bagItems: Homepage_Query_me_customer_bagItems[] | null;
  admissions: Homepage_Query_me_customer_admissions | null;
  user: Homepage_Query_me_customer_user;
  detail: Homepage_Query_me_customer_detail | null;
}

export interface Homepage_Query_me_savedItems_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Homepage_Query_me_savedItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_Query_me_savedItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_me_savedItems_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
}

export interface Homepage_Query_me_savedItems_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: Homepage_Query_me_savedItems_productVariant_product_modelSize | null;
  brand: Homepage_Query_me_savedItems_productVariant_product_brand;
  images: Homepage_Query_me_savedItems_productVariant_product_images[];
  variants: Homepage_Query_me_savedItems_productVariant_product_variants[] | null;
}

export interface Homepage_Query_me_savedItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: Homepage_Query_me_savedItems_productVariant_product;
}

export interface Homepage_Query_me_savedItems {
  __typename: "BagItem";
  id: string;
  productVariant: Homepage_Query_me_savedItems_productVariant;
}

export interface Homepage_Query_me {
  __typename: "Me";
  id: string | null;
  customer: Homepage_Query_me_customer | null;
  savedItems: Homepage_Query_me_savedItems[] | null;
}

export interface Homepage_Query_featuredCollections_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_featuredCollections {
  __typename: "Collection";
  id: string;
  slug: string;
  title: string | null;
  subTitle: string | null;
  displayTextOverlay: boolean;
  textOverlayColor: string | null;
  images: Homepage_Query_featuredCollections_images[] | null;
}

export interface Homepage_Query_collections_products_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_Query_collections_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_collections_products {
  __typename: "Product";
  id: string;
  name: string;
  brand: Homepage_Query_collections_products_brand;
  images: Homepage_Query_collections_products_images[];
}

export interface Homepage_Query_collections {
  __typename: "Collection";
  id: string;
  slug: string;
  title: string | null;
  products: Homepage_Query_collections_products[] | null;
}

export interface Homepage_Query_blogPosts_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_blogPosts {
  __typename: "BlogPost";
  id: string;
  url: string | null;
  name: string | null;
  category: string | null;
  image: Homepage_Query_blogPosts_image | null;
}

export interface Homepage_Query_archivalProducts_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_archivalProducts {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: Homepage_Query_archivalProducts_images[];
}

export interface Homepage_Query_justAddedOuterwear_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Homepage_Query_justAddedOuterwear_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface Homepage_Query_justAddedOuterwear_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_justAddedOuterwear_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
}

export interface Homepage_Query_justAddedOuterwear {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: Homepage_Query_justAddedOuterwear_modelSize | null;
  brand: Homepage_Query_justAddedOuterwear_brand;
  images: Homepage_Query_justAddedOuterwear_images[];
  variants: Homepage_Query_justAddedOuterwear_variants[] | null;
}

export interface Homepage_Query_justAddedTops_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Homepage_Query_justAddedTops_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface Homepage_Query_justAddedTops_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_justAddedTops_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
}

export interface Homepage_Query_justAddedTops {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: Homepage_Query_justAddedTops_modelSize | null;
  brand: Homepage_Query_justAddedTops_brand;
  images: Homepage_Query_justAddedTops_images[];
  variants: Homepage_Query_justAddedTops_variants[] | null;
}

export interface Homepage_Query_justAddedBottoms_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Homepage_Query_justAddedBottoms_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface Homepage_Query_justAddedBottoms_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_justAddedBottoms_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
}

export interface Homepage_Query_justAddedBottoms {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: Homepage_Query_justAddedBottoms_modelSize | null;
  brand: Homepage_Query_justAddedBottoms_brand;
  images: Homepage_Query_justAddedBottoms_images[];
  variants: Homepage_Query_justAddedBottoms_variants[] | null;
}

export interface Homepage_Query_fitPicsCount_aggregate {
  __typename: "AggregateFitPic";
  count: number;
}

export interface Homepage_Query_fitPicsCount {
  __typename: "FitPicConnection";
  aggregate: Homepage_Query_fitPicsCount_aggregate;
}

export interface Homepage_Query_fitPics_location {
  __typename: "Location";
  id: string;
  city: string | null;
  state: string | null;
}

export interface Homepage_Query_fitPics_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_fitPics_user_customer_detail {
  __typename: "CustomerDetail";
  instagramHandle: string | null;
}

export interface Homepage_Query_fitPics_user_customer {
  __typename: "Customer";
  detail: Homepage_Query_fitPics_user_customer_detail | null;
}

export interface Homepage_Query_fitPics_user {
  __typename: "User";
  id: string;
  customer: Homepage_Query_fitPics_user_customer | null;
}

export interface Homepage_Query_fitPics_products_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_Query_fitPics_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_fitPics_products_variants {
  __typename: "ProductVariant";
  id: string;
}

export interface Homepage_Query_fitPics_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  isSaved: boolean | null;
  brand: Homepage_Query_fitPics_products_brand;
  images: Homepage_Query_fitPics_products_images[];
  variants: Homepage_Query_fitPics_products_variants[] | null;
}

export interface Homepage_Query_fitPics {
  __typename: "FitPic";
  id: string;
  author: string;
  location: Homepage_Query_fitPics_location | null;
  image: Homepage_Query_fitPics_image;
  includeInstagramHandle: boolean;
  user: Homepage_Query_fitPics_user;
  products: Homepage_Query_fitPics_products[] | null;
  createdAt: any;
}

export interface Homepage_Query_featuredBrands {
  __typename: "Brand";
  id: string;
  name: string;
  slug: string;
}

export interface Homepage_Query_launches_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_Query_launches_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  published: boolean;
  websiteUrl: string | null;
  name: string;
  logoImage: Homepage_Query_launches_brand_logoImage | null;
}

export interface Homepage_Query_launches_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  title: string | null;
}

export interface Homepage_Query_launches {
  __typename: "Launch";
  id: string;
  launchAt: any;
  brand: Homepage_Query_launches_brand | null;
  collection: Homepage_Query_launches_collection | null;
}

export interface Homepage_Query {
  banner: Homepage_Query_banner | null;
  homepage: Homepage_Query_homepage | null;
  reservationFeedback: Homepage_Query_reservationFeedback | null;
  me: Homepage_Query_me | null;
  featuredCollections: (Homepage_Query_featuredCollections | null)[];
  collections: (Homepage_Query_collections | null)[];
  blogPosts: (Homepage_Query_blogPosts | null)[];
  archivalProducts: (Homepage_Query_archivalProducts | null)[];
  justAddedOuterwear: (Homepage_Query_justAddedOuterwear | null)[];
  justAddedTops: (Homepage_Query_justAddedTops | null)[];
  justAddedBottoms: (Homepage_Query_justAddedBottoms | null)[];
  fitPicsCount: Homepage_Query_fitPicsCount;
  fitPics: Homepage_Query_fitPics[];
  __typename: "Query";
  featuredBrands: (Homepage_Query_featuredBrands | null)[];
  launches: (Homepage_Query_launches | null)[];
}

export interface Homepage_QueryVariables {
  firstFitPics: number;
  skipFitPics?: number | null;
}