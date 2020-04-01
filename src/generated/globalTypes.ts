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

export enum BottomSizeType {
  EU = "EU",
  JP = "JP",
  Letter = "Letter",
  US = "US",
  WxL = "WxL",
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

export enum BrandTier {
  Boutique = "Boutique",
  Discovery = "Discovery",
  Local = "Local",
  Niche = "Niche",
  Retro = "Retro",
  Tier0 = "Tier0",
  Tier1 = "Tier1",
  Tier2 = "Tier2",
  Upcoming = "Upcoming",
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

export enum LetterSize {
  L = "L",
  M = "M",
  S = "S",
  XL = "XL",
  XS = "XS",
  XXL = "XXL",
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

export enum ProductType {
  Accessory = "Accessory",
  Bottom = "Bottom",
  Shoe = "Shoe",
  Top = "Top",
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

export enum UserRole {
  Admin = "Admin",
  Customer = "Customer",
  Partner = "Partner",
}

export interface AddressInput {
  city: string
  postalCode: string
  state: string
  street1: string
  street2?: string | null
}

export interface BottomSizeCreateInput {
  id?: string | null
  type?: BottomSizeType | null
  value?: string | null
  waist?: number | null
  rise?: number | null
  hem?: number | null
  inseam?: number | null
}

export interface BottomSizeCreateOneInput {
  create?: BottomSizeCreateInput | null
  connect?: BottomSizeWhereUniqueInput | null
}

export interface BottomSizeUpdateDataInput {
  type?: BottomSizeType | null
  value?: string | null
  waist?: number | null
  rise?: number | null
  hem?: number | null
  inseam?: number | null
}

export interface BottomSizeUpdateOneInput {
  create?: BottomSizeCreateInput | null
  update?: BottomSizeUpdateDataInput | null
  upsert?: BottomSizeUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: BottomSizeWhereUniqueInput | null
}

export interface BottomSizeUpsertNestedInput {
  update: BottomSizeUpdateDataInput
  create: BottomSizeCreateInput
}

export interface BottomSizeWhereUniqueInput {
  id?: string | null
}

export interface BrandCreateOneWithoutProductsInput {
  create?: BrandCreateWithoutProductsInput | null
  connect?: BrandWhereUniqueInput | null
}

export interface BrandCreateWithoutProductsInput {
  id?: string | null
  slug: string
  brandCode: string
  description?: string | null
  isPrimaryBrand?: boolean | null
  logo?: any | null
  name: string
  basedIn?: string | null
  since?: any | null
  tier: BrandTier
  websiteUrl?: string | null
}

export interface BrandUpdateOneRequiredWithoutProductsInput {
  create?: BrandCreateWithoutProductsInput | null
  update?: BrandUpdateWithoutProductsDataInput | null
  upsert?: BrandUpsertWithoutProductsInput | null
  connect?: BrandWhereUniqueInput | null
}

export interface BrandUpdateWithoutProductsDataInput {
  slug?: string | null
  brandCode?: string | null
  description?: string | null
  isPrimaryBrand?: boolean | null
  logo?: any | null
  name?: string | null
  basedIn?: string | null
  since?: any | null
  tier?: BrandTier | null
  websiteUrl?: string | null
}

export interface BrandUpsertWithoutProductsInput {
  update: BrandUpdateWithoutProductsDataInput
  create: BrandCreateWithoutProductsInput
}

export interface BrandWhereUniqueInput {
  id?: string | null
  slug?: string | null
  brandCode?: string | null
}

export interface CategoryCreateManyWithoutChildrenInput {
  create?: CategoryCreateWithoutChildrenInput[] | null
  connect?: CategoryWhereUniqueInput[] | null
}

export interface CategoryCreateOneWithoutProductsInput {
  create?: CategoryCreateWithoutProductsInput | null
  connect?: CategoryWhereUniqueInput | null
}

export interface CategoryCreateWithoutChildrenInput {
  id?: string | null
  slug: string
  name: string
  image?: any | null
  description?: string | null
  visible?: boolean | null
  products?: ProductCreateManyWithoutCategoryInput | null
}

export interface CategoryCreateWithoutProductsInput {
  id?: string | null
  slug: string
  name: string
  image?: any | null
  description?: string | null
  visible?: boolean | null
  children?: CategoryCreateManyWithoutChildrenInput | null
}

export interface CategoryScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  slug?: string | null
  slug_not?: string | null
  slug_in?: string[] | null
  slug_not_in?: string[] | null
  slug_lt?: string | null
  slug_lte?: string | null
  slug_gt?: string | null
  slug_gte?: string | null
  slug_contains?: string | null
  slug_not_contains?: string | null
  slug_starts_with?: string | null
  slug_not_starts_with?: string | null
  slug_ends_with?: string | null
  slug_not_ends_with?: string | null
  name?: string | null
  name_not?: string | null
  name_in?: string[] | null
  name_not_in?: string[] | null
  name_lt?: string | null
  name_lte?: string | null
  name_gt?: string | null
  name_gte?: string | null
  name_contains?: string | null
  name_not_contains?: string | null
  name_starts_with?: string | null
  name_not_starts_with?: string | null
  name_ends_with?: string | null
  name_not_ends_with?: string | null
  description?: string | null
  description_not?: string | null
  description_in?: string[] | null
  description_not_in?: string[] | null
  description_lt?: string | null
  description_lte?: string | null
  description_gt?: string | null
  description_gte?: string | null
  description_contains?: string | null
  description_not_contains?: string | null
  description_starts_with?: string | null
  description_not_starts_with?: string | null
  description_ends_with?: string | null
  description_not_ends_with?: string | null
  visible?: boolean | null
  visible_not?: boolean | null
  AND?: CategoryScalarWhereInput[] | null
  OR?: CategoryScalarWhereInput[] | null
  NOT?: CategoryScalarWhereInput[] | null
}

export interface CategoryUpdateManyDataInput {
  slug?: string | null
  name?: string | null
  image?: any | null
  description?: string | null
  visible?: boolean | null
}

export interface CategoryUpdateManyWithWhereNestedInput {
  where: CategoryScalarWhereInput
  data: CategoryUpdateManyDataInput
}

export interface CategoryUpdateManyWithoutChildrenInput {
  create?: CategoryCreateWithoutChildrenInput[] | null
  delete?: CategoryWhereUniqueInput[] | null
  connect?: CategoryWhereUniqueInput[] | null
  set?: CategoryWhereUniqueInput[] | null
  disconnect?: CategoryWhereUniqueInput[] | null
  update?: CategoryUpdateWithWhereUniqueWithoutChildrenInput[] | null
  upsert?: CategoryUpsertWithWhereUniqueWithoutChildrenInput[] | null
  deleteMany?: CategoryScalarWhereInput[] | null
  updateMany?: CategoryUpdateManyWithWhereNestedInput[] | null
}

export interface CategoryUpdateOneRequiredWithoutProductsInput {
  create?: CategoryCreateWithoutProductsInput | null
  update?: CategoryUpdateWithoutProductsDataInput | null
  upsert?: CategoryUpsertWithoutProductsInput | null
  connect?: CategoryWhereUniqueInput | null
}

export interface CategoryUpdateWithWhereUniqueWithoutChildrenInput {
  where: CategoryWhereUniqueInput
  data: CategoryUpdateWithoutChildrenDataInput
}

export interface CategoryUpdateWithoutChildrenDataInput {
  slug?: string | null
  name?: string | null
  image?: any | null
  description?: string | null
  visible?: boolean | null
  products?: ProductUpdateManyWithoutCategoryInput | null
}

export interface CategoryUpdateWithoutProductsDataInput {
  slug?: string | null
  name?: string | null
  image?: any | null
  description?: string | null
  visible?: boolean | null
  children?: CategoryUpdateManyWithoutChildrenInput | null
}

export interface CategoryUpsertWithWhereUniqueWithoutChildrenInput {
  where: CategoryWhereUniqueInput
  update: CategoryUpdateWithoutChildrenDataInput
  create: CategoryCreateWithoutChildrenInput
}

export interface CategoryUpsertWithoutProductsInput {
  update: CategoryUpdateWithoutProductsDataInput
  create: CategoryCreateWithoutProductsInput
}

export interface CategoryWhereUniqueInput {
  id?: string | null
  slug?: string | null
  name?: string | null
}

export interface ColorCreateInput {
  id?: string | null
  slug: string
  name: string
  colorCode: string
  hexCode: string
  productVariants?: ProductVariantCreateManyWithoutColorInput | null
}

export interface ColorCreateOneInput {
  create?: ColorCreateInput | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorCreateOneWithoutProductVariantsInput {
  create?: ColorCreateWithoutProductVariantsInput | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorCreateWithoutProductVariantsInput {
  id?: string | null
  slug: string
  name: string
  colorCode: string
  hexCode: string
}

export interface ColorUpdateDataInput {
  slug?: string | null
  name?: string | null
  colorCode?: string | null
  hexCode?: string | null
  productVariants?: ProductVariantUpdateManyWithoutColorInput | null
}

export interface ColorUpdateOneInput {
  create?: ColorCreateInput | null
  update?: ColorUpdateDataInput | null
  upsert?: ColorUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorUpdateOneRequiredInput {
  create?: ColorCreateInput | null
  update?: ColorUpdateDataInput | null
  upsert?: ColorUpsertNestedInput | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorUpdateOneRequiredWithoutProductVariantsInput {
  create?: ColorCreateWithoutProductVariantsInput | null
  update?: ColorUpdateWithoutProductVariantsDataInput | null
  upsert?: ColorUpsertWithoutProductVariantsInput | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorUpdateWithoutProductVariantsDataInput {
  slug?: string | null
  name?: string | null
  colorCode?: string | null
  hexCode?: string | null
}

export interface ColorUpsertNestedInput {
  update: ColorUpdateDataInput
  create: ColorCreateInput
}

export interface ColorUpsertWithoutProductVariantsInput {
  update: ColorUpdateWithoutProductVariantsDataInput
  create: ColorCreateWithoutProductVariantsInput
}

export interface ColorWhereUniqueInput {
  id?: string | null
  slug?: string | null
  colorCode?: string | null
}

export interface LocationCreateOneWithoutPhysicalProductsInput {
  create?: LocationCreateWithoutPhysicalProductsInput | null
  connect?: LocationWhereUniqueInput | null
}

export interface LocationCreateWithoutPhysicalProductsInput {
  id?: string | null
  slug: string
  name: string
  company?: string | null
  description?: string | null
  address1: string
  address2?: string | null
  city: string
  state: string
  zipCode: string
  locationType?: LocationType | null
  user?: UserCreateOneInput | null
  lat?: number | null
  lng?: number | null
}

export interface LocationUpdateOneWithoutPhysicalProductsInput {
  create?: LocationCreateWithoutPhysicalProductsInput | null
  update?: LocationUpdateWithoutPhysicalProductsDataInput | null
  upsert?: LocationUpsertWithoutPhysicalProductsInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: LocationWhereUniqueInput | null
}

export interface LocationUpdateWithoutPhysicalProductsDataInput {
  slug?: string | null
  name?: string | null
  company?: string | null
  description?: string | null
  address1?: string | null
  address2?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  locationType?: LocationType | null
  user?: UserUpdateOneInput | null
  lat?: number | null
  lng?: number | null
}

export interface LocationUpsertWithoutPhysicalProductsInput {
  update: LocationUpdateWithoutPhysicalProductsDataInput
  create: LocationCreateWithoutPhysicalProductsInput
}

export interface LocationWhereUniqueInput {
  id?: string | null
  slug?: string | null
}

export interface PhysicalProductCreateManyWithoutProductVariantInput {
  create?: PhysicalProductCreateWithoutProductVariantInput[] | null
  connect?: PhysicalProductWhereUniqueInput[] | null
}

export interface PhysicalProductCreateWithoutProductVariantInput {
  id?: string | null
  seasonsUID: string
  location?: LocationCreateOneWithoutPhysicalProductsInput | null
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
}

export interface PhysicalProductScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  seasonsUID?: string | null
  seasonsUID_not?: string | null
  seasonsUID_in?: string[] | null
  seasonsUID_not_in?: string[] | null
  seasonsUID_lt?: string | null
  seasonsUID_lte?: string | null
  seasonsUID_gt?: string | null
  seasonsUID_gte?: string | null
  seasonsUID_contains?: string | null
  seasonsUID_not_contains?: string | null
  seasonsUID_starts_with?: string | null
  seasonsUID_not_starts_with?: string | null
  seasonsUID_ends_with?: string | null
  seasonsUID_not_ends_with?: string | null
  inventoryStatus?: InventoryStatus | null
  inventoryStatus_not?: InventoryStatus | null
  inventoryStatus_in?: InventoryStatus[] | null
  inventoryStatus_not_in?: InventoryStatus[] | null
  productStatus?: PhysicalProductStatus | null
  productStatus_not?: PhysicalProductStatus | null
  productStatus_in?: PhysicalProductStatus[] | null
  productStatus_not_in?: PhysicalProductStatus[] | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: PhysicalProductScalarWhereInput[] | null
  OR?: PhysicalProductScalarWhereInput[] | null
  NOT?: PhysicalProductScalarWhereInput[] | null
}

export interface PhysicalProductUpdateManyDataInput {
  seasonsUID?: string | null
  inventoryStatus?: InventoryStatus | null
  productStatus?: PhysicalProductStatus | null
}

export interface PhysicalProductUpdateManyWithWhereNestedInput {
  where: PhysicalProductScalarWhereInput
  data: PhysicalProductUpdateManyDataInput
}

export interface PhysicalProductUpdateManyWithoutProductVariantInput {
  create?: PhysicalProductCreateWithoutProductVariantInput[] | null
  delete?: PhysicalProductWhereUniqueInput[] | null
  connect?: PhysicalProductWhereUniqueInput[] | null
  set?: PhysicalProductWhereUniqueInput[] | null
  disconnect?: PhysicalProductWhereUniqueInput[] | null
  update?: PhysicalProductUpdateWithWhereUniqueWithoutProductVariantInput[] | null
  upsert?: PhysicalProductUpsertWithWhereUniqueWithoutProductVariantInput[] | null
  deleteMany?: PhysicalProductScalarWhereInput[] | null
  updateMany?: PhysicalProductUpdateManyWithWhereNestedInput[] | null
}

export interface PhysicalProductUpdateWithWhereUniqueWithoutProductVariantInput {
  where: PhysicalProductWhereUniqueInput
  data: PhysicalProductUpdateWithoutProductVariantDataInput
}

export interface PhysicalProductUpdateWithoutProductVariantDataInput {
  seasonsUID?: string | null
  location?: LocationUpdateOneWithoutPhysicalProductsInput | null
  inventoryStatus?: InventoryStatus | null
  productStatus?: PhysicalProductStatus | null
}

export interface PhysicalProductUpsertWithWhereUniqueWithoutProductVariantInput {
  where: PhysicalProductWhereUniqueInput
  update: PhysicalProductUpdateWithoutProductVariantDataInput
  create: PhysicalProductCreateWithoutProductVariantInput
}

export interface PhysicalProductWhereUniqueInput {
  id?: string | null
  seasonsUID?: string | null
}

export interface ProductCreateManyWithoutCategoryInput {
  create?: ProductCreateWithoutCategoryInput[] | null
  connect?: ProductWhereUniqueInput[] | null
}

export interface ProductCreateOneWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput | null
  connect?: ProductWhereUniqueInput | null
}

export interface ProductCreateWithoutCategoryInput {
  id?: string | null
  slug: string
  name: string
  brand: BrandCreateOneWithoutProductsInput
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images: any
  modelHeight?: number | null
  retailPrice?: number | null
  modelSize?: SizeCreateOneInput | null
  color: ColorCreateOneInput
  secondaryColor?: ColorCreateOneInput | null
  tags?: any | null
  functions?: ProductFunctionCreateManyInput | null
  innerMaterials?: ProductCreateinnerMaterialsInput | null
  outerMaterials?: ProductCreateouterMaterialsInput | null
  variants?: ProductVariantCreateManyWithoutProductInput | null
  status?: ProductStatus | null
}

export interface ProductCreateWithoutVariantsInput {
  id?: string | null
  slug: string
  name: string
  brand: BrandCreateOneWithoutProductsInput
  category: CategoryCreateOneWithoutProductsInput
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images: any
  modelHeight?: number | null
  retailPrice?: number | null
  modelSize?: SizeCreateOneInput | null
  color: ColorCreateOneInput
  secondaryColor?: ColorCreateOneInput | null
  tags?: any | null
  functions?: ProductFunctionCreateManyInput | null
  innerMaterials?: ProductCreateinnerMaterialsInput | null
  outerMaterials?: ProductCreateouterMaterialsInput | null
  status?: ProductStatus | null
}

export interface ProductCreateinnerMaterialsInput {
  set?: Material[] | null
}

export interface ProductCreateouterMaterialsInput {
  set?: Material[] | null
}

export interface ProductFunctionCreateInput {
  id?: string | null
  name?: string | null
}

export interface ProductFunctionCreateManyInput {
  create?: ProductFunctionCreateInput[] | null
  connect?: ProductFunctionWhereUniqueInput[] | null
}

export interface ProductFunctionScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  name?: string | null
  name_not?: string | null
  name_in?: string[] | null
  name_not_in?: string[] | null
  name_lt?: string | null
  name_lte?: string | null
  name_gt?: string | null
  name_gte?: string | null
  name_contains?: string | null
  name_not_contains?: string | null
  name_starts_with?: string | null
  name_not_starts_with?: string | null
  name_ends_with?: string | null
  name_not_ends_with?: string | null
  AND?: ProductFunctionScalarWhereInput[] | null
  OR?: ProductFunctionScalarWhereInput[] | null
  NOT?: ProductFunctionScalarWhereInput[] | null
}

export interface ProductFunctionUpdateDataInput {
  name?: string | null
}

export interface ProductFunctionUpdateManyDataInput {
  name?: string | null
}

export interface ProductFunctionUpdateManyInput {
  create?: ProductFunctionCreateInput[] | null
  update?: ProductFunctionUpdateWithWhereUniqueNestedInput[] | null
  upsert?: ProductFunctionUpsertWithWhereUniqueNestedInput[] | null
  delete?: ProductFunctionWhereUniqueInput[] | null
  connect?: ProductFunctionWhereUniqueInput[] | null
  set?: ProductFunctionWhereUniqueInput[] | null
  disconnect?: ProductFunctionWhereUniqueInput[] | null
  deleteMany?: ProductFunctionScalarWhereInput[] | null
  updateMany?: ProductFunctionUpdateManyWithWhereNestedInput[] | null
}

export interface ProductFunctionUpdateManyWithWhereNestedInput {
  where: ProductFunctionScalarWhereInput
  data: ProductFunctionUpdateManyDataInput
}

export interface ProductFunctionUpdateWithWhereUniqueNestedInput {
  where: ProductFunctionWhereUniqueInput
  data: ProductFunctionUpdateDataInput
}

export interface ProductFunctionUpsertWithWhereUniqueNestedInput {
  where: ProductFunctionWhereUniqueInput
  update: ProductFunctionUpdateDataInput
  create: ProductFunctionCreateInput
}

export interface ProductFunctionWhereUniqueInput {
  id?: string | null
  name?: string | null
}

export interface ProductScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  slug?: string | null
  slug_not?: string | null
  slug_in?: string[] | null
  slug_not_in?: string[] | null
  slug_lt?: string | null
  slug_lte?: string | null
  slug_gt?: string | null
  slug_gte?: string | null
  slug_contains?: string | null
  slug_not_contains?: string | null
  slug_starts_with?: string | null
  slug_not_starts_with?: string | null
  slug_ends_with?: string | null
  slug_not_ends_with?: string | null
  name?: string | null
  name_not?: string | null
  name_in?: string[] | null
  name_not_in?: string[] | null
  name_lt?: string | null
  name_lte?: string | null
  name_gt?: string | null
  name_gte?: string | null
  name_contains?: string | null
  name_not_contains?: string | null
  name_starts_with?: string | null
  name_not_starts_with?: string | null
  name_ends_with?: string | null
  name_not_ends_with?: string | null
  type?: ProductType | null
  type_not?: ProductType | null
  type_in?: ProductType[] | null
  type_not_in?: ProductType[] | null
  description?: string | null
  description_not?: string | null
  description_in?: string[] | null
  description_not_in?: string[] | null
  description_lt?: string | null
  description_lte?: string | null
  description_gt?: string | null
  description_gte?: string | null
  description_contains?: string | null
  description_not_contains?: string | null
  description_starts_with?: string | null
  description_not_starts_with?: string | null
  description_ends_with?: string | null
  description_not_ends_with?: string | null
  externalURL?: string | null
  externalURL_not?: string | null
  externalURL_in?: string[] | null
  externalURL_not_in?: string[] | null
  externalURL_lt?: string | null
  externalURL_lte?: string | null
  externalURL_gt?: string | null
  externalURL_gte?: string | null
  externalURL_contains?: string | null
  externalURL_not_contains?: string | null
  externalURL_starts_with?: string | null
  externalURL_not_starts_with?: string | null
  externalURL_ends_with?: string | null
  externalURL_not_ends_with?: string | null
  modelHeight?: number | null
  modelHeight_not?: number | null
  modelHeight_in?: number[] | null
  modelHeight_not_in?: number[] | null
  modelHeight_lt?: number | null
  modelHeight_lte?: number | null
  modelHeight_gt?: number | null
  modelHeight_gte?: number | null
  retailPrice?: number | null
  retailPrice_not?: number | null
  retailPrice_in?: number[] | null
  retailPrice_not_in?: number[] | null
  retailPrice_lt?: number | null
  retailPrice_lte?: number | null
  retailPrice_gt?: number | null
  retailPrice_gte?: number | null
  status?: ProductStatus | null
  status_not?: ProductStatus | null
  status_in?: ProductStatus[] | null
  status_not_in?: ProductStatus[] | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: ProductScalarWhereInput[] | null
  OR?: ProductScalarWhereInput[] | null
  NOT?: ProductScalarWhereInput[] | null
}

export interface ProductUpdateManyDataInput {
  slug?: string | null
  name?: string | null
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images?: any | null
  modelHeight?: number | null
  retailPrice?: number | null
  tags?: any | null
  innerMaterials?: ProductUpdateinnerMaterialsInput | null
  outerMaterials?: ProductUpdateouterMaterialsInput | null
  status?: ProductStatus | null
}

export interface ProductUpdateManyWithWhereNestedInput {
  where: ProductScalarWhereInput
  data: ProductUpdateManyDataInput
}

export interface ProductUpdateManyWithoutCategoryInput {
  create?: ProductCreateWithoutCategoryInput[] | null
  delete?: ProductWhereUniqueInput[] | null
  connect?: ProductWhereUniqueInput[] | null
  set?: ProductWhereUniqueInput[] | null
  disconnect?: ProductWhereUniqueInput[] | null
  update?: ProductUpdateWithWhereUniqueWithoutCategoryInput[] | null
  upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput[] | null
  deleteMany?: ProductScalarWhereInput[] | null
  updateMany?: ProductUpdateManyWithWhereNestedInput[] | null
}

export interface ProductUpdateOneRequiredWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput | null
  update?: ProductUpdateWithoutVariantsDataInput | null
  upsert?: ProductUpsertWithoutVariantsInput | null
  connect?: ProductWhereUniqueInput | null
}

export interface ProductUpdateWithWhereUniqueWithoutCategoryInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutCategoryDataInput
}

export interface ProductUpdateWithoutCategoryDataInput {
  slug?: string | null
  name?: string | null
  brand?: BrandUpdateOneRequiredWithoutProductsInput | null
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images?: any | null
  modelHeight?: number | null
  retailPrice?: number | null
  modelSize?: SizeUpdateOneInput | null
  color?: ColorUpdateOneRequiredInput | null
  secondaryColor?: ColorUpdateOneInput | null
  tags?: any | null
  functions?: ProductFunctionUpdateManyInput | null
  innerMaterials?: ProductUpdateinnerMaterialsInput | null
  outerMaterials?: ProductUpdateouterMaterialsInput | null
  variants?: ProductVariantUpdateManyWithoutProductInput | null
  status?: ProductStatus | null
}

export interface ProductUpdateWithoutVariantsDataInput {
  slug?: string | null
  name?: string | null
  brand?: BrandUpdateOneRequiredWithoutProductsInput | null
  category?: CategoryUpdateOneRequiredWithoutProductsInput | null
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images?: any | null
  modelHeight?: number | null
  retailPrice?: number | null
  modelSize?: SizeUpdateOneInput | null
  color?: ColorUpdateOneRequiredInput | null
  secondaryColor?: ColorUpdateOneInput | null
  tags?: any | null
  functions?: ProductFunctionUpdateManyInput | null
  innerMaterials?: ProductUpdateinnerMaterialsInput | null
  outerMaterials?: ProductUpdateouterMaterialsInput | null
  status?: ProductStatus | null
}

export interface ProductUpdateinnerMaterialsInput {
  set?: Material[] | null
}

export interface ProductUpdateouterMaterialsInput {
  set?: Material[] | null
}

export interface ProductUpsertWithWhereUniqueWithoutCategoryInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutCategoryDataInput
  create: ProductCreateWithoutCategoryInput
}

export interface ProductUpsertWithoutVariantsInput {
  update: ProductUpdateWithoutVariantsDataInput
  create: ProductCreateWithoutVariantsInput
}

export interface ProductVariantCreateInput {
  id?: string | null
  sku?: string | null
  color: ColorCreateOneWithoutProductVariantsInput
  internalSize?: SizeCreateOneInput | null
  manufacturerSizes?: SizeCreateManyInput | null
  weight?: number | null
  height?: number | null
  productID: string
  product: ProductCreateOneWithoutVariantsInput
  retailPrice?: number | null
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null
  total: number
  reservable: number
  reserved: number
  nonReservable: number
}

export interface ProductVariantCreateManyWithoutColorInput {
  create?: ProductVariantCreateWithoutColorInput[] | null
  connect?: ProductVariantWhereUniqueInput[] | null
}

export interface ProductVariantCreateManyWithoutProductInput {
  create?: ProductVariantCreateWithoutProductInput[] | null
  connect?: ProductVariantWhereUniqueInput[] | null
}

export interface ProductVariantCreateOneInput {
  create?: ProductVariantCreateInput | null
  connect?: ProductVariantWhereUniqueInput | null
}

export interface ProductVariantCreateWithoutColorInput {
  id?: string | null
  sku?: string | null
  internalSize?: SizeCreateOneInput | null
  manufacturerSizes?: SizeCreateManyInput | null
  weight?: number | null
  height?: number | null
  productID: string
  product: ProductCreateOneWithoutVariantsInput
  retailPrice?: number | null
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null
  total: number
  reservable: number
  reserved: number
  nonReservable: number
}

export interface ProductVariantCreateWithoutProductInput {
  id?: string | null
  sku?: string | null
  color: ColorCreateOneWithoutProductVariantsInput
  internalSize?: SizeCreateOneInput | null
  manufacturerSizes?: SizeCreateManyInput | null
  weight?: number | null
  height?: number | null
  productID: string
  retailPrice?: number | null
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null
  total: number
  reservable: number
  reserved: number
  nonReservable: number
}

export interface ProductVariantFeedbackCreateWithoutReservationFeedbackInput {
  id?: string | null
  isCompleted: boolean
  questions?: ProductVariantFeedbackQuestionCreateManyWithoutVariantFeedbackInput | null
  variant: ProductVariantCreateOneInput
}

export interface ProductVariantFeedbackQuestionCreateManyWithoutVariantFeedbackInput {
  create?: ProductVariantFeedbackQuestionCreateWithoutVariantFeedbackInput[] | null
  connect?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null
}

export interface ProductVariantFeedbackQuestionCreateWithoutVariantFeedbackInput {
  id?: string | null
  options?: ProductVariantFeedbackQuestionCreateoptionsInput | null
  question: string
  responses?: ProductVariantFeedbackQuestionCreateresponsesInput | null
  type: QuestionType
}

export interface ProductVariantFeedbackQuestionCreateoptionsInput {
  set?: string[] | null
}

export interface ProductVariantFeedbackQuestionCreateresponsesInput {
  set?: string[] | null
}

export interface ProductVariantFeedbackQuestionScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  question?: string | null
  question_not?: string | null
  question_in?: string[] | null
  question_not_in?: string[] | null
  question_lt?: string | null
  question_lte?: string | null
  question_gt?: string | null
  question_gte?: string | null
  question_contains?: string | null
  question_not_contains?: string | null
  question_starts_with?: string | null
  question_not_starts_with?: string | null
  question_ends_with?: string | null
  question_not_ends_with?: string | null
  type?: QuestionType | null
  type_not?: QuestionType | null
  type_in?: QuestionType[] | null
  type_not_in?: QuestionType[] | null
  AND?: ProductVariantFeedbackQuestionScalarWhereInput[] | null
  OR?: ProductVariantFeedbackQuestionScalarWhereInput[] | null
  NOT?: ProductVariantFeedbackQuestionScalarWhereInput[] | null
}

export interface ProductVariantFeedbackQuestionUpdateManyDataInput {
  options?: ProductVariantFeedbackQuestionUpdateoptionsInput | null
  question?: string | null
  responses?: ProductVariantFeedbackQuestionUpdateresponsesInput | null
  type?: QuestionType | null
}

export interface ProductVariantFeedbackQuestionUpdateManyWithWhereNestedInput {
  where: ProductVariantFeedbackQuestionScalarWhereInput
  data: ProductVariantFeedbackQuestionUpdateManyDataInput
}

export interface ProductVariantFeedbackQuestionUpdateManyWithoutVariantFeedbackInput {
  create?: ProductVariantFeedbackQuestionCreateWithoutVariantFeedbackInput[] | null
  delete?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null
  connect?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null
  set?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null
  disconnect?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null
  update?: ProductVariantFeedbackQuestionUpdateWithWhereUniqueWithoutVariantFeedbackInput[] | null
  upsert?: ProductVariantFeedbackQuestionUpsertWithWhereUniqueWithoutVariantFeedbackInput[] | null
  deleteMany?: ProductVariantFeedbackQuestionScalarWhereInput[] | null
  updateMany?: ProductVariantFeedbackQuestionUpdateManyWithWhereNestedInput[] | null
}

export interface ProductVariantFeedbackQuestionUpdateWithWhereUniqueWithoutVariantFeedbackInput {
  where: ProductVariantFeedbackQuestionWhereUniqueInput
  data: ProductVariantFeedbackQuestionUpdateWithoutVariantFeedbackDataInput
}

export interface ProductVariantFeedbackQuestionUpdateWithoutVariantFeedbackDataInput {
  options?: ProductVariantFeedbackQuestionUpdateoptionsInput | null
  question?: string | null
  responses?: ProductVariantFeedbackQuestionUpdateresponsesInput | null
  type?: QuestionType | null
}

export interface ProductVariantFeedbackQuestionUpdateoptionsInput {
  set?: string[] | null
}

export interface ProductVariantFeedbackQuestionUpdateresponsesInput {
  set?: string[] | null
}

export interface ProductVariantFeedbackQuestionUpsertWithWhereUniqueWithoutVariantFeedbackInput {
  where: ProductVariantFeedbackQuestionWhereUniqueInput
  update: ProductVariantFeedbackQuestionUpdateWithoutVariantFeedbackDataInput
  create: ProductVariantFeedbackQuestionCreateWithoutVariantFeedbackInput
}

export interface ProductVariantFeedbackQuestionWhereUniqueInput {
  id?: string | null
}

export interface ProductVariantFeedbackScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  isCompleted?: boolean | null
  isCompleted_not?: boolean | null
  AND?: ProductVariantFeedbackScalarWhereInput[] | null
  OR?: ProductVariantFeedbackScalarWhereInput[] | null
  NOT?: ProductVariantFeedbackScalarWhereInput[] | null
}

export interface ProductVariantFeedbackUpdateManyDataInput {
  isCompleted?: boolean | null
}

export interface ProductVariantFeedbackUpdateManyWithWhereNestedInput {
  where: ProductVariantFeedbackScalarWhereInput
  data: ProductVariantFeedbackUpdateManyDataInput
}

export interface ProductVariantFeedbackUpdateManyWithoutReservationFeedbackInput {
  create?: ProductVariantFeedbackCreateWithoutReservationFeedbackInput[] | null
  delete?: ProductVariantFeedbackWhereUniqueInput[] | null
  connect?: ProductVariantFeedbackWhereUniqueInput[] | null
  set?: ProductVariantFeedbackWhereUniqueInput[] | null
  disconnect?: ProductVariantFeedbackWhereUniqueInput[] | null
  update?: ProductVariantFeedbackUpdateWithWhereUniqueWithoutReservationFeedbackInput[] | null
  upsert?: ProductVariantFeedbackUpsertWithWhereUniqueWithoutReservationFeedbackInput[] | null
  deleteMany?: ProductVariantFeedbackScalarWhereInput[] | null
  updateMany?: ProductVariantFeedbackUpdateManyWithWhereNestedInput[] | null
}

export interface ProductVariantFeedbackUpdateWithWhereUniqueWithoutReservationFeedbackInput {
  where: ProductVariantFeedbackWhereUniqueInput
  data: ProductVariantFeedbackUpdateWithoutReservationFeedbackDataInput
}

export interface ProductVariantFeedbackUpdateWithoutReservationFeedbackDataInput {
  isCompleted?: boolean | null
  questions?: ProductVariantFeedbackQuestionUpdateManyWithoutVariantFeedbackInput | null
  variant?: ProductVariantUpdateOneRequiredInput | null
}

export interface ProductVariantFeedbackUpsertWithWhereUniqueWithoutReservationFeedbackInput {
  where: ProductVariantFeedbackWhereUniqueInput
  update: ProductVariantFeedbackUpdateWithoutReservationFeedbackDataInput
  create: ProductVariantFeedbackCreateWithoutReservationFeedbackInput
}

export interface ProductVariantFeedbackWhereUniqueInput {
  id?: string | null
}

export interface ProductVariantScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  sku?: string | null
  sku_not?: string | null
  sku_in?: string[] | null
  sku_not_in?: string[] | null
  sku_lt?: string | null
  sku_lte?: string | null
  sku_gt?: string | null
  sku_gte?: string | null
  sku_contains?: string | null
  sku_not_contains?: string | null
  sku_starts_with?: string | null
  sku_not_starts_with?: string | null
  sku_ends_with?: string | null
  sku_not_ends_with?: string | null
  weight?: number | null
  weight_not?: number | null
  weight_in?: number[] | null
  weight_not_in?: number[] | null
  weight_lt?: number | null
  weight_lte?: number | null
  weight_gt?: number | null
  weight_gte?: number | null
  height?: number | null
  height_not?: number | null
  height_in?: number[] | null
  height_not_in?: number[] | null
  height_lt?: number | null
  height_lte?: number | null
  height_gt?: number | null
  height_gte?: number | null
  productID?: string | null
  productID_not?: string | null
  productID_in?: string[] | null
  productID_not_in?: string[] | null
  productID_lt?: string | null
  productID_lte?: string | null
  productID_gt?: string | null
  productID_gte?: string | null
  productID_contains?: string | null
  productID_not_contains?: string | null
  productID_starts_with?: string | null
  productID_not_starts_with?: string | null
  productID_ends_with?: string | null
  productID_not_ends_with?: string | null
  retailPrice?: number | null
  retailPrice_not?: number | null
  retailPrice_in?: number[] | null
  retailPrice_not_in?: number[] | null
  retailPrice_lt?: number | null
  retailPrice_lte?: number | null
  retailPrice_gt?: number | null
  retailPrice_gte?: number | null
  total?: number | null
  total_not?: number | null
  total_in?: number[] | null
  total_not_in?: number[] | null
  total_lt?: number | null
  total_lte?: number | null
  total_gt?: number | null
  total_gte?: number | null
  reservable?: number | null
  reservable_not?: number | null
  reservable_in?: number[] | null
  reservable_not_in?: number[] | null
  reservable_lt?: number | null
  reservable_lte?: number | null
  reservable_gt?: number | null
  reservable_gte?: number | null
  reserved?: number | null
  reserved_not?: number | null
  reserved_in?: number[] | null
  reserved_not_in?: number[] | null
  reserved_lt?: number | null
  reserved_lte?: number | null
  reserved_gt?: number | null
  reserved_gte?: number | null
  nonReservable?: number | null
  nonReservable_not?: number | null
  nonReservable_in?: number[] | null
  nonReservable_not_in?: number[] | null
  nonReservable_lt?: number | null
  nonReservable_lte?: number | null
  nonReservable_gt?: number | null
  nonReservable_gte?: number | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: ProductVariantScalarWhereInput[] | null
  OR?: ProductVariantScalarWhereInput[] | null
  NOT?: ProductVariantScalarWhereInput[] | null
}

export interface ProductVariantUpdateDataInput {
  sku?: string | null
  color?: ColorUpdateOneRequiredWithoutProductVariantsInput | null
  internalSize?: SizeUpdateOneInput | null
  manufacturerSizes?: SizeUpdateManyInput | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  product?: ProductUpdateOneRequiredWithoutVariantsInput | null
  retailPrice?: number | null
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
}

export interface ProductVariantUpdateManyDataInput {
  sku?: string | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  retailPrice?: number | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
}

export interface ProductVariantUpdateManyWithWhereNestedInput {
  where: ProductVariantScalarWhereInput
  data: ProductVariantUpdateManyDataInput
}

export interface ProductVariantUpdateManyWithoutColorInput {
  create?: ProductVariantCreateWithoutColorInput[] | null
  delete?: ProductVariantWhereUniqueInput[] | null
  connect?: ProductVariantWhereUniqueInput[] | null
  set?: ProductVariantWhereUniqueInput[] | null
  disconnect?: ProductVariantWhereUniqueInput[] | null
  update?: ProductVariantUpdateWithWhereUniqueWithoutColorInput[] | null
  upsert?: ProductVariantUpsertWithWhereUniqueWithoutColorInput[] | null
  deleteMany?: ProductVariantScalarWhereInput[] | null
  updateMany?: ProductVariantUpdateManyWithWhereNestedInput[] | null
}

export interface ProductVariantUpdateManyWithoutProductInput {
  create?: ProductVariantCreateWithoutProductInput[] | null
  delete?: ProductVariantWhereUniqueInput[] | null
  connect?: ProductVariantWhereUniqueInput[] | null
  set?: ProductVariantWhereUniqueInput[] | null
  disconnect?: ProductVariantWhereUniqueInput[] | null
  update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput[] | null
  upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput[] | null
  deleteMany?: ProductVariantScalarWhereInput[] | null
  updateMany?: ProductVariantUpdateManyWithWhereNestedInput[] | null
}

export interface ProductVariantUpdateOneRequiredInput {
  create?: ProductVariantCreateInput | null
  update?: ProductVariantUpdateDataInput | null
  upsert?: ProductVariantUpsertNestedInput | null
  connect?: ProductVariantWhereUniqueInput | null
}

export interface ProductVariantUpdateWithWhereUniqueWithoutColorInput {
  where: ProductVariantWhereUniqueInput
  data: ProductVariantUpdateWithoutColorDataInput
}

export interface ProductVariantUpdateWithWhereUniqueWithoutProductInput {
  where: ProductVariantWhereUniqueInput
  data: ProductVariantUpdateWithoutProductDataInput
}

export interface ProductVariantUpdateWithoutColorDataInput {
  sku?: string | null
  internalSize?: SizeUpdateOneInput | null
  manufacturerSizes?: SizeUpdateManyInput | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  product?: ProductUpdateOneRequiredWithoutVariantsInput | null
  retailPrice?: number | null
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
}

export interface ProductVariantUpdateWithoutProductDataInput {
  sku?: string | null
  color?: ColorUpdateOneRequiredWithoutProductVariantsInput | null
  internalSize?: SizeUpdateOneInput | null
  manufacturerSizes?: SizeUpdateManyInput | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  retailPrice?: number | null
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
}

export interface ProductVariantUpsertNestedInput {
  update: ProductVariantUpdateDataInput
  create: ProductVariantCreateInput
}

export interface ProductVariantUpsertWithWhereUniqueWithoutColorInput {
  where: ProductVariantWhereUniqueInput
  update: ProductVariantUpdateWithoutColorDataInput
  create: ProductVariantCreateWithoutColorInput
}

export interface ProductVariantUpsertWithWhereUniqueWithoutProductInput {
  where: ProductVariantWhereUniqueInput
  update: ProductVariantUpdateWithoutProductDataInput
  create: ProductVariantCreateWithoutProductInput
}

export interface ProductVariantWhereUniqueInput {
  id?: string | null
  sku?: string | null
}

export interface ProductWhereUniqueInput {
  id?: string | null
  slug?: string | null
}

export interface ReservationFeedbackUpdateInput {
  comment?: string | null
  feedbacks?: ProductVariantFeedbackUpdateManyWithoutReservationFeedbackInput | null
  rating?: Rating | null
  user?: UserUpdateOneRequiredInput | null
}

export interface ReserveItemsOptions {
  dryRun?: boolean | null
}

export interface SizeCreateInput {
  id?: string | null
  slug: string
  productType?: ProductType | null
  top?: TopSizeCreateOneInput | null
  bottom?: BottomSizeCreateOneInput | null
  display: string
}

export interface SizeCreateManyInput {
  create?: SizeCreateInput[] | null
  connect?: SizeWhereUniqueInput[] | null
}

export interface SizeCreateOneInput {
  create?: SizeCreateInput | null
  connect?: SizeWhereUniqueInput | null
}

export interface SizeScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  slug?: string | null
  slug_not?: string | null
  slug_in?: string[] | null
  slug_not_in?: string[] | null
  slug_lt?: string | null
  slug_lte?: string | null
  slug_gt?: string | null
  slug_gte?: string | null
  slug_contains?: string | null
  slug_not_contains?: string | null
  slug_starts_with?: string | null
  slug_not_starts_with?: string | null
  slug_ends_with?: string | null
  slug_not_ends_with?: string | null
  productType?: ProductType | null
  productType_not?: ProductType | null
  productType_in?: ProductType[] | null
  productType_not_in?: ProductType[] | null
  display?: string | null
  display_not?: string | null
  display_in?: string[] | null
  display_not_in?: string[] | null
  display_lt?: string | null
  display_lte?: string | null
  display_gt?: string | null
  display_gte?: string | null
  display_contains?: string | null
  display_not_contains?: string | null
  display_starts_with?: string | null
  display_not_starts_with?: string | null
  display_ends_with?: string | null
  display_not_ends_with?: string | null
  AND?: SizeScalarWhereInput[] | null
  OR?: SizeScalarWhereInput[] | null
  NOT?: SizeScalarWhereInput[] | null
}

export interface SizeUpdateDataInput {
  slug?: string | null
  productType?: ProductType | null
  top?: TopSizeUpdateOneInput | null
  bottom?: BottomSizeUpdateOneInput | null
  display?: string | null
}

export interface SizeUpdateManyDataInput {
  slug?: string | null
  productType?: ProductType | null
  display?: string | null
}

export interface SizeUpdateManyInput {
  create?: SizeCreateInput[] | null
  update?: SizeUpdateWithWhereUniqueNestedInput[] | null
  upsert?: SizeUpsertWithWhereUniqueNestedInput[] | null
  delete?: SizeWhereUniqueInput[] | null
  connect?: SizeWhereUniqueInput[] | null
  set?: SizeWhereUniqueInput[] | null
  disconnect?: SizeWhereUniqueInput[] | null
  deleteMany?: SizeScalarWhereInput[] | null
  updateMany?: SizeUpdateManyWithWhereNestedInput[] | null
}

export interface SizeUpdateManyWithWhereNestedInput {
  where: SizeScalarWhereInput
  data: SizeUpdateManyDataInput
}

export interface SizeUpdateOneInput {
  create?: SizeCreateInput | null
  update?: SizeUpdateDataInput | null
  upsert?: SizeUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: SizeWhereUniqueInput | null
}

export interface SizeUpdateWithWhereUniqueNestedInput {
  where: SizeWhereUniqueInput
  data: SizeUpdateDataInput
}

export interface SizeUpsertNestedInput {
  update: SizeUpdateDataInput
  create: SizeCreateInput
}

export interface SizeUpsertWithWhereUniqueNestedInput {
  where: SizeWhereUniqueInput
  update: SizeUpdateDataInput
  create: SizeCreateInput
}

export interface SizeWhereUniqueInput {
  id?: string | null
  slug?: string | null
}

export interface TopSizeCreateInput {
  id?: string | null
  letter?: LetterSize | null
  sleeve?: number | null
  shoulder?: number | null
  chest?: number | null
  neck?: number | null
  length?: number | null
}

export interface TopSizeCreateOneInput {
  create?: TopSizeCreateInput | null
  connect?: TopSizeWhereUniqueInput | null
}

export interface TopSizeUpdateDataInput {
  letter?: LetterSize | null
  sleeve?: number | null
  shoulder?: number | null
  chest?: number | null
  neck?: number | null
  length?: number | null
}

export interface TopSizeUpdateOneInput {
  create?: TopSizeCreateInput | null
  update?: TopSizeUpdateDataInput | null
  upsert?: TopSizeUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: TopSizeWhereUniqueInput | null
}

export interface TopSizeUpsertNestedInput {
  update: TopSizeUpdateDataInput
  create: TopSizeCreateInput
}

export interface TopSizeWhereUniqueInput {
  id?: string | null
}

export interface UserCreateInput {
  id?: string | null
  auth0Id: string
  email: string
  firstName: string
  lastName: string
  role?: UserRole | null
  pushNotifications?: PushNotificationStatus | null
}

export interface UserCreateOneInput {
  create?: UserCreateInput | null
  connect?: UserWhereUniqueInput | null
}

export interface UserUpdateDataInput {
  auth0Id?: string | null
  email?: string | null
  firstName?: string | null
  lastName?: string | null
  role?: UserRole | null
  pushNotifications?: PushNotificationStatus | null
}

export interface UserUpdateOneInput {
  create?: UserCreateInput | null
  update?: UserUpdateDataInput | null
  upsert?: UserUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: UserWhereUniqueInput | null
}

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput | null
  update?: UserUpdateDataInput | null
  upsert?: UserUpsertNestedInput | null
  connect?: UserWhereUniqueInput | null
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface UserWhereUniqueInput {
  id?: string | null
  auth0Id?: string | null
  email?: string | null
}

//==============================================================
// END Enums and Input Objects
//==============================================================
