/**
 * Useful notes:
 *  * At the bottom of this file there is an example of how to test track'd code.
 */

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
   * This is how we distinguish the two type of events in Eigen
   * Track data inherits the screen view (called "context_screen") properties
   *
   */
  actionType: ActionTypes

  /**
   * The discription of an event
   *
   * E.g. Save ProductVariant tapped
   */
  actionName: ActionNames

  sessionLength?: number

  /**
   * OPTIONAL: Additional properties of the action
   */
  additionalProperties?: object
}

export interface Entity extends Global {
  /**
   * The ID of the entity in its database. E.g. the Prisma ID for entities that reside in Monsoon.
   */
  ownerId?: string

  /**
   * The public slug for this entity.
   */
  ownerSlug?: string

  /**
   * The type of entity, e.g. Brand, Product, etc.
   */
  ownerType?: OwnerEntityTypes

  /**
   * Provides a context, usually the component the event is emitted from.
   */
  contextModule?: string
}

export interface PageView {
  /**
   * The root container component should specify this as the screen context.
   */
  contextScreen: PageNames

  /**
   * The public slug for the entity that owns this page (e.g. for the Product page)
   */
  contextScreenOwnerSlug?: string

  /**
   * The ID of the entity in its database. E.g. the Prisma ID for entities that reside in Monsoon.
   *
   * OPTIONAL: This may not always be available before the relay call for props has been made
   */
  contextScreenOwnerId?: string

  /**
   * The type of entity (owner), E.g. Product, Brand, etc.
   */
  contextScreenOwnerType: OwnerEntityTypes
}

export enum PageNames {
  ProductPage = "Product",
  BrandPage = "Brand",
}

export enum OwnerEntityTypes {
  Product = "Product",
  Brand = "Brand",
}

export enum ActionTypes {
  /**
   * User actions
   */
  Tap = "tap",
  Swipe = "swipe",
  Session = "session",

  /**
   * Events / results
   */
  Fail = "fail",
  Success = "success",
}

/**
 * Action event discriptors / names
 */
export enum ActionNames {
  /**
   * Product Page Events
   */
  ProductWant = "productWant",
  ProductUnwant = "productUnwant",
}

/**
 * The component from which the action originates
 */
export enum ContextModules {}

export enum Flow {}
