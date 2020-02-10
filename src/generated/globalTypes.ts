/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BagItemStatus {
  Added = "Added",
  Received = "Received",
  Reserved = "Reserved",
}

export enum HomePageSectionType {
  CollectionGroups = "CollectionGroups",
  HomepageProductRails = "HomepageProductRails",
  Products = "Products",
}

export enum InventoryStatus {
  NonReservable = "NonReservable",
  Reservable = "Reservable",
  Reserved = "Reserved",
}

export enum LocationType {
  Cleaner = "Cleaner",
  Customer = "Customer",
  Office = "Office",
  Warehouse = "Warehouse",
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
  CowLeather = "CowLeather",
  Cupro = "Cupro",
  Denim = "Denim",
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
  modelSize_ASC = "modelSize_ASC",
  modelSize_DESC = "modelSize_DESC",
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
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
}

export enum ProductStatus {
  Available = "Available",
  NotAvailable = "NotAvailable",
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  XL = "XL",
  XS = "XS",
  XXL = "XXL",
}

export interface ReserveItemsOptions {
  dryRun?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
