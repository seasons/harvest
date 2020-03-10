import "../../setupAnalytics"
import _track, { Track as _Track, TrackingInfo, useTracking as _useTracking, TrackingProp } from "react-tracking"
import analytics from "@segment/analytics-react-native"
import { PageView } from "./schema"
import * as Schema from "./schema"
export { Schema }

/**
 * Useful notes:
 *  * At the bottom of this file there is an example of how to test track'd code.
 */
export interface Track<P = any, S = null, T extends Schema.Global = Schema.Event> extends _Track<T, P, S> {} // tslint:disable-line:no-empty-interface

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
 * @example
 *
 *      ```ts
 *      import { screenTrack, useTracking, Schema } from "lib/utils/track"
 *
 *      interface Props extends ViewProperties {
 *        // [...]
 *      }
 *
 *      screenTrack<Props>(props => ({
 *        contextScreen: Schema.PageNames.ConsignmentsSubmission,
 *        contextScreenOwnerSlug: props.submissionID,
 *        contextScreenOwnerType: Schema.EntityTypes.Consignment,
 *      }))(props => {
 *        const tracking = useTracking()
 *        return <Button onPress={() => {
 *          tracking.trackEvent({
 *            actionName: Schema.ActionNames.ViewAllBrandsTapped,
 *            actionType: Schema.ActionTypes.Tap,
 *          })
 *        }} />
 *      })
 *
 */

export function screenTrack<P>(trackingInfo?: TrackingInfo<PageView, P, null>) {
  const decorateTracking = (props, state, args) => {
    const baseData = typeof trackingInfo === "function" ? trackingInfo?.(props, state, args) : trackingInfo
    const info = {
      contextScreen: props?.route.name,
      contextScreenOwnerSlug: props?.route?.params?.slug,
      contextScreenOwnerId: props?.route?.params?.id,
      ...baseData,
    }
    return info
  }

  return _track(decorateTracking as any, {
    dispatch: data => {
      if (__DEV__) {
        console.log("[Event tracked]", JSON.stringify(data, null, 2))
      }
      return analytics.screen(data.contextScreen, data)
    },
    dispatchOnMount: true,
  })
}

export const useTracking: () => TrackingProp<TrackingInfo<Schema.Event, null, null>> = _useTracking
