import React from "react"
import { Linking } from "react-native"
import { ImageWithInfoView } from "../ImageWithInfoView"
import { screenTrack, useTracking, Schema } from "App/utils/track"

enum PauseConfirmationViewState {
  WithItems = "WithItems",
  WithoutItems = "WithoutItems",
}

export const PauseConfirmation: React.FC<{ navigation: any; route: any }> = screenTrack()(({ route, navigation }) => {
  const tracking = useTracking()

  const viewState: PauseConfirmationViewState = route?.params?.viewState
  const billingDate: string = route?.params?.billingDate

  let title
  let caption
  let imageURL

  if (viewState === "WithItems") {
    title = "You've successfully paused your membership with items"
    caption = "When you're ready for new styles, just send back your order and resume your membership."
    imageURL = "https://seasons-s3.imgix.net/harvest/PausedWithItems.png?w=576&fit=clip&retina=true&fm=webp&cs=srgb"
  } else {
    title = "You've successfully paused your membership without items"
    caption = `Return your items before ${billingDate} or your membership will auto resume & you'll be billed.`
    imageURL = "https://seasons-s3.imgix.net/harvest/PausedNoItems.png?w=576&fit=clip&retina=true&fm=webp&cs=srgb"
  }

  return (
    <ImageWithInfoView
      title={title}
      caption={caption}
      imageURL={imageURL}
      topButtonText="Finish"
      bottomButtonText="Contact us"
      topButtonOnPress={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.InviteFromContactsTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        navigation.popToTop()
      }}
      bottomButtonOnPress={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ShareLinkTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership question"`)
      }}
    />
  )
})
