/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BagItemStatus {
  Added = "Added",
  Received = "Received",
  Reserved = "Reserved",
}

export enum BrandOrderByInput {
  basedIn_ASC = "basedIn_ASC",
  basedIn_DESC = "basedIn_DESC",
  brandCode_ASC = "brandCode_ASC",
  brandCode_DESC = "brandCode_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  description_ASC = "description_ASC",
  description_DESC = "description_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  isPrimaryBrand_ASC = "isPrimaryBrand_ASC",
  isPrimaryBrand_DESC = "isPrimaryBrand_DESC",
  logo_ASC = "logo_ASC",
  logo_DESC = "logo_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  since_ASC = "since_ASC",
  since_DESC = "since_DESC",
  slug_ASC = "slug_ASC",
  slug_DESC = "slug_DESC",
  tier_ASC = "tier_ASC",
  tier_DESC = "tier_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
  websiteUrl_ASC = "websiteUrl_ASC",
  websiteUrl_DESC = "websiteUrl_DESC",
}

export enum HomePageSectionType {
  Brands = "Brands",
  CollectionGroups = "CollectionGroups",
  HomepageProductRails = "HomepageProductRails",
  Products = "Products",
}

export enum InventoryStatus {
  NonReservable = "NonReservable",
  Reservable = "Reservable",
  Reserved = "Reserved",
}

export enum Material {
  Acetate = "Acetate",
  Acrylic = "Acrylic",
  Alpaca = "Alpaca",
  CalfLeather = "CalfLeather",
  Camel = "Camel",
  CamelHair = "CamelHair",
  Cashmere = "Cashmere",
  Cotton = "Cotton",
  CottonPoplin = "CottonPoplin",
  CowLeather = "CowLeather",
  Cupro = "Cupro",
  Denim = "Denim",
  DuckDown = "DuckDown",
  DuckFeathers = "DuckFeathers",
  Elastane = "Elastane",
  Esterlane = "Esterlane",
  Feather = "Feather",
  FeatherDown = "FeatherDown",
  GooseDown = "GooseDown",
  LambLeather = "LambLeather",
  LambSkin = "LambSkin",
  Lambswool = "Lambswool",
  Leather = "Leather",
  Lyocell = "Lyocell",
  MerinoWool = "MerinoWool",
  Mesh = "Mesh",
  Modacrylic = "Modacrylic",
  Mohair = "Mohair",
  Nylon = "Nylon",
  OrganicCotton = "OrganicCotton",
  PVC = "PVC",
  PolyAcetate = "PolyAcetate",
  PolySatin = "PolySatin",
  Polyamide = "Polyamide",
  Polyester = "Polyester",
  Polyethylene = "Polyethylene",
  Polyurethane = "Polyurethane",
  PolyurethanicResin = "PolyurethanicResin",
  Rayon = "Rayon",
  RecycledPolyester = "RecycledPolyester",
  RecycledWool = "RecycledWool",
  SheepLeather = "SheepLeather",
  Silk = "Silk",
  Spandex = "Spandex",
  Suede = "Suede",
  Taffeta = "Taffeta",
  Tartan = "Tartan",
  Triacetate = "Triacetate",
  Velcro = "Velcro",
  VirginWool = "VirginWool",
  Viscose = "Viscose",
  WaxCoating = "WaxCoating",
  WhiteDuckDown = "WhiteDuckDown",
  WhiteGooseDown = "WhiteGooseDown",
  Wool = "Wool",
}

export enum PhysicalProductStatus {
  Clean = "Clean",
  Damaged = "Damaged",
  Lost = "Lost",
  New = "New",
  Used = "Used",
}

export enum Plan {
  AllAccess = "AllAccess",
  Essential = "Essential",
}

export enum ProductOrderByInput {
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  description_ASC = "description_ASC",
  description_DESC = "description_DESC",
  externalURL_ASC = "externalURL_ASC",
  externalURL_DESC = "externalURL_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  images_ASC = "images_ASC",
  images_DESC = "images_DESC",
  modelHeight_ASC = "modelHeight_ASC",
  modelHeight_DESC = "modelHeight_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  retailPrice_ASC = "retailPrice_ASC",
  retailPrice_DESC = "retailPrice_DESC",
  slug_ASC = "slug_ASC",
  slug_DESC = "slug_DESC",
  status_ASC = "status_ASC",
  status_DESC = "status_DESC",
  tags_ASC = "tags_ASC",
  tags_DESC = "tags_DESC",
  type_ASC = "type_ASC",
  type_DESC = "type_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
}

export enum ProductStatus {
  Available = "Available",
  NotAvailable = "NotAvailable",
}

export enum PushNotificationStatus {
  Blocked = "Blocked",
  Denied = "Denied",
  Granted = "Granted",
}

export enum QuestionType {
  FreeResponse = "FreeResponse",
  MultipleChoice = "MultipleChoice",
}

export enum Rating {
  Disliked = "Disliked",
  Loved = "Loved",
  Ok = "Ok",
}

export interface AddressInput {
  city: string;
  postalCode: string;
  state: string;
  street1: string;
  street2?: string | null;
}

export interface ReserveItemsOptions {
  dryRun?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
