/**
 * The global tracking-info keys in Season's schema.
 */
export interface Global {
  /**
   * The name of an event.
   *
   * Options are: Tap, Fail, Success
   *
   * This is unique to a "Track" event, meaning a "screen view" in Segment does not have this
   * This is how we distinguish the two type of events in Harvest
   * Track data inherits the screen view (called "page") properties
   *
   */
  actionType?: ActionTypes

  /**
   * The discription of an event
   *
   * E.g. Conversation product attachment tapped
   */
  actionName?: ActionNames

  sessionLength?: number

  /**
   * OPTIONAL: Additional properties of the action
   */
  additionalProperties?: object
}

export interface Event extends Global {
  /**
   * The ID of the entity in its database. E.g. the Prisma for entities that reside in Monsoon.
   */
  entityId?: string

  /**
   * The public slug for this entity.
   */
  entitySlug?: string

  /**
   * The type of entity, e.g. product, brand, etc.
   */
  entityType?: EntityTypes

  /**
   * Provides a context, usually the component the event is emitted from.
   */
  contextModule?: string
}

export interface PageViewEvent extends Event {
  /**
   * The root container component should specify this as the screen context.
   */
  page?: PageNames
}

export enum PageNames {
  AccountPage = "Account",
  BagPage = "Bag",
  CollectionPage = "Collection",
  ProductPage = "Product",
  HomePage = "Home",
  PlanPage = "Plan",
  ReservationPage = "Reservation",
  ReservationConfirmationPage = "ReservationConfirmation",
}

export enum EntityTypes {
  Brand = "Brand",
  Product = "Product",
  Reservation = "Reservation",
}

export enum ActionTypes {
  /**
   * User actions
   */
  Tap = "Tap",
  Swipe = "Swipe",
  Session = "Session",

  /**
   * Events / results
   */
  Fail = "Fail",
  Success = "Success",
}

/**
 * Action event discriptors / names
 */
export enum ActionNames {
  // Home page
  BrowseButtonTapped = "Browse Button Tapped",
  ViewAllBrandsTapped = "View All Brands Tapped",

  // Browse page
  // FIXME: Add this
  FiltersButtonTapped = "Filters Button Tapped",

  FilterTapped = "Filter Tapped",
  FiltersApplied = "Filters Applied",
  FiltersCleared = "Filters Cleared",
  FilterModalCanceled = "Filters Modal Canceled",
  CategoryTapped = "Category Tapped",
  BrowsePageSwiped = "Browse Page Swiped",

  // Bag
  // FIXME: Add this
  BagItemRemoved = "Bag Item Removed",
  BagSavedItemRemoved = "Bag Saved Item Removed",
  BagItemSaved = "Bag Item Saved",
  BagTabTapped = "Bag Tab Tapped",
  SavedTabTapped = "Saved Tab Tapped",
  ReserveButtonTapped = "Reserve Button Tapped",

  // Brand view
  // FIXME: Add this
  ReadMoreTapped = "Read More Tapped",

  // Brands view
  // FIXME: Add this
  AlphabetTapped = "Alphabet Tapped",

  // Reservation
  // FIXME: Add this
  PlaceOrderTapped = "Place Order Tapped",

  // Reservation Confirmation
  // FIXME: Add this
  ReservationConfirmationDoneButtonTapped = "Reservation Confirmation Done Button Tapped",

  // Account
  MembershipInfoTapped = "Membership Info Tapped",
  PersonalPreferencesTapped = "Personal Preferences Tapped",
  PaymentAndShippingTapped = "Payment And Shipping Tapped",
  SubmitAnItemTapped = "Submit An Item Tapped",
  FAQTapped = "FAQ Tapped",
  NotificationToggleTapped = "Notification Toggle Tapped",
  SupportTapped = "Support Tapped",
  PrivacyPolicyTapped = "Privacy Policy Tapped",
  TermsOfServiceTapped = "Terms of Service Tapped",
  LogOutTapped = "Log Out Tapped",

  // Membership Info
  // FIXME: Add this
  ContactUsTapped = "Contact Us Tapped",

  // Personal Preferences
  // FIXME: Add this
  EditButtonTapped = "Edit Button Tapped",
  EditDoneButtonTapped = "Edit Done Button Tapped",

  // Payment And Shipping
  // FIXME: Add this
  PaymentAndShippingEditSaveTapped = "Payment And Shipping Edit Save Tapped",
  PaymentAndShippingEditCancelTapped = "Payment And Shipping Edit Cancel Tapped",
  PaymentAndShippingEditBillingInfoTapped = "Payment And Shipping Edit Billing Info Tapped",

  // Submit an item
  // FIXME: Add this
  NextButtonTapped = "Next Button Tapped",
  SubmitButtonTapped = "Submit Button Tapped",
  FinishButtonTapped = "Finish Button Tapped",

  // // Reservation Flow Steps
  // ReservationInitiated = "Reservation Initiated",
  // ReservationCompleted = "Reservation Completed",
  // ReservationConfirmed = "Reservation Confirmed",

  // Product page action names
  // FIXME: Add this
  ProductSaved = "Product Saved",
  ProductWanted = "Product Wanted",
  ProductReserved = "Product Reserved",
  ProductAdded = "Product Added",
  ProductVariantSelected = "Product Variant Selected",
  SizeButtonTapped = "Size Button Tapped",

  // Shared action names
  // FIXME: Add this
  ProductTapped = "Product Tapped",
  BrandTapped = "Brand Tapped",
  CarouselSwiped = "Carousel Swiped",
}

/**
 * The component from which the action originates
 */
export enum ContextModules {}
