import "../setupAnalytics"

import _track, { Track as _Track, TrackingInfo } from "react-tracking"

import analytics from "@segment/analytics-react-native"

/**
 * Useful notes:
 *  * At the bottom of this file there is an example of how to test track'd code.
 */

/**
 * The global tracking-info keys in Artsy’s schema.
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
   * E.g. Conversation artwork attachment tapped
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
   * The ID of the entity in its database. E.g. the Mongo ID for entities that reside in Gravity.
   */
  ownerId?: string

  /**
   * The public slug for this entity.
   */
  ownerSlug?: string

  /**
   * The type of entity, e.g. Artwork, Artist, etc.
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
   * The public slug for the entity that owns this page (e.g. for the Artist page)
   */
  contextScreenOwnerSlug?: string

  /**
   * The ID of the entity in its database. E.g. the Mongo ID for entities that reside in Gravity.
   *
   * OPTIONAL: This may not always be available before the relay call for props has been made
   */
  contextScreenOwnerId?: string

  /**
   * The type of entity (owner), E.g. Artist, Artwork, etc.
   */
  contextScreenOwnerType: OwnerEntityTypes
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

export enum OwnerEntityTypes {
  Product = "Product",
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
  ProductSave = "productSave",
  ProductWant = "productWant",
  ProductReserve = "productReserve",
}

/**
 * The component from which the action originates
 */
export enum ContextModules {}

/**
 * Useful notes:
 *  * At the bottom of this file there is an example of how to test track'd code.
 */

/**
 * Use this interface to augment the `track` function with props, state, or custom tracking-info schema.
 *
 * @example
 *
 *      ```ts
 *      import { Schema, Track, track as _track } from "lib/utils/track"
 *
 *      interface Props {
 *        artist: {
 *          id: string
 *          slug: string
 *        }
 *      }
 *
 *      interface State {
 *        following: boolean
 *      }
 *
 *      const track: Track<Props, State> = _track
 *
 *      @track()
 *      class Artist extends React.Component<Props, State> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track((props, state) => ({
 *          actionType: Schema.ActionTypes.Tap,
 *          actionName: state.following ? Schema.ActionNames.ArtistUnfollow : Schema.ActionNames.ArtistFollow,
 *          owner_id: props.artist.internalID,
 *          owner_type: Schema.OwnerEntityTypes.Artist,
 *          owner_slug: props.artist.id,
 *        }))
 *        handleFollow() {
 *          // ...
 *        }
 *      }
 *
 *      ```
 */
export interface Track<P = any, S = null, T extends Global = Entity> extends _Track<T, P, S> {} // tslint:disable-line:no-empty-interface

/**
 * A typed tracking-info alias of the default react-tracking `track` function.
 *
 * Use this when you don’t use a callback function to generate the tracking-info and only need the global schema.
 *
 * @example
 *
 *      ```ts
 *      import { track } from "lib/utils/track"
 *
 *      @track()
 *      class Artist extends React.Component<{}, null> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track({ action: "Follow Artist" })
 *        handleFollow() {
 *          // ...
 *        }
 *      }
 *      ```
 */
export const track: Track = _track

/**
 * A typed page view decorator for the top level component for your screen. This is the
 * function you must use at the root of your component tree, otherwise your track calls
 * will do nothing.
 *
 * For the majority of Emission code, this should only be used inside the AppRegistry,
 * however if you have other components which are going to be presented using a navigation
 * controller then you'll need to use this.
 *
 * The main implementation difference between this and `track` is that this hooks the callbacks
 * to our native `Events.postEvent` function.
 *
 * As an object:
 *
 * @example
 *
 *      ```ts
 *      import { screenTrack, Schema } from "lib/utils/track"
 *
 *       @screenTrack({
 *        contextScreen: Schema.PageNames.ConsignmentsWelcome,
 *        contextScreenOwnerSlug: null,
 *        contextScreenOwnerType: Schema.OwnerEntityTypes.Consignment,
 *       })
 *
 *       export default class Welcome extends React.Component<Props, null> {
 *         // [...]
 *       }
 *
 * * As an function taking account of incoming props:
 *
 * @example
 *
 *      ```ts
 *      import { screenTrack, Schema } from "lib/utils/track"
 *
 *      interface Props extends ViewProperties {
 *        // [...]
 *      }
 *
 *      @screenTrack<Props>(props => ({
 *        contextScreen: Schema.PageNames.ConsignmentsSubmission,
 *        contextScreenOwnerSlug: props.submissionID,
 *        contextScreenOwnerType: Schema.OwnerEntityTypes.Consignment,
 *      }))
 *
 *      export default class Welcome extends React.Component<Props, null> {
 *        // [...]
 *      }
 */
export function screenTrack<P>(trackingInfo: TrackingInfo<PageView, P, null>) {
  return _track(trackingInfo as any, {
    dispatch: data => {
      return analytics.screen(data.contextScreen, data)
    },
    dispatchOnMount: true,
  })
}
