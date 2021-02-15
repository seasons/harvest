/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerDetailCreateweightInput, CustomerDetailCreatetopSizesInput, CustomerDetailCreatewaistSizesInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addMeasurements
// ====================================================

export interface addMeasurements_addCustomerDetails {
  __typename: "Customer";
  id: string;
}

export interface addMeasurements {
  addCustomerDetails: addMeasurements_addCustomerDetails;
}

export interface addMeasurementsVariables {
  height?: number | null;
  weight?: CustomerDetailCreateweightInput | null;
  topSizes?: CustomerDetailCreatetopSizesInput | null;
  waistSizes?: CustomerDetailCreatewaistSizesInput | null;
}
