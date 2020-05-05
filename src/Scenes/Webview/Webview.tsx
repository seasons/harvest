import { FixedBackArrow, Container, Box, Separator, Flex, Sans } from "App/Components"
import { get } from "lodash"
import React from "react"
import { WebView } from "react-native-webview"
import { TouchableOpacity } from "react-native"
import Share from "react-native-share"
import { Platform } from "react-native"
import { useTracking, Schema, screenTrack } from "App/utils/track"

export const WebviewComponent = screenTrack()(({ navigation, route }) => {
  const tracking = useTracking()
  const uri = get(route, "params.uri")

  const url = uri
  const options = Platform.select({
    ios: {
      activityItemSources: [
        {
          placeholderItem: { type: "url", content: url },
          item: {
            default: { type: "url", content: url },
          },
          linkMetadata: { originalUrl: url, url },
        },
      ],
    },
    default: {
      message: url,
    },
  })

  const share = () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.ShareButtonTapped,
      actionType: Schema.ActionTypes.Tap,
      url: uri,
    })
    return Share.open(options)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })
  }

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <Flex height={50} flexDirection="row" alignItems="center" justifyContent="flex-end">
        <TouchableOpacity onPress={share}>
          <Box px={2}>
            <Sans size="1">Share</Sans>
          </Box>
        </TouchableOpacity>
      </Flex>
      <Separator />
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <WebView source={{ uri }} />
    </Container>
  )
})
