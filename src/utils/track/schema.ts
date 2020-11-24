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

  entityName?: string

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
  Tag = "Tag",
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
  // CreateAccount

  // Web view
  ShareButtonTapped = "Share button tapped",

  RateUsTapped = "Rate us tapped",
  FollowUsTapped = "Follow us tapped",

  // Home page
  BrowseButtonTapped = "Browse Button Tapped",
  ViewAllBrandsTapped = "View All Brands Tapped",
  ViewAllCategoriesTapped = "View All Categories Tapped",

  // Browse page
  FiltersButtonTapped = "Filters Button Tapped",
  FilterTapped = "Filter Tapped",
  FiltersCleared = "Filters Cleared",
  FilterModalCanceled = "Filters Modal Canceled",
  FiltersApplied = "Filters Applied",
  CategoryTapped = "Category Tapped",
  BrowsePagePaginated = "Browse Page Paginated",

  // Bag
  BagItemRemoved = "Bag Item Removed",
  BagSavedItemRemoved = "Bag Saved Item Removed",
  BagItemSaved = "Bag Item Saved",
  BagTabTapped = "Bag Tab Tapped",
  SavedTabTapped = "Saved Tab Tapped",
  FAQButtonTapped = "FAQ Button Tapped",
  ReserveButtonTapped = "Reserve Button Tapped",
  ReservationHistoryTabTapped = "Reservation History Tab Tapped",
  SavedItemAddedToBag = "Saved Item Added To Bag",

  // Brand view
  ReadMoreTapped = "Read More Tapped",

  // Tags rail
  ViewAllProductsByTagsTapped = "View All Products By Tags Tapped",

  // Brands view
  AlphabetTapped = "Alphabet Tapped",

  // Reservation
  PlaceOrderTapped = "Place Order Tapped",

  // Reservation Confirmation
  ReservationConfirmationDoneButtonTapped = "Reservation Confirmation Done Button Tapped",

  // Reservation Feedback
  ReservationFeedbackRatingButtonTapped = "Reservation Feedback Rating Button Tapped",
  ReservationFeedbackHeaderTapped = "Reservation Feedback Header Tapped",
  ReservationFeedbackHeaderProgressBarTapped = "Reservation Feedback Header Progress Bar Tapped",
  ReservationFeedbackOptionButtonTapped = "Reservation Feedback Option Button Tapped",
  ReservationFeedbackContinueLaterButtonTapped = "Reservation Feedback Continue Later Button Tapped",

  // Reservation Feedback Confirmation
  ReservationFeedbackConfirmationSkipButtonTapped = "Reservation Feedback Confirmation Skip Button Tapped",
  ReservationFeedbackConfirmationSubmitButtonTapped = "Reservation Feedback Confirmation Submit Button Tapped",

  // Reservation Feedback Finish
  ReservationFeedbackFinishButtonTapped = "Reservation Feedback Finish Button Tapped",

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
  FinishButtonTapped = "Finish Button Tapped",
  NextButtonTapped = "Next Button Tapped",
  SubmitButtonTapped = "Submit Button Tapped",

  // Reservation Flow Steps
  // FIXME: Adds these to the backend
  // ReservationInitiated = "Reservation Initiated",
  // ReservationCompleted = "Reservation Completed",
  // ReservationConfirmed = "Reservation Confirmed",

  // Product page action names
  ProductSaved = "Product Saved",
  SaveProductButtonTapped = "Save Product Button Tapped",
  ProductWanted = "Product Wanted",
  SizeButtonTapped = "Size Button Tapped",
  ProductAddedToBag = "Product Added To Bag",
  ProductVariantSelected = "Product Variant Selected",
  SaveProductModalCancelTapped = "Save Product Modal Cancel Tapped",
  SaveProductModalSaveTapped = "Save Product Modal Save Tapped",

  // Size Picker
  SizePickerCancelTapped = "Size Picker Cancel Tapped",
  SizeSelected = "Size Selected",

  // Shared action names
  ProductTapped = "Product Tapped",
  BrandTapped = "Brand Tapped",
  CarouselSwiped = "Carousel Swiped",

  TopsTabTapped = "Tops Tab Tapped",
  BottomsTabTapped = "Bottoms Tab Tapped",

  // Signup Action names
  CreateAnAccountTapped = "Create An Account Tapped",
  CreateMyAccountTapped = "Create My Account Tapped",
  EnterPhoneNumberNextTapped = "Enter Phone Number Next Tapped",
  EnterPhoneNumberVerificationCodeNextTapped = "Enter Phone Number Verification Code Next Tapped",
  GetMeasurementsFinishTapped = "Get Measurements Finish Tapped",
  ChoosePlanTapped = "Choose Plan Tapped",
  LearnMoreTapped = "Learn More Tapped",
  SignupCompleted = "Signup Completed",
  PlanTapped = "Plan Tapped",

  // Promo Code
  ApplyPromoCodeEntrypointTapped = "Apply Promo Code Entrypoint Tapped",
  ApplyPromoCodeTapped = "Promo Code Apply Button Tapped",

  Tier0PlanTabTapped = "Tier 0 Plan Tab Tapped",
  Tier1PlanTabTapped = "Tier 1 Plan Tab Tapped",

  ApplePayTapped = "Apple Pay Tapped",
  AddCreditCardTapped = "Add Credit Card Tapped",
}

/**
 * The component from which the action originates
 */
export enum ContextModules {}
