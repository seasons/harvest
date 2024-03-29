import "../../setupAnalytics"

import { Platform } from "react-native"
import _track, { Track as _Track, TrackingInfo, TrackingProp, useTracking as _useTracking } from "react-tracking"

import analytics from "@segment/analytics-react-native"

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
 *        page: Schema.PageNames.ConsignmentsSubmission,
 *        entitySlug: props.submissionID,
 *        entityId: Schema.EntityTypes.Consignment,
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

export function screenTrack<P>(trackingInfo?: TrackingInfo<Schema.PageViewEvent, P, null>) {
  const decorateTracking = (props, state, args) => {
    const baseData = typeof trackingInfo === "function" ? trackingInfo?.(props, state, args) : trackingInfo
    const info = {
      page: props?.route?.name,
      entitySlug: props?.route?.params?.slug,
      entityId: props?.route?.params?.id,
      entityName: props?.route?.params?.name,
      ...baseData,
    }
    return info
  }

  return _track(decorateTracking as any, {
    dispatch: (data) => {
      const newData = { ...data, platform: Platform.OS, application: "harvest" } as any
      if (__DEV__) {
        console.log("[Event tracked]", JSON.stringify(newData, null, 2))
      }
      if (newData.actionName) {
        return analytics.track(newData.actionName, newData)
      } else {
        return analytics.screen(newData.page, newData)
      }
    },
    dispatchOnMount: true,
  })
}

export const useTracking: () => TrackingProp<TrackingInfo<Schema.Event, null, null>> = _useTracking
