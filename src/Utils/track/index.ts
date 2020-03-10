import "../../setupAnalytics"
import _track, { Track as _Track, TrackingInfo } from "react-tracking"
import analytics from "@segment/analytics-react-native"
import { PageView } from "./schema"
import * as Schema from "./schema"
export { Schema }

/**
 * Useful notes:
 *  * At the bottom of this file there is an example of how to test track'd code.
 */
export interface Track<P = any, S = null, T extends Schema.Global = Schema.Entity> extends _Track<T, P, S> {} // tslint:disable-line:no-empty-interface

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
 *      class brand extends React.Component<{}, null> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track({ action: "Follow brand" })
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
 *        contextScreenOwnerType: Schema.EntityTypes.Consignment,
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
 *        contextScreenOwnerType: Schema.EntityTypes.Consignment,
 *      }))
 *
 *      export default class Welcome extends React.Component<Props, null> {
 *        // [...]
 *      }
 */

export function screenTrack<P>(trackingInfo: TrackingInfo<PageView, P, null>) {
  return _track(trackingInfo as any, {
    dispatch: data => {
      if (__DEV__) {
        console.log("[Event tracked]", JSON.stringify(data, null, 2))
      }
      return analytics.screen(data.contextScreen, data)
    },
    dispatchOnMount: true,
  })
}
