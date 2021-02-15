/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCustomerFitPicItems
// ====================================================

export interface GetCustomerFitPicItems_fitPic_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCustomerFitPicItems_fitPic_products_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetCustomerFitPicItems_fitPic_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCustomerFitPicItems_fitPic_products {
  __typename: "Product";
  id: string;
  name: string;
  brand: GetCustomerFitPicItems_fitPic_products_brand;
  images: GetCustomerFitPicItems_fitPic_products_images[];
}

export interface GetCustomerFitPicItems_fitPic {
  __typename: "FitPic";
  id: string;
  image: GetCustomerFitPicItems_fitPic_image;
  products: GetCustomerFitPicItems_fitPic_products[] | null;
}

export interface GetCustomerFitPicItems {
  fitPic: GetCustomerFitPicItems_fitPic | null;
}

export interface GetCustomerFitPicItemsVariables {
  fitPicID: string;
}
