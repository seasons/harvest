/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AppRoute {
  AccountStack = "AccountStack",
  BagStack = "BagStack",
  Brand = "Brand",
  Browse = "Browse",
  CurrentRotation = "CurrentRotation",
  Faq = "Faq",
  Home = "Home",
  Modal = "Modal",
  PaymentAndShipping = "PaymentAndShipping",
  PersonalPreferences = "PersonalPreferences",
  Product = "Product",
  ProductRequest = "ProductRequest",
  Reservation = "Reservation",
  Webview = "Webview",
}

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
  designer_ASC = "designer_ASC",
  designer_DESC = "designer_DESC",
  featured_ASC = "featured_ASC",
  featured_DESC = "featured_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  isPrimaryBrand_ASC = "isPrimaryBrand_ASC",
  isPrimaryBrand_DESC = "isPrimaryBrand_DESC",
  logo_ASC = "logo_ASC",
  logo_DESC = "logo_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  published_ASC = "published_ASC",
  published_DESC = "published_DESC",
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

export enum CouponType {
  FixedAmount = "FixedAmount",
  Percentage = "Percentage",
}

export enum CreditNoteReasonCode {
  Chargeback = "Chargeback",
  Fraudulent = "Fraudulent",
  OrderCancellation = "OrderCancellation",
  OrderChange = "OrderChange",
  Other = "Other",
  ProductUnsatisfactory = "ProductUnsatisfactory",
  ServiceUnsatisfactory = "ServiceUnsatisfactory",
  SubscriptionCancellation = "SubscriptionCancellation",
  SubscriptionChange = "SubscriptionChange",
  SubscriptionPause = "SubscriptionPause",
  Waiver = "Waiver",
  WriteOff = "WriteOff",
}

export enum CreditNoteStatus {
  Adjusted = "Adjusted",
  RefundDue = "RefundDue",
  Refunded = "Refunded",
  Voided = "Voided",
}

export enum CustomerStatus {
  Active = "Active",
  Authorized = "Authorized",
  Created = "Created",
  Deactivated = "Deactivated",
  Invited = "Invited",
  Paused = "Paused",
  PaymentFailed = "PaymentFailed",
  Suspended = "Suspended",
  Waitlisted = "Waitlisted",
}

export enum CustomerStyle {
  AvantGarde = "AvantGarde",
  Bold = "Bold",
  Classic = "Classic",
  Minimalist = "Minimalist",
  Streetwear = "Streetwear",
  Techwear = "Techwear",
}

export enum EmailId {
  BuyUsedOrderConfirmation = "BuyUsedOrderConfirmation",
  CompleteAccount = "CompleteAccount",
  DayFiveAuthorizationFollowup = "DayFiveAuthorizationFollowup",
  DayFourAuthorizationFollowup = "DayFourAuthorizationFollowup",
  DaySevenAuthorizationFollowup = "DaySevenAuthorizationFollowup",
  DaySixAuthorizationFollowup = "DaySixAuthorizationFollowup",
  DayThreeAuthorizationFollowup = "DayThreeAuthorizationFollowup",
  DayTwoAuthorizationFollowup = "DayTwoAuthorizationFollowup",
  FreeToReserve = "FreeToReserve",
  Paused = "Paused",
  PriorityAccess = "PriorityAccess",
  RecommendedItemsNurture = "RecommendedItemsNurture",
  ReferralConfirmation = "ReferralConfirmation",
  ReservationConfirmation = "ReservationConfirmation",
  ReservationReturnConfirmation = "ReservationReturnConfirmation",
  ResumeConfirmation = "ResumeConfirmation",
  ResumeReminder = "ResumeReminder",
  ReturnReminder = "ReturnReminder",
  ReturnToGoodStanding = "ReturnToGoodStanding",
  Rewaitlisted = "Rewaitlisted",
  SubmittedEmail = "SubmittedEmail",
  TwentyFourHourAuthorizationFollowup = "TwentyFourHourAuthorizationFollowup",
  UnpaidMembership = "UnpaidMembership",
  Waitlisted = "Waitlisted",
  WelcomeToSeasons = "WelcomeToSeasons",
}

export enum FitPicReportStatus {
  Pending = "Pending",
  Reviewed = "Reviewed",
}

export enum FitPicStatus {
  Published = "Published",
  Submitted = "Submitted",
  Unpublished = "Unpublished",
}

export enum HomePageSectionType {
  Brands = "Brands",
  Categories = "Categories",
  Products = "Products",
  ProductsByTag = "ProductsByTag",
}

export enum InAdmissableReason {
  AutomaticAdmissionsFlagOff = "AutomaticAdmissionsFlagOff",
  InsufficientInventory = "InsufficientInventory",
  OpsThresholdExceeded = "OpsThresholdExceeded",
  UnserviceableZipcode = "UnserviceableZipcode",
  UnsupportedPlatform = "UnsupportedPlatform",
  Untriageable = "Untriageable",
}

export enum InventoryStatus {
  NonReservable = "NonReservable",
  Offloaded = "Offloaded",
  Reservable = "Reservable",
  Reserved = "Reserved",
  Stored = "Stored",
}

export enum InvoiceStatus {
  NotPaid = "NotPaid",
  Paid = "Paid",
  PaymentDue = "PaymentDue",
  Pending = "Pending",
  Posted = "Posted",
  Voided = "Voided",
}

export enum LetterSize {
  L = "L",
  M = "M",
  S = "S",
  XL = "XL",
  XS = "XS",
  XXL = "XXL",
  XXS = "XXS",
  XXXL = "XXXL",
}

export enum LineItemIdentityType {
  Addon = "Addon",
  Adhoc = "Adhoc",
  Plan = "Plan",
  PlanSetup = "PlanSetup",
}

export enum LocationType {
  Cleaner = "Cleaner",
  Customer = "Customer",
  Office = "Office",
  Warehouse = "Warehouse",
}

export enum NotificationBarID {
  AuthorizedReminder = "AuthorizedReminder",
  PastDueInvoice = "PastDueInvoice",
  TestDismissable = "TestDismissable",
}

export enum NotificationBarIcon {
  Chevron = "Chevron",
  CloseX = "CloseX",
}

export enum OnboardingStep {
  SetMeasurements = "SetMeasurements",
  SetShippingAddress = "SetShippingAddress",
  SetStylePreferences = "SetStylePreferences",
  VerifiedPhone = "VerifiedPhone",
}

export enum OrderLineItemRecordType {
  ExternalProduct = "ExternalProduct",
  Package = "Package",
  PhysicalProduct = "PhysicalProduct",
  ProductVariant = "ProductVariant",
}

export enum OrderStatus {
  Cancelled = "Cancelled",
  Drafted = "Drafted",
  Fulfilled = "Fulfilled",
  Returned = "Returned",
  Submitted = "Submitted",
}

export enum OrderType {
  New = "New",
  Used = "Used",
}

export enum PackageStatus {
  Blocked = "Blocked",
  Cancelled = "Cancelled",
  Delivered = "Delivered",
  Queued = "Queued",
  Received = "Received",
  Shipped = "Shipped",
}

export enum PackageTransitEventStatus {
  Delivered = "Delivered",
  Failure = "Failure",
  PreTransit = "PreTransit",
  Returned = "Returned",
  Transit = "Transit",
  Unknown = "Unknown",
}

export enum PackageTransitEventSubStatus {
  AddressIssue = "AddressIssue",
  ContactCarrier = "ContactCarrier",
  Delayed = "Delayed",
  Delivered = "Delivered",
  DeliveryAttempted = "DeliveryAttempted",
  DeliveryRescheduled = "DeliveryRescheduled",
  DeliveryScheduled = "DeliveryScheduled",
  InformationReceived = "InformationReceived",
  LocationInaccessible = "LocationInaccessible",
  NoticeLeft = "NoticeLeft",
  Other = "Other",
  OutForDelivery = "OutForDelivery",
  PackageAccepted = "PackageAccepted",
  PackageArrived = "PackageArrived",
  PackageDamaged = "PackageDamaged",
  PackageDeparted = "PackageDeparted",
  PackageDisposed = "PackageDisposed",
  PackageForwarded = "PackageForwarded",
  PackageHeld = "PackageHeld",
  PackageLost = "PackageLost",
  PackageProcessed = "PackageProcessed",
  PackageProcessing = "PackageProcessing",
  PackageUnclaimed = "PackageUnclaimed",
  PackageUndeliverable = "PackageUndeliverable",
  PickupAvailable = "PickupAvailable",
  RescheduleDelivery = "RescheduleDelivery",
  ReturnToSender = "ReturnToSender",
}

export enum PauseType {
  WithItems = "WithItems",
  WithoutItems = "WithoutItems",
}

export enum PaymentPlanTier {
  AllAccess = "AllAccess",
  Essential = "Essential",
  Pause = "Pause",
}

export enum PhotographyStatus {
  Done = "Done",
  InProgress = "InProgress",
  ReadyForEditing = "ReadyForEditing",
  ReadyToShoot = "ReadyToShoot",
  Steam = "Steam",
}

export enum PhysicalProductDamageType {
  BarcodeMissing = "BarcodeMissing",
  ButtonMissing = "ButtonMissing",
  Other = "Other",
  Smell = "Smell",
  Stain = "Stain",
  Tear = "Tear",
}

export enum PhysicalProductOffloadMethod {
  Recycled = "Recycled",
  ReturnedToVendor = "ReturnedToVendor",
  SoldToThirdParty = "SoldToThirdParty",
  SoldToUser = "SoldToUser",
  Unknown = "Unknown",
}

export enum PhysicalProductStatus {
  Clean = "Clean",
  Damaged = "Damaged",
  Dirty = "Dirty",
  Lost = "Lost",
  New = "New",
  PermanentlyDamaged = "PermanentlyDamaged",
  Sold = "Sold",
  Used = "Used",
}

export enum Plan {
  AllAccess = "AllAccess",
  Essential = "Essential",
}

export enum ProductArchitecture {
  Fashion = "Fashion",
  Showstopper = "Showstopper",
  Staple = "Staple",
}

export enum ProductFit {
  RunsBig = "RunsBig",
  RunsSmall = "RunsSmall",
  TrueToSize = "TrueToSize",
}

export enum ProductOrderByInput {
  architecture_ASC = "architecture_ASC",
  architecture_DESC = "architecture_DESC",
  buyNewEnabled_ASC = "buyNewEnabled_ASC",
  buyNewEnabled_DESC = "buyNewEnabled_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  description_ASC = "description_ASC",
  description_DESC = "description_DESC",
  externalURL_ASC = "externalURL_ASC",
  externalURL_DESC = "externalURL_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  photographyStatus_ASC = "photographyStatus_ASC",
  photographyStatus_DESC = "photographyStatus_DESC",
  productFit_ASC = "productFit_ASC",
  productFit_DESC = "productFit_DESC",
  publishedAt_ASC = "publishedAt_ASC",
  publishedAt_DESC = "publishedAt_DESC",
  retailPrice_ASC = "retailPrice_ASC",
  retailPrice_DESC = "retailPrice_DESC",
  slug_ASC = "slug_ASC",
  slug_DESC = "slug_DESC",
  status_ASC = "status_ASC",
  status_DESC = "status_DESC",
  type_ASC = "type_ASC",
  type_DESC = "type_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
}

export enum ProductStatus {
  Available = "Available",
  NotAvailable = "NotAvailable",
  Offloaded = "Offloaded",
  Stored = "Stored",
}

export enum ProductTierName {
  Luxury = "Luxury",
  Standard = "Standard",
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

export enum ReservationPhase {
  BusinessToCustomer = "BusinessToCustomer",
  CustomerToBusiness = "CustomerToBusiness",
}

export enum ReservationStatus {
  Blocked = "Blocked",
  Cancelled = "Cancelled",
  Completed = "Completed",
  Delivered = "Delivered",
  Hold = "Hold",
  Packed = "Packed",
  Picked = "Picked",
  Queued = "Queued",
  Received = "Received",
  Shipped = "Shipped",
  Unknown = "Unknown",
}

export enum SeasonCode {
  AW = "AW",
  FW = "FW",
  HO = "HO",
  PF = "PF",
  PS = "PS",
  SS = "SS",
}

export enum SeasonString {
  Fall = "Fall",
  Spring = "Spring",
  Summer = "Summer",
  Winter = "Winter",
}

export enum ShippingCode {
  UPSGround = "UPSGround",
  UPSSelect = "UPSSelect",
}

export enum SizeType {
  EU = "EU",
  JP = "JP",
  Letter = "Letter",
  US = "US",
  WxL = "WxL",
}

export enum SmsStatus {
  Accepted = "Accepted",
  Delivered = "Delivered",
  Failed = "Failed",
  PartiallyDelivered = "PartiallyDelivered",
  Queued = "Queued",
  Read = "Read",
  Received = "Received",
  Receiving = "Receiving",
  Scheduled = "Scheduled",
  Sending = "Sending",
  Sent = "Sent",
  Undelivered = "Undelivered",
}

export enum SyncTimingType {
  Drip = "Drip",
  Impact = "Impact",
  Next = "Next",
}

export enum TriageCustomerStatus {
  Authorized = "Authorized",
  Waitlisted = "Waitlisted",
}

export enum UserPushNotificationInterestType {
  Bag = "Bag",
  Blog = "Blog",
  Brand = "Brand",
  General = "General",
  NewProduct = "NewProduct",
}

export enum UserRole {
  Admin = "Admin",
  Customer = "Customer",
  Marketer = "Marketer",
  Partner = "Partner",
}

export enum UserVerificationMethod {
  Email = "Email",
  None = "None",
  SMS = "SMS",
}

export enum UserVerificationStatus {
  Approved = "Approved",
  Denied = "Denied",
  Pending = "Pending",
}

export enum ViewType {
  Banner = "Banner",
  Referral = "Referral",
  Select = "Select",
}

export enum WarehouseLocationType {
  Bin = "Bin",
  Conveyor = "Conveyor",
  Rail = "Rail",
}

export interface AddressInput {
  city: string;
  postalCode: string;
  state: string;
  street1: string;
  street2?: string | null;
}

export interface BagItemCreateManyWithoutCustomerInput {
  create?: BagItemCreateWithoutCustomerInput[] | null;
  connect?: BagItemWhereUniqueInput[] | null;
}

export interface BagItemCreateWithoutCustomerInput {
  id?: string | null;
  productVariant: ProductVariantCreateOneInput;
  position?: number | null;
  saved?: boolean | null;
  status: BagItemStatus;
}

export interface BagItemScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  position?: number | null;
  position_not?: number | null;
  position_in?: number[] | null;
  position_not_in?: number[] | null;
  position_lt?: number | null;
  position_lte?: number | null;
  position_gt?: number | null;
  position_gte?: number | null;
  saved?: boolean | null;
  saved_not?: boolean | null;
  status?: BagItemStatus | null;
  status_not?: BagItemStatus | null;
  status_in?: BagItemStatus[] | null;
  status_not_in?: BagItemStatus[] | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: BagItemScalarWhereInput[] | null;
  OR?: BagItemScalarWhereInput[] | null;
  NOT?: BagItemScalarWhereInput[] | null;
}

export interface BagItemUpdateManyDataInput {
  position?: number | null;
  saved?: boolean | null;
  status?: BagItemStatus | null;
}

export interface BagItemUpdateManyWithWhereNestedInput {
  where: BagItemScalarWhereInput;
  data: BagItemUpdateManyDataInput;
}

export interface BagItemUpdateManyWithoutCustomerInput {
  create?: BagItemCreateWithoutCustomerInput[] | null;
  delete?: BagItemWhereUniqueInput[] | null;
  connect?: BagItemWhereUniqueInput[] | null;
  set?: BagItemWhereUniqueInput[] | null;
  disconnect?: BagItemWhereUniqueInput[] | null;
  update?: BagItemUpdateWithWhereUniqueWithoutCustomerInput[] | null;
  upsert?: BagItemUpsertWithWhereUniqueWithoutCustomerInput[] | null;
  deleteMany?: BagItemScalarWhereInput[] | null;
  updateMany?: BagItemUpdateManyWithWhereNestedInput[] | null;
}

export interface BagItemUpdateWithWhereUniqueWithoutCustomerInput {
  where: BagItemWhereUniqueInput;
  data: BagItemUpdateWithoutCustomerDataInput;
}

export interface BagItemUpdateWithoutCustomerDataInput {
  productVariant?: ProductVariantUpdateOneRequiredInput | null;
  position?: number | null;
  saved?: boolean | null;
  status?: BagItemStatus | null;
}

export interface BagItemUpsertWithWhereUniqueWithoutCustomerInput {
  where: BagItemWhereUniqueInput;
  update: BagItemUpdateWithoutCustomerDataInput;
  create: BagItemCreateWithoutCustomerInput;
}

export interface BagItemWhereUniqueInput {
  id?: string | null;
}

export interface BillingInfoCreateInput {
  id?: string | null;
  brand: string;
  name?: string | null;
  last_digits: string;
  expiration_month: number;
  expiration_year: number;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
}

export interface BillingInfoCreateOneInput {
  create?: BillingInfoCreateInput | null;
  connect?: BillingInfoWhereUniqueInput | null;
}

export interface BillingInfoUpdateDataInput {
  brand?: string | null;
  name?: string | null;
  last_digits?: string | null;
  expiration_month?: number | null;
  expiration_year?: number | null;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
}

export interface BillingInfoUpdateOneInput {
  create?: BillingInfoCreateInput | null;
  update?: BillingInfoUpdateDataInput | null;
  upsert?: BillingInfoUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: BillingInfoWhereUniqueInput | null;
}

export interface BillingInfoUpsertNestedInput {
  update: BillingInfoUpdateDataInput;
  create: BillingInfoCreateInput;
}

export interface BillingInfoWhereUniqueInput {
  id?: string | null;
}

export interface BottomSizeCreateInput {
  id?: string | null;
  type?: BottomSizeType | null;
  value?: string | null;
  waist?: number | null;
  rise?: number | null;
  hem?: number | null;
  inseam?: number | null;
}

export interface BottomSizeCreateOneInput {
  create?: BottomSizeCreateInput | null;
  connect?: BottomSizeWhereUniqueInput | null;
}

export interface BottomSizeUpdateDataInput {
  type?: BottomSizeType | null;
  value?: string | null;
  waist?: number | null;
  rise?: number | null;
  hem?: number | null;
  inseam?: number | null;
}

export interface BottomSizeUpdateOneInput {
  create?: BottomSizeCreateInput | null;
  update?: BottomSizeUpdateDataInput | null;
  upsert?: BottomSizeUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: BottomSizeWhereUniqueInput | null;
}

export interface BottomSizeUpsertNestedInput {
  update: BottomSizeUpdateDataInput;
  create: BottomSizeCreateInput;
}

export interface BottomSizeWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  type?: BottomSizeType | null;
  type_not?: BottomSizeType | null;
  type_in?: BottomSizeType[] | null;
  type_not_in?: BottomSizeType[] | null;
  value?: string | null;
  value_not?: string | null;
  value_in?: string[] | null;
  value_not_in?: string[] | null;
  value_lt?: string | null;
  value_lte?: string | null;
  value_gt?: string | null;
  value_gte?: string | null;
  value_contains?: string | null;
  value_not_contains?: string | null;
  value_starts_with?: string | null;
  value_not_starts_with?: string | null;
  value_ends_with?: string | null;
  value_not_ends_with?: string | null;
  waist?: number | null;
  waist_not?: number | null;
  waist_in?: number[] | null;
  waist_not_in?: number[] | null;
  waist_lt?: number | null;
  waist_lte?: number | null;
  waist_gt?: number | null;
  waist_gte?: number | null;
  rise?: number | null;
  rise_not?: number | null;
  rise_in?: number[] | null;
  rise_not_in?: number[] | null;
  rise_lt?: number | null;
  rise_lte?: number | null;
  rise_gt?: number | null;
  rise_gte?: number | null;
  hem?: number | null;
  hem_not?: number | null;
  hem_in?: number[] | null;
  hem_not_in?: number[] | null;
  hem_lt?: number | null;
  hem_lte?: number | null;
  hem_gt?: number | null;
  hem_gte?: number | null;
  inseam?: number | null;
  inseam_not?: number | null;
  inseam_in?: number[] | null;
  inseam_not_in?: number[] | null;
  inseam_lt?: number | null;
  inseam_lte?: number | null;
  inseam_gt?: number | null;
  inseam_gte?: number | null;
  AND?: BottomSizeWhereInput[] | null;
  OR?: BottomSizeWhereInput[] | null;
  NOT?: BottomSizeWhereInput[] | null;
}

export interface BottomSizeWhereUniqueInput {
  id?: string | null;
}

export interface BrandCreateInput {
  id?: string | null;
  slug: string;
  brandCode: string;
  description?: string | null;
  isPrimaryBrand?: boolean | null;
  logo?: any | null;
  logoImage?: ImageCreateOneInput | null;
  name: string;
  designer?: string | null;
  basedIn?: string | null;
  products?: ProductCreateManyWithoutBrandInput | null;
  images?: ImageCreateManyInput | null;
  since?: any | null;
  tier: BrandTier;
  published?: boolean | null;
  featured?: boolean | null;
  websiteUrl?: string | null;
  shopifyShop?: ShopifyShopCreateOneInput | null;
  styles?: BrandCreatestylesInput | null;
}

export interface BrandCreateOneInput {
  create?: BrandCreateInput | null;
  connect?: BrandWhereUniqueInput | null;
}

export interface BrandCreateOneWithoutProductsInput {
  create?: BrandCreateWithoutProductsInput | null;
  connect?: BrandWhereUniqueInput | null;
}

export interface BrandCreateWithoutProductsInput {
  id?: string | null;
  slug: string;
  brandCode: string;
  description?: string | null;
  isPrimaryBrand?: boolean | null;
  logo?: any | null;
  logoImage?: ImageCreateOneInput | null;
  name: string;
  designer?: string | null;
  basedIn?: string | null;
  images?: ImageCreateManyInput | null;
  since?: any | null;
  tier: BrandTier;
  published?: boolean | null;
  featured?: boolean | null;
  websiteUrl?: string | null;
  shopifyShop?: ShopifyShopCreateOneInput | null;
  styles?: BrandCreatestylesInput | null;
}

export interface BrandCreatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface BrandUpdateDataInput {
  slug?: string | null;
  brandCode?: string | null;
  description?: string | null;
  isPrimaryBrand?: boolean | null;
  logo?: any | null;
  logoImage?: ImageUpdateOneInput | null;
  name?: string | null;
  designer?: string | null;
  basedIn?: string | null;
  products?: ProductUpdateManyWithoutBrandInput | null;
  images?: ImageUpdateManyInput | null;
  since?: any | null;
  tier?: BrandTier | null;
  published?: boolean | null;
  featured?: boolean | null;
  websiteUrl?: string | null;
  shopifyShop?: ShopifyShopUpdateOneInput | null;
  styles?: BrandUpdatestylesInput | null;
}

export interface BrandUpdateOneInput {
  create?: BrandCreateInput | null;
  update?: BrandUpdateDataInput | null;
  upsert?: BrandUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: BrandWhereUniqueInput | null;
}

export interface BrandUpdateOneRequiredWithoutProductsInput {
  create?: BrandCreateWithoutProductsInput | null;
  update?: BrandUpdateWithoutProductsDataInput | null;
  upsert?: BrandUpsertWithoutProductsInput | null;
  connect?: BrandWhereUniqueInput | null;
}

export interface BrandUpdateWithoutProductsDataInput {
  slug?: string | null;
  brandCode?: string | null;
  description?: string | null;
  isPrimaryBrand?: boolean | null;
  logo?: any | null;
  logoImage?: ImageUpdateOneInput | null;
  name?: string | null;
  designer?: string | null;
  basedIn?: string | null;
  images?: ImageUpdateManyInput | null;
  since?: any | null;
  tier?: BrandTier | null;
  published?: boolean | null;
  featured?: boolean | null;
  websiteUrl?: string | null;
  shopifyShop?: ShopifyShopUpdateOneInput | null;
  styles?: BrandUpdatestylesInput | null;
}

export interface BrandUpdatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface BrandUpsertNestedInput {
  update: BrandUpdateDataInput;
  create: BrandCreateInput;
}

export interface BrandUpsertWithoutProductsInput {
  update: BrandUpdateWithoutProductsDataInput;
  create: BrandCreateWithoutProductsInput;
}

export interface BrandWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  brandCode?: string | null;
  brandCode_not?: string | null;
  brandCode_in?: string[] | null;
  brandCode_not_in?: string[] | null;
  brandCode_lt?: string | null;
  brandCode_lte?: string | null;
  brandCode_gt?: string | null;
  brandCode_gte?: string | null;
  brandCode_contains?: string | null;
  brandCode_not_contains?: string | null;
  brandCode_starts_with?: string | null;
  brandCode_not_starts_with?: string | null;
  brandCode_ends_with?: string | null;
  brandCode_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  isPrimaryBrand?: boolean | null;
  isPrimaryBrand_not?: boolean | null;
  logoImage?: ImageWhereInput | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  designer?: string | null;
  designer_not?: string | null;
  designer_in?: string[] | null;
  designer_not_in?: string[] | null;
  designer_lt?: string | null;
  designer_lte?: string | null;
  designer_gt?: string | null;
  designer_gte?: string | null;
  designer_contains?: string | null;
  designer_not_contains?: string | null;
  designer_starts_with?: string | null;
  designer_not_starts_with?: string | null;
  designer_ends_with?: string | null;
  designer_not_ends_with?: string | null;
  basedIn?: string | null;
  basedIn_not?: string | null;
  basedIn_in?: string[] | null;
  basedIn_not_in?: string[] | null;
  basedIn_lt?: string | null;
  basedIn_lte?: string | null;
  basedIn_gt?: string | null;
  basedIn_gte?: string | null;
  basedIn_contains?: string | null;
  basedIn_not_contains?: string | null;
  basedIn_starts_with?: string | null;
  basedIn_not_starts_with?: string | null;
  basedIn_ends_with?: string | null;
  basedIn_not_ends_with?: string | null;
  products_every?: ProductWhereInput | null;
  products_some?: ProductWhereInput | null;
  products_none?: ProductWhereInput | null;
  images_every?: ImageWhereInput | null;
  images_some?: ImageWhereInput | null;
  images_none?: ImageWhereInput | null;
  since?: any | null;
  since_not?: any | null;
  since_in?: any[] | null;
  since_not_in?: any[] | null;
  since_lt?: any | null;
  since_lte?: any | null;
  since_gt?: any | null;
  since_gte?: any | null;
  tier?: BrandTier | null;
  tier_not?: BrandTier | null;
  tier_in?: BrandTier[] | null;
  tier_not_in?: BrandTier[] | null;
  published?: boolean | null;
  published_not?: boolean | null;
  featured?: boolean | null;
  featured_not?: boolean | null;
  websiteUrl?: string | null;
  websiteUrl_not?: string | null;
  websiteUrl_in?: string[] | null;
  websiteUrl_not_in?: string[] | null;
  websiteUrl_lt?: string | null;
  websiteUrl_lte?: string | null;
  websiteUrl_gt?: string | null;
  websiteUrl_gte?: string | null;
  websiteUrl_contains?: string | null;
  websiteUrl_not_contains?: string | null;
  websiteUrl_starts_with?: string | null;
  websiteUrl_not_starts_with?: string | null;
  websiteUrl_ends_with?: string | null;
  websiteUrl_not_ends_with?: string | null;
  shopifyShop?: ShopifyShopWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: BrandWhereInput[] | null;
  OR?: BrandWhereInput[] | null;
  NOT?: BrandWhereInput[] | null;
}

export interface BrandWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
  brandCode?: string | null;
}

export interface CategoryCreateInput {
  id?: string | null;
  slug: string;
  name: string;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
  products?: ProductCreateManyWithoutCategoryInput | null;
  children?: CategoryCreateManyWithoutChildrenInput | null;
}

export interface CategoryCreateManyWithoutChildrenInput {
  create?: CategoryCreateWithoutChildrenInput[] | null;
  connect?: CategoryWhereUniqueInput[] | null;
}

export interface CategoryCreateOneInput {
  create?: CategoryCreateInput | null;
  connect?: CategoryWhereUniqueInput | null;
}

export interface CategoryCreateOneWithoutProductsInput {
  create?: CategoryCreateWithoutProductsInput | null;
  connect?: CategoryWhereUniqueInput | null;
}

export interface CategoryCreateWithoutChildrenInput {
  id?: string | null;
  slug: string;
  name: string;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
  products?: ProductCreateManyWithoutCategoryInput | null;
}

export interface CategoryCreateWithoutProductsInput {
  id?: string | null;
  slug: string;
  name: string;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
  children?: CategoryCreateManyWithoutChildrenInput | null;
}

export interface CategoryScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  visible?: boolean | null;
  visible_not?: boolean | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: CategoryScalarWhereInput[] | null;
  OR?: CategoryScalarWhereInput[] | null;
  NOT?: CategoryScalarWhereInput[] | null;
}

export interface CategoryUpdateDataInput {
  slug?: string | null;
  name?: string | null;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
  products?: ProductUpdateManyWithoutCategoryInput | null;
  children?: CategoryUpdateManyWithoutChildrenInput | null;
}

export interface CategoryUpdateManyDataInput {
  slug?: string | null;
  name?: string | null;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
}

export interface CategoryUpdateManyWithWhereNestedInput {
  where: CategoryScalarWhereInput;
  data: CategoryUpdateManyDataInput;
}

export interface CategoryUpdateManyWithoutChildrenInput {
  create?: CategoryCreateWithoutChildrenInput[] | null;
  delete?: CategoryWhereUniqueInput[] | null;
  connect?: CategoryWhereUniqueInput[] | null;
  set?: CategoryWhereUniqueInput[] | null;
  disconnect?: CategoryWhereUniqueInput[] | null;
  update?: CategoryUpdateWithWhereUniqueWithoutChildrenInput[] | null;
  upsert?: CategoryUpsertWithWhereUniqueWithoutChildrenInput[] | null;
  deleteMany?: CategoryScalarWhereInput[] | null;
  updateMany?: CategoryUpdateManyWithWhereNestedInput[] | null;
}

export interface CategoryUpdateOneRequiredInput {
  create?: CategoryCreateInput | null;
  update?: CategoryUpdateDataInput | null;
  upsert?: CategoryUpsertNestedInput | null;
  connect?: CategoryWhereUniqueInput | null;
}

export interface CategoryUpdateOneRequiredWithoutProductsInput {
  create?: CategoryCreateWithoutProductsInput | null;
  update?: CategoryUpdateWithoutProductsDataInput | null;
  upsert?: CategoryUpsertWithoutProductsInput | null;
  connect?: CategoryWhereUniqueInput | null;
}

export interface CategoryUpdateWithWhereUniqueWithoutChildrenInput {
  where: CategoryWhereUniqueInput;
  data: CategoryUpdateWithoutChildrenDataInput;
}

export interface CategoryUpdateWithoutChildrenDataInput {
  slug?: string | null;
  name?: string | null;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
  products?: ProductUpdateManyWithoutCategoryInput | null;
}

export interface CategoryUpdateWithoutProductsDataInput {
  slug?: string | null;
  name?: string | null;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
  children?: CategoryUpdateManyWithoutChildrenInput | null;
}

export interface CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput;
  create: CategoryCreateInput;
}

export interface CategoryUpsertWithWhereUniqueWithoutChildrenInput {
  where: CategoryWhereUniqueInput;
  update: CategoryUpdateWithoutChildrenDataInput;
  create: CategoryCreateWithoutChildrenInput;
}

export interface CategoryUpsertWithoutProductsInput {
  update: CategoryUpdateWithoutProductsDataInput;
  create: CategoryCreateWithoutProductsInput;
}

export interface CategoryWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  visible?: boolean | null;
  visible_not?: boolean | null;
  products_every?: ProductWhereInput | null;
  products_some?: ProductWhereInput | null;
  products_none?: ProductWhereInput | null;
  children_every?: CategoryWhereInput | null;
  children_some?: CategoryWhereInput | null;
  children_none?: CategoryWhereInput | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: CategoryWhereInput[] | null;
  OR?: CategoryWhereInput[] | null;
  NOT?: CategoryWhereInput[] | null;
}

export interface CategoryWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
  name?: string | null;
}

export interface ColorCreateInput {
  id?: string | null;
  slug: string;
  name: string;
  colorCode: string;
  hexCode: string;
  productVariants?: ProductVariantCreateManyWithoutColorInput | null;
}

export interface ColorCreateOneInput {
  create?: ColorCreateInput | null;
  connect?: ColorWhereUniqueInput | null;
}

export interface ColorCreateOneWithoutProductVariantsInput {
  create?: ColorCreateWithoutProductVariantsInput | null;
  connect?: ColorWhereUniqueInput | null;
}

export interface ColorCreateWithoutProductVariantsInput {
  id?: string | null;
  slug: string;
  name: string;
  colorCode: string;
  hexCode: string;
}

export interface ColorUpdateDataInput {
  slug?: string | null;
  name?: string | null;
  colorCode?: string | null;
  hexCode?: string | null;
  productVariants?: ProductVariantUpdateManyWithoutColorInput | null;
}

export interface ColorUpdateOneInput {
  create?: ColorCreateInput | null;
  update?: ColorUpdateDataInput | null;
  upsert?: ColorUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ColorWhereUniqueInput | null;
}

export interface ColorUpdateOneRequiredInput {
  create?: ColorCreateInput | null;
  update?: ColorUpdateDataInput | null;
  upsert?: ColorUpsertNestedInput | null;
  connect?: ColorWhereUniqueInput | null;
}

export interface ColorUpdateOneRequiredWithoutProductVariantsInput {
  create?: ColorCreateWithoutProductVariantsInput | null;
  update?: ColorUpdateWithoutProductVariantsDataInput | null;
  upsert?: ColorUpsertWithoutProductVariantsInput | null;
  connect?: ColorWhereUniqueInput | null;
}

export interface ColorUpdateWithoutProductVariantsDataInput {
  slug?: string | null;
  name?: string | null;
  colorCode?: string | null;
  hexCode?: string | null;
}

export interface ColorUpsertNestedInput {
  update: ColorUpdateDataInput;
  create: ColorCreateInput;
}

export interface ColorUpsertWithoutProductVariantsInput {
  update: ColorUpdateWithoutProductVariantsDataInput;
  create: ColorCreateWithoutProductVariantsInput;
}

export interface ColorWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  colorCode?: string | null;
  colorCode_not?: string | null;
  colorCode_in?: string[] | null;
  colorCode_not_in?: string[] | null;
  colorCode_lt?: string | null;
  colorCode_lte?: string | null;
  colorCode_gt?: string | null;
  colorCode_gte?: string | null;
  colorCode_contains?: string | null;
  colorCode_not_contains?: string | null;
  colorCode_starts_with?: string | null;
  colorCode_not_starts_with?: string | null;
  colorCode_ends_with?: string | null;
  colorCode_not_ends_with?: string | null;
  hexCode?: string | null;
  hexCode_not?: string | null;
  hexCode_in?: string[] | null;
  hexCode_not_in?: string[] | null;
  hexCode_lt?: string | null;
  hexCode_lte?: string | null;
  hexCode_gt?: string | null;
  hexCode_gte?: string | null;
  hexCode_contains?: string | null;
  hexCode_not_contains?: string | null;
  hexCode_starts_with?: string | null;
  hexCode_not_starts_with?: string | null;
  hexCode_ends_with?: string | null;
  hexCode_not_ends_with?: string | null;
  productVariants_every?: ProductVariantWhereInput | null;
  productVariants_some?: ProductVariantWhereInput | null;
  productVariants_none?: ProductVariantWhereInput | null;
  AND?: ColorWhereInput[] | null;
  OR?: ColorWhereInput[] | null;
  NOT?: ColorWhereInput[] | null;
}

export interface ColorWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
  colorCode?: string | null;
}

export interface CreateDraftedOrderInput {
  orderType: OrderType;
  productVariantID: string;
}

export interface CustomerAdmissionsDataCreateOneWithoutCustomerInput {
  create?: CustomerAdmissionsDataCreateWithoutCustomerInput | null;
  connect?: CustomerAdmissionsDataWhereUniqueInput | null;
}

export interface CustomerAdmissionsDataCreateWithoutCustomerInput {
  id?: string | null;
  inServiceableZipcode: boolean;
  admissable: boolean;
  inAdmissableReason?: InAdmissableReason | null;
  allAccessEnabled?: boolean | null;
  authorizationsCount: number;
  authorizationWindowClosesAt?: any | null;
  subscribedAt?: any | null;
}

export interface CustomerAdmissionsDataUpdateOneWithoutCustomerInput {
  create?: CustomerAdmissionsDataCreateWithoutCustomerInput | null;
  update?: CustomerAdmissionsDataUpdateWithoutCustomerDataInput | null;
  upsert?: CustomerAdmissionsDataUpsertWithoutCustomerInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: CustomerAdmissionsDataWhereUniqueInput | null;
}

export interface CustomerAdmissionsDataUpdateWithoutCustomerDataInput {
  inServiceableZipcode?: boolean | null;
  admissable?: boolean | null;
  inAdmissableReason?: InAdmissableReason | null;
  allAccessEnabled?: boolean | null;
  authorizationsCount?: number | null;
  authorizationWindowClosesAt?: any | null;
  subscribedAt?: any | null;
}

export interface CustomerAdmissionsDataUpsertWithoutCustomerInput {
  update: CustomerAdmissionsDataUpdateWithoutCustomerDataInput;
  create: CustomerAdmissionsDataCreateWithoutCustomerInput;
}

export interface CustomerAdmissionsDataWhereUniqueInput {
  id?: string | null;
}

export interface CustomerCreateManyWithoutReferrerInput {
  create?: CustomerCreateWithoutReferrerInput[] | null;
  connect?: CustomerWhereUniqueInput[] | null;
}

export interface CustomerCreateOneWithoutReferreesInput {
  create?: CustomerCreateWithoutReferreesInput | null;
  connect?: CustomerWhereUniqueInput | null;
}

export interface CustomerCreateOneWithoutReservationsInput {
  create?: CustomerCreateWithoutReservationsInput | null;
  connect?: CustomerWhereUniqueInput | null;
}

export interface CustomerCreateWithoutReferreesInput {
  id?: string | null;
  user: UserCreateOneInput;
  status?: CustomerStatus | null;
  detail?: CustomerDetailCreateOneInput | null;
  billingInfo?: BillingInfoCreateOneInput | null;
  plan?: Plan | null;
  membership?: CustomerMembershipCreateOneWithoutCustomerInput | null;
  bagItems?: BagItemCreateManyWithoutCustomerInput | null;
  reservations?: ReservationCreateManyWithoutCustomerInput | null;
  referralLink?: string | null;
  referrerId?: string | null;
  referrer?: CustomerCreateOneWithoutReferreesInput | null;
  emailedProducts?: ProductCreateManyInput | null;
  admissions?: CustomerAdmissionsDataCreateOneWithoutCustomerInput | null;
  authorizedAt?: any | null;
  utm?: UTMDataCreateOneWithoutCustomerInput | null;
  notificationBarReceipts?: CustomerNotificationBarReceiptCreateManyWithoutCustomerInput | null;
  impactSyncTimings?: SyncTimingCreateManyInput | null;
}

export interface CustomerCreateWithoutReferrerInput {
  id?: string | null;
  user: UserCreateOneInput;
  status?: CustomerStatus | null;
  detail?: CustomerDetailCreateOneInput | null;
  billingInfo?: BillingInfoCreateOneInput | null;
  plan?: Plan | null;
  membership?: CustomerMembershipCreateOneWithoutCustomerInput | null;
  bagItems?: BagItemCreateManyWithoutCustomerInput | null;
  reservations?: ReservationCreateManyWithoutCustomerInput | null;
  referralLink?: string | null;
  referrerId?: string | null;
  referrees?: CustomerCreateManyWithoutReferrerInput | null;
  emailedProducts?: ProductCreateManyInput | null;
  admissions?: CustomerAdmissionsDataCreateOneWithoutCustomerInput | null;
  authorizedAt?: any | null;
  utm?: UTMDataCreateOneWithoutCustomerInput | null;
  notificationBarReceipts?: CustomerNotificationBarReceiptCreateManyWithoutCustomerInput | null;
  impactSyncTimings?: SyncTimingCreateManyInput | null;
}

export interface CustomerCreateWithoutReservationsInput {
  id?: string | null;
  user: UserCreateOneInput;
  status?: CustomerStatus | null;
  detail?: CustomerDetailCreateOneInput | null;
  billingInfo?: BillingInfoCreateOneInput | null;
  plan?: Plan | null;
  membership?: CustomerMembershipCreateOneWithoutCustomerInput | null;
  bagItems?: BagItemCreateManyWithoutCustomerInput | null;
  referralLink?: string | null;
  referrerId?: string | null;
  referrer?: CustomerCreateOneWithoutReferreesInput | null;
  referrees?: CustomerCreateManyWithoutReferrerInput | null;
  emailedProducts?: ProductCreateManyInput | null;
  admissions?: CustomerAdmissionsDataCreateOneWithoutCustomerInput | null;
  authorizedAt?: any | null;
  utm?: UTMDataCreateOneWithoutCustomerInput | null;
  notificationBarReceipts?: CustomerNotificationBarReceiptCreateManyWithoutCustomerInput | null;
  impactSyncTimings?: SyncTimingCreateManyInput | null;
}

export interface CustomerDetailCreateInput {
  id?: string | null;
  phoneNumber?: string | null;
  birthday?: any | null;
  height?: number | null;
  weight?: CustomerDetailCreateweightInput | null;
  bodyType?: string | null;
  averageTopSize?: string | null;
  topSizes?: CustomerDetailCreatetopSizesInput | null;
  averageWaistSize?: string | null;
  waistSizes?: CustomerDetailCreatewaistSizesInput | null;
  averagePantLength?: string | null;
  preferredPronouns?: string | null;
  profession?: string | null;
  partyFrequency?: string | null;
  travelFrequency?: string | null;
  shoppingFrequency?: string | null;
  averageSpend?: string | null;
  style?: string | null;
  styles?: CustomerDetailCreatestylesInput | null;
  commuteStyle?: string | null;
  stylePreferences?: StylePreferencesCreateOneInput | null;
  shippingAddress?: LocationCreateOneInput | null;
  phoneOS?: string | null;
  insureShipment?: boolean | null;
  instagramHandle?: string | null;
  discoveryReference?: string | null;
  impactId?: string | null;
}

export interface CustomerDetailCreateOneInput {
  create?: CustomerDetailCreateInput | null;
  connect?: CustomerDetailWhereUniqueInput | null;
}

export interface CustomerDetailCreatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface CustomerDetailCreatetopSizesInput {
  set?: string[] | null;
}

export interface CustomerDetailCreatewaistSizesInput {
  set?: number[] | null;
}

export interface CustomerDetailCreateweightInput {
  set?: number[] | null;
}

export interface CustomerDetailUpdateDataInput {
  phoneNumber?: string | null;
  birthday?: any | null;
  height?: number | null;
  weight?: CustomerDetailUpdateweightInput | null;
  bodyType?: string | null;
  averageTopSize?: string | null;
  topSizes?: CustomerDetailUpdatetopSizesInput | null;
  averageWaistSize?: string | null;
  waistSizes?: CustomerDetailUpdatewaistSizesInput | null;
  averagePantLength?: string | null;
  preferredPronouns?: string | null;
  profession?: string | null;
  partyFrequency?: string | null;
  travelFrequency?: string | null;
  shoppingFrequency?: string | null;
  averageSpend?: string | null;
  style?: string | null;
  styles?: CustomerDetailUpdatestylesInput | null;
  commuteStyle?: string | null;
  stylePreferences?: StylePreferencesUpdateOneInput | null;
  shippingAddress?: LocationUpdateOneInput | null;
  phoneOS?: string | null;
  insureShipment?: boolean | null;
  instagramHandle?: string | null;
  discoveryReference?: string | null;
  impactId?: string | null;
}

export interface CustomerDetailUpdateOneInput {
  create?: CustomerDetailCreateInput | null;
  update?: CustomerDetailUpdateDataInput | null;
  upsert?: CustomerDetailUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: CustomerDetailWhereUniqueInput | null;
}

export interface CustomerDetailUpdatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface CustomerDetailUpdatetopSizesInput {
  set?: string[] | null;
}

export interface CustomerDetailUpdatewaistSizesInput {
  set?: number[] | null;
}

export interface CustomerDetailUpdateweightInput {
  set?: number[] | null;
}

export interface CustomerDetailUpsertNestedInput {
  update: CustomerDetailUpdateDataInput;
  create: CustomerDetailCreateInput;
}

export interface CustomerDetailWhereUniqueInput {
  id?: string | null;
}

export interface CustomerMembershipCreateOneWithoutCustomerInput {
  create?: CustomerMembershipCreateWithoutCustomerInput | null;
  connect?: CustomerMembershipWhereUniqueInput | null;
}

export interface CustomerMembershipCreateWithoutCustomerInput {
  id?: string | null;
  plan?: PaymentPlanCreateOneInput | null;
  subscriptionId: string;
  subscription?: CustomerMembershipSubscriptionDataCreateOneInput | null;
  pauseRequests?: PauseRequestCreateManyWithoutMembershipInput | null;
  giftId?: string | null;
}

export interface CustomerMembershipSubscriptionDataCreateInput {
  id?: string | null;
  planID: string;
  subscriptionId: string;
  currentTermStart: any;
  currentTermEnd: any;
  nextBillingAt?: any | null;
  status: string;
  planPrice: number;
}

export interface CustomerMembershipSubscriptionDataCreateOneInput {
  create?: CustomerMembershipSubscriptionDataCreateInput | null;
  connect?: CustomerMembershipSubscriptionDataWhereUniqueInput | null;
}

export interface CustomerMembershipSubscriptionDataUpdateDataInput {
  planID?: string | null;
  subscriptionId?: string | null;
  currentTermStart?: any | null;
  currentTermEnd?: any | null;
  nextBillingAt?: any | null;
  status?: string | null;
  planPrice?: number | null;
}

export interface CustomerMembershipSubscriptionDataUpdateOneInput {
  create?: CustomerMembershipSubscriptionDataCreateInput | null;
  update?: CustomerMembershipSubscriptionDataUpdateDataInput | null;
  upsert?: CustomerMembershipSubscriptionDataUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: CustomerMembershipSubscriptionDataWhereUniqueInput | null;
}

export interface CustomerMembershipSubscriptionDataUpsertNestedInput {
  update: CustomerMembershipSubscriptionDataUpdateDataInput;
  create: CustomerMembershipSubscriptionDataCreateInput;
}

export interface CustomerMembershipSubscriptionDataWhereUniqueInput {
  id?: string | null;
}

export interface CustomerMembershipUpdateOneWithoutCustomerInput {
  create?: CustomerMembershipCreateWithoutCustomerInput | null;
  update?: CustomerMembershipUpdateWithoutCustomerDataInput | null;
  upsert?: CustomerMembershipUpsertWithoutCustomerInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: CustomerMembershipWhereUniqueInput | null;
}

export interface CustomerMembershipUpdateWithoutCustomerDataInput {
  plan?: PaymentPlanUpdateOneInput | null;
  subscriptionId?: string | null;
  subscription?: CustomerMembershipSubscriptionDataUpdateOneInput | null;
  pauseRequests?: PauseRequestUpdateManyWithoutMembershipInput | null;
  giftId?: string | null;
}

export interface CustomerMembershipUpsertWithoutCustomerInput {
  update: CustomerMembershipUpdateWithoutCustomerDataInput;
  create: CustomerMembershipCreateWithoutCustomerInput;
}

export interface CustomerMembershipWhereUniqueInput {
  id?: string | null;
}

export interface CustomerNotificationBarReceiptCreateManyWithoutCustomerInput {
  create?: CustomerNotificationBarReceiptCreateWithoutCustomerInput[] | null;
  connect?: CustomerNotificationBarReceiptWhereUniqueInput[] | null;
}

export interface CustomerNotificationBarReceiptCreateWithoutCustomerInput {
  id?: string | null;
  notificationBarId: NotificationBarID;
  viewCount?: number | null;
  clickCount?: number | null;
}

export interface CustomerNotificationBarReceiptScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  notificationBarId?: NotificationBarID | null;
  notificationBarId_not?: NotificationBarID | null;
  notificationBarId_in?: NotificationBarID[] | null;
  notificationBarId_not_in?: NotificationBarID[] | null;
  viewCount?: number | null;
  viewCount_not?: number | null;
  viewCount_in?: number[] | null;
  viewCount_not_in?: number[] | null;
  viewCount_lt?: number | null;
  viewCount_lte?: number | null;
  viewCount_gt?: number | null;
  viewCount_gte?: number | null;
  clickCount?: number | null;
  clickCount_not?: number | null;
  clickCount_in?: number[] | null;
  clickCount_not_in?: number[] | null;
  clickCount_lt?: number | null;
  clickCount_lte?: number | null;
  clickCount_gt?: number | null;
  clickCount_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: CustomerNotificationBarReceiptScalarWhereInput[] | null;
  OR?: CustomerNotificationBarReceiptScalarWhereInput[] | null;
  NOT?: CustomerNotificationBarReceiptScalarWhereInput[] | null;
}

export interface CustomerNotificationBarReceiptUpdateManyDataInput {
  notificationBarId?: NotificationBarID | null;
  viewCount?: number | null;
  clickCount?: number | null;
}

export interface CustomerNotificationBarReceiptUpdateManyWithWhereNestedInput {
  where: CustomerNotificationBarReceiptScalarWhereInput;
  data: CustomerNotificationBarReceiptUpdateManyDataInput;
}

export interface CustomerNotificationBarReceiptUpdateManyWithoutCustomerInput {
  create?: CustomerNotificationBarReceiptCreateWithoutCustomerInput[] | null;
  delete?: CustomerNotificationBarReceiptWhereUniqueInput[] | null;
  connect?: CustomerNotificationBarReceiptWhereUniqueInput[] | null;
  set?: CustomerNotificationBarReceiptWhereUniqueInput[] | null;
  disconnect?: CustomerNotificationBarReceiptWhereUniqueInput[] | null;
  update?: CustomerNotificationBarReceiptUpdateWithWhereUniqueWithoutCustomerInput[] | null;
  upsert?: CustomerNotificationBarReceiptUpsertWithWhereUniqueWithoutCustomerInput[] | null;
  deleteMany?: CustomerNotificationBarReceiptScalarWhereInput[] | null;
  updateMany?: CustomerNotificationBarReceiptUpdateManyWithWhereNestedInput[] | null;
}

export interface CustomerNotificationBarReceiptUpdateWithWhereUniqueWithoutCustomerInput {
  where: CustomerNotificationBarReceiptWhereUniqueInput;
  data: CustomerNotificationBarReceiptUpdateWithoutCustomerDataInput;
}

export interface CustomerNotificationBarReceiptUpdateWithoutCustomerDataInput {
  notificationBarId?: NotificationBarID | null;
  viewCount?: number | null;
  clickCount?: number | null;
}

export interface CustomerNotificationBarReceiptUpsertWithWhereUniqueWithoutCustomerInput {
  where: CustomerNotificationBarReceiptWhereUniqueInput;
  update: CustomerNotificationBarReceiptUpdateWithoutCustomerDataInput;
  create: CustomerNotificationBarReceiptCreateWithoutCustomerInput;
}

export interface CustomerNotificationBarReceiptWhereUniqueInput {
  id?: string | null;
}

export interface CustomerScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  status?: CustomerStatus | null;
  status_not?: CustomerStatus | null;
  status_in?: CustomerStatus[] | null;
  status_not_in?: CustomerStatus[] | null;
  plan?: Plan | null;
  plan_not?: Plan | null;
  plan_in?: Plan[] | null;
  plan_not_in?: Plan[] | null;
  referralLink?: string | null;
  referralLink_not?: string | null;
  referralLink_in?: string[] | null;
  referralLink_not_in?: string[] | null;
  referralLink_lt?: string | null;
  referralLink_lte?: string | null;
  referralLink_gt?: string | null;
  referralLink_gte?: string | null;
  referralLink_contains?: string | null;
  referralLink_not_contains?: string | null;
  referralLink_starts_with?: string | null;
  referralLink_not_starts_with?: string | null;
  referralLink_ends_with?: string | null;
  referralLink_not_ends_with?: string | null;
  referrerId?: string | null;
  referrerId_not?: string | null;
  referrerId_in?: string[] | null;
  referrerId_not_in?: string[] | null;
  referrerId_lt?: string | null;
  referrerId_lte?: string | null;
  referrerId_gt?: string | null;
  referrerId_gte?: string | null;
  referrerId_contains?: string | null;
  referrerId_not_contains?: string | null;
  referrerId_starts_with?: string | null;
  referrerId_not_starts_with?: string | null;
  referrerId_ends_with?: string | null;
  referrerId_not_ends_with?: string | null;
  authorizedAt?: any | null;
  authorizedAt_not?: any | null;
  authorizedAt_in?: any[] | null;
  authorizedAt_not_in?: any[] | null;
  authorizedAt_lt?: any | null;
  authorizedAt_lte?: any | null;
  authorizedAt_gt?: any | null;
  authorizedAt_gte?: any | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: CustomerScalarWhereInput[] | null;
  OR?: CustomerScalarWhereInput[] | null;
  NOT?: CustomerScalarWhereInput[] | null;
}

export interface CustomerUpdateManyDataInput {
  status?: CustomerStatus | null;
  plan?: Plan | null;
  referralLink?: string | null;
  referrerId?: string | null;
  authorizedAt?: any | null;
}

export interface CustomerUpdateManyWithWhereNestedInput {
  where: CustomerScalarWhereInput;
  data: CustomerUpdateManyDataInput;
}

export interface CustomerUpdateManyWithoutReferrerInput {
  create?: CustomerCreateWithoutReferrerInput[] | null;
  delete?: CustomerWhereUniqueInput[] | null;
  connect?: CustomerWhereUniqueInput[] | null;
  set?: CustomerWhereUniqueInput[] | null;
  disconnect?: CustomerWhereUniqueInput[] | null;
  update?: CustomerUpdateWithWhereUniqueWithoutReferrerInput[] | null;
  upsert?: CustomerUpsertWithWhereUniqueWithoutReferrerInput[] | null;
  deleteMany?: CustomerScalarWhereInput[] | null;
  updateMany?: CustomerUpdateManyWithWhereNestedInput[] | null;
}

export interface CustomerUpdateOneRequiredWithoutReservationsInput {
  create?: CustomerCreateWithoutReservationsInput | null;
  update?: CustomerUpdateWithoutReservationsDataInput | null;
  upsert?: CustomerUpsertWithoutReservationsInput | null;
  connect?: CustomerWhereUniqueInput | null;
}

export interface CustomerUpdateOneWithoutReferreesInput {
  create?: CustomerCreateWithoutReferreesInput | null;
  update?: CustomerUpdateWithoutReferreesDataInput | null;
  upsert?: CustomerUpsertWithoutReferreesInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: CustomerWhereUniqueInput | null;
}

export interface CustomerUpdateWithWhereUniqueWithoutReferrerInput {
  where: CustomerWhereUniqueInput;
  data: CustomerUpdateWithoutReferrerDataInput;
}

export interface CustomerUpdateWithoutReferreesDataInput {
  user?: UserUpdateOneRequiredInput | null;
  status?: CustomerStatus | null;
  detail?: CustomerDetailUpdateOneInput | null;
  billingInfo?: BillingInfoUpdateOneInput | null;
  plan?: Plan | null;
  membership?: CustomerMembershipUpdateOneWithoutCustomerInput | null;
  bagItems?: BagItemUpdateManyWithoutCustomerInput | null;
  reservations?: ReservationUpdateManyWithoutCustomerInput | null;
  referralLink?: string | null;
  referrerId?: string | null;
  referrer?: CustomerUpdateOneWithoutReferreesInput | null;
  emailedProducts?: ProductUpdateManyInput | null;
  admissions?: CustomerAdmissionsDataUpdateOneWithoutCustomerInput | null;
  authorizedAt?: any | null;
  utm?: UTMDataUpdateOneWithoutCustomerInput | null;
  notificationBarReceipts?: CustomerNotificationBarReceiptUpdateManyWithoutCustomerInput | null;
  impactSyncTimings?: SyncTimingUpdateManyInput | null;
}

export interface CustomerUpdateWithoutReferrerDataInput {
  user?: UserUpdateOneRequiredInput | null;
  status?: CustomerStatus | null;
  detail?: CustomerDetailUpdateOneInput | null;
  billingInfo?: BillingInfoUpdateOneInput | null;
  plan?: Plan | null;
  membership?: CustomerMembershipUpdateOneWithoutCustomerInput | null;
  bagItems?: BagItemUpdateManyWithoutCustomerInput | null;
  reservations?: ReservationUpdateManyWithoutCustomerInput | null;
  referralLink?: string | null;
  referrerId?: string | null;
  referrees?: CustomerUpdateManyWithoutReferrerInput | null;
  emailedProducts?: ProductUpdateManyInput | null;
  admissions?: CustomerAdmissionsDataUpdateOneWithoutCustomerInput | null;
  authorizedAt?: any | null;
  utm?: UTMDataUpdateOneWithoutCustomerInput | null;
  notificationBarReceipts?: CustomerNotificationBarReceiptUpdateManyWithoutCustomerInput | null;
  impactSyncTimings?: SyncTimingUpdateManyInput | null;
}

export interface CustomerUpdateWithoutReservationsDataInput {
  user?: UserUpdateOneRequiredInput | null;
  status?: CustomerStatus | null;
  detail?: CustomerDetailUpdateOneInput | null;
  billingInfo?: BillingInfoUpdateOneInput | null;
  plan?: Plan | null;
  membership?: CustomerMembershipUpdateOneWithoutCustomerInput | null;
  bagItems?: BagItemUpdateManyWithoutCustomerInput | null;
  referralLink?: string | null;
  referrerId?: string | null;
  referrer?: CustomerUpdateOneWithoutReferreesInput | null;
  referrees?: CustomerUpdateManyWithoutReferrerInput | null;
  emailedProducts?: ProductUpdateManyInput | null;
  admissions?: CustomerAdmissionsDataUpdateOneWithoutCustomerInput | null;
  authorizedAt?: any | null;
  utm?: UTMDataUpdateOneWithoutCustomerInput | null;
  notificationBarReceipts?: CustomerNotificationBarReceiptUpdateManyWithoutCustomerInput | null;
  impactSyncTimings?: SyncTimingUpdateManyInput | null;
}

export interface CustomerUpsertWithWhereUniqueWithoutReferrerInput {
  where: CustomerWhereUniqueInput;
  update: CustomerUpdateWithoutReferrerDataInput;
  create: CustomerCreateWithoutReferrerInput;
}

export interface CustomerUpsertWithoutReferreesInput {
  update: CustomerUpdateWithoutReferreesDataInput;
  create: CustomerCreateWithoutReferreesInput;
}

export interface CustomerUpsertWithoutReservationsInput {
  update: CustomerUpdateWithoutReservationsDataInput;
  create: CustomerCreateWithoutReservationsInput;
}

export interface CustomerWhereUniqueInput {
  id?: string | null;
  referralLink?: string | null;
}

export interface EmailReceiptCreateManyWithoutUserInput {
  create?: EmailReceiptCreateWithoutUserInput[] | null;
  connect?: EmailReceiptWhereUniqueInput[] | null;
}

export interface EmailReceiptCreateWithoutUserInput {
  id?: string | null;
  emailId: EmailId;
}

export interface EmailReceiptScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  emailId?: EmailId | null;
  emailId_not?: EmailId | null;
  emailId_in?: EmailId[] | null;
  emailId_not_in?: EmailId[] | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: EmailReceiptScalarWhereInput[] | null;
  OR?: EmailReceiptScalarWhereInput[] | null;
  NOT?: EmailReceiptScalarWhereInput[] | null;
}

export interface EmailReceiptUpdateManyDataInput {
  emailId?: EmailId | null;
}

export interface EmailReceiptUpdateManyWithWhereNestedInput {
  where: EmailReceiptScalarWhereInput;
  data: EmailReceiptUpdateManyDataInput;
}

export interface EmailReceiptUpdateManyWithoutUserInput {
  create?: EmailReceiptCreateWithoutUserInput[] | null;
  delete?: EmailReceiptWhereUniqueInput[] | null;
  connect?: EmailReceiptWhereUniqueInput[] | null;
  set?: EmailReceiptWhereUniqueInput[] | null;
  disconnect?: EmailReceiptWhereUniqueInput[] | null;
  update?: EmailReceiptUpdateWithWhereUniqueWithoutUserInput[] | null;
  upsert?: EmailReceiptUpsertWithWhereUniqueWithoutUserInput[] | null;
  deleteMany?: EmailReceiptScalarWhereInput[] | null;
  updateMany?: EmailReceiptUpdateManyWithWhereNestedInput[] | null;
}

export interface EmailReceiptUpdateWithWhereUniqueWithoutUserInput {
  where: EmailReceiptWhereUniqueInput;
  data: EmailReceiptUpdateWithoutUserDataInput;
}

export interface EmailReceiptUpdateWithoutUserDataInput {
  emailId?: EmailId | null;
}

export interface EmailReceiptUpsertWithWhereUniqueWithoutUserInput {
  where: EmailReceiptWhereUniqueInput;
  update: EmailReceiptUpdateWithoutUserDataInput;
  create: EmailReceiptCreateWithoutUserInput;
}

export interface EmailReceiptWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  emailId?: EmailId | null;
  emailId_not?: EmailId | null;
  emailId_in?: EmailId[] | null;
  emailId_not_in?: EmailId[] | null;
  user?: UserWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: EmailReceiptWhereInput[] | null;
  OR?: EmailReceiptWhereInput[] | null;
  NOT?: EmailReceiptWhereInput[] | null;
}

export interface EmailReceiptWhereUniqueInput {
  id?: string | null;
}

export interface FitPicCreateManyWithoutUserInput {
  create?: FitPicCreateWithoutUserInput[] | null;
  connect?: FitPicWhereUniqueInput[] | null;
}

export interface FitPicCreateWithoutUserInput {
  id?: string | null;
  image: ImageCreateOneInput;
  includeInstagramHandle?: boolean | null;
  location?: LocationCreateOneInput | null;
  products?: ProductCreateManyInput | null;
  reports?: FitPicReportCreateManyWithoutReportedInput | null;
  status?: FitPicStatus | null;
}

export interface FitPicReportCreateManyWithoutReportedInput {
  create?: FitPicReportCreateWithoutReportedInput[] | null;
  connect?: FitPicReportWhereUniqueInput[] | null;
}

export interface FitPicReportCreateWithoutReportedInput {
  id?: string | null;
  reporter: UserCreateOneInput;
  status?: FitPicReportStatus | null;
}

export interface FitPicReportScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  status?: FitPicReportStatus | null;
  status_not?: FitPicReportStatus | null;
  status_in?: FitPicReportStatus[] | null;
  status_not_in?: FitPicReportStatus[] | null;
  reportedAt?: any | null;
  reportedAt_not?: any | null;
  reportedAt_in?: any[] | null;
  reportedAt_not_in?: any[] | null;
  reportedAt_lt?: any | null;
  reportedAt_lte?: any | null;
  reportedAt_gt?: any | null;
  reportedAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: FitPicReportScalarWhereInput[] | null;
  OR?: FitPicReportScalarWhereInput[] | null;
  NOT?: FitPicReportScalarWhereInput[] | null;
}

export interface FitPicReportUpdateManyDataInput {
  status?: FitPicReportStatus | null;
}

export interface FitPicReportUpdateManyWithWhereNestedInput {
  where: FitPicReportScalarWhereInput;
  data: FitPicReportUpdateManyDataInput;
}

export interface FitPicReportUpdateManyWithoutReportedInput {
  create?: FitPicReportCreateWithoutReportedInput[] | null;
  delete?: FitPicReportWhereUniqueInput[] | null;
  connect?: FitPicReportWhereUniqueInput[] | null;
  set?: FitPicReportWhereUniqueInput[] | null;
  disconnect?: FitPicReportWhereUniqueInput[] | null;
  update?: FitPicReportUpdateWithWhereUniqueWithoutReportedInput[] | null;
  upsert?: FitPicReportUpsertWithWhereUniqueWithoutReportedInput[] | null;
  deleteMany?: FitPicReportScalarWhereInput[] | null;
  updateMany?: FitPicReportUpdateManyWithWhereNestedInput[] | null;
}

export interface FitPicReportUpdateWithWhereUniqueWithoutReportedInput {
  where: FitPicReportWhereUniqueInput;
  data: FitPicReportUpdateWithoutReportedDataInput;
}

export interface FitPicReportUpdateWithoutReportedDataInput {
  reporter?: UserUpdateOneRequiredInput | null;
  status?: FitPicReportStatus | null;
}

export interface FitPicReportUpsertWithWhereUniqueWithoutReportedInput {
  where: FitPicReportWhereUniqueInput;
  update: FitPicReportUpdateWithoutReportedDataInput;
  create: FitPicReportCreateWithoutReportedInput;
}

export interface FitPicReportWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  reporter?: UserWhereInput | null;
  reported?: FitPicWhereInput | null;
  status?: FitPicReportStatus | null;
  status_not?: FitPicReportStatus | null;
  status_in?: FitPicReportStatus[] | null;
  status_not_in?: FitPicReportStatus[] | null;
  reportedAt?: any | null;
  reportedAt_not?: any | null;
  reportedAt_in?: any[] | null;
  reportedAt_not_in?: any[] | null;
  reportedAt_lt?: any | null;
  reportedAt_lte?: any | null;
  reportedAt_gt?: any | null;
  reportedAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: FitPicReportWhereInput[] | null;
  OR?: FitPicReportWhereInput[] | null;
  NOT?: FitPicReportWhereInput[] | null;
}

export interface FitPicReportWhereUniqueInput {
  id?: string | null;
}

export interface FitPicScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  includeInstagramHandle?: boolean | null;
  includeInstagramHandle_not?: boolean | null;
  status?: FitPicStatus | null;
  status_not?: FitPicStatus | null;
  status_in?: FitPicStatus[] | null;
  status_not_in?: FitPicStatus[] | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: FitPicScalarWhereInput[] | null;
  OR?: FitPicScalarWhereInput[] | null;
  NOT?: FitPicScalarWhereInput[] | null;
}

export interface FitPicSubmissionOptionsInput {
  instagramHandle?: string | null;
  includeInstagramHandle?: boolean | null;
}

export interface FitPicUpdateManyDataInput {
  includeInstagramHandle?: boolean | null;
  status?: FitPicStatus | null;
}

export interface FitPicUpdateManyWithWhereNestedInput {
  where: FitPicScalarWhereInput;
  data: FitPicUpdateManyDataInput;
}

export interface FitPicUpdateManyWithoutUserInput {
  create?: FitPicCreateWithoutUserInput[] | null;
  delete?: FitPicWhereUniqueInput[] | null;
  connect?: FitPicWhereUniqueInput[] | null;
  set?: FitPicWhereUniqueInput[] | null;
  disconnect?: FitPicWhereUniqueInput[] | null;
  update?: FitPicUpdateWithWhereUniqueWithoutUserInput[] | null;
  upsert?: FitPicUpsertWithWhereUniqueWithoutUserInput[] | null;
  deleteMany?: FitPicScalarWhereInput[] | null;
  updateMany?: FitPicUpdateManyWithWhereNestedInput[] | null;
}

export interface FitPicUpdateWithWhereUniqueWithoutUserInput {
  where: FitPicWhereUniqueInput;
  data: FitPicUpdateWithoutUserDataInput;
}

export interface FitPicUpdateWithoutUserDataInput {
  image?: ImageUpdateOneRequiredInput | null;
  includeInstagramHandle?: boolean | null;
  location?: LocationUpdateOneInput | null;
  products?: ProductUpdateManyInput | null;
  reports?: FitPicReportUpdateManyWithoutReportedInput | null;
  status?: FitPicStatus | null;
}

export interface FitPicUpsertWithWhereUniqueWithoutUserInput {
  where: FitPicWhereUniqueInput;
  update: FitPicUpdateWithoutUserDataInput;
  create: FitPicCreateWithoutUserInput;
}

export interface FitPicWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  image?: ImageWhereInput | null;
  includeInstagramHandle?: boolean | null;
  includeInstagramHandle_not?: boolean | null;
  location?: LocationWhereInput | null;
  products_every?: ProductWhereInput | null;
  products_some?: ProductWhereInput | null;
  products_none?: ProductWhereInput | null;
  reports_every?: FitPicReportWhereInput | null;
  reports_some?: FitPicReportWhereInput | null;
  reports_none?: FitPicReportWhereInput | null;
  status?: FitPicStatus | null;
  status_not?: FitPicStatus | null;
  status_in?: FitPicStatus[] | null;
  status_not_in?: FitPicStatus[] | null;
  user?: UserWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: FitPicWhereInput[] | null;
  OR?: FitPicWhereInput[] | null;
  NOT?: FitPicWhereInput[] | null;
}

export interface FitPicWhereUniqueInput {
  id?: string | null;
}

export interface ImageCreateInput {
  id?: string | null;
  caption?: string | null;
  url: string;
  alt?: string | null;
  height?: number | null;
  width?: number | null;
  title?: string | null;
}

export interface ImageCreateManyInput {
  create?: ImageCreateInput[] | null;
  connect?: ImageWhereUniqueInput[] | null;
}

export interface ImageCreateOneInput {
  create?: ImageCreateInput | null;
  connect?: ImageWhereUniqueInput | null;
}

export interface ImageScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  caption?: string | null;
  caption_not?: string | null;
  caption_in?: string[] | null;
  caption_not_in?: string[] | null;
  caption_lt?: string | null;
  caption_lte?: string | null;
  caption_gt?: string | null;
  caption_gte?: string | null;
  caption_contains?: string | null;
  caption_not_contains?: string | null;
  caption_starts_with?: string | null;
  caption_not_starts_with?: string | null;
  caption_ends_with?: string | null;
  caption_not_ends_with?: string | null;
  url?: string | null;
  url_not?: string | null;
  url_in?: string[] | null;
  url_not_in?: string[] | null;
  url_lt?: string | null;
  url_lte?: string | null;
  url_gt?: string | null;
  url_gte?: string | null;
  url_contains?: string | null;
  url_not_contains?: string | null;
  url_starts_with?: string | null;
  url_not_starts_with?: string | null;
  url_ends_with?: string | null;
  url_not_ends_with?: string | null;
  alt?: string | null;
  alt_not?: string | null;
  alt_in?: string[] | null;
  alt_not_in?: string[] | null;
  alt_lt?: string | null;
  alt_lte?: string | null;
  alt_gt?: string | null;
  alt_gte?: string | null;
  alt_contains?: string | null;
  alt_not_contains?: string | null;
  alt_starts_with?: string | null;
  alt_not_starts_with?: string | null;
  alt_ends_with?: string | null;
  alt_not_ends_with?: string | null;
  height?: number | null;
  height_not?: number | null;
  height_in?: number[] | null;
  height_not_in?: number[] | null;
  height_lt?: number | null;
  height_lte?: number | null;
  height_gt?: number | null;
  height_gte?: number | null;
  width?: number | null;
  width_not?: number | null;
  width_in?: number[] | null;
  width_not_in?: number[] | null;
  width_lt?: number | null;
  width_lte?: number | null;
  width_gt?: number | null;
  width_gte?: number | null;
  title?: string | null;
  title_not?: string | null;
  title_in?: string[] | null;
  title_not_in?: string[] | null;
  title_lt?: string | null;
  title_lte?: string | null;
  title_gt?: string | null;
  title_gte?: string | null;
  title_contains?: string | null;
  title_not_contains?: string | null;
  title_starts_with?: string | null;
  title_not_starts_with?: string | null;
  title_ends_with?: string | null;
  title_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ImageScalarWhereInput[] | null;
  OR?: ImageScalarWhereInput[] | null;
  NOT?: ImageScalarWhereInput[] | null;
}

export interface ImageUpdateDataInput {
  caption?: string | null;
  url?: string | null;
  alt?: string | null;
  height?: number | null;
  width?: number | null;
  title?: string | null;
}

export interface ImageUpdateManyDataInput {
  caption?: string | null;
  url?: string | null;
  alt?: string | null;
  height?: number | null;
  width?: number | null;
  title?: string | null;
}

export interface ImageUpdateManyInput {
  create?: ImageCreateInput[] | null;
  update?: ImageUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: ImageUpsertWithWhereUniqueNestedInput[] | null;
  delete?: ImageWhereUniqueInput[] | null;
  connect?: ImageWhereUniqueInput[] | null;
  set?: ImageWhereUniqueInput[] | null;
  disconnect?: ImageWhereUniqueInput[] | null;
  deleteMany?: ImageScalarWhereInput[] | null;
  updateMany?: ImageUpdateManyWithWhereNestedInput[] | null;
}

export interface ImageUpdateManyWithWhereNestedInput {
  where: ImageScalarWhereInput;
  data: ImageUpdateManyDataInput;
}

export interface ImageUpdateOneInput {
  create?: ImageCreateInput | null;
  update?: ImageUpdateDataInput | null;
  upsert?: ImageUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ImageWhereUniqueInput | null;
}

export interface ImageUpdateOneRequiredInput {
  create?: ImageCreateInput | null;
  update?: ImageUpdateDataInput | null;
  upsert?: ImageUpsertNestedInput | null;
  connect?: ImageWhereUniqueInput | null;
}

export interface ImageUpdateWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput;
  data: ImageUpdateDataInput;
}

export interface ImageUpsertNestedInput {
  update: ImageUpdateDataInput;
  create: ImageCreateInput;
}

export interface ImageUpsertWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput;
  update: ImageUpdateDataInput;
  create: ImageCreateInput;
}

export interface ImageWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  caption?: string | null;
  caption_not?: string | null;
  caption_in?: string[] | null;
  caption_not_in?: string[] | null;
  caption_lt?: string | null;
  caption_lte?: string | null;
  caption_gt?: string | null;
  caption_gte?: string | null;
  caption_contains?: string | null;
  caption_not_contains?: string | null;
  caption_starts_with?: string | null;
  caption_not_starts_with?: string | null;
  caption_ends_with?: string | null;
  caption_not_ends_with?: string | null;
  url?: string | null;
  url_not?: string | null;
  url_in?: string[] | null;
  url_not_in?: string[] | null;
  url_lt?: string | null;
  url_lte?: string | null;
  url_gt?: string | null;
  url_gte?: string | null;
  url_contains?: string | null;
  url_not_contains?: string | null;
  url_starts_with?: string | null;
  url_not_starts_with?: string | null;
  url_ends_with?: string | null;
  url_not_ends_with?: string | null;
  alt?: string | null;
  alt_not?: string | null;
  alt_in?: string[] | null;
  alt_not_in?: string[] | null;
  alt_lt?: string | null;
  alt_lte?: string | null;
  alt_gt?: string | null;
  alt_gte?: string | null;
  alt_contains?: string | null;
  alt_not_contains?: string | null;
  alt_starts_with?: string | null;
  alt_not_starts_with?: string | null;
  alt_ends_with?: string | null;
  alt_not_ends_with?: string | null;
  height?: number | null;
  height_not?: number | null;
  height_in?: number[] | null;
  height_not_in?: number[] | null;
  height_lt?: number | null;
  height_lte?: number | null;
  height_gt?: number | null;
  height_gte?: number | null;
  width?: number | null;
  width_not?: number | null;
  width_in?: number[] | null;
  width_not_in?: number[] | null;
  width_lt?: number | null;
  width_lte?: number | null;
  width_gt?: number | null;
  width_gte?: number | null;
  title?: string | null;
  title_not?: string | null;
  title_in?: string[] | null;
  title_not_in?: string[] | null;
  title_lt?: string | null;
  title_lte?: string | null;
  title_gt?: string | null;
  title_gte?: string | null;
  title_contains?: string | null;
  title_not_contains?: string | null;
  title_starts_with?: string | null;
  title_not_starts_with?: string | null;
  title_ends_with?: string | null;
  title_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ImageWhereInput[] | null;
  OR?: ImageWhereInput[] | null;
  NOT?: ImageWhereInput[] | null;
}

export interface ImageWhereUniqueInput {
  id?: string | null;
  url?: string | null;
}

export interface LabelCreateInput {
  id?: string | null;
  name?: string | null;
  image?: string | null;
  trackingNumber?: string | null;
  trackingURL?: string | null;
}

export interface LabelCreateOneInput {
  create?: LabelCreateInput | null;
  connect?: LabelWhereUniqueInput | null;
}

export interface LabelUpdateDataInput {
  name?: string | null;
  image?: string | null;
  trackingNumber?: string | null;
  trackingURL?: string | null;
}

export interface LabelUpdateOneRequiredInput {
  create?: LabelCreateInput | null;
  update?: LabelUpdateDataInput | null;
  upsert?: LabelUpsertNestedInput | null;
  connect?: LabelWhereUniqueInput | null;
}

export interface LabelUpsertNestedInput {
  update: LabelUpdateDataInput;
  create: LabelCreateInput;
}

export interface LabelWhereUniqueInput {
  id?: string | null;
}

export interface LocationCreateInput {
  id?: string | null;
  slug?: string | null;
  name?: string | null;
  company?: string | null;
  description?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode: string;
  locationType?: LocationType | null;
  user?: UserCreateOneInput | null;
  lat?: number | null;
  lng?: number | null;
  physicalProducts?: PhysicalProductCreateManyWithoutLocationInput | null;
  shippingOptions?: ShippingOptionCreateManyWithoutDestinationInput | null;
}

export interface LocationCreateOneInput {
  create?: LocationCreateInput | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationCreateOneWithoutPhysicalProductsInput {
  create?: LocationCreateWithoutPhysicalProductsInput | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationCreateOneWithoutShippingOptionsInput {
  create?: LocationCreateWithoutShippingOptionsInput | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationCreateWithoutPhysicalProductsInput {
  id?: string | null;
  slug?: string | null;
  name?: string | null;
  company?: string | null;
  description?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode: string;
  locationType?: LocationType | null;
  user?: UserCreateOneInput | null;
  lat?: number | null;
  lng?: number | null;
  shippingOptions?: ShippingOptionCreateManyWithoutDestinationInput | null;
}

export interface LocationCreateWithoutShippingOptionsInput {
  id?: string | null;
  slug?: string | null;
  name?: string | null;
  company?: string | null;
  description?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode: string;
  locationType?: LocationType | null;
  user?: UserCreateOneInput | null;
  lat?: number | null;
  lng?: number | null;
  physicalProducts?: PhysicalProductCreateManyWithoutLocationInput | null;
}

export interface LocationUpdateDataInput {
  slug?: string | null;
  name?: string | null;
  company?: string | null;
  description?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode?: string | null;
  locationType?: LocationType | null;
  user?: UserUpdateOneInput | null;
  lat?: number | null;
  lng?: number | null;
  physicalProducts?: PhysicalProductUpdateManyWithoutLocationInput | null;
  shippingOptions?: ShippingOptionUpdateManyWithoutDestinationInput | null;
}

export interface LocationUpdateOneInput {
  create?: LocationCreateInput | null;
  update?: LocationUpdateDataInput | null;
  upsert?: LocationUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationUpdateOneRequiredInput {
  create?: LocationCreateInput | null;
  update?: LocationUpdateDataInput | null;
  upsert?: LocationUpsertNestedInput | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationUpdateOneWithoutPhysicalProductsInput {
  create?: LocationCreateWithoutPhysicalProductsInput | null;
  update?: LocationUpdateWithoutPhysicalProductsDataInput | null;
  upsert?: LocationUpsertWithoutPhysicalProductsInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationUpdateOneWithoutShippingOptionsInput {
  create?: LocationCreateWithoutShippingOptionsInput | null;
  update?: LocationUpdateWithoutShippingOptionsDataInput | null;
  upsert?: LocationUpsertWithoutShippingOptionsInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationUpdateWithoutPhysicalProductsDataInput {
  slug?: string | null;
  name?: string | null;
  company?: string | null;
  description?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode?: string | null;
  locationType?: LocationType | null;
  user?: UserUpdateOneInput | null;
  lat?: number | null;
  lng?: number | null;
  shippingOptions?: ShippingOptionUpdateManyWithoutDestinationInput | null;
}

export interface LocationUpdateWithoutShippingOptionsDataInput {
  slug?: string | null;
  name?: string | null;
  company?: string | null;
  description?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode?: string | null;
  locationType?: LocationType | null;
  user?: UserUpdateOneInput | null;
  lat?: number | null;
  lng?: number | null;
  physicalProducts?: PhysicalProductUpdateManyWithoutLocationInput | null;
}

export interface LocationUpsertNestedInput {
  update: LocationUpdateDataInput;
  create: LocationCreateInput;
}

export interface LocationUpsertWithoutPhysicalProductsInput {
  update: LocationUpdateWithoutPhysicalProductsDataInput;
  create: LocationCreateWithoutPhysicalProductsInput;
}

export interface LocationUpsertWithoutShippingOptionsInput {
  update: LocationUpdateWithoutShippingOptionsDataInput;
  create: LocationCreateWithoutShippingOptionsInput;
}

export interface LocationWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  company?: string | null;
  company_not?: string | null;
  company_in?: string[] | null;
  company_not_in?: string[] | null;
  company_lt?: string | null;
  company_lte?: string | null;
  company_gt?: string | null;
  company_gte?: string | null;
  company_contains?: string | null;
  company_not_contains?: string | null;
  company_starts_with?: string | null;
  company_not_starts_with?: string | null;
  company_ends_with?: string | null;
  company_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  address1?: string | null;
  address1_not?: string | null;
  address1_in?: string[] | null;
  address1_not_in?: string[] | null;
  address1_lt?: string | null;
  address1_lte?: string | null;
  address1_gt?: string | null;
  address1_gte?: string | null;
  address1_contains?: string | null;
  address1_not_contains?: string | null;
  address1_starts_with?: string | null;
  address1_not_starts_with?: string | null;
  address1_ends_with?: string | null;
  address1_not_ends_with?: string | null;
  address2?: string | null;
  address2_not?: string | null;
  address2_in?: string[] | null;
  address2_not_in?: string[] | null;
  address2_lt?: string | null;
  address2_lte?: string | null;
  address2_gt?: string | null;
  address2_gte?: string | null;
  address2_contains?: string | null;
  address2_not_contains?: string | null;
  address2_starts_with?: string | null;
  address2_not_starts_with?: string | null;
  address2_ends_with?: string | null;
  address2_not_ends_with?: string | null;
  city?: string | null;
  city_not?: string | null;
  city_in?: string[] | null;
  city_not_in?: string[] | null;
  city_lt?: string | null;
  city_lte?: string | null;
  city_gt?: string | null;
  city_gte?: string | null;
  city_contains?: string | null;
  city_not_contains?: string | null;
  city_starts_with?: string | null;
  city_not_starts_with?: string | null;
  city_ends_with?: string | null;
  city_not_ends_with?: string | null;
  country?: string | null;
  country_not?: string | null;
  country_in?: string[] | null;
  country_not_in?: string[] | null;
  country_lt?: string | null;
  country_lte?: string | null;
  country_gt?: string | null;
  country_gte?: string | null;
  country_contains?: string | null;
  country_not_contains?: string | null;
  country_starts_with?: string | null;
  country_not_starts_with?: string | null;
  country_ends_with?: string | null;
  country_not_ends_with?: string | null;
  state?: string | null;
  state_not?: string | null;
  state_in?: string[] | null;
  state_not_in?: string[] | null;
  state_lt?: string | null;
  state_lte?: string | null;
  state_gt?: string | null;
  state_gte?: string | null;
  state_contains?: string | null;
  state_not_contains?: string | null;
  state_starts_with?: string | null;
  state_not_starts_with?: string | null;
  state_ends_with?: string | null;
  state_not_ends_with?: string | null;
  zipCode?: string | null;
  zipCode_not?: string | null;
  zipCode_in?: string[] | null;
  zipCode_not_in?: string[] | null;
  zipCode_lt?: string | null;
  zipCode_lte?: string | null;
  zipCode_gt?: string | null;
  zipCode_gte?: string | null;
  zipCode_contains?: string | null;
  zipCode_not_contains?: string | null;
  zipCode_starts_with?: string | null;
  zipCode_not_starts_with?: string | null;
  zipCode_ends_with?: string | null;
  zipCode_not_ends_with?: string | null;
  locationType?: LocationType | null;
  locationType_not?: LocationType | null;
  locationType_in?: LocationType[] | null;
  locationType_not_in?: LocationType[] | null;
  user?: UserWhereInput | null;
  lat?: number | null;
  lat_not?: number | null;
  lat_in?: number[] | null;
  lat_not_in?: number[] | null;
  lat_lt?: number | null;
  lat_lte?: number | null;
  lat_gt?: number | null;
  lat_gte?: number | null;
  lng?: number | null;
  lng_not?: number | null;
  lng_in?: number[] | null;
  lng_not_in?: number[] | null;
  lng_lt?: number | null;
  lng_lte?: number | null;
  lng_gt?: number | null;
  lng_gte?: number | null;
  physicalProducts_every?: PhysicalProductWhereInput | null;
  physicalProducts_some?: PhysicalProductWhereInput | null;
  physicalProducts_none?: PhysicalProductWhereInput | null;
  shippingOptions_every?: ShippingOptionWhereInput | null;
  shippingOptions_some?: ShippingOptionWhereInput | null;
  shippingOptions_none?: ShippingOptionWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: LocationWhereInput[] | null;
  OR?: LocationWhereInput[] | null;
  NOT?: LocationWhereInput[] | null;
}

export interface LocationWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
}

export interface PackageCreateInput {
  id?: string | null;
  items?: PhysicalProductCreateManyInput | null;
  transactionID: string;
  shippingLabel: LabelCreateOneInput;
  fromAddress: LocationCreateOneInput;
  toAddress: LocationCreateOneInput;
  weight?: number | null;
  cost?: number | null;
  events?: PackageTransitEventCreateManyWithoutPackageInput | null;
  status?: PackageStatus | null;
}

export interface PackageCreateOneInput {
  create?: PackageCreateInput | null;
  connect?: PackageWhereUniqueInput | null;
}

export interface PackageCreateOneWithoutEventsInput {
  create?: PackageCreateWithoutEventsInput | null;
  connect?: PackageWhereUniqueInput | null;
}

export interface PackageCreateWithoutEventsInput {
  id?: string | null;
  items?: PhysicalProductCreateManyInput | null;
  transactionID: string;
  shippingLabel: LabelCreateOneInput;
  fromAddress: LocationCreateOneInput;
  toAddress: LocationCreateOneInput;
  weight?: number | null;
  cost?: number | null;
  status?: PackageStatus | null;
}

export interface PackageTransitEventCreateManyWithoutPackageInput {
  create?: PackageTransitEventCreateWithoutPackageInput[] | null;
  connect?: PackageTransitEventWhereUniqueInput[] | null;
}

export interface PackageTransitEventCreateManyWithoutReservationInput {
  create?: PackageTransitEventCreateWithoutReservationInput[] | null;
  connect?: PackageTransitEventWhereUniqueInput[] | null;
}

export interface PackageTransitEventCreateWithoutPackageInput {
  id?: string | null;
  status: PackageTransitEventStatus;
  subStatus: PackageTransitEventSubStatus;
  reservation?: ReservationCreateOneWithoutPackageEventsInput | null;
  data: any;
}

export interface PackageTransitEventCreateWithoutReservationInput {
  id?: string | null;
  status: PackageTransitEventStatus;
  subStatus: PackageTransitEventSubStatus;
  package: PackageCreateOneWithoutEventsInput;
  data: any;
}

export interface PackageTransitEventScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  status?: PackageTransitEventStatus | null;
  status_not?: PackageTransitEventStatus | null;
  status_in?: PackageTransitEventStatus[] | null;
  status_not_in?: PackageTransitEventStatus[] | null;
  subStatus?: PackageTransitEventSubStatus | null;
  subStatus_not?: PackageTransitEventSubStatus | null;
  subStatus_in?: PackageTransitEventSubStatus[] | null;
  subStatus_not_in?: PackageTransitEventSubStatus[] | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: PackageTransitEventScalarWhereInput[] | null;
  OR?: PackageTransitEventScalarWhereInput[] | null;
  NOT?: PackageTransitEventScalarWhereInput[] | null;
}

export interface PackageTransitEventUpdateManyDataInput {
  status?: PackageTransitEventStatus | null;
  subStatus?: PackageTransitEventSubStatus | null;
  data?: any | null;
}

export interface PackageTransitEventUpdateManyWithWhereNestedInput {
  where: PackageTransitEventScalarWhereInput;
  data: PackageTransitEventUpdateManyDataInput;
}

export interface PackageTransitEventUpdateManyWithoutPackageInput {
  create?: PackageTransitEventCreateWithoutPackageInput[] | null;
  delete?: PackageTransitEventWhereUniqueInput[] | null;
  connect?: PackageTransitEventWhereUniqueInput[] | null;
  set?: PackageTransitEventWhereUniqueInput[] | null;
  disconnect?: PackageTransitEventWhereUniqueInput[] | null;
  update?: PackageTransitEventUpdateWithWhereUniqueWithoutPackageInput[] | null;
  upsert?: PackageTransitEventUpsertWithWhereUniqueWithoutPackageInput[] | null;
  deleteMany?: PackageTransitEventScalarWhereInput[] | null;
  updateMany?: PackageTransitEventUpdateManyWithWhereNestedInput[] | null;
}

export interface PackageTransitEventUpdateManyWithoutReservationInput {
  create?: PackageTransitEventCreateWithoutReservationInput[] | null;
  delete?: PackageTransitEventWhereUniqueInput[] | null;
  connect?: PackageTransitEventWhereUniqueInput[] | null;
  set?: PackageTransitEventWhereUniqueInput[] | null;
  disconnect?: PackageTransitEventWhereUniqueInput[] | null;
  update?: PackageTransitEventUpdateWithWhereUniqueWithoutReservationInput[] | null;
  upsert?: PackageTransitEventUpsertWithWhereUniqueWithoutReservationInput[] | null;
  deleteMany?: PackageTransitEventScalarWhereInput[] | null;
  updateMany?: PackageTransitEventUpdateManyWithWhereNestedInput[] | null;
}

export interface PackageTransitEventUpdateWithWhereUniqueWithoutPackageInput {
  where: PackageTransitEventWhereUniqueInput;
  data: PackageTransitEventUpdateWithoutPackageDataInput;
}

export interface PackageTransitEventUpdateWithWhereUniqueWithoutReservationInput {
  where: PackageTransitEventWhereUniqueInput;
  data: PackageTransitEventUpdateWithoutReservationDataInput;
}

export interface PackageTransitEventUpdateWithoutPackageDataInput {
  status?: PackageTransitEventStatus | null;
  subStatus?: PackageTransitEventSubStatus | null;
  reservation?: ReservationUpdateOneWithoutPackageEventsInput | null;
  data?: any | null;
}

export interface PackageTransitEventUpdateWithoutReservationDataInput {
  status?: PackageTransitEventStatus | null;
  subStatus?: PackageTransitEventSubStatus | null;
  package?: PackageUpdateOneRequiredWithoutEventsInput | null;
  data?: any | null;
}

export interface PackageTransitEventUpsertWithWhereUniqueWithoutPackageInput {
  where: PackageTransitEventWhereUniqueInput;
  update: PackageTransitEventUpdateWithoutPackageDataInput;
  create: PackageTransitEventCreateWithoutPackageInput;
}

export interface PackageTransitEventUpsertWithWhereUniqueWithoutReservationInput {
  where: PackageTransitEventWhereUniqueInput;
  update: PackageTransitEventUpdateWithoutReservationDataInput;
  create: PackageTransitEventCreateWithoutReservationInput;
}

export interface PackageTransitEventWhereUniqueInput {
  id?: string | null;
}

export interface PackageUpdateDataInput {
  items?: PhysicalProductUpdateManyInput | null;
  transactionID?: string | null;
  shippingLabel?: LabelUpdateOneRequiredInput | null;
  fromAddress?: LocationUpdateOneRequiredInput | null;
  toAddress?: LocationUpdateOneRequiredInput | null;
  weight?: number | null;
  cost?: number | null;
  events?: PackageTransitEventUpdateManyWithoutPackageInput | null;
  status?: PackageStatus | null;
}

export interface PackageUpdateOneInput {
  create?: PackageCreateInput | null;
  update?: PackageUpdateDataInput | null;
  upsert?: PackageUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: PackageWhereUniqueInput | null;
}

export interface PackageUpdateOneRequiredWithoutEventsInput {
  create?: PackageCreateWithoutEventsInput | null;
  update?: PackageUpdateWithoutEventsDataInput | null;
  upsert?: PackageUpsertWithoutEventsInput | null;
  connect?: PackageWhereUniqueInput | null;
}

export interface PackageUpdateWithoutEventsDataInput {
  items?: PhysicalProductUpdateManyInput | null;
  transactionID?: string | null;
  shippingLabel?: LabelUpdateOneRequiredInput | null;
  fromAddress?: LocationUpdateOneRequiredInput | null;
  toAddress?: LocationUpdateOneRequiredInput | null;
  weight?: number | null;
  cost?: number | null;
  status?: PackageStatus | null;
}

export interface PackageUpsertNestedInput {
  update: PackageUpdateDataInput;
  create: PackageCreateInput;
}

export interface PackageUpsertWithoutEventsInput {
  update: PackageUpdateWithoutEventsDataInput;
  create: PackageCreateWithoutEventsInput;
}

export interface PackageWhereUniqueInput {
  id?: string | null;
}

export interface PauseRequestCreateManyWithoutMembershipInput {
  create?: PauseRequestCreateWithoutMembershipInput[] | null;
  connect?: PauseRequestWhereUniqueInput[] | null;
}

export interface PauseRequestCreateWithoutMembershipInput {
  id?: string | null;
  pausePending: boolean;
  pauseType?: PauseType | null;
  pauseDate?: any | null;
  resumeDate?: any | null;
  notified?: boolean | null;
}

export interface PauseRequestScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  pausePending?: boolean | null;
  pausePending_not?: boolean | null;
  pauseType?: PauseType | null;
  pauseType_not?: PauseType | null;
  pauseType_in?: PauseType[] | null;
  pauseType_not_in?: PauseType[] | null;
  pauseDate?: any | null;
  pauseDate_not?: any | null;
  pauseDate_in?: any[] | null;
  pauseDate_not_in?: any[] | null;
  pauseDate_lt?: any | null;
  pauseDate_lte?: any | null;
  pauseDate_gt?: any | null;
  pauseDate_gte?: any | null;
  resumeDate?: any | null;
  resumeDate_not?: any | null;
  resumeDate_in?: any[] | null;
  resumeDate_not_in?: any[] | null;
  resumeDate_lt?: any | null;
  resumeDate_lte?: any | null;
  resumeDate_gt?: any | null;
  resumeDate_gte?: any | null;
  notified?: boolean | null;
  notified_not?: boolean | null;
  AND?: PauseRequestScalarWhereInput[] | null;
  OR?: PauseRequestScalarWhereInput[] | null;
  NOT?: PauseRequestScalarWhereInput[] | null;
}

export interface PauseRequestUpdateManyDataInput {
  pausePending?: boolean | null;
  pauseType?: PauseType | null;
  pauseDate?: any | null;
  resumeDate?: any | null;
  notified?: boolean | null;
}

export interface PauseRequestUpdateManyWithWhereNestedInput {
  where: PauseRequestScalarWhereInput;
  data: PauseRequestUpdateManyDataInput;
}

export interface PauseRequestUpdateManyWithoutMembershipInput {
  create?: PauseRequestCreateWithoutMembershipInput[] | null;
  delete?: PauseRequestWhereUniqueInput[] | null;
  connect?: PauseRequestWhereUniqueInput[] | null;
  set?: PauseRequestWhereUniqueInput[] | null;
  disconnect?: PauseRequestWhereUniqueInput[] | null;
  update?: PauseRequestUpdateWithWhereUniqueWithoutMembershipInput[] | null;
  upsert?: PauseRequestUpsertWithWhereUniqueWithoutMembershipInput[] | null;
  deleteMany?: PauseRequestScalarWhereInput[] | null;
  updateMany?: PauseRequestUpdateManyWithWhereNestedInput[] | null;
}

export interface PauseRequestUpdateWithWhereUniqueWithoutMembershipInput {
  where: PauseRequestWhereUniqueInput;
  data: PauseRequestUpdateWithoutMembershipDataInput;
}

export interface PauseRequestUpdateWithoutMembershipDataInput {
  pausePending?: boolean | null;
  pauseType?: PauseType | null;
  pauseDate?: any | null;
  resumeDate?: any | null;
  notified?: boolean | null;
}

export interface PauseRequestUpsertWithWhereUniqueWithoutMembershipInput {
  where: PauseRequestWhereUniqueInput;
  update: PauseRequestUpdateWithoutMembershipDataInput;
  create: PauseRequestCreateWithoutMembershipInput;
}

export interface PauseRequestWhereUniqueInput {
  id?: string | null;
}

export interface PaymentPlanCreateInput {
  id?: string | null;
  description?: string | null;
  planID: string;
  status?: string | null;
  name?: string | null;
  price?: number | null;
  itemCount?: number | null;
  tagline?: string | null;
  tier?: PaymentPlanTier | null;
}

export interface PaymentPlanCreateOneInput {
  create?: PaymentPlanCreateInput | null;
  connect?: PaymentPlanWhereUniqueInput | null;
}

export interface PaymentPlanUpdateDataInput {
  description?: string | null;
  planID?: string | null;
  status?: string | null;
  name?: string | null;
  price?: number | null;
  itemCount?: number | null;
  tagline?: string | null;
  tier?: PaymentPlanTier | null;
}

export interface PaymentPlanUpdateOneInput {
  create?: PaymentPlanCreateInput | null;
  update?: PaymentPlanUpdateDataInput | null;
  upsert?: PaymentPlanUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: PaymentPlanWhereUniqueInput | null;
}

export interface PaymentPlanUpsertNestedInput {
  update: PaymentPlanUpdateDataInput;
  create: PaymentPlanCreateInput;
}

export interface PaymentPlanWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  planID?: string | null;
  planID_not?: string | null;
  planID_in?: string[] | null;
  planID_not_in?: string[] | null;
  planID_lt?: string | null;
  planID_lte?: string | null;
  planID_gt?: string | null;
  planID_gte?: string | null;
  planID_contains?: string | null;
  planID_not_contains?: string | null;
  planID_starts_with?: string | null;
  planID_not_starts_with?: string | null;
  planID_ends_with?: string | null;
  planID_not_ends_with?: string | null;
  status?: string | null;
  status_not?: string | null;
  status_in?: string[] | null;
  status_not_in?: string[] | null;
  status_lt?: string | null;
  status_lte?: string | null;
  status_gt?: string | null;
  status_gte?: string | null;
  status_contains?: string | null;
  status_not_contains?: string | null;
  status_starts_with?: string | null;
  status_not_starts_with?: string | null;
  status_ends_with?: string | null;
  status_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  price?: number | null;
  price_not?: number | null;
  price_in?: number[] | null;
  price_not_in?: number[] | null;
  price_lt?: number | null;
  price_lte?: number | null;
  price_gt?: number | null;
  price_gte?: number | null;
  itemCount?: number | null;
  itemCount_not?: number | null;
  itemCount_in?: number[] | null;
  itemCount_not_in?: number[] | null;
  itemCount_lt?: number | null;
  itemCount_lte?: number | null;
  itemCount_gt?: number | null;
  itemCount_gte?: number | null;
  tagline?: string | null;
  tagline_not?: string | null;
  tagline_in?: string[] | null;
  tagline_not_in?: string[] | null;
  tagline_lt?: string | null;
  tagline_lte?: string | null;
  tagline_gt?: string | null;
  tagline_gte?: string | null;
  tagline_contains?: string | null;
  tagline_not_contains?: string | null;
  tagline_starts_with?: string | null;
  tagline_not_starts_with?: string | null;
  tagline_ends_with?: string | null;
  tagline_not_ends_with?: string | null;
  tier?: PaymentPlanTier | null;
  tier_not?: PaymentPlanTier | null;
  tier_in?: PaymentPlanTier[] | null;
  tier_not_in?: PaymentPlanTier[] | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: PaymentPlanWhereInput[] | null;
  OR?: PaymentPlanWhereInput[] | null;
  NOT?: PaymentPlanWhereInput[] | null;
}

export interface PaymentPlanWhereUniqueInput {
  id?: string | null;
  planID?: string | null;
}

export interface PhysicalProductCreateInput {
  id?: string | null;
  seasonsUID: string;
  location?: LocationCreateOneWithoutPhysicalProductsInput | null;
  productVariant: ProductVariantCreateOneWithoutPhysicalProductsInput;
  inventoryStatus: InventoryStatus;
  productStatus: PhysicalProductStatus;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber: number;
  warehouseLocation?: WarehouseLocationCreateOneWithoutPhysicalProductsInput | null;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
  price?: PhysicalProductPriceCreateOneInput | null;
  reports?: PhysicalProductQualityReportCreateManyWithoutPhysicalProductInput | null;
}

export interface PhysicalProductCreateManyInput {
  create?: PhysicalProductCreateInput[] | null;
  connect?: PhysicalProductWhereUniqueInput[] | null;
}

export interface PhysicalProductCreateManyWithoutLocationInput {
  create?: PhysicalProductCreateWithoutLocationInput[] | null;
  connect?: PhysicalProductWhereUniqueInput[] | null;
}

export interface PhysicalProductCreateManyWithoutProductVariantInput {
  create?: PhysicalProductCreateWithoutProductVariantInput[] | null;
  connect?: PhysicalProductWhereUniqueInput[] | null;
}

export interface PhysicalProductCreateOneInput {
  create?: PhysicalProductCreateInput | null;
  connect?: PhysicalProductWhereUniqueInput | null;
}

export interface PhysicalProductCreateWithoutLocationInput {
  id?: string | null;
  seasonsUID: string;
  productVariant: ProductVariantCreateOneWithoutPhysicalProductsInput;
  inventoryStatus: InventoryStatus;
  productStatus: PhysicalProductStatus;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber: number;
  warehouseLocation?: WarehouseLocationCreateOneWithoutPhysicalProductsInput | null;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
  price?: PhysicalProductPriceCreateOneInput | null;
  reports?: PhysicalProductQualityReportCreateManyWithoutPhysicalProductInput | null;
}

export interface PhysicalProductCreateWithoutProductVariantInput {
  id?: string | null;
  seasonsUID: string;
  location?: LocationCreateOneWithoutPhysicalProductsInput | null;
  inventoryStatus: InventoryStatus;
  productStatus: PhysicalProductStatus;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber: number;
  warehouseLocation?: WarehouseLocationCreateOneWithoutPhysicalProductsInput | null;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
  price?: PhysicalProductPriceCreateOneInput | null;
  reports?: PhysicalProductQualityReportCreateManyWithoutPhysicalProductInput | null;
}

export interface PhysicalProductPriceCreateInput {
  id?: string | null;
  buyUsedEnabled?: boolean | null;
  buyUsedPrice?: number | null;
}

export interface PhysicalProductPriceCreateOneInput {
  create?: PhysicalProductPriceCreateInput | null;
  connect?: PhysicalProductPriceWhereUniqueInput | null;
}

export interface PhysicalProductPriceUpdateDataInput {
  buyUsedEnabled?: boolean | null;
  buyUsedPrice?: number | null;
}

export interface PhysicalProductPriceUpdateOneInput {
  create?: PhysicalProductPriceCreateInput | null;
  update?: PhysicalProductPriceUpdateDataInput | null;
  upsert?: PhysicalProductPriceUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: PhysicalProductPriceWhereUniqueInput | null;
}

export interface PhysicalProductPriceUpsertNestedInput {
  update: PhysicalProductPriceUpdateDataInput;
  create: PhysicalProductPriceCreateInput;
}

export interface PhysicalProductPriceWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  buyUsedEnabled?: boolean | null;
  buyUsedEnabled_not?: boolean | null;
  buyUsedPrice?: number | null;
  buyUsedPrice_not?: number | null;
  buyUsedPrice_in?: number[] | null;
  buyUsedPrice_not_in?: number[] | null;
  buyUsedPrice_lt?: number | null;
  buyUsedPrice_lte?: number | null;
  buyUsedPrice_gt?: number | null;
  buyUsedPrice_gte?: number | null;
  AND?: PhysicalProductPriceWhereInput[] | null;
  OR?: PhysicalProductPriceWhereInput[] | null;
  NOT?: PhysicalProductPriceWhereInput[] | null;
}

export interface PhysicalProductPriceWhereUniqueInput {
  id?: string | null;
}

export interface PhysicalProductQualityReportCreateManyWithoutPhysicalProductInput {
  create?: PhysicalProductQualityReportCreateWithoutPhysicalProductInput[] | null;
  connect?: PhysicalProductQualityReportWhereUniqueInput[] | null;
}

export interface PhysicalProductQualityReportCreateWithoutPhysicalProductInput {
  id?: string | null;
  user: UserCreateOneInput;
  damageType?: PhysicalProductDamageType | null;
  damageTypes?: PhysicalProductQualityReportCreatedamageTypesInput | null;
  notes?: string | null;
  score?: number | null;
  published?: boolean | null;
}

export interface PhysicalProductQualityReportCreatedamageTypesInput {
  set?: PhysicalProductDamageType[] | null;
}

export interface PhysicalProductQualityReportScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  damageType?: PhysicalProductDamageType | null;
  damageType_not?: PhysicalProductDamageType | null;
  damageType_in?: PhysicalProductDamageType[] | null;
  damageType_not_in?: PhysicalProductDamageType[] | null;
  notes?: string | null;
  notes_not?: string | null;
  notes_in?: string[] | null;
  notes_not_in?: string[] | null;
  notes_lt?: string | null;
  notes_lte?: string | null;
  notes_gt?: string | null;
  notes_gte?: string | null;
  notes_contains?: string | null;
  notes_not_contains?: string | null;
  notes_starts_with?: string | null;
  notes_not_starts_with?: string | null;
  notes_ends_with?: string | null;
  notes_not_ends_with?: string | null;
  score?: number | null;
  score_not?: number | null;
  score_in?: number[] | null;
  score_not_in?: number[] | null;
  score_lt?: number | null;
  score_lte?: number | null;
  score_gt?: number | null;
  score_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  published?: boolean | null;
  published_not?: boolean | null;
  AND?: PhysicalProductQualityReportScalarWhereInput[] | null;
  OR?: PhysicalProductQualityReportScalarWhereInput[] | null;
  NOT?: PhysicalProductQualityReportScalarWhereInput[] | null;
}

export interface PhysicalProductQualityReportUpdateManyDataInput {
  damageType?: PhysicalProductDamageType | null;
  damageTypes?: PhysicalProductQualityReportUpdatedamageTypesInput | null;
  notes?: string | null;
  score?: number | null;
  published?: boolean | null;
}

export interface PhysicalProductQualityReportUpdateManyWithWhereNestedInput {
  where: PhysicalProductQualityReportScalarWhereInput;
  data: PhysicalProductQualityReportUpdateManyDataInput;
}

export interface PhysicalProductQualityReportUpdateManyWithoutPhysicalProductInput {
  create?: PhysicalProductQualityReportCreateWithoutPhysicalProductInput[] | null;
  delete?: PhysicalProductQualityReportWhereUniqueInput[] | null;
  connect?: PhysicalProductQualityReportWhereUniqueInput[] | null;
  set?: PhysicalProductQualityReportWhereUniqueInput[] | null;
  disconnect?: PhysicalProductQualityReportWhereUniqueInput[] | null;
  update?: PhysicalProductQualityReportUpdateWithWhereUniqueWithoutPhysicalProductInput[] | null;
  upsert?: PhysicalProductQualityReportUpsertWithWhereUniqueWithoutPhysicalProductInput[] | null;
  deleteMany?: PhysicalProductQualityReportScalarWhereInput[] | null;
  updateMany?: PhysicalProductQualityReportUpdateManyWithWhereNestedInput[] | null;
}

export interface PhysicalProductQualityReportUpdateWithWhereUniqueWithoutPhysicalProductInput {
  where: PhysicalProductQualityReportWhereUniqueInput;
  data: PhysicalProductQualityReportUpdateWithoutPhysicalProductDataInput;
}

export interface PhysicalProductQualityReportUpdateWithoutPhysicalProductDataInput {
  user?: UserUpdateOneRequiredInput | null;
  damageType?: PhysicalProductDamageType | null;
  damageTypes?: PhysicalProductQualityReportUpdatedamageTypesInput | null;
  notes?: string | null;
  score?: number | null;
  published?: boolean | null;
}

export interface PhysicalProductQualityReportUpdatedamageTypesInput {
  set?: PhysicalProductDamageType[] | null;
}

export interface PhysicalProductQualityReportUpsertWithWhereUniqueWithoutPhysicalProductInput {
  where: PhysicalProductQualityReportWhereUniqueInput;
  update: PhysicalProductQualityReportUpdateWithoutPhysicalProductDataInput;
  create: PhysicalProductQualityReportCreateWithoutPhysicalProductInput;
}

export interface PhysicalProductQualityReportWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  user?: UserWhereInput | null;
  damageType?: PhysicalProductDamageType | null;
  damageType_not?: PhysicalProductDamageType | null;
  damageType_in?: PhysicalProductDamageType[] | null;
  damageType_not_in?: PhysicalProductDamageType[] | null;
  notes?: string | null;
  notes_not?: string | null;
  notes_in?: string[] | null;
  notes_not_in?: string[] | null;
  notes_lt?: string | null;
  notes_lte?: string | null;
  notes_gt?: string | null;
  notes_gte?: string | null;
  notes_contains?: string | null;
  notes_not_contains?: string | null;
  notes_starts_with?: string | null;
  notes_not_starts_with?: string | null;
  notes_ends_with?: string | null;
  notes_not_ends_with?: string | null;
  score?: number | null;
  score_not?: number | null;
  score_in?: number[] | null;
  score_not_in?: number[] | null;
  score_lt?: number | null;
  score_lte?: number | null;
  score_gt?: number | null;
  score_gte?: number | null;
  physicalProduct?: PhysicalProductWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  published?: boolean | null;
  published_not?: boolean | null;
  AND?: PhysicalProductQualityReportWhereInput[] | null;
  OR?: PhysicalProductQualityReportWhereInput[] | null;
  NOT?: PhysicalProductQualityReportWhereInput[] | null;
}

export interface PhysicalProductQualityReportWhereUniqueInput {
  id?: string | null;
}

export interface PhysicalProductScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  seasonsUID?: string | null;
  seasonsUID_not?: string | null;
  seasonsUID_in?: string[] | null;
  seasonsUID_not_in?: string[] | null;
  seasonsUID_lt?: string | null;
  seasonsUID_lte?: string | null;
  seasonsUID_gt?: string | null;
  seasonsUID_gte?: string | null;
  seasonsUID_contains?: string | null;
  seasonsUID_not_contains?: string | null;
  seasonsUID_starts_with?: string | null;
  seasonsUID_not_starts_with?: string | null;
  seasonsUID_ends_with?: string | null;
  seasonsUID_not_ends_with?: string | null;
  inventoryStatus?: InventoryStatus | null;
  inventoryStatus_not?: InventoryStatus | null;
  inventoryStatus_in?: InventoryStatus[] | null;
  inventoryStatus_not_in?: InventoryStatus[] | null;
  productStatus?: PhysicalProductStatus | null;
  productStatus_not?: PhysicalProductStatus | null;
  productStatus_in?: PhysicalProductStatus[] | null;
  productStatus_not_in?: PhysicalProductStatus[] | null;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadMethod_not?: PhysicalProductOffloadMethod | null;
  offloadMethod_in?: PhysicalProductOffloadMethod[] | null;
  offloadMethod_not_in?: PhysicalProductOffloadMethod[] | null;
  offloadNotes?: string | null;
  offloadNotes_not?: string | null;
  offloadNotes_in?: string[] | null;
  offloadNotes_not_in?: string[] | null;
  offloadNotes_lt?: string | null;
  offloadNotes_lte?: string | null;
  offloadNotes_gt?: string | null;
  offloadNotes_gte?: string | null;
  offloadNotes_contains?: string | null;
  offloadNotes_not_contains?: string | null;
  offloadNotes_starts_with?: string | null;
  offloadNotes_not_starts_with?: string | null;
  offloadNotes_ends_with?: string | null;
  offloadNotes_not_ends_with?: string | null;
  sequenceNumber?: number | null;
  sequenceNumber_not?: number | null;
  sequenceNumber_in?: number[] | null;
  sequenceNumber_not_in?: number[] | null;
  sequenceNumber_lt?: number | null;
  sequenceNumber_lte?: number | null;
  sequenceNumber_gt?: number | null;
  sequenceNumber_gte?: number | null;
  barcoded?: boolean | null;
  barcoded_not?: boolean | null;
  dateOrdered?: any | null;
  dateOrdered_not?: any | null;
  dateOrdered_in?: any[] | null;
  dateOrdered_not_in?: any[] | null;
  dateOrdered_lt?: any | null;
  dateOrdered_lte?: any | null;
  dateOrdered_gt?: any | null;
  dateOrdered_gte?: any | null;
  dateReceived?: any | null;
  dateReceived_not?: any | null;
  dateReceived_in?: any[] | null;
  dateReceived_not_in?: any[] | null;
  dateReceived_lt?: any | null;
  dateReceived_lte?: any | null;
  dateReceived_gt?: any | null;
  dateReceived_gte?: any | null;
  unitCost?: number | null;
  unitCost_not?: number | null;
  unitCost_in?: number[] | null;
  unitCost_not_in?: number[] | null;
  unitCost_lt?: number | null;
  unitCost_lte?: number | null;
  unitCost_gt?: number | null;
  unitCost_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: PhysicalProductScalarWhereInput[] | null;
  OR?: PhysicalProductScalarWhereInput[] | null;
  NOT?: PhysicalProductScalarWhereInput[] | null;
}

export interface PhysicalProductUpdateDataInput {
  seasonsUID?: string | null;
  location?: LocationUpdateOneWithoutPhysicalProductsInput | null;
  productVariant?: ProductVariantUpdateOneRequiredWithoutPhysicalProductsInput | null;
  inventoryStatus?: InventoryStatus | null;
  productStatus?: PhysicalProductStatus | null;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber?: number | null;
  warehouseLocation?: WarehouseLocationUpdateOneWithoutPhysicalProductsInput | null;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
  price?: PhysicalProductPriceUpdateOneInput | null;
  reports?: PhysicalProductQualityReportUpdateManyWithoutPhysicalProductInput | null;
}

export interface PhysicalProductUpdateManyDataInput {
  seasonsUID?: string | null;
  inventoryStatus?: InventoryStatus | null;
  productStatus?: PhysicalProductStatus | null;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber?: number | null;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
}

export interface PhysicalProductUpdateManyInput {
  create?: PhysicalProductCreateInput[] | null;
  update?: PhysicalProductUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: PhysicalProductUpsertWithWhereUniqueNestedInput[] | null;
  delete?: PhysicalProductWhereUniqueInput[] | null;
  connect?: PhysicalProductWhereUniqueInput[] | null;
  set?: PhysicalProductWhereUniqueInput[] | null;
  disconnect?: PhysicalProductWhereUniqueInput[] | null;
  deleteMany?: PhysicalProductScalarWhereInput[] | null;
  updateMany?: PhysicalProductUpdateManyWithWhereNestedInput[] | null;
}

export interface PhysicalProductUpdateManyWithWhereNestedInput {
  where: PhysicalProductScalarWhereInput;
  data: PhysicalProductUpdateManyDataInput;
}

export interface PhysicalProductUpdateManyWithoutLocationInput {
  create?: PhysicalProductCreateWithoutLocationInput[] | null;
  delete?: PhysicalProductWhereUniqueInput[] | null;
  connect?: PhysicalProductWhereUniqueInput[] | null;
  set?: PhysicalProductWhereUniqueInput[] | null;
  disconnect?: PhysicalProductWhereUniqueInput[] | null;
  update?: PhysicalProductUpdateWithWhereUniqueWithoutLocationInput[] | null;
  upsert?: PhysicalProductUpsertWithWhereUniqueWithoutLocationInput[] | null;
  deleteMany?: PhysicalProductScalarWhereInput[] | null;
  updateMany?: PhysicalProductUpdateManyWithWhereNestedInput[] | null;
}

export interface PhysicalProductUpdateManyWithoutProductVariantInput {
  create?: PhysicalProductCreateWithoutProductVariantInput[] | null;
  delete?: PhysicalProductWhereUniqueInput[] | null;
  connect?: PhysicalProductWhereUniqueInput[] | null;
  set?: PhysicalProductWhereUniqueInput[] | null;
  disconnect?: PhysicalProductWhereUniqueInput[] | null;
  update?: PhysicalProductUpdateWithWhereUniqueWithoutProductVariantInput[] | null;
  upsert?: PhysicalProductUpsertWithWhereUniqueWithoutProductVariantInput[] | null;
  deleteMany?: PhysicalProductScalarWhereInput[] | null;
  updateMany?: PhysicalProductUpdateManyWithWhereNestedInput[] | null;
}

export interface PhysicalProductUpdateOneRequiredInput {
  create?: PhysicalProductCreateInput | null;
  update?: PhysicalProductUpdateDataInput | null;
  upsert?: PhysicalProductUpsertNestedInput | null;
  connect?: PhysicalProductWhereUniqueInput | null;
}

export interface PhysicalProductUpdateWithWhereUniqueNestedInput {
  where: PhysicalProductWhereUniqueInput;
  data: PhysicalProductUpdateDataInput;
}

export interface PhysicalProductUpdateWithWhereUniqueWithoutLocationInput {
  where: PhysicalProductWhereUniqueInput;
  data: PhysicalProductUpdateWithoutLocationDataInput;
}

export interface PhysicalProductUpdateWithWhereUniqueWithoutProductVariantInput {
  where: PhysicalProductWhereUniqueInput;
  data: PhysicalProductUpdateWithoutProductVariantDataInput;
}

export interface PhysicalProductUpdateWithoutLocationDataInput {
  seasonsUID?: string | null;
  productVariant?: ProductVariantUpdateOneRequiredWithoutPhysicalProductsInput | null;
  inventoryStatus?: InventoryStatus | null;
  productStatus?: PhysicalProductStatus | null;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber?: number | null;
  warehouseLocation?: WarehouseLocationUpdateOneWithoutPhysicalProductsInput | null;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
  price?: PhysicalProductPriceUpdateOneInput | null;
  reports?: PhysicalProductQualityReportUpdateManyWithoutPhysicalProductInput | null;
}

export interface PhysicalProductUpdateWithoutProductVariantDataInput {
  seasonsUID?: string | null;
  location?: LocationUpdateOneWithoutPhysicalProductsInput | null;
  inventoryStatus?: InventoryStatus | null;
  productStatus?: PhysicalProductStatus | null;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber?: number | null;
  warehouseLocation?: WarehouseLocationUpdateOneWithoutPhysicalProductsInput | null;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
  price?: PhysicalProductPriceUpdateOneInput | null;
  reports?: PhysicalProductQualityReportUpdateManyWithoutPhysicalProductInput | null;
}

export interface PhysicalProductUpsertNestedInput {
  update: PhysicalProductUpdateDataInput;
  create: PhysicalProductCreateInput;
}

export interface PhysicalProductUpsertWithWhereUniqueNestedInput {
  where: PhysicalProductWhereUniqueInput;
  update: PhysicalProductUpdateDataInput;
  create: PhysicalProductCreateInput;
}

export interface PhysicalProductUpsertWithWhereUniqueWithoutLocationInput {
  where: PhysicalProductWhereUniqueInput;
  update: PhysicalProductUpdateWithoutLocationDataInput;
  create: PhysicalProductCreateWithoutLocationInput;
}

export interface PhysicalProductUpsertWithWhereUniqueWithoutProductVariantInput {
  where: PhysicalProductWhereUniqueInput;
  update: PhysicalProductUpdateWithoutProductVariantDataInput;
  create: PhysicalProductCreateWithoutProductVariantInput;
}

export interface PhysicalProductWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  seasonsUID?: string | null;
  seasonsUID_not?: string | null;
  seasonsUID_in?: string[] | null;
  seasonsUID_not_in?: string[] | null;
  seasonsUID_lt?: string | null;
  seasonsUID_lte?: string | null;
  seasonsUID_gt?: string | null;
  seasonsUID_gte?: string | null;
  seasonsUID_contains?: string | null;
  seasonsUID_not_contains?: string | null;
  seasonsUID_starts_with?: string | null;
  seasonsUID_not_starts_with?: string | null;
  seasonsUID_ends_with?: string | null;
  seasonsUID_not_ends_with?: string | null;
  location?: LocationWhereInput | null;
  productVariant?: ProductVariantWhereInput | null;
  inventoryStatus?: InventoryStatus | null;
  inventoryStatus_not?: InventoryStatus | null;
  inventoryStatus_in?: InventoryStatus[] | null;
  inventoryStatus_not_in?: InventoryStatus[] | null;
  productStatus?: PhysicalProductStatus | null;
  productStatus_not?: PhysicalProductStatus | null;
  productStatus_in?: PhysicalProductStatus[] | null;
  productStatus_not_in?: PhysicalProductStatus[] | null;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadMethod_not?: PhysicalProductOffloadMethod | null;
  offloadMethod_in?: PhysicalProductOffloadMethod[] | null;
  offloadMethod_not_in?: PhysicalProductOffloadMethod[] | null;
  offloadNotes?: string | null;
  offloadNotes_not?: string | null;
  offloadNotes_in?: string[] | null;
  offloadNotes_not_in?: string[] | null;
  offloadNotes_lt?: string | null;
  offloadNotes_lte?: string | null;
  offloadNotes_gt?: string | null;
  offloadNotes_gte?: string | null;
  offloadNotes_contains?: string | null;
  offloadNotes_not_contains?: string | null;
  offloadNotes_starts_with?: string | null;
  offloadNotes_not_starts_with?: string | null;
  offloadNotes_ends_with?: string | null;
  offloadNotes_not_ends_with?: string | null;
  sequenceNumber?: number | null;
  sequenceNumber_not?: number | null;
  sequenceNumber_in?: number[] | null;
  sequenceNumber_not_in?: number[] | null;
  sequenceNumber_lt?: number | null;
  sequenceNumber_lte?: number | null;
  sequenceNumber_gt?: number | null;
  sequenceNumber_gte?: number | null;
  warehouseLocation?: WarehouseLocationWhereInput | null;
  barcoded?: boolean | null;
  barcoded_not?: boolean | null;
  dateOrdered?: any | null;
  dateOrdered_not?: any | null;
  dateOrdered_in?: any[] | null;
  dateOrdered_not_in?: any[] | null;
  dateOrdered_lt?: any | null;
  dateOrdered_lte?: any | null;
  dateOrdered_gt?: any | null;
  dateOrdered_gte?: any | null;
  dateReceived?: any | null;
  dateReceived_not?: any | null;
  dateReceived_in?: any[] | null;
  dateReceived_not_in?: any[] | null;
  dateReceived_lt?: any | null;
  dateReceived_lte?: any | null;
  dateReceived_gt?: any | null;
  dateReceived_gte?: any | null;
  unitCost?: number | null;
  unitCost_not?: number | null;
  unitCost_in?: number[] | null;
  unitCost_not_in?: number[] | null;
  unitCost_lt?: number | null;
  unitCost_lte?: number | null;
  unitCost_gt?: number | null;
  unitCost_gte?: number | null;
  price?: PhysicalProductPriceWhereInput | null;
  reports_every?: PhysicalProductQualityReportWhereInput | null;
  reports_some?: PhysicalProductQualityReportWhereInput | null;
  reports_none?: PhysicalProductQualityReportWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: PhysicalProductWhereInput[] | null;
  OR?: PhysicalProductWhereInput[] | null;
  NOT?: PhysicalProductWhereInput[] | null;
}

export interface PhysicalProductWhereUniqueInput {
  id?: string | null;
  seasonsUID?: string | null;
}

export interface ProductCreateInput {
  id?: string | null;
  architecture?: ProductArchitecture | null;
  brand: BrandCreateOneWithoutProductsInput;
  category: CategoryCreateOneWithoutProductsInput;
  color: ColorCreateOneInput;
  description?: string | null;
  externalURL?: string | null;
  functions?: ProductFunctionCreateManyInput | null;
  buyNewEnabled?: boolean | null;
  images?: ImageCreateManyInput | null;
  innerMaterials?: ProductCreateinnerMaterialsInput | null;
  materialCategory?: ProductMaterialCategoryCreateOneWithoutProductsInput | null;
  model?: ProductModelCreateOneWithoutProductsInput | null;
  modelSize?: SizeCreateOneInput | null;
  name: string;
  outerMaterials?: ProductCreateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  season?: ProductSeasonCreateOneInput | null;
  secondaryColor?: ColorCreateOneInput | null;
  slug: string;
  status?: ProductStatus | null;
  tags?: TagCreateManyWithoutProductsInput | null;
  tier?: ProductTierCreateOneInput | null;
  type?: ProductType | null;
  variants?: ProductVariantCreateManyWithoutProductInput | null;
  styles?: ProductCreatestylesInput | null;
}

export interface ProductCreateManyInput {
  create?: ProductCreateInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
}

export interface ProductCreateManyWithoutBrandInput {
  create?: ProductCreateWithoutBrandInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
}

export interface ProductCreateManyWithoutCategoryInput {
  create?: ProductCreateWithoutCategoryInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
}

export interface ProductCreateOneWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput | null;
  connect?: ProductWhereUniqueInput | null;
}

export interface ProductCreateWithoutBrandInput {
  id?: string | null;
  architecture?: ProductArchitecture | null;
  category: CategoryCreateOneWithoutProductsInput;
  color: ColorCreateOneInput;
  description?: string | null;
  externalURL?: string | null;
  functions?: ProductFunctionCreateManyInput | null;
  buyNewEnabled?: boolean | null;
  images?: ImageCreateManyInput | null;
  innerMaterials?: ProductCreateinnerMaterialsInput | null;
  materialCategory?: ProductMaterialCategoryCreateOneWithoutProductsInput | null;
  model?: ProductModelCreateOneWithoutProductsInput | null;
  modelSize?: SizeCreateOneInput | null;
  name: string;
  outerMaterials?: ProductCreateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  season?: ProductSeasonCreateOneInput | null;
  secondaryColor?: ColorCreateOneInput | null;
  slug: string;
  status?: ProductStatus | null;
  tags?: TagCreateManyWithoutProductsInput | null;
  tier?: ProductTierCreateOneInput | null;
  type?: ProductType | null;
  variants?: ProductVariantCreateManyWithoutProductInput | null;
  styles?: ProductCreatestylesInput | null;
}

export interface ProductCreateWithoutCategoryInput {
  id?: string | null;
  architecture?: ProductArchitecture | null;
  brand: BrandCreateOneWithoutProductsInput;
  color: ColorCreateOneInput;
  description?: string | null;
  externalURL?: string | null;
  functions?: ProductFunctionCreateManyInput | null;
  buyNewEnabled?: boolean | null;
  images?: ImageCreateManyInput | null;
  innerMaterials?: ProductCreateinnerMaterialsInput | null;
  materialCategory?: ProductMaterialCategoryCreateOneWithoutProductsInput | null;
  model?: ProductModelCreateOneWithoutProductsInput | null;
  modelSize?: SizeCreateOneInput | null;
  name: string;
  outerMaterials?: ProductCreateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  season?: ProductSeasonCreateOneInput | null;
  secondaryColor?: ColorCreateOneInput | null;
  slug: string;
  status?: ProductStatus | null;
  tags?: TagCreateManyWithoutProductsInput | null;
  tier?: ProductTierCreateOneInput | null;
  type?: ProductType | null;
  variants?: ProductVariantCreateManyWithoutProductInput | null;
  styles?: ProductCreatestylesInput | null;
}

export interface ProductCreateWithoutVariantsInput {
  id?: string | null;
  architecture?: ProductArchitecture | null;
  brand: BrandCreateOneWithoutProductsInput;
  category: CategoryCreateOneWithoutProductsInput;
  color: ColorCreateOneInput;
  description?: string | null;
  externalURL?: string | null;
  functions?: ProductFunctionCreateManyInput | null;
  buyNewEnabled?: boolean | null;
  images?: ImageCreateManyInput | null;
  innerMaterials?: ProductCreateinnerMaterialsInput | null;
  materialCategory?: ProductMaterialCategoryCreateOneWithoutProductsInput | null;
  model?: ProductModelCreateOneWithoutProductsInput | null;
  modelSize?: SizeCreateOneInput | null;
  name: string;
  outerMaterials?: ProductCreateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  season?: ProductSeasonCreateOneInput | null;
  secondaryColor?: ColorCreateOneInput | null;
  slug: string;
  status?: ProductStatus | null;
  tags?: TagCreateManyWithoutProductsInput | null;
  tier?: ProductTierCreateOneInput | null;
  type?: ProductType | null;
  styles?: ProductCreatestylesInput | null;
}

export interface ProductCreateinnerMaterialsInput {
  set?: string[] | null;
}

export interface ProductCreateouterMaterialsInput {
  set?: string[] | null;
}

export interface ProductCreatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface ProductFunctionCreateInput {
  id?: string | null;
  name?: string | null;
}

export interface ProductFunctionCreateManyInput {
  create?: ProductFunctionCreateInput[] | null;
  connect?: ProductFunctionWhereUniqueInput[] | null;
}

export interface ProductFunctionScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  AND?: ProductFunctionScalarWhereInput[] | null;
  OR?: ProductFunctionScalarWhereInput[] | null;
  NOT?: ProductFunctionScalarWhereInput[] | null;
}

export interface ProductFunctionUpdateDataInput {
  name?: string | null;
}

export interface ProductFunctionUpdateManyDataInput {
  name?: string | null;
}

export interface ProductFunctionUpdateManyInput {
  create?: ProductFunctionCreateInput[] | null;
  update?: ProductFunctionUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: ProductFunctionUpsertWithWhereUniqueNestedInput[] | null;
  delete?: ProductFunctionWhereUniqueInput[] | null;
  connect?: ProductFunctionWhereUniqueInput[] | null;
  set?: ProductFunctionWhereUniqueInput[] | null;
  disconnect?: ProductFunctionWhereUniqueInput[] | null;
  deleteMany?: ProductFunctionScalarWhereInput[] | null;
  updateMany?: ProductFunctionUpdateManyWithWhereNestedInput[] | null;
}

export interface ProductFunctionUpdateManyWithWhereNestedInput {
  where: ProductFunctionScalarWhereInput;
  data: ProductFunctionUpdateManyDataInput;
}

export interface ProductFunctionUpdateWithWhereUniqueNestedInput {
  where: ProductFunctionWhereUniqueInput;
  data: ProductFunctionUpdateDataInput;
}

export interface ProductFunctionUpsertWithWhereUniqueNestedInput {
  where: ProductFunctionWhereUniqueInput;
  update: ProductFunctionUpdateDataInput;
  create: ProductFunctionCreateInput;
}

export interface ProductFunctionWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  AND?: ProductFunctionWhereInput[] | null;
  OR?: ProductFunctionWhereInput[] | null;
  NOT?: ProductFunctionWhereInput[] | null;
}

export interface ProductFunctionWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface ProductMaterialCategoryCreateOneWithoutProductsInput {
  create?: ProductMaterialCategoryCreateWithoutProductsInput | null;
  connect?: ProductMaterialCategoryWhereUniqueInput | null;
}

export interface ProductMaterialCategoryCreateWithoutProductsInput {
  id?: string | null;
  slug: string;
  lifeExpectancy: number;
  category: CategoryCreateOneInput;
}

export interface ProductMaterialCategoryUpdateOneWithoutProductsInput {
  create?: ProductMaterialCategoryCreateWithoutProductsInput | null;
  update?: ProductMaterialCategoryUpdateWithoutProductsDataInput | null;
  upsert?: ProductMaterialCategoryUpsertWithoutProductsInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ProductMaterialCategoryWhereUniqueInput | null;
}

export interface ProductMaterialCategoryUpdateWithoutProductsDataInput {
  slug?: string | null;
  lifeExpectancy?: number | null;
  category?: CategoryUpdateOneRequiredInput | null;
}

export interface ProductMaterialCategoryUpsertWithoutProductsInput {
  update: ProductMaterialCategoryUpdateWithoutProductsDataInput;
  create: ProductMaterialCategoryCreateWithoutProductsInput;
}

export interface ProductMaterialCategoryWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  lifeExpectancy?: number | null;
  lifeExpectancy_not?: number | null;
  lifeExpectancy_in?: number[] | null;
  lifeExpectancy_not_in?: number[] | null;
  lifeExpectancy_lt?: number | null;
  lifeExpectancy_lte?: number | null;
  lifeExpectancy_gt?: number | null;
  lifeExpectancy_gte?: number | null;
  category?: CategoryWhereInput | null;
  products_every?: ProductWhereInput | null;
  products_some?: ProductWhereInput | null;
  products_none?: ProductWhereInput | null;
  AND?: ProductMaterialCategoryWhereInput[] | null;
  OR?: ProductMaterialCategoryWhereInput[] | null;
  NOT?: ProductMaterialCategoryWhereInput[] | null;
}

export interface ProductMaterialCategoryWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
}

export interface ProductModelCreateOneWithoutProductsInput {
  create?: ProductModelCreateWithoutProductsInput | null;
  connect?: ProductModelWhereUniqueInput | null;
}

export interface ProductModelCreateWithoutProductsInput {
  id?: string | null;
  name: string;
  height: number;
}

export interface ProductModelUpdateOneWithoutProductsInput {
  create?: ProductModelCreateWithoutProductsInput | null;
  update?: ProductModelUpdateWithoutProductsDataInput | null;
  upsert?: ProductModelUpsertWithoutProductsInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ProductModelWhereUniqueInput | null;
}

export interface ProductModelUpdateWithoutProductsDataInput {
  name?: string | null;
  height?: number | null;
}

export interface ProductModelUpsertWithoutProductsInput {
  update: ProductModelUpdateWithoutProductsDataInput;
  create: ProductModelCreateWithoutProductsInput;
}

export interface ProductModelWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  height?: number | null;
  height_not?: number | null;
  height_in?: number[] | null;
  height_not_in?: number[] | null;
  height_lt?: number | null;
  height_lte?: number | null;
  height_gt?: number | null;
  height_gte?: number | null;
  products_every?: ProductWhereInput | null;
  products_some?: ProductWhereInput | null;
  products_none?: ProductWhereInput | null;
  AND?: ProductModelWhereInput[] | null;
  OR?: ProductModelWhereInput[] | null;
  NOT?: ProductModelWhereInput[] | null;
}

export interface ProductModelWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface ProductScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  architecture?: ProductArchitecture | null;
  architecture_not?: ProductArchitecture | null;
  architecture_in?: ProductArchitecture[] | null;
  architecture_not_in?: ProductArchitecture[] | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  externalURL?: string | null;
  externalURL_not?: string | null;
  externalURL_in?: string[] | null;
  externalURL_not_in?: string[] | null;
  externalURL_lt?: string | null;
  externalURL_lte?: string | null;
  externalURL_gt?: string | null;
  externalURL_gte?: string | null;
  externalURL_contains?: string | null;
  externalURL_not_contains?: string | null;
  externalURL_starts_with?: string | null;
  externalURL_not_starts_with?: string | null;
  externalURL_ends_with?: string | null;
  externalURL_not_ends_with?: string | null;
  buyNewEnabled?: boolean | null;
  buyNewEnabled_not?: boolean | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  photographyStatus?: PhotographyStatus | null;
  photographyStatus_not?: PhotographyStatus | null;
  photographyStatus_in?: PhotographyStatus[] | null;
  photographyStatus_not_in?: PhotographyStatus[] | null;
  productFit?: ProductFit | null;
  productFit_not?: ProductFit | null;
  productFit_in?: ProductFit[] | null;
  productFit_not_in?: ProductFit[] | null;
  publishedAt?: any | null;
  publishedAt_not?: any | null;
  publishedAt_in?: any[] | null;
  publishedAt_not_in?: any[] | null;
  publishedAt_lt?: any | null;
  publishedAt_lte?: any | null;
  publishedAt_gt?: any | null;
  publishedAt_gte?: any | null;
  retailPrice?: number | null;
  retailPrice_not?: number | null;
  retailPrice_in?: number[] | null;
  retailPrice_not_in?: number[] | null;
  retailPrice_lt?: number | null;
  retailPrice_lte?: number | null;
  retailPrice_gt?: number | null;
  retailPrice_gte?: number | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  status?: ProductStatus | null;
  status_not?: ProductStatus | null;
  status_in?: ProductStatus[] | null;
  status_not_in?: ProductStatus[] | null;
  type?: ProductType | null;
  type_not?: ProductType | null;
  type_in?: ProductType[] | null;
  type_not_in?: ProductType[] | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ProductScalarWhereInput[] | null;
  OR?: ProductScalarWhereInput[] | null;
  NOT?: ProductScalarWhereInput[] | null;
}

export interface ProductSeasonCreateInput {
  id?: string | null;
  vendorSeason?: SeasonCreateOneInput | null;
  internalSeason?: SeasonCreateOneInput | null;
  wearableSeasons?: ProductSeasonCreatewearableSeasonsInput | null;
}

export interface ProductSeasonCreateOneInput {
  create?: ProductSeasonCreateInput | null;
  connect?: ProductSeasonWhereUniqueInput | null;
}

export interface ProductSeasonCreatewearableSeasonsInput {
  set?: SeasonString[] | null;
}

export interface ProductSeasonUpdateDataInput {
  vendorSeason?: SeasonUpdateOneInput | null;
  internalSeason?: SeasonUpdateOneInput | null;
  wearableSeasons?: ProductSeasonUpdatewearableSeasonsInput | null;
}

export interface ProductSeasonUpdateOneInput {
  create?: ProductSeasonCreateInput | null;
  update?: ProductSeasonUpdateDataInput | null;
  upsert?: ProductSeasonUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ProductSeasonWhereUniqueInput | null;
}

export interface ProductSeasonUpdatewearableSeasonsInput {
  set?: SeasonString[] | null;
}

export interface ProductSeasonUpsertNestedInput {
  update: ProductSeasonUpdateDataInput;
  create: ProductSeasonCreateInput;
}

export interface ProductSeasonWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  vendorSeason?: SeasonWhereInput | null;
  internalSeason?: SeasonWhereInput | null;
  AND?: ProductSeasonWhereInput[] | null;
  OR?: ProductSeasonWhereInput[] | null;
  NOT?: ProductSeasonWhereInput[] | null;
}

export interface ProductSeasonWhereUniqueInput {
  id?: string | null;
}

export interface ProductTierCreateInput {
  id?: string | null;
  tier: ProductTierName;
  price: number;
}

export interface ProductTierCreateOneInput {
  create?: ProductTierCreateInput | null;
  connect?: ProductTierWhereUniqueInput | null;
}

export interface ProductTierUpdateDataInput {
  tier?: ProductTierName | null;
  price?: number | null;
}

export interface ProductTierUpdateOneInput {
  create?: ProductTierCreateInput | null;
  update?: ProductTierUpdateDataInput | null;
  upsert?: ProductTierUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ProductTierWhereUniqueInput | null;
}

export interface ProductTierUpsertNestedInput {
  update: ProductTierUpdateDataInput;
  create: ProductTierCreateInput;
}

export interface ProductTierWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  tier?: ProductTierName | null;
  tier_not?: ProductTierName | null;
  tier_in?: ProductTierName[] | null;
  tier_not_in?: ProductTierName[] | null;
  price?: number | null;
  price_not?: number | null;
  price_in?: number[] | null;
  price_not_in?: number[] | null;
  price_lt?: number | null;
  price_lte?: number | null;
  price_gt?: number | null;
  price_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ProductTierWhereInput[] | null;
  OR?: ProductTierWhereInput[] | null;
  NOT?: ProductTierWhereInput[] | null;
}

export interface ProductTierWhereUniqueInput {
  id?: string | null;
}

export interface ProductUpdateDataInput {
  architecture?: ProductArchitecture | null;
  brand?: BrandUpdateOneRequiredWithoutProductsInput | null;
  category?: CategoryUpdateOneRequiredWithoutProductsInput | null;
  color?: ColorUpdateOneRequiredInput | null;
  description?: string | null;
  externalURL?: string | null;
  functions?: ProductFunctionUpdateManyInput | null;
  buyNewEnabled?: boolean | null;
  images?: ImageUpdateManyInput | null;
  innerMaterials?: ProductUpdateinnerMaterialsInput | null;
  materialCategory?: ProductMaterialCategoryUpdateOneWithoutProductsInput | null;
  model?: ProductModelUpdateOneWithoutProductsInput | null;
  modelSize?: SizeUpdateOneInput | null;
  name?: string | null;
  outerMaterials?: ProductUpdateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  season?: ProductSeasonUpdateOneInput | null;
  secondaryColor?: ColorUpdateOneInput | null;
  slug?: string | null;
  status?: ProductStatus | null;
  tags?: TagUpdateManyWithoutProductsInput | null;
  tier?: ProductTierUpdateOneInput | null;
  type?: ProductType | null;
  variants?: ProductVariantUpdateManyWithoutProductInput | null;
  styles?: ProductUpdatestylesInput | null;
}

export interface ProductUpdateManyDataInput {
  architecture?: ProductArchitecture | null;
  description?: string | null;
  externalURL?: string | null;
  buyNewEnabled?: boolean | null;
  innerMaterials?: ProductUpdateinnerMaterialsInput | null;
  name?: string | null;
  outerMaterials?: ProductUpdateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  slug?: string | null;
  status?: ProductStatus | null;
  type?: ProductType | null;
  styles?: ProductUpdatestylesInput | null;
}

export interface ProductUpdateManyInput {
  create?: ProductCreateInput[] | null;
  update?: ProductUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: ProductUpsertWithWhereUniqueNestedInput[] | null;
  delete?: ProductWhereUniqueInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
  set?: ProductWhereUniqueInput[] | null;
  disconnect?: ProductWhereUniqueInput[] | null;
  deleteMany?: ProductScalarWhereInput[] | null;
  updateMany?: ProductUpdateManyWithWhereNestedInput[] | null;
}

export interface ProductUpdateManyWithWhereNestedInput {
  where: ProductScalarWhereInput;
  data: ProductUpdateManyDataInput;
}

export interface ProductUpdateManyWithoutBrandInput {
  create?: ProductCreateWithoutBrandInput[] | null;
  delete?: ProductWhereUniqueInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
  set?: ProductWhereUniqueInput[] | null;
  disconnect?: ProductWhereUniqueInput[] | null;
  update?: ProductUpdateWithWhereUniqueWithoutBrandInput[] | null;
  upsert?: ProductUpsertWithWhereUniqueWithoutBrandInput[] | null;
  deleteMany?: ProductScalarWhereInput[] | null;
  updateMany?: ProductUpdateManyWithWhereNestedInput[] | null;
}

export interface ProductUpdateManyWithoutCategoryInput {
  create?: ProductCreateWithoutCategoryInput[] | null;
  delete?: ProductWhereUniqueInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
  set?: ProductWhereUniqueInput[] | null;
  disconnect?: ProductWhereUniqueInput[] | null;
  update?: ProductUpdateWithWhereUniqueWithoutCategoryInput[] | null;
  upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput[] | null;
  deleteMany?: ProductScalarWhereInput[] | null;
  updateMany?: ProductUpdateManyWithWhereNestedInput[] | null;
}

export interface ProductUpdateOneRequiredWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput | null;
  update?: ProductUpdateWithoutVariantsDataInput | null;
  upsert?: ProductUpsertWithoutVariantsInput | null;
  connect?: ProductWhereUniqueInput | null;
}

export interface ProductUpdateWithWhereUniqueNestedInput {
  where: ProductWhereUniqueInput;
  data: ProductUpdateDataInput;
}

export interface ProductUpdateWithWhereUniqueWithoutBrandInput {
  where: ProductWhereUniqueInput;
  data: ProductUpdateWithoutBrandDataInput;
}

export interface ProductUpdateWithWhereUniqueWithoutCategoryInput {
  where: ProductWhereUniqueInput;
  data: ProductUpdateWithoutCategoryDataInput;
}

export interface ProductUpdateWithoutBrandDataInput {
  architecture?: ProductArchitecture | null;
  category?: CategoryUpdateOneRequiredWithoutProductsInput | null;
  color?: ColorUpdateOneRequiredInput | null;
  description?: string | null;
  externalURL?: string | null;
  functions?: ProductFunctionUpdateManyInput | null;
  buyNewEnabled?: boolean | null;
  images?: ImageUpdateManyInput | null;
  innerMaterials?: ProductUpdateinnerMaterialsInput | null;
  materialCategory?: ProductMaterialCategoryUpdateOneWithoutProductsInput | null;
  model?: ProductModelUpdateOneWithoutProductsInput | null;
  modelSize?: SizeUpdateOneInput | null;
  name?: string | null;
  outerMaterials?: ProductUpdateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  season?: ProductSeasonUpdateOneInput | null;
  secondaryColor?: ColorUpdateOneInput | null;
  slug?: string | null;
  status?: ProductStatus | null;
  tags?: TagUpdateManyWithoutProductsInput | null;
  tier?: ProductTierUpdateOneInput | null;
  type?: ProductType | null;
  variants?: ProductVariantUpdateManyWithoutProductInput | null;
  styles?: ProductUpdatestylesInput | null;
}

export interface ProductUpdateWithoutCategoryDataInput {
  architecture?: ProductArchitecture | null;
  brand?: BrandUpdateOneRequiredWithoutProductsInput | null;
  color?: ColorUpdateOneRequiredInput | null;
  description?: string | null;
  externalURL?: string | null;
  functions?: ProductFunctionUpdateManyInput | null;
  buyNewEnabled?: boolean | null;
  images?: ImageUpdateManyInput | null;
  innerMaterials?: ProductUpdateinnerMaterialsInput | null;
  materialCategory?: ProductMaterialCategoryUpdateOneWithoutProductsInput | null;
  model?: ProductModelUpdateOneWithoutProductsInput | null;
  modelSize?: SizeUpdateOneInput | null;
  name?: string | null;
  outerMaterials?: ProductUpdateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  season?: ProductSeasonUpdateOneInput | null;
  secondaryColor?: ColorUpdateOneInput | null;
  slug?: string | null;
  status?: ProductStatus | null;
  tags?: TagUpdateManyWithoutProductsInput | null;
  tier?: ProductTierUpdateOneInput | null;
  type?: ProductType | null;
  variants?: ProductVariantUpdateManyWithoutProductInput | null;
  styles?: ProductUpdatestylesInput | null;
}

export interface ProductUpdateWithoutVariantsDataInput {
  architecture?: ProductArchitecture | null;
  brand?: BrandUpdateOneRequiredWithoutProductsInput | null;
  category?: CategoryUpdateOneRequiredWithoutProductsInput | null;
  color?: ColorUpdateOneRequiredInput | null;
  description?: string | null;
  externalURL?: string | null;
  functions?: ProductFunctionUpdateManyInput | null;
  buyNewEnabled?: boolean | null;
  images?: ImageUpdateManyInput | null;
  innerMaterials?: ProductUpdateinnerMaterialsInput | null;
  materialCategory?: ProductMaterialCategoryUpdateOneWithoutProductsInput | null;
  model?: ProductModelUpdateOneWithoutProductsInput | null;
  modelSize?: SizeUpdateOneInput | null;
  name?: string | null;
  outerMaterials?: ProductUpdateouterMaterialsInput | null;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  season?: ProductSeasonUpdateOneInput | null;
  secondaryColor?: ColorUpdateOneInput | null;
  slug?: string | null;
  status?: ProductStatus | null;
  tags?: TagUpdateManyWithoutProductsInput | null;
  tier?: ProductTierUpdateOneInput | null;
  type?: ProductType | null;
  styles?: ProductUpdatestylesInput | null;
}

export interface ProductUpdateinnerMaterialsInput {
  set?: string[] | null;
}

export interface ProductUpdateouterMaterialsInput {
  set?: string[] | null;
}

export interface ProductUpdatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface ProductUpsertWithWhereUniqueNestedInput {
  where: ProductWhereUniqueInput;
  update: ProductUpdateDataInput;
  create: ProductCreateInput;
}

export interface ProductUpsertWithWhereUniqueWithoutBrandInput {
  where: ProductWhereUniqueInput;
  update: ProductUpdateWithoutBrandDataInput;
  create: ProductCreateWithoutBrandInput;
}

export interface ProductUpsertWithWhereUniqueWithoutCategoryInput {
  where: ProductWhereUniqueInput;
  update: ProductUpdateWithoutCategoryDataInput;
  create: ProductCreateWithoutCategoryInput;
}

export interface ProductUpsertWithoutVariantsInput {
  update: ProductUpdateWithoutVariantsDataInput;
  create: ProductCreateWithoutVariantsInput;
}

export interface ProductVariantCreateInput {
  id?: string | null;
  sku?: string | null;
  displayShort: string;
  color: ColorCreateOneWithoutProductVariantsInput;
  internalSize?: SizeCreateOneInput | null;
  manufacturerSizes?: SizeCreateManyInput | null;
  weight?: number | null;
  height?: number | null;
  productID: string;
  product: ProductCreateOneWithoutVariantsInput;
  retailPrice?: number | null;
  price?: ProductVariantPriceCreateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantCreateOneWithoutProductVariantInput | null;
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null;
  total: number;
  reservable: number;
  reserved: number;
  nonReservable: number;
  offloaded: number;
  stored: number;
}

export interface ProductVariantCreateManyWithoutColorInput {
  create?: ProductVariantCreateWithoutColorInput[] | null;
  connect?: ProductVariantWhereUniqueInput[] | null;
}

export interface ProductVariantCreateManyWithoutProductInput {
  create?: ProductVariantCreateWithoutProductInput[] | null;
  connect?: ProductVariantWhereUniqueInput[] | null;
}

export interface ProductVariantCreateOneInput {
  create?: ProductVariantCreateInput | null;
  connect?: ProductVariantWhereUniqueInput | null;
}

export interface ProductVariantCreateOneWithoutPhysicalProductsInput {
  create?: ProductVariantCreateWithoutPhysicalProductsInput | null;
  connect?: ProductVariantWhereUniqueInput | null;
}

export interface ProductVariantCreateWithoutColorInput {
  id?: string | null;
  sku?: string | null;
  displayShort: string;
  internalSize?: SizeCreateOneInput | null;
  manufacturerSizes?: SizeCreateManyInput | null;
  weight?: number | null;
  height?: number | null;
  productID: string;
  product: ProductCreateOneWithoutVariantsInput;
  retailPrice?: number | null;
  price?: ProductVariantPriceCreateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantCreateOneWithoutProductVariantInput | null;
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null;
  total: number;
  reservable: number;
  reserved: number;
  nonReservable: number;
  offloaded: number;
  stored: number;
}

export interface ProductVariantCreateWithoutPhysicalProductsInput {
  id?: string | null;
  sku?: string | null;
  displayShort: string;
  color: ColorCreateOneWithoutProductVariantsInput;
  internalSize?: SizeCreateOneInput | null;
  manufacturerSizes?: SizeCreateManyInput | null;
  weight?: number | null;
  height?: number | null;
  productID: string;
  product: ProductCreateOneWithoutVariantsInput;
  retailPrice?: number | null;
  price?: ProductVariantPriceCreateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantCreateOneWithoutProductVariantInput | null;
  total: number;
  reservable: number;
  reserved: number;
  nonReservable: number;
  offloaded: number;
  stored: number;
}

export interface ProductVariantCreateWithoutProductInput {
  id?: string | null;
  sku?: string | null;
  displayShort: string;
  color: ColorCreateOneWithoutProductVariantsInput;
  internalSize?: SizeCreateOneInput | null;
  manufacturerSizes?: SizeCreateManyInput | null;
  weight?: number | null;
  height?: number | null;
  productID: string;
  retailPrice?: number | null;
  price?: ProductVariantPriceCreateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantCreateOneWithoutProductVariantInput | null;
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null;
  total: number;
  reservable: number;
  reserved: number;
  nonReservable: number;
  offloaded: number;
  stored: number;
}

export interface ProductVariantFeedbackCreateWithoutReservationFeedbackInput {
  id?: string | null;
  isCompleted: boolean;
  questions?: ProductVariantFeedbackQuestionCreateManyWithoutVariantFeedbackInput | null;
  variant: ProductVariantCreateOneInput;
}

export interface ProductVariantFeedbackQuestionCreateManyWithoutVariantFeedbackInput {
  create?: ProductVariantFeedbackQuestionCreateWithoutVariantFeedbackInput[] | null;
  connect?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null;
}

export interface ProductVariantFeedbackQuestionCreateWithoutVariantFeedbackInput {
  id?: string | null;
  options?: ProductVariantFeedbackQuestionCreateoptionsInput | null;
  question: string;
  responses?: ProductVariantFeedbackQuestionCreateresponsesInput | null;
  type: QuestionType;
}

export interface ProductVariantFeedbackQuestionCreateoptionsInput {
  set?: string[] | null;
}

export interface ProductVariantFeedbackQuestionCreateresponsesInput {
  set?: string[] | null;
}

export interface ProductVariantFeedbackQuestionScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  question?: string | null;
  question_not?: string | null;
  question_in?: string[] | null;
  question_not_in?: string[] | null;
  question_lt?: string | null;
  question_lte?: string | null;
  question_gt?: string | null;
  question_gte?: string | null;
  question_contains?: string | null;
  question_not_contains?: string | null;
  question_starts_with?: string | null;
  question_not_starts_with?: string | null;
  question_ends_with?: string | null;
  question_not_ends_with?: string | null;
  type?: QuestionType | null;
  type_not?: QuestionType | null;
  type_in?: QuestionType[] | null;
  type_not_in?: QuestionType[] | null;
  AND?: ProductVariantFeedbackQuestionScalarWhereInput[] | null;
  OR?: ProductVariantFeedbackQuestionScalarWhereInput[] | null;
  NOT?: ProductVariantFeedbackQuestionScalarWhereInput[] | null;
}

export interface ProductVariantFeedbackQuestionUpdateManyDataInput {
  options?: ProductVariantFeedbackQuestionUpdateoptionsInput | null;
  question?: string | null;
  responses?: ProductVariantFeedbackQuestionUpdateresponsesInput | null;
  type?: QuestionType | null;
}

export interface ProductVariantFeedbackQuestionUpdateManyWithWhereNestedInput {
  where: ProductVariantFeedbackQuestionScalarWhereInput;
  data: ProductVariantFeedbackQuestionUpdateManyDataInput;
}

export interface ProductVariantFeedbackQuestionUpdateManyWithoutVariantFeedbackInput {
  create?: ProductVariantFeedbackQuestionCreateWithoutVariantFeedbackInput[] | null;
  delete?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null;
  connect?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null;
  set?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null;
  disconnect?: ProductVariantFeedbackQuestionWhereUniqueInput[] | null;
  update?: ProductVariantFeedbackQuestionUpdateWithWhereUniqueWithoutVariantFeedbackInput[] | null;
  upsert?: ProductVariantFeedbackQuestionUpsertWithWhereUniqueWithoutVariantFeedbackInput[] | null;
  deleteMany?: ProductVariantFeedbackQuestionScalarWhereInput[] | null;
  updateMany?: ProductVariantFeedbackQuestionUpdateManyWithWhereNestedInput[] | null;
}

export interface ProductVariantFeedbackQuestionUpdateWithWhereUniqueWithoutVariantFeedbackInput {
  where: ProductVariantFeedbackQuestionWhereUniqueInput;
  data: ProductVariantFeedbackQuestionUpdateWithoutVariantFeedbackDataInput;
}

export interface ProductVariantFeedbackQuestionUpdateWithoutVariantFeedbackDataInput {
  options?: ProductVariantFeedbackQuestionUpdateoptionsInput | null;
  question?: string | null;
  responses?: ProductVariantFeedbackQuestionUpdateresponsesInput | null;
  type?: QuestionType | null;
}

export interface ProductVariantFeedbackQuestionUpdateoptionsInput {
  set?: string[] | null;
}

export interface ProductVariantFeedbackQuestionUpdateresponsesInput {
  set?: string[] | null;
}

export interface ProductVariantFeedbackQuestionUpsertWithWhereUniqueWithoutVariantFeedbackInput {
  where: ProductVariantFeedbackQuestionWhereUniqueInput;
  update: ProductVariantFeedbackQuestionUpdateWithoutVariantFeedbackDataInput;
  create: ProductVariantFeedbackQuestionCreateWithoutVariantFeedbackInput;
}

export interface ProductVariantFeedbackQuestionWhereUniqueInput {
  id?: string | null;
}

export interface ProductVariantFeedbackScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  isCompleted?: boolean | null;
  isCompleted_not?: boolean | null;
  AND?: ProductVariantFeedbackScalarWhereInput[] | null;
  OR?: ProductVariantFeedbackScalarWhereInput[] | null;
  NOT?: ProductVariantFeedbackScalarWhereInput[] | null;
}

export interface ProductVariantFeedbackUpdateManyDataInput {
  isCompleted?: boolean | null;
}

export interface ProductVariantFeedbackUpdateManyWithWhereNestedInput {
  where: ProductVariantFeedbackScalarWhereInput;
  data: ProductVariantFeedbackUpdateManyDataInput;
}

export interface ProductVariantFeedbackUpdateManyWithoutReservationFeedbackInput {
  create?: ProductVariantFeedbackCreateWithoutReservationFeedbackInput[] | null;
  delete?: ProductVariantFeedbackWhereUniqueInput[] | null;
  connect?: ProductVariantFeedbackWhereUniqueInput[] | null;
  set?: ProductVariantFeedbackWhereUniqueInput[] | null;
  disconnect?: ProductVariantFeedbackWhereUniqueInput[] | null;
  update?: ProductVariantFeedbackUpdateWithWhereUniqueWithoutReservationFeedbackInput[] | null;
  upsert?: ProductVariantFeedbackUpsertWithWhereUniqueWithoutReservationFeedbackInput[] | null;
  deleteMany?: ProductVariantFeedbackScalarWhereInput[] | null;
  updateMany?: ProductVariantFeedbackUpdateManyWithWhereNestedInput[] | null;
}

export interface ProductVariantFeedbackUpdateWithWhereUniqueWithoutReservationFeedbackInput {
  where: ProductVariantFeedbackWhereUniqueInput;
  data: ProductVariantFeedbackUpdateWithoutReservationFeedbackDataInput;
}

export interface ProductVariantFeedbackUpdateWithoutReservationFeedbackDataInput {
  isCompleted?: boolean | null;
  questions?: ProductVariantFeedbackQuestionUpdateManyWithoutVariantFeedbackInput | null;
  variant?: ProductVariantUpdateOneRequiredInput | null;
}

export interface ProductVariantFeedbackUpsertWithWhereUniqueWithoutReservationFeedbackInput {
  where: ProductVariantFeedbackWhereUniqueInput;
  update: ProductVariantFeedbackUpdateWithoutReservationFeedbackDataInput;
  create: ProductVariantFeedbackCreateWithoutReservationFeedbackInput;
}

export interface ProductVariantFeedbackWhereUniqueInput {
  id?: string | null;
}

export interface ProductVariantPriceCreateInput {
  id?: string | null;
  retailPrice?: number | null;
}

export interface ProductVariantPriceCreateOneInput {
  create?: ProductVariantPriceCreateInput | null;
  connect?: ProductVariantPriceWhereUniqueInput | null;
}

export interface ProductVariantPriceUpdateDataInput {
  retailPrice?: number | null;
}

export interface ProductVariantPriceUpdateOneInput {
  create?: ProductVariantPriceCreateInput | null;
  update?: ProductVariantPriceUpdateDataInput | null;
  upsert?: ProductVariantPriceUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ProductVariantPriceWhereUniqueInput | null;
}

export interface ProductVariantPriceUpsertNestedInput {
  update: ProductVariantPriceUpdateDataInput;
  create: ProductVariantPriceCreateInput;
}

export interface ProductVariantPriceWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  retailPrice?: number | null;
  retailPrice_not?: number | null;
  retailPrice_in?: number[] | null;
  retailPrice_not_in?: number[] | null;
  retailPrice_lt?: number | null;
  retailPrice_lte?: number | null;
  retailPrice_gt?: number | null;
  retailPrice_gte?: number | null;
  AND?: ProductVariantPriceWhereInput[] | null;
  OR?: ProductVariantPriceWhereInput[] | null;
  NOT?: ProductVariantPriceWhereInput[] | null;
}

export interface ProductVariantPriceWhereUniqueInput {
  id?: string | null;
}

export interface ProductVariantScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  sku?: string | null;
  sku_not?: string | null;
  sku_in?: string[] | null;
  sku_not_in?: string[] | null;
  sku_lt?: string | null;
  sku_lte?: string | null;
  sku_gt?: string | null;
  sku_gte?: string | null;
  sku_contains?: string | null;
  sku_not_contains?: string | null;
  sku_starts_with?: string | null;
  sku_not_starts_with?: string | null;
  sku_ends_with?: string | null;
  sku_not_ends_with?: string | null;
  displayShort?: string | null;
  displayShort_not?: string | null;
  displayShort_in?: string[] | null;
  displayShort_not_in?: string[] | null;
  displayShort_lt?: string | null;
  displayShort_lte?: string | null;
  displayShort_gt?: string | null;
  displayShort_gte?: string | null;
  displayShort_contains?: string | null;
  displayShort_not_contains?: string | null;
  displayShort_starts_with?: string | null;
  displayShort_not_starts_with?: string | null;
  displayShort_ends_with?: string | null;
  displayShort_not_ends_with?: string | null;
  weight?: number | null;
  weight_not?: number | null;
  weight_in?: number[] | null;
  weight_not_in?: number[] | null;
  weight_lt?: number | null;
  weight_lte?: number | null;
  weight_gt?: number | null;
  weight_gte?: number | null;
  height?: number | null;
  height_not?: number | null;
  height_in?: number[] | null;
  height_not_in?: number[] | null;
  height_lt?: number | null;
  height_lte?: number | null;
  height_gt?: number | null;
  height_gte?: number | null;
  productID?: string | null;
  productID_not?: string | null;
  productID_in?: string[] | null;
  productID_not_in?: string[] | null;
  productID_lt?: string | null;
  productID_lte?: string | null;
  productID_gt?: string | null;
  productID_gte?: string | null;
  productID_contains?: string | null;
  productID_not_contains?: string | null;
  productID_starts_with?: string | null;
  productID_not_starts_with?: string | null;
  productID_ends_with?: string | null;
  productID_not_ends_with?: string | null;
  retailPrice?: number | null;
  retailPrice_not?: number | null;
  retailPrice_in?: number[] | null;
  retailPrice_not_in?: number[] | null;
  retailPrice_lt?: number | null;
  retailPrice_lte?: number | null;
  retailPrice_gt?: number | null;
  retailPrice_gte?: number | null;
  total?: number | null;
  total_not?: number | null;
  total_in?: number[] | null;
  total_not_in?: number[] | null;
  total_lt?: number | null;
  total_lte?: number | null;
  total_gt?: number | null;
  total_gte?: number | null;
  reservable?: number | null;
  reservable_not?: number | null;
  reservable_in?: number[] | null;
  reservable_not_in?: number[] | null;
  reservable_lt?: number | null;
  reservable_lte?: number | null;
  reservable_gt?: number | null;
  reservable_gte?: number | null;
  reserved?: number | null;
  reserved_not?: number | null;
  reserved_in?: number[] | null;
  reserved_not_in?: number[] | null;
  reserved_lt?: number | null;
  reserved_lte?: number | null;
  reserved_gt?: number | null;
  reserved_gte?: number | null;
  nonReservable?: number | null;
  nonReservable_not?: number | null;
  nonReservable_in?: number[] | null;
  nonReservable_not_in?: number[] | null;
  nonReservable_lt?: number | null;
  nonReservable_lte?: number | null;
  nonReservable_gt?: number | null;
  nonReservable_gte?: number | null;
  offloaded?: number | null;
  offloaded_not?: number | null;
  offloaded_in?: number[] | null;
  offloaded_not_in?: number[] | null;
  offloaded_lt?: number | null;
  offloaded_lte?: number | null;
  offloaded_gt?: number | null;
  offloaded_gte?: number | null;
  stored?: number | null;
  stored_not?: number | null;
  stored_in?: number[] | null;
  stored_not_in?: number[] | null;
  stored_lt?: number | null;
  stored_lte?: number | null;
  stored_gt?: number | null;
  stored_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ProductVariantScalarWhereInput[] | null;
  OR?: ProductVariantScalarWhereInput[] | null;
  NOT?: ProductVariantScalarWhereInput[] | null;
}

export interface ProductVariantUpdateDataInput {
  sku?: string | null;
  displayShort?: string | null;
  color?: ColorUpdateOneRequiredWithoutProductVariantsInput | null;
  internalSize?: SizeUpdateOneInput | null;
  manufacturerSizes?: SizeUpdateManyInput | null;
  weight?: number | null;
  height?: number | null;
  productID?: string | null;
  product?: ProductUpdateOneRequiredWithoutVariantsInput | null;
  retailPrice?: number | null;
  price?: ProductVariantPriceUpdateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantUpdateOneWithoutProductVariantInput | null;
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null;
  total?: number | null;
  reservable?: number | null;
  reserved?: number | null;
  nonReservable?: number | null;
  offloaded?: number | null;
  stored?: number | null;
}

export interface ProductVariantUpdateManyDataInput {
  sku?: string | null;
  displayShort?: string | null;
  weight?: number | null;
  height?: number | null;
  productID?: string | null;
  retailPrice?: number | null;
  total?: number | null;
  reservable?: number | null;
  reserved?: number | null;
  nonReservable?: number | null;
  offloaded?: number | null;
  stored?: number | null;
}

export interface ProductVariantUpdateManyWithWhereNestedInput {
  where: ProductVariantScalarWhereInput;
  data: ProductVariantUpdateManyDataInput;
}

export interface ProductVariantUpdateManyWithoutColorInput {
  create?: ProductVariantCreateWithoutColorInput[] | null;
  delete?: ProductVariantWhereUniqueInput[] | null;
  connect?: ProductVariantWhereUniqueInput[] | null;
  set?: ProductVariantWhereUniqueInput[] | null;
  disconnect?: ProductVariantWhereUniqueInput[] | null;
  update?: ProductVariantUpdateWithWhereUniqueWithoutColorInput[] | null;
  upsert?: ProductVariantUpsertWithWhereUniqueWithoutColorInput[] | null;
  deleteMany?: ProductVariantScalarWhereInput[] | null;
  updateMany?: ProductVariantUpdateManyWithWhereNestedInput[] | null;
}

export interface ProductVariantUpdateManyWithoutProductInput {
  create?: ProductVariantCreateWithoutProductInput[] | null;
  delete?: ProductVariantWhereUniqueInput[] | null;
  connect?: ProductVariantWhereUniqueInput[] | null;
  set?: ProductVariantWhereUniqueInput[] | null;
  disconnect?: ProductVariantWhereUniqueInput[] | null;
  update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput[] | null;
  upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput[] | null;
  deleteMany?: ProductVariantScalarWhereInput[] | null;
  updateMany?: ProductVariantUpdateManyWithWhereNestedInput[] | null;
}

export interface ProductVariantUpdateOneRequiredInput {
  create?: ProductVariantCreateInput | null;
  update?: ProductVariantUpdateDataInput | null;
  upsert?: ProductVariantUpsertNestedInput | null;
  connect?: ProductVariantWhereUniqueInput | null;
}

export interface ProductVariantUpdateOneRequiredWithoutPhysicalProductsInput {
  create?: ProductVariantCreateWithoutPhysicalProductsInput | null;
  update?: ProductVariantUpdateWithoutPhysicalProductsDataInput | null;
  upsert?: ProductVariantUpsertWithoutPhysicalProductsInput | null;
  connect?: ProductVariantWhereUniqueInput | null;
}

export interface ProductVariantUpdateWithWhereUniqueWithoutColorInput {
  where: ProductVariantWhereUniqueInput;
  data: ProductVariantUpdateWithoutColorDataInput;
}

export interface ProductVariantUpdateWithWhereUniqueWithoutProductInput {
  where: ProductVariantWhereUniqueInput;
  data: ProductVariantUpdateWithoutProductDataInput;
}

export interface ProductVariantUpdateWithoutColorDataInput {
  sku?: string | null;
  displayShort?: string | null;
  internalSize?: SizeUpdateOneInput | null;
  manufacturerSizes?: SizeUpdateManyInput | null;
  weight?: number | null;
  height?: number | null;
  productID?: string | null;
  product?: ProductUpdateOneRequiredWithoutVariantsInput | null;
  retailPrice?: number | null;
  price?: ProductVariantPriceUpdateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantUpdateOneWithoutProductVariantInput | null;
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null;
  total?: number | null;
  reservable?: number | null;
  reserved?: number | null;
  nonReservable?: number | null;
  offloaded?: number | null;
  stored?: number | null;
}

export interface ProductVariantUpdateWithoutPhysicalProductsDataInput {
  sku?: string | null;
  displayShort?: string | null;
  color?: ColorUpdateOneRequiredWithoutProductVariantsInput | null;
  internalSize?: SizeUpdateOneInput | null;
  manufacturerSizes?: SizeUpdateManyInput | null;
  weight?: number | null;
  height?: number | null;
  productID?: string | null;
  product?: ProductUpdateOneRequiredWithoutVariantsInput | null;
  retailPrice?: number | null;
  price?: ProductVariantPriceUpdateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantUpdateOneWithoutProductVariantInput | null;
  total?: number | null;
  reservable?: number | null;
  reserved?: number | null;
  nonReservable?: number | null;
  offloaded?: number | null;
  stored?: number | null;
}

export interface ProductVariantUpdateWithoutProductDataInput {
  sku?: string | null;
  displayShort?: string | null;
  color?: ColorUpdateOneRequiredWithoutProductVariantsInput | null;
  internalSize?: SizeUpdateOneInput | null;
  manufacturerSizes?: SizeUpdateManyInput | null;
  weight?: number | null;
  height?: number | null;
  productID?: string | null;
  retailPrice?: number | null;
  price?: ProductVariantPriceUpdateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantUpdateOneWithoutProductVariantInput | null;
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null;
  total?: number | null;
  reservable?: number | null;
  reserved?: number | null;
  nonReservable?: number | null;
  offloaded?: number | null;
  stored?: number | null;
}

export interface ProductVariantUpsertNestedInput {
  update: ProductVariantUpdateDataInput;
  create: ProductVariantCreateInput;
}

export interface ProductVariantUpsertWithWhereUniqueWithoutColorInput {
  where: ProductVariantWhereUniqueInput;
  update: ProductVariantUpdateWithoutColorDataInput;
  create: ProductVariantCreateWithoutColorInput;
}

export interface ProductVariantUpsertWithWhereUniqueWithoutProductInput {
  where: ProductVariantWhereUniqueInput;
  update: ProductVariantUpdateWithoutProductDataInput;
  create: ProductVariantCreateWithoutProductInput;
}

export interface ProductVariantUpsertWithoutPhysicalProductsInput {
  update: ProductVariantUpdateWithoutPhysicalProductsDataInput;
  create: ProductVariantCreateWithoutPhysicalProductsInput;
}

export interface ProductVariantWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  sku?: string | null;
  sku_not?: string | null;
  sku_in?: string[] | null;
  sku_not_in?: string[] | null;
  sku_lt?: string | null;
  sku_lte?: string | null;
  sku_gt?: string | null;
  sku_gte?: string | null;
  sku_contains?: string | null;
  sku_not_contains?: string | null;
  sku_starts_with?: string | null;
  sku_not_starts_with?: string | null;
  sku_ends_with?: string | null;
  sku_not_ends_with?: string | null;
  displayShort?: string | null;
  displayShort_not?: string | null;
  displayShort_in?: string[] | null;
  displayShort_not_in?: string[] | null;
  displayShort_lt?: string | null;
  displayShort_lte?: string | null;
  displayShort_gt?: string | null;
  displayShort_gte?: string | null;
  displayShort_contains?: string | null;
  displayShort_not_contains?: string | null;
  displayShort_starts_with?: string | null;
  displayShort_not_starts_with?: string | null;
  displayShort_ends_with?: string | null;
  displayShort_not_ends_with?: string | null;
  color?: ColorWhereInput | null;
  internalSize?: SizeWhereInput | null;
  manufacturerSizes_every?: SizeWhereInput | null;
  manufacturerSizes_some?: SizeWhereInput | null;
  manufacturerSizes_none?: SizeWhereInput | null;
  weight?: number | null;
  weight_not?: number | null;
  weight_in?: number[] | null;
  weight_not_in?: number[] | null;
  weight_lt?: number | null;
  weight_lte?: number | null;
  weight_gt?: number | null;
  weight_gte?: number | null;
  height?: number | null;
  height_not?: number | null;
  height_in?: number[] | null;
  height_not_in?: number[] | null;
  height_lt?: number | null;
  height_lte?: number | null;
  height_gt?: number | null;
  height_gte?: number | null;
  productID?: string | null;
  productID_not?: string | null;
  productID_in?: string[] | null;
  productID_not_in?: string[] | null;
  productID_lt?: string | null;
  productID_lte?: string | null;
  productID_gt?: string | null;
  productID_gte?: string | null;
  productID_contains?: string | null;
  productID_not_contains?: string | null;
  productID_starts_with?: string | null;
  productID_not_starts_with?: string | null;
  productID_ends_with?: string | null;
  productID_not_ends_with?: string | null;
  product?: ProductWhereInput | null;
  retailPrice?: number | null;
  retailPrice_not?: number | null;
  retailPrice_in?: number[] | null;
  retailPrice_not_in?: number[] | null;
  retailPrice_lt?: number | null;
  retailPrice_lte?: number | null;
  retailPrice_gt?: number | null;
  retailPrice_gte?: number | null;
  price?: ProductVariantPriceWhereInput | null;
  shopifyProductVariant?: ShopifyProductVariantWhereInput | null;
  physicalProducts_every?: PhysicalProductWhereInput | null;
  physicalProducts_some?: PhysicalProductWhereInput | null;
  physicalProducts_none?: PhysicalProductWhereInput | null;
  total?: number | null;
  total_not?: number | null;
  total_in?: number[] | null;
  total_not_in?: number[] | null;
  total_lt?: number | null;
  total_lte?: number | null;
  total_gt?: number | null;
  total_gte?: number | null;
  reservable?: number | null;
  reservable_not?: number | null;
  reservable_in?: number[] | null;
  reservable_not_in?: number[] | null;
  reservable_lt?: number | null;
  reservable_lte?: number | null;
  reservable_gt?: number | null;
  reservable_gte?: number | null;
  reserved?: number | null;
  reserved_not?: number | null;
  reserved_in?: number[] | null;
  reserved_not_in?: number[] | null;
  reserved_lt?: number | null;
  reserved_lte?: number | null;
  reserved_gt?: number | null;
  reserved_gte?: number | null;
  nonReservable?: number | null;
  nonReservable_not?: number | null;
  nonReservable_in?: number[] | null;
  nonReservable_not_in?: number[] | null;
  nonReservable_lt?: number | null;
  nonReservable_lte?: number | null;
  nonReservable_gt?: number | null;
  nonReservable_gte?: number | null;
  offloaded?: number | null;
  offloaded_not?: number | null;
  offloaded_in?: number[] | null;
  offloaded_not_in?: number[] | null;
  offloaded_lt?: number | null;
  offloaded_lte?: number | null;
  offloaded_gt?: number | null;
  offloaded_gte?: number | null;
  stored?: number | null;
  stored_not?: number | null;
  stored_in?: number[] | null;
  stored_not_in?: number[] | null;
  stored_lt?: number | null;
  stored_lte?: number | null;
  stored_gt?: number | null;
  stored_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ProductVariantWhereInput[] | null;
  OR?: ProductVariantWhereInput[] | null;
  NOT?: ProductVariantWhereInput[] | null;
}

export interface ProductVariantWhereUniqueInput {
  id?: string | null;
  sku?: string | null;
}

export interface ProductWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  architecture?: ProductArchitecture | null;
  architecture_not?: ProductArchitecture | null;
  architecture_in?: ProductArchitecture[] | null;
  architecture_not_in?: ProductArchitecture[] | null;
  brand?: BrandWhereInput | null;
  category?: CategoryWhereInput | null;
  color?: ColorWhereInput | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  externalURL?: string | null;
  externalURL_not?: string | null;
  externalURL_in?: string[] | null;
  externalURL_not_in?: string[] | null;
  externalURL_lt?: string | null;
  externalURL_lte?: string | null;
  externalURL_gt?: string | null;
  externalURL_gte?: string | null;
  externalURL_contains?: string | null;
  externalURL_not_contains?: string | null;
  externalURL_starts_with?: string | null;
  externalURL_not_starts_with?: string | null;
  externalURL_ends_with?: string | null;
  externalURL_not_ends_with?: string | null;
  functions_every?: ProductFunctionWhereInput | null;
  functions_some?: ProductFunctionWhereInput | null;
  functions_none?: ProductFunctionWhereInput | null;
  buyNewEnabled?: boolean | null;
  buyNewEnabled_not?: boolean | null;
  images_every?: ImageWhereInput | null;
  images_some?: ImageWhereInput | null;
  images_none?: ImageWhereInput | null;
  materialCategory?: ProductMaterialCategoryWhereInput | null;
  model?: ProductModelWhereInput | null;
  modelSize?: SizeWhereInput | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  photographyStatus?: PhotographyStatus | null;
  photographyStatus_not?: PhotographyStatus | null;
  photographyStatus_in?: PhotographyStatus[] | null;
  photographyStatus_not_in?: PhotographyStatus[] | null;
  productFit?: ProductFit | null;
  productFit_not?: ProductFit | null;
  productFit_in?: ProductFit[] | null;
  productFit_not_in?: ProductFit[] | null;
  publishedAt?: any | null;
  publishedAt_not?: any | null;
  publishedAt_in?: any[] | null;
  publishedAt_not_in?: any[] | null;
  publishedAt_lt?: any | null;
  publishedAt_lte?: any | null;
  publishedAt_gt?: any | null;
  publishedAt_gte?: any | null;
  retailPrice?: number | null;
  retailPrice_not?: number | null;
  retailPrice_in?: number[] | null;
  retailPrice_not_in?: number[] | null;
  retailPrice_lt?: number | null;
  retailPrice_lte?: number | null;
  retailPrice_gt?: number | null;
  retailPrice_gte?: number | null;
  season?: ProductSeasonWhereInput | null;
  secondaryColor?: ColorWhereInput | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  status?: ProductStatus | null;
  status_not?: ProductStatus | null;
  status_in?: ProductStatus[] | null;
  status_not_in?: ProductStatus[] | null;
  tags_every?: TagWhereInput | null;
  tags_some?: TagWhereInput | null;
  tags_none?: TagWhereInput | null;
  tier?: ProductTierWhereInput | null;
  type?: ProductType | null;
  type_not?: ProductType | null;
  type_in?: ProductType[] | null;
  type_not_in?: ProductType[] | null;
  variants_every?: ProductVariantWhereInput | null;
  variants_some?: ProductVariantWhereInput | null;
  variants_none?: ProductVariantWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ProductWhereInput[] | null;
  OR?: ProductWhereInput[] | null;
  NOT?: ProductWhereInput[] | null;
}

export interface ProductWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
}

export interface PushNotificationReceiptCreateInput {
  id?: string | null;
  route?: string | null;
  screen?: string | null;
  uri?: string | null;
  users?: UserCreateManyWithoutPushNotificationsInput | null;
  interest?: string | null;
  body: string;
  title?: string | null;
  recordID?: string | null;
  recordSlug?: string | null;
  notificationKey?: string | null;
  sentAt: any;
}

export interface PushNotificationReceiptCreateManyInput {
  create?: PushNotificationReceiptCreateInput[] | null;
  connect?: PushNotificationReceiptWhereUniqueInput[] | null;
}

export interface PushNotificationReceiptCreateManyWithoutUsersInput {
  create?: PushNotificationReceiptCreateWithoutUsersInput[] | null;
  connect?: PushNotificationReceiptWhereUniqueInput[] | null;
}

export interface PushNotificationReceiptCreateWithoutUsersInput {
  id?: string | null;
  route?: string | null;
  screen?: string | null;
  uri?: string | null;
  interest?: string | null;
  body: string;
  title?: string | null;
  recordID?: string | null;
  recordSlug?: string | null;
  notificationKey?: string | null;
  sentAt: any;
}

export interface PushNotificationReceiptScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  route?: string | null;
  route_not?: string | null;
  route_in?: string[] | null;
  route_not_in?: string[] | null;
  route_lt?: string | null;
  route_lte?: string | null;
  route_gt?: string | null;
  route_gte?: string | null;
  route_contains?: string | null;
  route_not_contains?: string | null;
  route_starts_with?: string | null;
  route_not_starts_with?: string | null;
  route_ends_with?: string | null;
  route_not_ends_with?: string | null;
  screen?: string | null;
  screen_not?: string | null;
  screen_in?: string[] | null;
  screen_not_in?: string[] | null;
  screen_lt?: string | null;
  screen_lte?: string | null;
  screen_gt?: string | null;
  screen_gte?: string | null;
  screen_contains?: string | null;
  screen_not_contains?: string | null;
  screen_starts_with?: string | null;
  screen_not_starts_with?: string | null;
  screen_ends_with?: string | null;
  screen_not_ends_with?: string | null;
  uri?: string | null;
  uri_not?: string | null;
  uri_in?: string[] | null;
  uri_not_in?: string[] | null;
  uri_lt?: string | null;
  uri_lte?: string | null;
  uri_gt?: string | null;
  uri_gte?: string | null;
  uri_contains?: string | null;
  uri_not_contains?: string | null;
  uri_starts_with?: string | null;
  uri_not_starts_with?: string | null;
  uri_ends_with?: string | null;
  uri_not_ends_with?: string | null;
  interest?: string | null;
  interest_not?: string | null;
  interest_in?: string[] | null;
  interest_not_in?: string[] | null;
  interest_lt?: string | null;
  interest_lte?: string | null;
  interest_gt?: string | null;
  interest_gte?: string | null;
  interest_contains?: string | null;
  interest_not_contains?: string | null;
  interest_starts_with?: string | null;
  interest_not_starts_with?: string | null;
  interest_ends_with?: string | null;
  interest_not_ends_with?: string | null;
  body?: string | null;
  body_not?: string | null;
  body_in?: string[] | null;
  body_not_in?: string[] | null;
  body_lt?: string | null;
  body_lte?: string | null;
  body_gt?: string | null;
  body_gte?: string | null;
  body_contains?: string | null;
  body_not_contains?: string | null;
  body_starts_with?: string | null;
  body_not_starts_with?: string | null;
  body_ends_with?: string | null;
  body_not_ends_with?: string | null;
  title?: string | null;
  title_not?: string | null;
  title_in?: string[] | null;
  title_not_in?: string[] | null;
  title_lt?: string | null;
  title_lte?: string | null;
  title_gt?: string | null;
  title_gte?: string | null;
  title_contains?: string | null;
  title_not_contains?: string | null;
  title_starts_with?: string | null;
  title_not_starts_with?: string | null;
  title_ends_with?: string | null;
  title_not_ends_with?: string | null;
  recordID?: string | null;
  recordID_not?: string | null;
  recordID_in?: string[] | null;
  recordID_not_in?: string[] | null;
  recordID_lt?: string | null;
  recordID_lte?: string | null;
  recordID_gt?: string | null;
  recordID_gte?: string | null;
  recordID_contains?: string | null;
  recordID_not_contains?: string | null;
  recordID_starts_with?: string | null;
  recordID_not_starts_with?: string | null;
  recordID_ends_with?: string | null;
  recordID_not_ends_with?: string | null;
  recordSlug?: string | null;
  recordSlug_not?: string | null;
  recordSlug_in?: string[] | null;
  recordSlug_not_in?: string[] | null;
  recordSlug_lt?: string | null;
  recordSlug_lte?: string | null;
  recordSlug_gt?: string | null;
  recordSlug_gte?: string | null;
  recordSlug_contains?: string | null;
  recordSlug_not_contains?: string | null;
  recordSlug_starts_with?: string | null;
  recordSlug_not_starts_with?: string | null;
  recordSlug_ends_with?: string | null;
  recordSlug_not_ends_with?: string | null;
  notificationKey?: string | null;
  notificationKey_not?: string | null;
  notificationKey_in?: string[] | null;
  notificationKey_not_in?: string[] | null;
  notificationKey_lt?: string | null;
  notificationKey_lte?: string | null;
  notificationKey_gt?: string | null;
  notificationKey_gte?: string | null;
  notificationKey_contains?: string | null;
  notificationKey_not_contains?: string | null;
  notificationKey_starts_with?: string | null;
  notificationKey_not_starts_with?: string | null;
  notificationKey_ends_with?: string | null;
  notificationKey_not_ends_with?: string | null;
  sentAt?: any | null;
  sentAt_not?: any | null;
  sentAt_in?: any[] | null;
  sentAt_not_in?: any[] | null;
  sentAt_lt?: any | null;
  sentAt_lte?: any | null;
  sentAt_gt?: any | null;
  sentAt_gte?: any | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: PushNotificationReceiptScalarWhereInput[] | null;
  OR?: PushNotificationReceiptScalarWhereInput[] | null;
  NOT?: PushNotificationReceiptScalarWhereInput[] | null;
}

export interface PushNotificationReceiptUpdateDataInput {
  route?: string | null;
  screen?: string | null;
  uri?: string | null;
  users?: UserUpdateManyWithoutPushNotificationsInput | null;
  interest?: string | null;
  body?: string | null;
  title?: string | null;
  recordID?: string | null;
  recordSlug?: string | null;
  notificationKey?: string | null;
  sentAt?: any | null;
}

export interface PushNotificationReceiptUpdateManyDataInput {
  route?: string | null;
  screen?: string | null;
  uri?: string | null;
  interest?: string | null;
  body?: string | null;
  title?: string | null;
  recordID?: string | null;
  recordSlug?: string | null;
  notificationKey?: string | null;
  sentAt?: any | null;
}

export interface PushNotificationReceiptUpdateManyInput {
  create?: PushNotificationReceiptCreateInput[] | null;
  update?: PushNotificationReceiptUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: PushNotificationReceiptUpsertWithWhereUniqueNestedInput[] | null;
  delete?: PushNotificationReceiptWhereUniqueInput[] | null;
  connect?: PushNotificationReceiptWhereUniqueInput[] | null;
  set?: PushNotificationReceiptWhereUniqueInput[] | null;
  disconnect?: PushNotificationReceiptWhereUniqueInput[] | null;
  deleteMany?: PushNotificationReceiptScalarWhereInput[] | null;
  updateMany?: PushNotificationReceiptUpdateManyWithWhereNestedInput[] | null;
}

export interface PushNotificationReceiptUpdateManyWithWhereNestedInput {
  where: PushNotificationReceiptScalarWhereInput;
  data: PushNotificationReceiptUpdateManyDataInput;
}

export interface PushNotificationReceiptUpdateManyWithoutUsersInput {
  create?: PushNotificationReceiptCreateWithoutUsersInput[] | null;
  delete?: PushNotificationReceiptWhereUniqueInput[] | null;
  connect?: PushNotificationReceiptWhereUniqueInput[] | null;
  set?: PushNotificationReceiptWhereUniqueInput[] | null;
  disconnect?: PushNotificationReceiptWhereUniqueInput[] | null;
  update?: PushNotificationReceiptUpdateWithWhereUniqueWithoutUsersInput[] | null;
  upsert?: PushNotificationReceiptUpsertWithWhereUniqueWithoutUsersInput[] | null;
  deleteMany?: PushNotificationReceiptScalarWhereInput[] | null;
  updateMany?: PushNotificationReceiptUpdateManyWithWhereNestedInput[] | null;
}

export interface PushNotificationReceiptUpdateWithWhereUniqueNestedInput {
  where: PushNotificationReceiptWhereUniqueInput;
  data: PushNotificationReceiptUpdateDataInput;
}

export interface PushNotificationReceiptUpdateWithWhereUniqueWithoutUsersInput {
  where: PushNotificationReceiptWhereUniqueInput;
  data: PushNotificationReceiptUpdateWithoutUsersDataInput;
}

export interface PushNotificationReceiptUpdateWithoutUsersDataInput {
  route?: string | null;
  screen?: string | null;
  uri?: string | null;
  interest?: string | null;
  body?: string | null;
  title?: string | null;
  recordID?: string | null;
  recordSlug?: string | null;
  notificationKey?: string | null;
  sentAt?: any | null;
}

export interface PushNotificationReceiptUpsertWithWhereUniqueNestedInput {
  where: PushNotificationReceiptWhereUniqueInput;
  update: PushNotificationReceiptUpdateDataInput;
  create: PushNotificationReceiptCreateInput;
}

export interface PushNotificationReceiptUpsertWithWhereUniqueWithoutUsersInput {
  where: PushNotificationReceiptWhereUniqueInput;
  update: PushNotificationReceiptUpdateWithoutUsersDataInput;
  create: PushNotificationReceiptCreateWithoutUsersInput;
}

export interface PushNotificationReceiptWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  route?: string | null;
  route_not?: string | null;
  route_in?: string[] | null;
  route_not_in?: string[] | null;
  route_lt?: string | null;
  route_lte?: string | null;
  route_gt?: string | null;
  route_gte?: string | null;
  route_contains?: string | null;
  route_not_contains?: string | null;
  route_starts_with?: string | null;
  route_not_starts_with?: string | null;
  route_ends_with?: string | null;
  route_not_ends_with?: string | null;
  screen?: string | null;
  screen_not?: string | null;
  screen_in?: string[] | null;
  screen_not_in?: string[] | null;
  screen_lt?: string | null;
  screen_lte?: string | null;
  screen_gt?: string | null;
  screen_gte?: string | null;
  screen_contains?: string | null;
  screen_not_contains?: string | null;
  screen_starts_with?: string | null;
  screen_not_starts_with?: string | null;
  screen_ends_with?: string | null;
  screen_not_ends_with?: string | null;
  uri?: string | null;
  uri_not?: string | null;
  uri_in?: string[] | null;
  uri_not_in?: string[] | null;
  uri_lt?: string | null;
  uri_lte?: string | null;
  uri_gt?: string | null;
  uri_gte?: string | null;
  uri_contains?: string | null;
  uri_not_contains?: string | null;
  uri_starts_with?: string | null;
  uri_not_starts_with?: string | null;
  uri_ends_with?: string | null;
  uri_not_ends_with?: string | null;
  users_every?: UserWhereInput | null;
  users_some?: UserWhereInput | null;
  users_none?: UserWhereInput | null;
  interest?: string | null;
  interest_not?: string | null;
  interest_in?: string[] | null;
  interest_not_in?: string[] | null;
  interest_lt?: string | null;
  interest_lte?: string | null;
  interest_gt?: string | null;
  interest_gte?: string | null;
  interest_contains?: string | null;
  interest_not_contains?: string | null;
  interest_starts_with?: string | null;
  interest_not_starts_with?: string | null;
  interest_ends_with?: string | null;
  interest_not_ends_with?: string | null;
  body?: string | null;
  body_not?: string | null;
  body_in?: string[] | null;
  body_not_in?: string[] | null;
  body_lt?: string | null;
  body_lte?: string | null;
  body_gt?: string | null;
  body_gte?: string | null;
  body_contains?: string | null;
  body_not_contains?: string | null;
  body_starts_with?: string | null;
  body_not_starts_with?: string | null;
  body_ends_with?: string | null;
  body_not_ends_with?: string | null;
  title?: string | null;
  title_not?: string | null;
  title_in?: string[] | null;
  title_not_in?: string[] | null;
  title_lt?: string | null;
  title_lte?: string | null;
  title_gt?: string | null;
  title_gte?: string | null;
  title_contains?: string | null;
  title_not_contains?: string | null;
  title_starts_with?: string | null;
  title_not_starts_with?: string | null;
  title_ends_with?: string | null;
  title_not_ends_with?: string | null;
  recordID?: string | null;
  recordID_not?: string | null;
  recordID_in?: string[] | null;
  recordID_not_in?: string[] | null;
  recordID_lt?: string | null;
  recordID_lte?: string | null;
  recordID_gt?: string | null;
  recordID_gte?: string | null;
  recordID_contains?: string | null;
  recordID_not_contains?: string | null;
  recordID_starts_with?: string | null;
  recordID_not_starts_with?: string | null;
  recordID_ends_with?: string | null;
  recordID_not_ends_with?: string | null;
  recordSlug?: string | null;
  recordSlug_not?: string | null;
  recordSlug_in?: string[] | null;
  recordSlug_not_in?: string[] | null;
  recordSlug_lt?: string | null;
  recordSlug_lte?: string | null;
  recordSlug_gt?: string | null;
  recordSlug_gte?: string | null;
  recordSlug_contains?: string | null;
  recordSlug_not_contains?: string | null;
  recordSlug_starts_with?: string | null;
  recordSlug_not_starts_with?: string | null;
  recordSlug_ends_with?: string | null;
  recordSlug_not_ends_with?: string | null;
  notificationKey?: string | null;
  notificationKey_not?: string | null;
  notificationKey_in?: string[] | null;
  notificationKey_not_in?: string[] | null;
  notificationKey_lt?: string | null;
  notificationKey_lte?: string | null;
  notificationKey_gt?: string | null;
  notificationKey_gte?: string | null;
  notificationKey_contains?: string | null;
  notificationKey_not_contains?: string | null;
  notificationKey_starts_with?: string | null;
  notificationKey_not_starts_with?: string | null;
  notificationKey_ends_with?: string | null;
  notificationKey_not_ends_with?: string | null;
  sentAt?: any | null;
  sentAt_not?: any | null;
  sentAt_in?: any[] | null;
  sentAt_not_in?: any[] | null;
  sentAt_lt?: any | null;
  sentAt_lte?: any | null;
  sentAt_gt?: any | null;
  sentAt_gte?: any | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: PushNotificationReceiptWhereInput[] | null;
  OR?: PushNotificationReceiptWhereInput[] | null;
  NOT?: PushNotificationReceiptWhereInput[] | null;
}

export interface PushNotificationReceiptWhereUniqueInput {
  id?: string | null;
}

export interface ReservationCreateInput {
  id?: string | null;
  user: UserCreateOneInput;
  customer: CustomerCreateOneWithoutReservationsInput;
  sentPackage?: PackageCreateOneInput | null;
  returnedPackage?: PackageCreateOneInput | null;
  products?: PhysicalProductCreateManyInput | null;
  newProducts?: PhysicalProductCreateManyInput | null;
  packageEvents?: PackageTransitEventCreateManyWithoutReservationInput | null;
  reservationNumber: number;
  phase: ReservationPhase;
  shipped: boolean;
  status: ReservationStatus;
  shippedAt?: any | null;
  receivedAt?: any | null;
  reminderSentAt?: any | null;
  statusUpdatedAt?: any | null;
  completedAt?: any | null;
  cancelledAt?: any | null;
  receipt?: ReservationReceiptCreateOneWithoutReservationInput | null;
  lastLocation?: LocationCreateOneInput | null;
  shippingOption?: ShippingOptionCreateOneInput | null;
}

export interface ReservationCreateManyWithoutCustomerInput {
  create?: ReservationCreateWithoutCustomerInput[] | null;
  connect?: ReservationWhereUniqueInput[] | null;
}

export interface ReservationCreateOneWithoutPackageEventsInput {
  create?: ReservationCreateWithoutPackageEventsInput | null;
  connect?: ReservationWhereUniqueInput | null;
}

export interface ReservationCreateWithoutCustomerInput {
  id?: string | null;
  user: UserCreateOneInput;
  sentPackage?: PackageCreateOneInput | null;
  returnedPackage?: PackageCreateOneInput | null;
  products?: PhysicalProductCreateManyInput | null;
  newProducts?: PhysicalProductCreateManyInput | null;
  packageEvents?: PackageTransitEventCreateManyWithoutReservationInput | null;
  reservationNumber: number;
  phase: ReservationPhase;
  shipped: boolean;
  status: ReservationStatus;
  shippedAt?: any | null;
  receivedAt?: any | null;
  reminderSentAt?: any | null;
  statusUpdatedAt?: any | null;
  completedAt?: any | null;
  cancelledAt?: any | null;
  receipt?: ReservationReceiptCreateOneWithoutReservationInput | null;
  lastLocation?: LocationCreateOneInput | null;
  shippingOption?: ShippingOptionCreateOneInput | null;
}

export interface ReservationCreateWithoutPackageEventsInput {
  id?: string | null;
  user: UserCreateOneInput;
  customer: CustomerCreateOneWithoutReservationsInput;
  sentPackage?: PackageCreateOneInput | null;
  returnedPackage?: PackageCreateOneInput | null;
  products?: PhysicalProductCreateManyInput | null;
  newProducts?: PhysicalProductCreateManyInput | null;
  reservationNumber: number;
  phase: ReservationPhase;
  shipped: boolean;
  status: ReservationStatus;
  shippedAt?: any | null;
  receivedAt?: any | null;
  reminderSentAt?: any | null;
  statusUpdatedAt?: any | null;
  completedAt?: any | null;
  cancelledAt?: any | null;
  receipt?: ReservationReceiptCreateOneWithoutReservationInput | null;
  lastLocation?: LocationCreateOneInput | null;
  shippingOption?: ShippingOptionCreateOneInput | null;
}

export interface ReservationFeedbackUpdateInput {
  comment?: string | null;
  feedbacks?: ProductVariantFeedbackUpdateManyWithoutReservationFeedbackInput | null;
  rating?: Rating | null;
  user?: UserUpdateOneRequiredInput | null;
  reservation?: ReservationUpdateOneRequiredInput | null;
  respondedAt?: any | null;
}

export interface ReservationReceiptCreateOneWithoutReservationInput {
  create?: ReservationReceiptCreateWithoutReservationInput | null;
  connect?: ReservationReceiptWhereUniqueInput | null;
}

export interface ReservationReceiptCreateWithoutReservationInput {
  id?: string | null;
  items?: ReservationReceiptItemCreateManyInput | null;
}

export interface ReservationReceiptItemCreateInput {
  id?: string | null;
  product: PhysicalProductCreateOneInput;
  productStatus: PhysicalProductStatus;
  notes?: string | null;
}

export interface ReservationReceiptItemCreateManyInput {
  create?: ReservationReceiptItemCreateInput[] | null;
  connect?: ReservationReceiptItemWhereUniqueInput[] | null;
}

export interface ReservationReceiptItemScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  productStatus?: PhysicalProductStatus | null;
  productStatus_not?: PhysicalProductStatus | null;
  productStatus_in?: PhysicalProductStatus[] | null;
  productStatus_not_in?: PhysicalProductStatus[] | null;
  notes?: string | null;
  notes_not?: string | null;
  notes_in?: string[] | null;
  notes_not_in?: string[] | null;
  notes_lt?: string | null;
  notes_lte?: string | null;
  notes_gt?: string | null;
  notes_gte?: string | null;
  notes_contains?: string | null;
  notes_not_contains?: string | null;
  notes_starts_with?: string | null;
  notes_not_starts_with?: string | null;
  notes_ends_with?: string | null;
  notes_not_ends_with?: string | null;
  AND?: ReservationReceiptItemScalarWhereInput[] | null;
  OR?: ReservationReceiptItemScalarWhereInput[] | null;
  NOT?: ReservationReceiptItemScalarWhereInput[] | null;
}

export interface ReservationReceiptItemUpdateDataInput {
  product?: PhysicalProductUpdateOneRequiredInput | null;
  productStatus?: PhysicalProductStatus | null;
  notes?: string | null;
}

export interface ReservationReceiptItemUpdateManyDataInput {
  productStatus?: PhysicalProductStatus | null;
  notes?: string | null;
}

export interface ReservationReceiptItemUpdateManyInput {
  create?: ReservationReceiptItemCreateInput[] | null;
  update?: ReservationReceiptItemUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: ReservationReceiptItemUpsertWithWhereUniqueNestedInput[] | null;
  delete?: ReservationReceiptItemWhereUniqueInput[] | null;
  connect?: ReservationReceiptItemWhereUniqueInput[] | null;
  set?: ReservationReceiptItemWhereUniqueInput[] | null;
  disconnect?: ReservationReceiptItemWhereUniqueInput[] | null;
  deleteMany?: ReservationReceiptItemScalarWhereInput[] | null;
  updateMany?: ReservationReceiptItemUpdateManyWithWhereNestedInput[] | null;
}

export interface ReservationReceiptItemUpdateManyWithWhereNestedInput {
  where: ReservationReceiptItemScalarWhereInput;
  data: ReservationReceiptItemUpdateManyDataInput;
}

export interface ReservationReceiptItemUpdateWithWhereUniqueNestedInput {
  where: ReservationReceiptItemWhereUniqueInput;
  data: ReservationReceiptItemUpdateDataInput;
}

export interface ReservationReceiptItemUpsertWithWhereUniqueNestedInput {
  where: ReservationReceiptItemWhereUniqueInput;
  update: ReservationReceiptItemUpdateDataInput;
  create: ReservationReceiptItemCreateInput;
}

export interface ReservationReceiptItemWhereUniqueInput {
  id?: string | null;
}

export interface ReservationReceiptUpdateOneWithoutReservationInput {
  create?: ReservationReceiptCreateWithoutReservationInput | null;
  update?: ReservationReceiptUpdateWithoutReservationDataInput | null;
  upsert?: ReservationReceiptUpsertWithoutReservationInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ReservationReceiptWhereUniqueInput | null;
}

export interface ReservationReceiptUpdateWithoutReservationDataInput {
  items?: ReservationReceiptItemUpdateManyInput | null;
}

export interface ReservationReceiptUpsertWithoutReservationInput {
  update: ReservationReceiptUpdateWithoutReservationDataInput;
  create: ReservationReceiptCreateWithoutReservationInput;
}

export interface ReservationReceiptWhereUniqueInput {
  id?: string | null;
}

export interface ReservationScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  reservationNumber?: number | null;
  reservationNumber_not?: number | null;
  reservationNumber_in?: number[] | null;
  reservationNumber_not_in?: number[] | null;
  reservationNumber_lt?: number | null;
  reservationNumber_lte?: number | null;
  reservationNumber_gt?: number | null;
  reservationNumber_gte?: number | null;
  phase?: ReservationPhase | null;
  phase_not?: ReservationPhase | null;
  phase_in?: ReservationPhase[] | null;
  phase_not_in?: ReservationPhase[] | null;
  shipped?: boolean | null;
  shipped_not?: boolean | null;
  status?: ReservationStatus | null;
  status_not?: ReservationStatus | null;
  status_in?: ReservationStatus[] | null;
  status_not_in?: ReservationStatus[] | null;
  shippedAt?: any | null;
  shippedAt_not?: any | null;
  shippedAt_in?: any[] | null;
  shippedAt_not_in?: any[] | null;
  shippedAt_lt?: any | null;
  shippedAt_lte?: any | null;
  shippedAt_gt?: any | null;
  shippedAt_gte?: any | null;
  receivedAt?: any | null;
  receivedAt_not?: any | null;
  receivedAt_in?: any[] | null;
  receivedAt_not_in?: any[] | null;
  receivedAt_lt?: any | null;
  receivedAt_lte?: any | null;
  receivedAt_gt?: any | null;
  receivedAt_gte?: any | null;
  reminderSentAt?: any | null;
  reminderSentAt_not?: any | null;
  reminderSentAt_in?: any[] | null;
  reminderSentAt_not_in?: any[] | null;
  reminderSentAt_lt?: any | null;
  reminderSentAt_lte?: any | null;
  reminderSentAt_gt?: any | null;
  reminderSentAt_gte?: any | null;
  statusUpdatedAt?: any | null;
  statusUpdatedAt_not?: any | null;
  statusUpdatedAt_in?: any[] | null;
  statusUpdatedAt_not_in?: any[] | null;
  statusUpdatedAt_lt?: any | null;
  statusUpdatedAt_lte?: any | null;
  statusUpdatedAt_gt?: any | null;
  statusUpdatedAt_gte?: any | null;
  completedAt?: any | null;
  completedAt_not?: any | null;
  completedAt_in?: any[] | null;
  completedAt_not_in?: any[] | null;
  completedAt_lt?: any | null;
  completedAt_lte?: any | null;
  completedAt_gt?: any | null;
  completedAt_gte?: any | null;
  cancelledAt?: any | null;
  cancelledAt_not?: any | null;
  cancelledAt_in?: any[] | null;
  cancelledAt_not_in?: any[] | null;
  cancelledAt_lt?: any | null;
  cancelledAt_lte?: any | null;
  cancelledAt_gt?: any | null;
  cancelledAt_gte?: any | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ReservationScalarWhereInput[] | null;
  OR?: ReservationScalarWhereInput[] | null;
  NOT?: ReservationScalarWhereInput[] | null;
}

export interface ReservationUpdateDataInput {
  user?: UserUpdateOneRequiredInput | null;
  customer?: CustomerUpdateOneRequiredWithoutReservationsInput | null;
  sentPackage?: PackageUpdateOneInput | null;
  returnedPackage?: PackageUpdateOneInput | null;
  products?: PhysicalProductUpdateManyInput | null;
  newProducts?: PhysicalProductUpdateManyInput | null;
  packageEvents?: PackageTransitEventUpdateManyWithoutReservationInput | null;
  reservationNumber?: number | null;
  phase?: ReservationPhase | null;
  shipped?: boolean | null;
  status?: ReservationStatus | null;
  shippedAt?: any | null;
  receivedAt?: any | null;
  reminderSentAt?: any | null;
  statusUpdatedAt?: any | null;
  completedAt?: any | null;
  cancelledAt?: any | null;
  receipt?: ReservationReceiptUpdateOneWithoutReservationInput | null;
  lastLocation?: LocationUpdateOneInput | null;
  shippingOption?: ShippingOptionUpdateOneInput | null;
}

export interface ReservationUpdateManyDataInput {
  reservationNumber?: number | null;
  phase?: ReservationPhase | null;
  shipped?: boolean | null;
  status?: ReservationStatus | null;
  shippedAt?: any | null;
  receivedAt?: any | null;
  reminderSentAt?: any | null;
  statusUpdatedAt?: any | null;
  completedAt?: any | null;
  cancelledAt?: any | null;
}

export interface ReservationUpdateManyWithWhereNestedInput {
  where: ReservationScalarWhereInput;
  data: ReservationUpdateManyDataInput;
}

export interface ReservationUpdateManyWithoutCustomerInput {
  create?: ReservationCreateWithoutCustomerInput[] | null;
  delete?: ReservationWhereUniqueInput[] | null;
  connect?: ReservationWhereUniqueInput[] | null;
  set?: ReservationWhereUniqueInput[] | null;
  disconnect?: ReservationWhereUniqueInput[] | null;
  update?: ReservationUpdateWithWhereUniqueWithoutCustomerInput[] | null;
  upsert?: ReservationUpsertWithWhereUniqueWithoutCustomerInput[] | null;
  deleteMany?: ReservationScalarWhereInput[] | null;
  updateMany?: ReservationUpdateManyWithWhereNestedInput[] | null;
}

export interface ReservationUpdateOneRequiredInput {
  create?: ReservationCreateInput | null;
  update?: ReservationUpdateDataInput | null;
  upsert?: ReservationUpsertNestedInput | null;
  connect?: ReservationWhereUniqueInput | null;
}

export interface ReservationUpdateOneWithoutPackageEventsInput {
  create?: ReservationCreateWithoutPackageEventsInput | null;
  update?: ReservationUpdateWithoutPackageEventsDataInput | null;
  upsert?: ReservationUpsertWithoutPackageEventsInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ReservationWhereUniqueInput | null;
}

export interface ReservationUpdateWithWhereUniqueWithoutCustomerInput {
  where: ReservationWhereUniqueInput;
  data: ReservationUpdateWithoutCustomerDataInput;
}

export interface ReservationUpdateWithoutCustomerDataInput {
  user?: UserUpdateOneRequiredInput | null;
  sentPackage?: PackageUpdateOneInput | null;
  returnedPackage?: PackageUpdateOneInput | null;
  products?: PhysicalProductUpdateManyInput | null;
  newProducts?: PhysicalProductUpdateManyInput | null;
  packageEvents?: PackageTransitEventUpdateManyWithoutReservationInput | null;
  reservationNumber?: number | null;
  phase?: ReservationPhase | null;
  shipped?: boolean | null;
  status?: ReservationStatus | null;
  shippedAt?: any | null;
  receivedAt?: any | null;
  reminderSentAt?: any | null;
  statusUpdatedAt?: any | null;
  completedAt?: any | null;
  cancelledAt?: any | null;
  receipt?: ReservationReceiptUpdateOneWithoutReservationInput | null;
  lastLocation?: LocationUpdateOneInput | null;
  shippingOption?: ShippingOptionUpdateOneInput | null;
}

export interface ReservationUpdateWithoutPackageEventsDataInput {
  user?: UserUpdateOneRequiredInput | null;
  customer?: CustomerUpdateOneRequiredWithoutReservationsInput | null;
  sentPackage?: PackageUpdateOneInput | null;
  returnedPackage?: PackageUpdateOneInput | null;
  products?: PhysicalProductUpdateManyInput | null;
  newProducts?: PhysicalProductUpdateManyInput | null;
  reservationNumber?: number | null;
  phase?: ReservationPhase | null;
  shipped?: boolean | null;
  status?: ReservationStatus | null;
  shippedAt?: any | null;
  receivedAt?: any | null;
  reminderSentAt?: any | null;
  statusUpdatedAt?: any | null;
  completedAt?: any | null;
  cancelledAt?: any | null;
  receipt?: ReservationReceiptUpdateOneWithoutReservationInput | null;
  lastLocation?: LocationUpdateOneInput | null;
  shippingOption?: ShippingOptionUpdateOneInput | null;
}

export interface ReservationUpsertNestedInput {
  update: ReservationUpdateDataInput;
  create: ReservationCreateInput;
}

export interface ReservationUpsertWithWhereUniqueWithoutCustomerInput {
  where: ReservationWhereUniqueInput;
  update: ReservationUpdateWithoutCustomerDataInput;
  create: ReservationCreateWithoutCustomerInput;
}

export interface ReservationUpsertWithoutPackageEventsInput {
  update: ReservationUpdateWithoutPackageEventsDataInput;
  create: ReservationCreateWithoutPackageEventsInput;
}

export interface ReservationWhereUniqueInput {
  id?: string | null;
  reservationNumber?: number | null;
}

export interface ReserveItemsOptions {
  dryRun?: boolean | null;
}

export interface SeasonCreateInput {
  id?: string | null;
  year?: number | null;
  seasonCode?: SeasonCode | null;
}

export interface SeasonCreateOneInput {
  create?: SeasonCreateInput | null;
  connect?: SeasonWhereUniqueInput | null;
}

export interface SeasonUpdateDataInput {
  year?: number | null;
  seasonCode?: SeasonCode | null;
}

export interface SeasonUpdateOneInput {
  create?: SeasonCreateInput | null;
  update?: SeasonUpdateDataInput | null;
  upsert?: SeasonUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: SeasonWhereUniqueInput | null;
}

export interface SeasonUpsertNestedInput {
  update: SeasonUpdateDataInput;
  create: SeasonCreateInput;
}

export interface SeasonWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  year?: number | null;
  year_not?: number | null;
  year_in?: number[] | null;
  year_not_in?: number[] | null;
  year_lt?: number | null;
  year_lte?: number | null;
  year_gt?: number | null;
  year_gte?: number | null;
  seasonCode?: SeasonCode | null;
  seasonCode_not?: SeasonCode | null;
  seasonCode_in?: SeasonCode[] | null;
  seasonCode_not_in?: SeasonCode[] | null;
  AND?: SeasonWhereInput[] | null;
  OR?: SeasonWhereInput[] | null;
  NOT?: SeasonWhereInput[] | null;
}

export interface SeasonWhereUniqueInput {
  id?: string | null;
}

export interface ShippingMethodCreateInput {
  id?: string | null;
  code: ShippingCode;
  displayText: string;
}

export interface ShippingMethodCreateOneInput {
  create?: ShippingMethodCreateInput | null;
  connect?: ShippingMethodWhereUniqueInput | null;
}

export interface ShippingMethodUpdateDataInput {
  code?: ShippingCode | null;
  displayText?: string | null;
}

export interface ShippingMethodUpdateOneInput {
  create?: ShippingMethodCreateInput | null;
  update?: ShippingMethodUpdateDataInput | null;
  upsert?: ShippingMethodUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ShippingMethodWhereUniqueInput | null;
}

export interface ShippingMethodUpsertNestedInput {
  update: ShippingMethodUpdateDataInput;
  create: ShippingMethodCreateInput;
}

export interface ShippingMethodWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  code?: ShippingCode | null;
  code_not?: ShippingCode | null;
  code_in?: ShippingCode[] | null;
  code_not_in?: ShippingCode[] | null;
  displayText?: string | null;
  displayText_not?: string | null;
  displayText_in?: string[] | null;
  displayText_not_in?: string[] | null;
  displayText_lt?: string | null;
  displayText_lte?: string | null;
  displayText_gt?: string | null;
  displayText_gte?: string | null;
  displayText_contains?: string | null;
  displayText_not_contains?: string | null;
  displayText_starts_with?: string | null;
  displayText_not_starts_with?: string | null;
  displayText_ends_with?: string | null;
  displayText_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ShippingMethodWhereInput[] | null;
  OR?: ShippingMethodWhereInput[] | null;
  NOT?: ShippingMethodWhereInput[] | null;
}

export interface ShippingMethodWhereUniqueInput {
  id?: string | null;
}

export interface ShippingOptionCreateInput {
  id?: string | null;
  origin?: LocationCreateOneInput | null;
  destination?: LocationCreateOneWithoutShippingOptionsInput | null;
  shippingMethod?: ShippingMethodCreateOneInput | null;
  externalCost?: number | null;
  averageDuration?: number | null;
}

export interface ShippingOptionCreateManyWithoutDestinationInput {
  create?: ShippingOptionCreateWithoutDestinationInput[] | null;
  connect?: ShippingOptionWhereUniqueInput[] | null;
}

export interface ShippingOptionCreateOneInput {
  create?: ShippingOptionCreateInput | null;
  connect?: ShippingOptionWhereUniqueInput | null;
}

export interface ShippingOptionCreateWithoutDestinationInput {
  id?: string | null;
  origin?: LocationCreateOneInput | null;
  shippingMethod?: ShippingMethodCreateOneInput | null;
  externalCost?: number | null;
  averageDuration?: number | null;
}

export interface ShippingOptionScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  externalCost?: number | null;
  externalCost_not?: number | null;
  externalCost_in?: number[] | null;
  externalCost_not_in?: number[] | null;
  externalCost_lt?: number | null;
  externalCost_lte?: number | null;
  externalCost_gt?: number | null;
  externalCost_gte?: number | null;
  averageDuration?: number | null;
  averageDuration_not?: number | null;
  averageDuration_in?: number[] | null;
  averageDuration_not_in?: number[] | null;
  averageDuration_lt?: number | null;
  averageDuration_lte?: number | null;
  averageDuration_gt?: number | null;
  averageDuration_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ShippingOptionScalarWhereInput[] | null;
  OR?: ShippingOptionScalarWhereInput[] | null;
  NOT?: ShippingOptionScalarWhereInput[] | null;
}

export interface ShippingOptionUpdateDataInput {
  origin?: LocationUpdateOneInput | null;
  destination?: LocationUpdateOneWithoutShippingOptionsInput | null;
  shippingMethod?: ShippingMethodUpdateOneInput | null;
  externalCost?: number | null;
  averageDuration?: number | null;
}

export interface ShippingOptionUpdateManyDataInput {
  externalCost?: number | null;
  averageDuration?: number | null;
}

export interface ShippingOptionUpdateManyWithWhereNestedInput {
  where: ShippingOptionScalarWhereInput;
  data: ShippingOptionUpdateManyDataInput;
}

export interface ShippingOptionUpdateManyWithoutDestinationInput {
  create?: ShippingOptionCreateWithoutDestinationInput[] | null;
  delete?: ShippingOptionWhereUniqueInput[] | null;
  connect?: ShippingOptionWhereUniqueInput[] | null;
  set?: ShippingOptionWhereUniqueInput[] | null;
  disconnect?: ShippingOptionWhereUniqueInput[] | null;
  update?: ShippingOptionUpdateWithWhereUniqueWithoutDestinationInput[] | null;
  upsert?: ShippingOptionUpsertWithWhereUniqueWithoutDestinationInput[] | null;
  deleteMany?: ShippingOptionScalarWhereInput[] | null;
  updateMany?: ShippingOptionUpdateManyWithWhereNestedInput[] | null;
}

export interface ShippingOptionUpdateOneInput {
  create?: ShippingOptionCreateInput | null;
  update?: ShippingOptionUpdateDataInput | null;
  upsert?: ShippingOptionUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ShippingOptionWhereUniqueInput | null;
}

export interface ShippingOptionUpdateWithWhereUniqueWithoutDestinationInput {
  where: ShippingOptionWhereUniqueInput;
  data: ShippingOptionUpdateWithoutDestinationDataInput;
}

export interface ShippingOptionUpdateWithoutDestinationDataInput {
  origin?: LocationUpdateOneInput | null;
  shippingMethod?: ShippingMethodUpdateOneInput | null;
  externalCost?: number | null;
  averageDuration?: number | null;
}

export interface ShippingOptionUpsertNestedInput {
  update: ShippingOptionUpdateDataInput;
  create: ShippingOptionCreateInput;
}

export interface ShippingOptionUpsertWithWhereUniqueWithoutDestinationInput {
  where: ShippingOptionWhereUniqueInput;
  update: ShippingOptionUpdateWithoutDestinationDataInput;
  create: ShippingOptionCreateWithoutDestinationInput;
}

export interface ShippingOptionWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  origin?: LocationWhereInput | null;
  destination?: LocationWhereInput | null;
  shippingMethod?: ShippingMethodWhereInput | null;
  externalCost?: number | null;
  externalCost_not?: number | null;
  externalCost_in?: number[] | null;
  externalCost_not_in?: number[] | null;
  externalCost_lt?: number | null;
  externalCost_lte?: number | null;
  externalCost_gt?: number | null;
  externalCost_gte?: number | null;
  averageDuration?: number | null;
  averageDuration_not?: number | null;
  averageDuration_in?: number[] | null;
  averageDuration_not_in?: number[] | null;
  averageDuration_lt?: number | null;
  averageDuration_lte?: number | null;
  averageDuration_gt?: number | null;
  averageDuration_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ShippingOptionWhereInput[] | null;
  OR?: ShippingOptionWhereInput[] | null;
  NOT?: ShippingOptionWhereInput[] | null;
}

export interface ShippingOptionWhereUniqueInput {
  id?: string | null;
}

export interface ShopifyProductVariantCreateOneWithoutProductVariantInput {
  create?: ShopifyProductVariantCreateWithoutProductVariantInput | null;
  connect?: ShopifyProductVariantWhereUniqueInput | null;
}

export interface ShopifyProductVariantCreateWithoutProductVariantInput {
  id?: string | null;
  externalId?: string | null;
  displayName?: string | null;
  selectedOptions?: ShopifyProductVariantSelectedOptionCreateManyInput | null;
  shop?: ShopifyShopCreateOneInput | null;
  brand?: BrandCreateOneInput | null;
  title?: string | null;
  image?: ImageCreateOneInput | null;
  cachedPrice?: number | null;
  cachedAvailableForSale?: boolean | null;
  cacheExpiresAt?: any | null;
}

export interface ShopifyProductVariantSelectedOptionCreateInput {
  id?: string | null;
  name: string;
  value: string;
}

export interface ShopifyProductVariantSelectedOptionCreateManyInput {
  create?: ShopifyProductVariantSelectedOptionCreateInput[] | null;
  connect?: ShopifyProductVariantSelectedOptionWhereUniqueInput[] | null;
}

export interface ShopifyProductVariantSelectedOptionScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  value?: string | null;
  value_not?: string | null;
  value_in?: string[] | null;
  value_not_in?: string[] | null;
  value_lt?: string | null;
  value_lte?: string | null;
  value_gt?: string | null;
  value_gte?: string | null;
  value_contains?: string | null;
  value_not_contains?: string | null;
  value_starts_with?: string | null;
  value_not_starts_with?: string | null;
  value_ends_with?: string | null;
  value_not_ends_with?: string | null;
  AND?: ShopifyProductVariantSelectedOptionScalarWhereInput[] | null;
  OR?: ShopifyProductVariantSelectedOptionScalarWhereInput[] | null;
  NOT?: ShopifyProductVariantSelectedOptionScalarWhereInput[] | null;
}

export interface ShopifyProductVariantSelectedOptionUpdateDataInput {
  name?: string | null;
  value?: string | null;
}

export interface ShopifyProductVariantSelectedOptionUpdateManyDataInput {
  name?: string | null;
  value?: string | null;
}

export interface ShopifyProductVariantSelectedOptionUpdateManyInput {
  create?: ShopifyProductVariantSelectedOptionCreateInput[] | null;
  update?: ShopifyProductVariantSelectedOptionUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: ShopifyProductVariantSelectedOptionUpsertWithWhereUniqueNestedInput[] | null;
  delete?: ShopifyProductVariantSelectedOptionWhereUniqueInput[] | null;
  connect?: ShopifyProductVariantSelectedOptionWhereUniqueInput[] | null;
  set?: ShopifyProductVariantSelectedOptionWhereUniqueInput[] | null;
  disconnect?: ShopifyProductVariantSelectedOptionWhereUniqueInput[] | null;
  deleteMany?: ShopifyProductVariantSelectedOptionScalarWhereInput[] | null;
  updateMany?: ShopifyProductVariantSelectedOptionUpdateManyWithWhereNestedInput[] | null;
}

export interface ShopifyProductVariantSelectedOptionUpdateManyWithWhereNestedInput {
  where: ShopifyProductVariantSelectedOptionScalarWhereInput;
  data: ShopifyProductVariantSelectedOptionUpdateManyDataInput;
}

export interface ShopifyProductVariantSelectedOptionUpdateWithWhereUniqueNestedInput {
  where: ShopifyProductVariantSelectedOptionWhereUniqueInput;
  data: ShopifyProductVariantSelectedOptionUpdateDataInput;
}

export interface ShopifyProductVariantSelectedOptionUpsertWithWhereUniqueNestedInput {
  where: ShopifyProductVariantSelectedOptionWhereUniqueInput;
  update: ShopifyProductVariantSelectedOptionUpdateDataInput;
  create: ShopifyProductVariantSelectedOptionCreateInput;
}

export interface ShopifyProductVariantSelectedOptionWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  value?: string | null;
  value_not?: string | null;
  value_in?: string[] | null;
  value_not_in?: string[] | null;
  value_lt?: string | null;
  value_lte?: string | null;
  value_gt?: string | null;
  value_gte?: string | null;
  value_contains?: string | null;
  value_not_contains?: string | null;
  value_starts_with?: string | null;
  value_not_starts_with?: string | null;
  value_ends_with?: string | null;
  value_not_ends_with?: string | null;
  AND?: ShopifyProductVariantSelectedOptionWhereInput[] | null;
  OR?: ShopifyProductVariantSelectedOptionWhereInput[] | null;
  NOT?: ShopifyProductVariantSelectedOptionWhereInput[] | null;
}

export interface ShopifyProductVariantSelectedOptionWhereUniqueInput {
  id?: string | null;
}

export interface ShopifyProductVariantUpdateOneWithoutProductVariantInput {
  create?: ShopifyProductVariantCreateWithoutProductVariantInput | null;
  update?: ShopifyProductVariantUpdateWithoutProductVariantDataInput | null;
  upsert?: ShopifyProductVariantUpsertWithoutProductVariantInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ShopifyProductVariantWhereUniqueInput | null;
}

export interface ShopifyProductVariantUpdateWithoutProductVariantDataInput {
  externalId?: string | null;
  displayName?: string | null;
  selectedOptions?: ShopifyProductVariantSelectedOptionUpdateManyInput | null;
  shop?: ShopifyShopUpdateOneInput | null;
  brand?: BrandUpdateOneInput | null;
  title?: string | null;
  image?: ImageUpdateOneInput | null;
  cachedPrice?: number | null;
  cachedAvailableForSale?: boolean | null;
  cacheExpiresAt?: any | null;
}

export interface ShopifyProductVariantUpsertWithoutProductVariantInput {
  update: ShopifyProductVariantUpdateWithoutProductVariantDataInput;
  create: ShopifyProductVariantCreateWithoutProductVariantInput;
}

export interface ShopifyProductVariantWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  externalId?: string | null;
  externalId_not?: string | null;
  externalId_in?: string[] | null;
  externalId_not_in?: string[] | null;
  externalId_lt?: string | null;
  externalId_lte?: string | null;
  externalId_gt?: string | null;
  externalId_gte?: string | null;
  externalId_contains?: string | null;
  externalId_not_contains?: string | null;
  externalId_starts_with?: string | null;
  externalId_not_starts_with?: string | null;
  externalId_ends_with?: string | null;
  externalId_not_ends_with?: string | null;
  displayName?: string | null;
  displayName_not?: string | null;
  displayName_in?: string[] | null;
  displayName_not_in?: string[] | null;
  displayName_lt?: string | null;
  displayName_lte?: string | null;
  displayName_gt?: string | null;
  displayName_gte?: string | null;
  displayName_contains?: string | null;
  displayName_not_contains?: string | null;
  displayName_starts_with?: string | null;
  displayName_not_starts_with?: string | null;
  displayName_ends_with?: string | null;
  displayName_not_ends_with?: string | null;
  selectedOptions_every?: ShopifyProductVariantSelectedOptionWhereInput | null;
  selectedOptions_some?: ShopifyProductVariantSelectedOptionWhereInput | null;
  selectedOptions_none?: ShopifyProductVariantSelectedOptionWhereInput | null;
  productVariant?: ProductVariantWhereInput | null;
  shop?: ShopifyShopWhereInput | null;
  brand?: BrandWhereInput | null;
  title?: string | null;
  title_not?: string | null;
  title_in?: string[] | null;
  title_not_in?: string[] | null;
  title_lt?: string | null;
  title_lte?: string | null;
  title_gt?: string | null;
  title_gte?: string | null;
  title_contains?: string | null;
  title_not_contains?: string | null;
  title_starts_with?: string | null;
  title_not_starts_with?: string | null;
  title_ends_with?: string | null;
  title_not_ends_with?: string | null;
  image?: ImageWhereInput | null;
  cachedPrice?: number | null;
  cachedPrice_not?: number | null;
  cachedPrice_in?: number[] | null;
  cachedPrice_not_in?: number[] | null;
  cachedPrice_lt?: number | null;
  cachedPrice_lte?: number | null;
  cachedPrice_gt?: number | null;
  cachedPrice_gte?: number | null;
  cachedAvailableForSale?: boolean | null;
  cachedAvailableForSale_not?: boolean | null;
  cacheExpiresAt?: any | null;
  cacheExpiresAt_not?: any | null;
  cacheExpiresAt_in?: any[] | null;
  cacheExpiresAt_not_in?: any[] | null;
  cacheExpiresAt_lt?: any | null;
  cacheExpiresAt_lte?: any | null;
  cacheExpiresAt_gt?: any | null;
  cacheExpiresAt_gte?: any | null;
  AND?: ShopifyProductVariantWhereInput[] | null;
  OR?: ShopifyProductVariantWhereInput[] | null;
  NOT?: ShopifyProductVariantWhereInput[] | null;
}

export interface ShopifyProductVariantWhereUniqueInput {
  id?: string | null;
  externalId?: string | null;
}

export interface ShopifyShopCreateInput {
  id?: string | null;
  shopName: string;
  enabled: boolean;
  accessToken?: string | null;
  scope?: ShopifyShopCreatescopeInput | null;
}

export interface ShopifyShopCreateOneInput {
  create?: ShopifyShopCreateInput | null;
  connect?: ShopifyShopWhereUniqueInput | null;
}

export interface ShopifyShopCreatescopeInput {
  set?: string[] | null;
}

export interface ShopifyShopUpdateDataInput {
  shopName?: string | null;
  enabled?: boolean | null;
  accessToken?: string | null;
  scope?: ShopifyShopUpdatescopeInput | null;
}

export interface ShopifyShopUpdateOneInput {
  create?: ShopifyShopCreateInput | null;
  update?: ShopifyShopUpdateDataInput | null;
  upsert?: ShopifyShopUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: ShopifyShopWhereUniqueInput | null;
}

export interface ShopifyShopUpdatescopeInput {
  set?: string[] | null;
}

export interface ShopifyShopUpsertNestedInput {
  update: ShopifyShopUpdateDataInput;
  create: ShopifyShopCreateInput;
}

export interface ShopifyShopWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  shopName?: string | null;
  shopName_not?: string | null;
  shopName_in?: string[] | null;
  shopName_not_in?: string[] | null;
  shopName_lt?: string | null;
  shopName_lte?: string | null;
  shopName_gt?: string | null;
  shopName_gte?: string | null;
  shopName_contains?: string | null;
  shopName_not_contains?: string | null;
  shopName_starts_with?: string | null;
  shopName_not_starts_with?: string | null;
  shopName_ends_with?: string | null;
  shopName_not_ends_with?: string | null;
  enabled?: boolean | null;
  enabled_not?: boolean | null;
  accessToken?: string | null;
  accessToken_not?: string | null;
  accessToken_in?: string[] | null;
  accessToken_not_in?: string[] | null;
  accessToken_lt?: string | null;
  accessToken_lte?: string | null;
  accessToken_gt?: string | null;
  accessToken_gte?: string | null;
  accessToken_contains?: string | null;
  accessToken_not_contains?: string | null;
  accessToken_starts_with?: string | null;
  accessToken_not_starts_with?: string | null;
  accessToken_ends_with?: string | null;
  accessToken_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ShopifyShopWhereInput[] | null;
  OR?: ShopifyShopWhereInput[] | null;
  NOT?: ShopifyShopWhereInput[] | null;
}

export interface ShopifyShopWhereUniqueInput {
  id?: string | null;
  shopName?: string | null;
}

export interface SizeCreateInput {
  id?: string | null;
  slug: string;
  productType?: ProductType | null;
  top?: TopSizeCreateOneInput | null;
  bottom?: BottomSizeCreateOneInput | null;
  display: string;
  type?: SizeType | null;
}

export interface SizeCreateManyInput {
  create?: SizeCreateInput[] | null;
  connect?: SizeWhereUniqueInput[] | null;
}

export interface SizeCreateOneInput {
  create?: SizeCreateInput | null;
  connect?: SizeWhereUniqueInput | null;
}

export interface SizeScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  productType?: ProductType | null;
  productType_not?: ProductType | null;
  productType_in?: ProductType[] | null;
  productType_not_in?: ProductType[] | null;
  display?: string | null;
  display_not?: string | null;
  display_in?: string[] | null;
  display_not_in?: string[] | null;
  display_lt?: string | null;
  display_lte?: string | null;
  display_gt?: string | null;
  display_gte?: string | null;
  display_contains?: string | null;
  display_not_contains?: string | null;
  display_starts_with?: string | null;
  display_not_starts_with?: string | null;
  display_ends_with?: string | null;
  display_not_ends_with?: string | null;
  type?: SizeType | null;
  type_not?: SizeType | null;
  type_in?: SizeType[] | null;
  type_not_in?: SizeType[] | null;
  AND?: SizeScalarWhereInput[] | null;
  OR?: SizeScalarWhereInput[] | null;
  NOT?: SizeScalarWhereInput[] | null;
}

export interface SizeUpdateDataInput {
  slug?: string | null;
  productType?: ProductType | null;
  top?: TopSizeUpdateOneInput | null;
  bottom?: BottomSizeUpdateOneInput | null;
  display?: string | null;
  type?: SizeType | null;
}

export interface SizeUpdateManyDataInput {
  slug?: string | null;
  productType?: ProductType | null;
  display?: string | null;
  type?: SizeType | null;
}

export interface SizeUpdateManyInput {
  create?: SizeCreateInput[] | null;
  update?: SizeUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: SizeUpsertWithWhereUniqueNestedInput[] | null;
  delete?: SizeWhereUniqueInput[] | null;
  connect?: SizeWhereUniqueInput[] | null;
  set?: SizeWhereUniqueInput[] | null;
  disconnect?: SizeWhereUniqueInput[] | null;
  deleteMany?: SizeScalarWhereInput[] | null;
  updateMany?: SizeUpdateManyWithWhereNestedInput[] | null;
}

export interface SizeUpdateManyWithWhereNestedInput {
  where: SizeScalarWhereInput;
  data: SizeUpdateManyDataInput;
}

export interface SizeUpdateOneInput {
  create?: SizeCreateInput | null;
  update?: SizeUpdateDataInput | null;
  upsert?: SizeUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: SizeWhereUniqueInput | null;
}

export interface SizeUpdateWithWhereUniqueNestedInput {
  where: SizeWhereUniqueInput;
  data: SizeUpdateDataInput;
}

export interface SizeUpsertNestedInput {
  update: SizeUpdateDataInput;
  create: SizeCreateInput;
}

export interface SizeUpsertWithWhereUniqueNestedInput {
  where: SizeWhereUniqueInput;
  update: SizeUpdateDataInput;
  create: SizeCreateInput;
}

export interface SizeWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_lt?: string | null;
  slug_lte?: string | null;
  slug_gt?: string | null;
  slug_gte?: string | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  productType?: ProductType | null;
  productType_not?: ProductType | null;
  productType_in?: ProductType[] | null;
  productType_not_in?: ProductType[] | null;
  top?: TopSizeWhereInput | null;
  bottom?: BottomSizeWhereInput | null;
  display?: string | null;
  display_not?: string | null;
  display_in?: string[] | null;
  display_not_in?: string[] | null;
  display_lt?: string | null;
  display_lte?: string | null;
  display_gt?: string | null;
  display_gte?: string | null;
  display_contains?: string | null;
  display_not_contains?: string | null;
  display_starts_with?: string | null;
  display_not_starts_with?: string | null;
  display_ends_with?: string | null;
  display_not_ends_with?: string | null;
  type?: SizeType | null;
  type_not?: SizeType | null;
  type_in?: SizeType[] | null;
  type_not_in?: SizeType[] | null;
  AND?: SizeWhereInput[] | null;
  OR?: SizeWhereInput[] | null;
  NOT?: SizeWhereInput[] | null;
}

export interface SizeWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
}

export interface SmsReceiptCreateInput {
  id?: string | null;
  externalId?: string | null;
  body: string;
  mediaUrls?: SmsReceiptCreatemediaUrlsInput | null;
  status: SmsStatus;
  smsId?: string | null;
}

export interface SmsReceiptCreateManyInput {
  create?: SmsReceiptCreateInput[] | null;
  connect?: SmsReceiptWhereUniqueInput[] | null;
}

export interface SmsReceiptCreatemediaUrlsInput {
  set?: string[] | null;
}

export interface SmsReceiptScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  externalId?: string | null;
  externalId_not?: string | null;
  externalId_in?: string[] | null;
  externalId_not_in?: string[] | null;
  externalId_lt?: string | null;
  externalId_lte?: string | null;
  externalId_gt?: string | null;
  externalId_gte?: string | null;
  externalId_contains?: string | null;
  externalId_not_contains?: string | null;
  externalId_starts_with?: string | null;
  externalId_not_starts_with?: string | null;
  externalId_ends_with?: string | null;
  externalId_not_ends_with?: string | null;
  body?: string | null;
  body_not?: string | null;
  body_in?: string[] | null;
  body_not_in?: string[] | null;
  body_lt?: string | null;
  body_lte?: string | null;
  body_gt?: string | null;
  body_gte?: string | null;
  body_contains?: string | null;
  body_not_contains?: string | null;
  body_starts_with?: string | null;
  body_not_starts_with?: string | null;
  body_ends_with?: string | null;
  body_not_ends_with?: string | null;
  status?: SmsStatus | null;
  status_not?: SmsStatus | null;
  status_in?: SmsStatus[] | null;
  status_not_in?: SmsStatus[] | null;
  smsId?: string | null;
  smsId_not?: string | null;
  smsId_in?: string[] | null;
  smsId_not_in?: string[] | null;
  smsId_lt?: string | null;
  smsId_lte?: string | null;
  smsId_gt?: string | null;
  smsId_gte?: string | null;
  smsId_contains?: string | null;
  smsId_not_contains?: string | null;
  smsId_starts_with?: string | null;
  smsId_not_starts_with?: string | null;
  smsId_ends_with?: string | null;
  smsId_not_ends_with?: string | null;
  sentAt?: any | null;
  sentAt_not?: any | null;
  sentAt_in?: any[] | null;
  sentAt_not_in?: any[] | null;
  sentAt_lt?: any | null;
  sentAt_lte?: any | null;
  sentAt_gt?: any | null;
  sentAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: SmsReceiptScalarWhereInput[] | null;
  OR?: SmsReceiptScalarWhereInput[] | null;
  NOT?: SmsReceiptScalarWhereInput[] | null;
}

export interface SmsReceiptUpdateDataInput {
  externalId?: string | null;
  body?: string | null;
  mediaUrls?: SmsReceiptUpdatemediaUrlsInput | null;
  status?: SmsStatus | null;
  smsId?: string | null;
}

export interface SmsReceiptUpdateManyDataInput {
  externalId?: string | null;
  body?: string | null;
  mediaUrls?: SmsReceiptUpdatemediaUrlsInput | null;
  status?: SmsStatus | null;
  smsId?: string | null;
}

export interface SmsReceiptUpdateManyInput {
  create?: SmsReceiptCreateInput[] | null;
  update?: SmsReceiptUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: SmsReceiptUpsertWithWhereUniqueNestedInput[] | null;
  delete?: SmsReceiptWhereUniqueInput[] | null;
  connect?: SmsReceiptWhereUniqueInput[] | null;
  set?: SmsReceiptWhereUniqueInput[] | null;
  disconnect?: SmsReceiptWhereUniqueInput[] | null;
  deleteMany?: SmsReceiptScalarWhereInput[] | null;
  updateMany?: SmsReceiptUpdateManyWithWhereNestedInput[] | null;
}

export interface SmsReceiptUpdateManyWithWhereNestedInput {
  where: SmsReceiptScalarWhereInput;
  data: SmsReceiptUpdateManyDataInput;
}

export interface SmsReceiptUpdateWithWhereUniqueNestedInput {
  where: SmsReceiptWhereUniqueInput;
  data: SmsReceiptUpdateDataInput;
}

export interface SmsReceiptUpdatemediaUrlsInput {
  set?: string[] | null;
}

export interface SmsReceiptUpsertWithWhereUniqueNestedInput {
  where: SmsReceiptWhereUniqueInput;
  update: SmsReceiptUpdateDataInput;
  create: SmsReceiptCreateInput;
}

export interface SmsReceiptWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  externalId?: string | null;
  externalId_not?: string | null;
  externalId_in?: string[] | null;
  externalId_not_in?: string[] | null;
  externalId_lt?: string | null;
  externalId_lte?: string | null;
  externalId_gt?: string | null;
  externalId_gte?: string | null;
  externalId_contains?: string | null;
  externalId_not_contains?: string | null;
  externalId_starts_with?: string | null;
  externalId_not_starts_with?: string | null;
  externalId_ends_with?: string | null;
  externalId_not_ends_with?: string | null;
  body?: string | null;
  body_not?: string | null;
  body_in?: string[] | null;
  body_not_in?: string[] | null;
  body_lt?: string | null;
  body_lte?: string | null;
  body_gt?: string | null;
  body_gte?: string | null;
  body_contains?: string | null;
  body_not_contains?: string | null;
  body_starts_with?: string | null;
  body_not_starts_with?: string | null;
  body_ends_with?: string | null;
  body_not_ends_with?: string | null;
  status?: SmsStatus | null;
  status_not?: SmsStatus | null;
  status_in?: SmsStatus[] | null;
  status_not_in?: SmsStatus[] | null;
  smsId?: string | null;
  smsId_not?: string | null;
  smsId_in?: string[] | null;
  smsId_not_in?: string[] | null;
  smsId_lt?: string | null;
  smsId_lte?: string | null;
  smsId_gt?: string | null;
  smsId_gte?: string | null;
  smsId_contains?: string | null;
  smsId_not_contains?: string | null;
  smsId_starts_with?: string | null;
  smsId_not_starts_with?: string | null;
  smsId_ends_with?: string | null;
  smsId_not_ends_with?: string | null;
  sentAt?: any | null;
  sentAt_not?: any | null;
  sentAt_in?: any[] | null;
  sentAt_not_in?: any[] | null;
  sentAt_lt?: any | null;
  sentAt_lte?: any | null;
  sentAt_gt?: any | null;
  sentAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: SmsReceiptWhereInput[] | null;
  OR?: SmsReceiptWhereInput[] | null;
  NOT?: SmsReceiptWhereInput[] | null;
}

export interface SmsReceiptWhereUniqueInput {
  id?: string | null;
}

export interface StripeContact {
  ISOCountryCode: string;
  city: string;
  country: string;
  name: string;
  postalCode?: string | null;
  state?: string | null;
  street?: string | null;
  supplementarySubLocality?: string | null;
}

export interface StripeToken {
  card: StripeTokenCard;
  created: number;
  extra?: StripeTokenExtra | null;
  livemode: boolean;
  tokenId: string;
}

export interface StripeTokenCard {
  addressCity?: string | null;
  addressCountry?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressState?: string | null;
  addressZip?: string | null;
  brand?: string | null;
  cardId?: string | null;
  country?: string | null;
  dynamicLast4?: string | null;
  expMonth?: number | null;
  expYear?: number | null;
  funding?: string | null;
  isApplePayCard?: boolean | null;
  last4?: string | null;
  name?: string | null;
}

export interface StripeTokenExtra {
  billingContact?: StripeContact | null;
  shippingContact?: StripeContact | null;
  shippingMethod?: string | null;
}

export interface StylePreferencesCreateInput {
  id?: string | null;
  styles?: StylePreferencesCreatestylesInput | null;
  patterns?: StylePreferencesCreatepatternsInput | null;
  colors?: StylePreferencesCreatecolorsInput | null;
  brands?: StylePreferencesCreatebrandsInput | null;
}

export interface StylePreferencesCreateOneInput {
  create?: StylePreferencesCreateInput | null;
  connect?: StylePreferencesWhereUniqueInput | null;
}

export interface StylePreferencesCreatebrandsInput {
  set?: string[] | null;
}

export interface StylePreferencesCreatecolorsInput {
  set?: string[] | null;
}

export interface StylePreferencesCreatepatternsInput {
  set?: string[] | null;
}

export interface StylePreferencesCreatestylesInput {
  set?: string[] | null;
}

export interface StylePreferencesUpdateDataInput {
  styles?: StylePreferencesUpdatestylesInput | null;
  patterns?: StylePreferencesUpdatepatternsInput | null;
  colors?: StylePreferencesUpdatecolorsInput | null;
  brands?: StylePreferencesUpdatebrandsInput | null;
}

export interface StylePreferencesUpdateOneInput {
  create?: StylePreferencesCreateInput | null;
  update?: StylePreferencesUpdateDataInput | null;
  upsert?: StylePreferencesUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: StylePreferencesWhereUniqueInput | null;
}

export interface StylePreferencesUpdatebrandsInput {
  set?: string[] | null;
}

export interface StylePreferencesUpdatecolorsInput {
  set?: string[] | null;
}

export interface StylePreferencesUpdatepatternsInput {
  set?: string[] | null;
}

export interface StylePreferencesUpdatestylesInput {
  set?: string[] | null;
}

export interface StylePreferencesUpsertNestedInput {
  update: StylePreferencesUpdateDataInput;
  create: StylePreferencesCreateInput;
}

export interface StylePreferencesWhereUniqueInput {
  id?: string | null;
}

export interface SubmitOrderInput {
  orderID: string;
}

export interface SyncTimingCreateInput {
  id?: string | null;
  type: SyncTimingType;
  syncedAt: any;
  detail?: string | null;
}

export interface SyncTimingCreateManyInput {
  create?: SyncTimingCreateInput[] | null;
  connect?: SyncTimingWhereUniqueInput[] | null;
}

export interface SyncTimingScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  type?: SyncTimingType | null;
  type_not?: SyncTimingType | null;
  type_in?: SyncTimingType[] | null;
  type_not_in?: SyncTimingType[] | null;
  syncedAt?: any | null;
  syncedAt_not?: any | null;
  syncedAt_in?: any[] | null;
  syncedAt_not_in?: any[] | null;
  syncedAt_lt?: any | null;
  syncedAt_lte?: any | null;
  syncedAt_gt?: any | null;
  syncedAt_gte?: any | null;
  detail?: string | null;
  detail_not?: string | null;
  detail_in?: string[] | null;
  detail_not_in?: string[] | null;
  detail_lt?: string | null;
  detail_lte?: string | null;
  detail_gt?: string | null;
  detail_gte?: string | null;
  detail_contains?: string | null;
  detail_not_contains?: string | null;
  detail_starts_with?: string | null;
  detail_not_starts_with?: string | null;
  detail_ends_with?: string | null;
  detail_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: SyncTimingScalarWhereInput[] | null;
  OR?: SyncTimingScalarWhereInput[] | null;
  NOT?: SyncTimingScalarWhereInput[] | null;
}

export interface SyncTimingUpdateDataInput {
  type?: SyncTimingType | null;
  syncedAt?: any | null;
  detail?: string | null;
}

export interface SyncTimingUpdateManyDataInput {
  type?: SyncTimingType | null;
  syncedAt?: any | null;
  detail?: string | null;
}

export interface SyncTimingUpdateManyInput {
  create?: SyncTimingCreateInput[] | null;
  update?: SyncTimingUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: SyncTimingUpsertWithWhereUniqueNestedInput[] | null;
  delete?: SyncTimingWhereUniqueInput[] | null;
  connect?: SyncTimingWhereUniqueInput[] | null;
  set?: SyncTimingWhereUniqueInput[] | null;
  disconnect?: SyncTimingWhereUniqueInput[] | null;
  deleteMany?: SyncTimingScalarWhereInput[] | null;
  updateMany?: SyncTimingUpdateManyWithWhereNestedInput[] | null;
}

export interface SyncTimingUpdateManyWithWhereNestedInput {
  where: SyncTimingScalarWhereInput;
  data: SyncTimingUpdateManyDataInput;
}

export interface SyncTimingUpdateWithWhereUniqueNestedInput {
  where: SyncTimingWhereUniqueInput;
  data: SyncTimingUpdateDataInput;
}

export interface SyncTimingUpsertWithWhereUniqueNestedInput {
  where: SyncTimingWhereUniqueInput;
  update: SyncTimingUpdateDataInput;
  create: SyncTimingCreateInput;
}

export interface SyncTimingWhereUniqueInput {
  id?: string | null;
}

export interface TagCreateManyWithoutProductsInput {
  create?: TagCreateWithoutProductsInput[] | null;
  connect?: TagWhereUniqueInput[] | null;
}

export interface TagCreateWithoutProductsInput {
  id?: string | null;
  name: string;
  description?: string | null;
}

export interface TagScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: TagScalarWhereInput[] | null;
  OR?: TagScalarWhereInput[] | null;
  NOT?: TagScalarWhereInput[] | null;
}

export interface TagUpdateManyDataInput {
  name?: string | null;
  description?: string | null;
}

export interface TagUpdateManyWithWhereNestedInput {
  where: TagScalarWhereInput;
  data: TagUpdateManyDataInput;
}

export interface TagUpdateManyWithoutProductsInput {
  create?: TagCreateWithoutProductsInput[] | null;
  delete?: TagWhereUniqueInput[] | null;
  connect?: TagWhereUniqueInput[] | null;
  set?: TagWhereUniqueInput[] | null;
  disconnect?: TagWhereUniqueInput[] | null;
  update?: TagUpdateWithWhereUniqueWithoutProductsInput[] | null;
  upsert?: TagUpsertWithWhereUniqueWithoutProductsInput[] | null;
  deleteMany?: TagScalarWhereInput[] | null;
  updateMany?: TagUpdateManyWithWhereNestedInput[] | null;
}

export interface TagUpdateWithWhereUniqueWithoutProductsInput {
  where: TagWhereUniqueInput;
  data: TagUpdateWithoutProductsDataInput;
}

export interface TagUpdateWithoutProductsDataInput {
  name?: string | null;
  description?: string | null;
}

export interface TagUpsertWithWhereUniqueWithoutProductsInput {
  where: TagWhereUniqueInput;
  update: TagUpdateWithoutProductsDataInput;
  create: TagCreateWithoutProductsInput;
}

export interface TagWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  products_every?: ProductWhereInput | null;
  products_some?: ProductWhereInput | null;
  products_none?: ProductWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: TagWhereInput[] | null;
  OR?: TagWhereInput[] | null;
  NOT?: TagWhereInput[] | null;
}

export interface TagWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface TopSizeCreateInput {
  id?: string | null;
  letter?: LetterSize | null;
  sleeve?: number | null;
  shoulder?: number | null;
  chest?: number | null;
  neck?: number | null;
  length?: number | null;
}

export interface TopSizeCreateOneInput {
  create?: TopSizeCreateInput | null;
  connect?: TopSizeWhereUniqueInput | null;
}

export interface TopSizeUpdateDataInput {
  letter?: LetterSize | null;
  sleeve?: number | null;
  shoulder?: number | null;
  chest?: number | null;
  neck?: number | null;
  length?: number | null;
}

export interface TopSizeUpdateOneInput {
  create?: TopSizeCreateInput | null;
  update?: TopSizeUpdateDataInput | null;
  upsert?: TopSizeUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: TopSizeWhereUniqueInput | null;
}

export interface TopSizeUpsertNestedInput {
  update: TopSizeUpdateDataInput;
  create: TopSizeCreateInput;
}

export interface TopSizeWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  letter?: LetterSize | null;
  letter_not?: LetterSize | null;
  letter_in?: LetterSize[] | null;
  letter_not_in?: LetterSize[] | null;
  sleeve?: number | null;
  sleeve_not?: number | null;
  sleeve_in?: number[] | null;
  sleeve_not_in?: number[] | null;
  sleeve_lt?: number | null;
  sleeve_lte?: number | null;
  sleeve_gt?: number | null;
  sleeve_gte?: number | null;
  shoulder?: number | null;
  shoulder_not?: number | null;
  shoulder_in?: number[] | null;
  shoulder_not_in?: number[] | null;
  shoulder_lt?: number | null;
  shoulder_lte?: number | null;
  shoulder_gt?: number | null;
  shoulder_gte?: number | null;
  chest?: number | null;
  chest_not?: number | null;
  chest_in?: number[] | null;
  chest_not_in?: number[] | null;
  chest_lt?: number | null;
  chest_lte?: number | null;
  chest_gt?: number | null;
  chest_gte?: number | null;
  neck?: number | null;
  neck_not?: number | null;
  neck_in?: number[] | null;
  neck_not_in?: number[] | null;
  neck_lt?: number | null;
  neck_lte?: number | null;
  neck_gt?: number | null;
  neck_gte?: number | null;
  length?: number | null;
  length_not?: number | null;
  length_in?: number[] | null;
  length_not_in?: number[] | null;
  length_lt?: number | null;
  length_lte?: number | null;
  length_gt?: number | null;
  length_gte?: number | null;
  AND?: TopSizeWhereInput[] | null;
  OR?: TopSizeWhereInput[] | null;
  NOT?: TopSizeWhereInput[] | null;
}

export interface TopSizeWhereUniqueInput {
  id?: string | null;
}

export interface UTMDataCreateOneWithoutCustomerInput {
  create?: UTMDataCreateWithoutCustomerInput | null;
  connect?: UTMDataWhereUniqueInput | null;
}

export interface UTMDataCreateWithoutCustomerInput {
  id?: string | null;
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
}

export interface UTMDataUpdateOneWithoutCustomerInput {
  create?: UTMDataCreateWithoutCustomerInput | null;
  update?: UTMDataUpdateWithoutCustomerDataInput | null;
  upsert?: UTMDataUpsertWithoutCustomerInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: UTMDataWhereUniqueInput | null;
}

export interface UTMDataUpdateWithoutCustomerDataInput {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
}

export interface UTMDataUpsertWithoutCustomerInput {
  update: UTMDataUpdateWithoutCustomerDataInput;
  create: UTMDataCreateWithoutCustomerInput;
}

export interface UTMDataWhereUniqueInput {
  id?: string | null;
}

export interface UserCreateInput {
  id?: string | null;
  auth0Id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole | null;
  roles?: UserCreaterolesInput | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  pushNotifications?: PushNotificationReceiptCreateManyWithoutUsersInput | null;
  emails?: EmailReceiptCreateManyWithoutUserInput | null;
  sendSystemEmails?: boolean | null;
  pushNotification?: UserPushNotificationCreateOneInput | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationMethod?: UserVerificationMethod | null;
  smsReceipts?: SmsReceiptCreateManyInput | null;
  fitPics?: FitPicCreateManyWithoutUserInput | null;
  deviceData?: UserDeviceDataCreateOneInput | null;
}

export interface UserCreateManyWithoutPushNotificationsInput {
  create?: UserCreateWithoutPushNotificationsInput[] | null;
  connect?: UserWhereUniqueInput[] | null;
}

export interface UserCreateOneInput {
  create?: UserCreateInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateWithoutPushNotificationsInput {
  id?: string | null;
  auth0Id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole | null;
  roles?: UserCreaterolesInput | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  emails?: EmailReceiptCreateManyWithoutUserInput | null;
  sendSystemEmails?: boolean | null;
  pushNotification?: UserPushNotificationCreateOneInput | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationMethod?: UserVerificationMethod | null;
  smsReceipts?: SmsReceiptCreateManyInput | null;
  fitPics?: FitPicCreateManyWithoutUserInput | null;
  deviceData?: UserDeviceDataCreateOneInput | null;
}

export interface UserCreaterolesInput {
  set?: UserRole[] | null;
}

export interface UserDeviceDataCreateInput {
  id?: string | null;
  iOSVersion?: string | null;
}

export interface UserDeviceDataCreateOneInput {
  create?: UserDeviceDataCreateInput | null;
  connect?: UserDeviceDataWhereUniqueInput | null;
}

export interface UserDeviceDataUpdateDataInput {
  iOSVersion?: string | null;
}

export interface UserDeviceDataUpdateOneInput {
  create?: UserDeviceDataCreateInput | null;
  update?: UserDeviceDataUpdateDataInput | null;
  upsert?: UserDeviceDataUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: UserDeviceDataWhereUniqueInput | null;
}

export interface UserDeviceDataUpsertNestedInput {
  update: UserDeviceDataUpdateDataInput;
  create: UserDeviceDataCreateInput;
}

export interface UserDeviceDataWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  iOSVersion?: string | null;
  iOSVersion_not?: string | null;
  iOSVersion_in?: string[] | null;
  iOSVersion_not_in?: string[] | null;
  iOSVersion_lt?: string | null;
  iOSVersion_lte?: string | null;
  iOSVersion_gt?: string | null;
  iOSVersion_gte?: string | null;
  iOSVersion_contains?: string | null;
  iOSVersion_not_contains?: string | null;
  iOSVersion_starts_with?: string | null;
  iOSVersion_not_starts_with?: string | null;
  iOSVersion_ends_with?: string | null;
  iOSVersion_not_ends_with?: string | null;
  AND?: UserDeviceDataWhereInput[] | null;
  OR?: UserDeviceDataWhereInput[] | null;
  NOT?: UserDeviceDataWhereInput[] | null;
}

export interface UserDeviceDataWhereUniqueInput {
  id?: string | null;
}

export interface UserPushNotificationCreateInput {
  id?: string | null;
  interests?: UserPushNotificationInterestCreateManyInput | null;
  status?: boolean | null;
  history?: PushNotificationReceiptCreateManyInput | null;
}

export interface UserPushNotificationCreateOneInput {
  create?: UserPushNotificationCreateInput | null;
  connect?: UserPushNotificationWhereUniqueInput | null;
}

export interface UserPushNotificationInterestCreateInput {
  id?: string | null;
  type: UserPushNotificationInterestType;
  value: string;
  user: UserCreateOneInput;
  status?: boolean | null;
}

export interface UserPushNotificationInterestCreateManyInput {
  create?: UserPushNotificationInterestCreateInput[] | null;
  connect?: UserPushNotificationInterestWhereUniqueInput[] | null;
}

export interface UserPushNotificationInterestScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  type?: UserPushNotificationInterestType | null;
  type_not?: UserPushNotificationInterestType | null;
  type_in?: UserPushNotificationInterestType[] | null;
  type_not_in?: UserPushNotificationInterestType[] | null;
  value?: string | null;
  value_not?: string | null;
  value_in?: string[] | null;
  value_not_in?: string[] | null;
  value_lt?: string | null;
  value_lte?: string | null;
  value_gt?: string | null;
  value_gte?: string | null;
  value_contains?: string | null;
  value_not_contains?: string | null;
  value_starts_with?: string | null;
  value_not_starts_with?: string | null;
  value_ends_with?: string | null;
  value_not_ends_with?: string | null;
  status?: boolean | null;
  status_not?: boolean | null;
  AND?: UserPushNotificationInterestScalarWhereInput[] | null;
  OR?: UserPushNotificationInterestScalarWhereInput[] | null;
  NOT?: UserPushNotificationInterestScalarWhereInput[] | null;
}

export interface UserPushNotificationInterestUpdateDataInput {
  type?: UserPushNotificationInterestType | null;
  value?: string | null;
  user?: UserUpdateOneRequiredInput | null;
  status?: boolean | null;
}

export interface UserPushNotificationInterestUpdateManyDataInput {
  type?: UserPushNotificationInterestType | null;
  value?: string | null;
  status?: boolean | null;
}

export interface UserPushNotificationInterestUpdateManyInput {
  create?: UserPushNotificationInterestCreateInput[] | null;
  update?: UserPushNotificationInterestUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: UserPushNotificationInterestUpsertWithWhereUniqueNestedInput[] | null;
  delete?: UserPushNotificationInterestWhereUniqueInput[] | null;
  connect?: UserPushNotificationInterestWhereUniqueInput[] | null;
  set?: UserPushNotificationInterestWhereUniqueInput[] | null;
  disconnect?: UserPushNotificationInterestWhereUniqueInput[] | null;
  deleteMany?: UserPushNotificationInterestScalarWhereInput[] | null;
  updateMany?: UserPushNotificationInterestUpdateManyWithWhereNestedInput[] | null;
}

export interface UserPushNotificationInterestUpdateManyWithWhereNestedInput {
  where: UserPushNotificationInterestScalarWhereInput;
  data: UserPushNotificationInterestUpdateManyDataInput;
}

export interface UserPushNotificationInterestUpdateWithWhereUniqueNestedInput {
  where: UserPushNotificationInterestWhereUniqueInput;
  data: UserPushNotificationInterestUpdateDataInput;
}

export interface UserPushNotificationInterestUpsertWithWhereUniqueNestedInput {
  where: UserPushNotificationInterestWhereUniqueInput;
  update: UserPushNotificationInterestUpdateDataInput;
  create: UserPushNotificationInterestCreateInput;
}

export interface UserPushNotificationInterestWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  type?: UserPushNotificationInterestType | null;
  type_not?: UserPushNotificationInterestType | null;
  type_in?: UserPushNotificationInterestType[] | null;
  type_not_in?: UserPushNotificationInterestType[] | null;
  value?: string | null;
  value_not?: string | null;
  value_in?: string[] | null;
  value_not_in?: string[] | null;
  value_lt?: string | null;
  value_lte?: string | null;
  value_gt?: string | null;
  value_gte?: string | null;
  value_contains?: string | null;
  value_not_contains?: string | null;
  value_starts_with?: string | null;
  value_not_starts_with?: string | null;
  value_ends_with?: string | null;
  value_not_ends_with?: string | null;
  user?: UserWhereInput | null;
  status?: boolean | null;
  status_not?: boolean | null;
  AND?: UserPushNotificationInterestWhereInput[] | null;
  OR?: UserPushNotificationInterestWhereInput[] | null;
  NOT?: UserPushNotificationInterestWhereInput[] | null;
}

export interface UserPushNotificationInterestWhereUniqueInput {
  id?: string | null;
}

export interface UserPushNotificationUpdateDataInput {
  interests?: UserPushNotificationInterestUpdateManyInput | null;
  status?: boolean | null;
  history?: PushNotificationReceiptUpdateManyInput | null;
}

export interface UserPushNotificationUpdateOneInput {
  create?: UserPushNotificationCreateInput | null;
  update?: UserPushNotificationUpdateDataInput | null;
  upsert?: UserPushNotificationUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: UserPushNotificationWhereUniqueInput | null;
}

export interface UserPushNotificationUpsertNestedInput {
  update: UserPushNotificationUpdateDataInput;
  create: UserPushNotificationCreateInput;
}

export interface UserPushNotificationWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  interests_every?: UserPushNotificationInterestWhereInput | null;
  interests_some?: UserPushNotificationInterestWhereInput | null;
  interests_none?: UserPushNotificationInterestWhereInput | null;
  status?: boolean | null;
  status_not?: boolean | null;
  history_every?: PushNotificationReceiptWhereInput | null;
  history_some?: PushNotificationReceiptWhereInput | null;
  history_none?: PushNotificationReceiptWhereInput | null;
  AND?: UserPushNotificationWhereInput[] | null;
  OR?: UserPushNotificationWhereInput[] | null;
  NOT?: UserPushNotificationWhereInput[] | null;
}

export interface UserPushNotificationWhereUniqueInput {
  id?: string | null;
}

export interface UserScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  auth0Id?: string | null;
  auth0Id_not?: string | null;
  auth0Id_in?: string[] | null;
  auth0Id_not_in?: string[] | null;
  auth0Id_lt?: string | null;
  auth0Id_lte?: string | null;
  auth0Id_gt?: string | null;
  auth0Id_gte?: string | null;
  auth0Id_contains?: string | null;
  auth0Id_not_contains?: string | null;
  auth0Id_starts_with?: string | null;
  auth0Id_not_starts_with?: string | null;
  auth0Id_ends_with?: string | null;
  auth0Id_not_ends_with?: string | null;
  email?: string | null;
  email_not?: string | null;
  email_in?: string[] | null;
  email_not_in?: string[] | null;
  email_lt?: string | null;
  email_lte?: string | null;
  email_gt?: string | null;
  email_gte?: string | null;
  email_contains?: string | null;
  email_not_contains?: string | null;
  email_starts_with?: string | null;
  email_not_starts_with?: string | null;
  email_ends_with?: string | null;
  email_not_ends_with?: string | null;
  firstName?: string | null;
  firstName_not?: string | null;
  firstName_in?: string[] | null;
  firstName_not_in?: string[] | null;
  firstName_lt?: string | null;
  firstName_lte?: string | null;
  firstName_gt?: string | null;
  firstName_gte?: string | null;
  firstName_contains?: string | null;
  firstName_not_contains?: string | null;
  firstName_starts_with?: string | null;
  firstName_not_starts_with?: string | null;
  firstName_ends_with?: string | null;
  firstName_not_ends_with?: string | null;
  lastName?: string | null;
  lastName_not?: string | null;
  lastName_in?: string[] | null;
  lastName_not_in?: string[] | null;
  lastName_lt?: string | null;
  lastName_lte?: string | null;
  lastName_gt?: string | null;
  lastName_gte?: string | null;
  lastName_contains?: string | null;
  lastName_not_contains?: string | null;
  lastName_starts_with?: string | null;
  lastName_not_starts_with?: string | null;
  lastName_ends_with?: string | null;
  lastName_not_ends_with?: string | null;
  role?: UserRole | null;
  role_not?: UserRole | null;
  role_in?: UserRole[] | null;
  role_not_in?: UserRole[] | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  pushNotificationStatus_not?: PushNotificationStatus | null;
  pushNotificationStatus_in?: PushNotificationStatus[] | null;
  pushNotificationStatus_not_in?: PushNotificationStatus[] | null;
  sendSystemEmails?: boolean | null;
  sendSystemEmails_not?: boolean | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationStatus_not?: UserVerificationStatus | null;
  verificationStatus_in?: UserVerificationStatus[] | null;
  verificationStatus_not_in?: UserVerificationStatus[] | null;
  verificationMethod?: UserVerificationMethod | null;
  verificationMethod_not?: UserVerificationMethod | null;
  verificationMethod_in?: UserVerificationMethod[] | null;
  verificationMethod_not_in?: UserVerificationMethod[] | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: UserScalarWhereInput[] | null;
  OR?: UserScalarWhereInput[] | null;
  NOT?: UserScalarWhereInput[] | null;
}

export interface UserUpdateDataInput {
  auth0Id?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role?: UserRole | null;
  roles?: UserUpdaterolesInput | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  pushNotifications?: PushNotificationReceiptUpdateManyWithoutUsersInput | null;
  emails?: EmailReceiptUpdateManyWithoutUserInput | null;
  sendSystemEmails?: boolean | null;
  pushNotification?: UserPushNotificationUpdateOneInput | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationMethod?: UserVerificationMethod | null;
  smsReceipts?: SmsReceiptUpdateManyInput | null;
  fitPics?: FitPicUpdateManyWithoutUserInput | null;
  deviceData?: UserDeviceDataUpdateOneInput | null;
}

export interface UserUpdateManyDataInput {
  auth0Id?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role?: UserRole | null;
  roles?: UserUpdaterolesInput | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  sendSystemEmails?: boolean | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationMethod?: UserVerificationMethod | null;
}

export interface UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput;
  data: UserUpdateManyDataInput;
}

export interface UserUpdateManyWithoutPushNotificationsInput {
  create?: UserCreateWithoutPushNotificationsInput[] | null;
  delete?: UserWhereUniqueInput[] | null;
  connect?: UserWhereUniqueInput[] | null;
  set?: UserWhereUniqueInput[] | null;
  disconnect?: UserWhereUniqueInput[] | null;
  update?: UserUpdateWithWhereUniqueWithoutPushNotificationsInput[] | null;
  upsert?: UserUpsertWithWhereUniqueWithoutPushNotificationsInput[] | null;
  deleteMany?: UserScalarWhereInput[] | null;
  updateMany?: UserUpdateManyWithWhereNestedInput[] | null;
}

export interface UserUpdateOneInput {
  create?: UserCreateInput | null;
  update?: UserUpdateDataInput | null;
  upsert?: UserUpsertNestedInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput | null;
  update?: UserUpdateDataInput | null;
  upsert?: UserUpsertNestedInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserUpdateWithWhereUniqueWithoutPushNotificationsInput {
  where: UserWhereUniqueInput;
  data: UserUpdateWithoutPushNotificationsDataInput;
}

export interface UserUpdateWithoutPushNotificationsDataInput {
  auth0Id?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role?: UserRole | null;
  roles?: UserUpdaterolesInput | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  emails?: EmailReceiptUpdateManyWithoutUserInput | null;
  sendSystemEmails?: boolean | null;
  pushNotification?: UserPushNotificationUpdateOneInput | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationMethod?: UserVerificationMethod | null;
  smsReceipts?: SmsReceiptUpdateManyInput | null;
  fitPics?: FitPicUpdateManyWithoutUserInput | null;
  deviceData?: UserDeviceDataUpdateOneInput | null;
}

export interface UserUpdaterolesInput {
  set?: UserRole[] | null;
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput;
  create: UserCreateInput;
}

export interface UserUpsertWithWhereUniqueWithoutPushNotificationsInput {
  where: UserWhereUniqueInput;
  update: UserUpdateWithoutPushNotificationsDataInput;
  create: UserCreateWithoutPushNotificationsInput;
}

export interface UserWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  auth0Id?: string | null;
  auth0Id_not?: string | null;
  auth0Id_in?: string[] | null;
  auth0Id_not_in?: string[] | null;
  auth0Id_lt?: string | null;
  auth0Id_lte?: string | null;
  auth0Id_gt?: string | null;
  auth0Id_gte?: string | null;
  auth0Id_contains?: string | null;
  auth0Id_not_contains?: string | null;
  auth0Id_starts_with?: string | null;
  auth0Id_not_starts_with?: string | null;
  auth0Id_ends_with?: string | null;
  auth0Id_not_ends_with?: string | null;
  email?: string | null;
  email_not?: string | null;
  email_in?: string[] | null;
  email_not_in?: string[] | null;
  email_lt?: string | null;
  email_lte?: string | null;
  email_gt?: string | null;
  email_gte?: string | null;
  email_contains?: string | null;
  email_not_contains?: string | null;
  email_starts_with?: string | null;
  email_not_starts_with?: string | null;
  email_ends_with?: string | null;
  email_not_ends_with?: string | null;
  firstName?: string | null;
  firstName_not?: string | null;
  firstName_in?: string[] | null;
  firstName_not_in?: string[] | null;
  firstName_lt?: string | null;
  firstName_lte?: string | null;
  firstName_gt?: string | null;
  firstName_gte?: string | null;
  firstName_contains?: string | null;
  firstName_not_contains?: string | null;
  firstName_starts_with?: string | null;
  firstName_not_starts_with?: string | null;
  firstName_ends_with?: string | null;
  firstName_not_ends_with?: string | null;
  lastName?: string | null;
  lastName_not?: string | null;
  lastName_in?: string[] | null;
  lastName_not_in?: string[] | null;
  lastName_lt?: string | null;
  lastName_lte?: string | null;
  lastName_gt?: string | null;
  lastName_gte?: string | null;
  lastName_contains?: string | null;
  lastName_not_contains?: string | null;
  lastName_starts_with?: string | null;
  lastName_not_starts_with?: string | null;
  lastName_ends_with?: string | null;
  lastName_not_ends_with?: string | null;
  role?: UserRole | null;
  role_not?: UserRole | null;
  role_in?: UserRole[] | null;
  role_not_in?: UserRole[] | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  pushNotificationStatus_not?: PushNotificationStatus | null;
  pushNotificationStatus_in?: PushNotificationStatus[] | null;
  pushNotificationStatus_not_in?: PushNotificationStatus[] | null;
  pushNotifications_every?: PushNotificationReceiptWhereInput | null;
  pushNotifications_some?: PushNotificationReceiptWhereInput | null;
  pushNotifications_none?: PushNotificationReceiptWhereInput | null;
  emails_every?: EmailReceiptWhereInput | null;
  emails_some?: EmailReceiptWhereInput | null;
  emails_none?: EmailReceiptWhereInput | null;
  sendSystemEmails?: boolean | null;
  sendSystemEmails_not?: boolean | null;
  pushNotification?: UserPushNotificationWhereInput | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationStatus_not?: UserVerificationStatus | null;
  verificationStatus_in?: UserVerificationStatus[] | null;
  verificationStatus_not_in?: UserVerificationStatus[] | null;
  verificationMethod?: UserVerificationMethod | null;
  verificationMethod_not?: UserVerificationMethod | null;
  verificationMethod_in?: UserVerificationMethod[] | null;
  verificationMethod_not_in?: UserVerificationMethod[] | null;
  smsReceipts_every?: SmsReceiptWhereInput | null;
  smsReceipts_some?: SmsReceiptWhereInput | null;
  smsReceipts_none?: SmsReceiptWhereInput | null;
  fitPics_every?: FitPicWhereInput | null;
  fitPics_some?: FitPicWhereInput | null;
  fitPics_none?: FitPicWhereInput | null;
  deviceData?: UserDeviceDataWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: UserWhereInput[] | null;
  OR?: UserWhereInput[] | null;
  NOT?: UserWhereInput[] | null;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  auth0Id?: string | null;
  email?: string | null;
}

export interface WarehouseLocationConstraintCreateManyWithoutLocationsInput {
  create?: WarehouseLocationConstraintCreateWithoutLocationsInput[] | null;
  connect?: WarehouseLocationConstraintWhereUniqueInput[] | null;
}

export interface WarehouseLocationConstraintCreateWithoutLocationsInput {
  id?: string | null;
  category: CategoryCreateOneInput;
  limit: number;
}

export interface WarehouseLocationConstraintScalarWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  limit?: number | null;
  limit_not?: number | null;
  limit_in?: number[] | null;
  limit_not_in?: number[] | null;
  limit_lt?: number | null;
  limit_lte?: number | null;
  limit_gt?: number | null;
  limit_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: WarehouseLocationConstraintScalarWhereInput[] | null;
  OR?: WarehouseLocationConstraintScalarWhereInput[] | null;
  NOT?: WarehouseLocationConstraintScalarWhereInput[] | null;
}

export interface WarehouseLocationConstraintUpdateManyDataInput {
  limit?: number | null;
}

export interface WarehouseLocationConstraintUpdateManyWithWhereNestedInput {
  where: WarehouseLocationConstraintScalarWhereInput;
  data: WarehouseLocationConstraintUpdateManyDataInput;
}

export interface WarehouseLocationConstraintUpdateManyWithoutLocationsInput {
  create?: WarehouseLocationConstraintCreateWithoutLocationsInput[] | null;
  delete?: WarehouseLocationConstraintWhereUniqueInput[] | null;
  connect?: WarehouseLocationConstraintWhereUniqueInput[] | null;
  set?: WarehouseLocationConstraintWhereUniqueInput[] | null;
  disconnect?: WarehouseLocationConstraintWhereUniqueInput[] | null;
  update?: WarehouseLocationConstraintUpdateWithWhereUniqueWithoutLocationsInput[] | null;
  upsert?: WarehouseLocationConstraintUpsertWithWhereUniqueWithoutLocationsInput[] | null;
  deleteMany?: WarehouseLocationConstraintScalarWhereInput[] | null;
  updateMany?: WarehouseLocationConstraintUpdateManyWithWhereNestedInput[] | null;
}

export interface WarehouseLocationConstraintUpdateWithWhereUniqueWithoutLocationsInput {
  where: WarehouseLocationConstraintWhereUniqueInput;
  data: WarehouseLocationConstraintUpdateWithoutLocationsDataInput;
}

export interface WarehouseLocationConstraintUpdateWithoutLocationsDataInput {
  category?: CategoryUpdateOneRequiredInput | null;
  limit?: number | null;
}

export interface WarehouseLocationConstraintUpsertWithWhereUniqueWithoutLocationsInput {
  where: WarehouseLocationConstraintWhereUniqueInput;
  update: WarehouseLocationConstraintUpdateWithoutLocationsDataInput;
  create: WarehouseLocationConstraintCreateWithoutLocationsInput;
}

export interface WarehouseLocationConstraintWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  category?: CategoryWhereInput | null;
  limit?: number | null;
  limit_not?: number | null;
  limit_in?: number[] | null;
  limit_not_in?: number[] | null;
  limit_lt?: number | null;
  limit_lte?: number | null;
  limit_gt?: number | null;
  limit_gte?: number | null;
  locations_every?: WarehouseLocationWhereInput | null;
  locations_some?: WarehouseLocationWhereInput | null;
  locations_none?: WarehouseLocationWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: WarehouseLocationConstraintWhereInput[] | null;
  OR?: WarehouseLocationConstraintWhereInput[] | null;
  NOT?: WarehouseLocationConstraintWhereInput[] | null;
}

export interface WarehouseLocationConstraintWhereUniqueInput {
  id?: string | null;
}

export interface WarehouseLocationCreateOneWithoutPhysicalProductsInput {
  create?: WarehouseLocationCreateWithoutPhysicalProductsInput | null;
  connect?: WarehouseLocationWhereUniqueInput | null;
}

export interface WarehouseLocationCreateWithoutPhysicalProductsInput {
  id?: string | null;
  type: WarehouseLocationType;
  barcode: string;
  locationCode: string;
  itemCode: string;
  constraints?: WarehouseLocationConstraintCreateManyWithoutLocationsInput | null;
}

export interface WarehouseLocationUpdateOneWithoutPhysicalProductsInput {
  create?: WarehouseLocationCreateWithoutPhysicalProductsInput | null;
  update?: WarehouseLocationUpdateWithoutPhysicalProductsDataInput | null;
  upsert?: WarehouseLocationUpsertWithoutPhysicalProductsInput | null;
  delete?: boolean | null;
  disconnect?: boolean | null;
  connect?: WarehouseLocationWhereUniqueInput | null;
}

export interface WarehouseLocationUpdateWithoutPhysicalProductsDataInput {
  type?: WarehouseLocationType | null;
  barcode?: string | null;
  locationCode?: string | null;
  itemCode?: string | null;
  constraints?: WarehouseLocationConstraintUpdateManyWithoutLocationsInput | null;
}

export interface WarehouseLocationUpsertWithoutPhysicalProductsInput {
  update: WarehouseLocationUpdateWithoutPhysicalProductsDataInput;
  create: WarehouseLocationCreateWithoutPhysicalProductsInput;
}

export interface WarehouseLocationWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  type?: WarehouseLocationType | null;
  type_not?: WarehouseLocationType | null;
  type_in?: WarehouseLocationType[] | null;
  type_not_in?: WarehouseLocationType[] | null;
  barcode?: string | null;
  barcode_not?: string | null;
  barcode_in?: string[] | null;
  barcode_not_in?: string[] | null;
  barcode_lt?: string | null;
  barcode_lte?: string | null;
  barcode_gt?: string | null;
  barcode_gte?: string | null;
  barcode_contains?: string | null;
  barcode_not_contains?: string | null;
  barcode_starts_with?: string | null;
  barcode_not_starts_with?: string | null;
  barcode_ends_with?: string | null;
  barcode_not_ends_with?: string | null;
  locationCode?: string | null;
  locationCode_not?: string | null;
  locationCode_in?: string[] | null;
  locationCode_not_in?: string[] | null;
  locationCode_lt?: string | null;
  locationCode_lte?: string | null;
  locationCode_gt?: string | null;
  locationCode_gte?: string | null;
  locationCode_contains?: string | null;
  locationCode_not_contains?: string | null;
  locationCode_starts_with?: string | null;
  locationCode_not_starts_with?: string | null;
  locationCode_ends_with?: string | null;
  locationCode_not_ends_with?: string | null;
  itemCode?: string | null;
  itemCode_not?: string | null;
  itemCode_in?: string[] | null;
  itemCode_not_in?: string[] | null;
  itemCode_lt?: string | null;
  itemCode_lte?: string | null;
  itemCode_gt?: string | null;
  itemCode_gte?: string | null;
  itemCode_contains?: string | null;
  itemCode_not_contains?: string | null;
  itemCode_starts_with?: string | null;
  itemCode_not_starts_with?: string | null;
  itemCode_ends_with?: string | null;
  itemCode_not_ends_with?: string | null;
  physicalProducts_every?: PhysicalProductWhereInput | null;
  physicalProducts_some?: PhysicalProductWhereInput | null;
  physicalProducts_none?: PhysicalProductWhereInput | null;
  constraints_every?: WarehouseLocationConstraintWhereInput | null;
  constraints_some?: WarehouseLocationConstraintWhereInput | null;
  constraints_none?: WarehouseLocationConstraintWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: WarehouseLocationWhereInput[] | null;
  OR?: WarehouseLocationWhereInput[] | null;
  NOT?: WarehouseLocationWhereInput[] | null;
}

export interface WarehouseLocationWhereUniqueInput {
  id?: string | null;
  barcode?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
