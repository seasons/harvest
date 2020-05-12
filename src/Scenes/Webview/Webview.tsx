import { FixedBackArrow, Container, Box, Separator, Flex, Sans } from "App/Components"
import React, { useState } from "react"
import { WebView } from "react-native-webview"
import { TouchableOpacity } from "react-native"
import Share from "react-native-share"
import { Platform } from "react-native"
import styled from "styled-components/native"
import { useTracking, Schema, screenTrack } from "App/utils/track"
import { useInterval } from "App/utils/hooks/useInterval"
import { color } from "App/utils"

export const WebviewComponent = screenTrack()(({ navigation, route }) => {
  const [loadProgress, setLoadProgress] = useState(5)
  const tracking = useTracking()
  const uri = route?.params?.uri || ""
  useInterval(() => {
    if (loadProgress < 100 && loadProgress != 0) {
      setLoadProgress(loadProgress + 5)
    }
  }, 300)

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

  const onLoaded = () => {
    setLoadProgress(100)
    setTimeout(() => {
      setLoadProgress(0)
    }, 200)
  }

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
      <Flex
        style={{ position: "relative" }}
        height={50}
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <TouchableOpacity onPress={share}>
          <Box px={2}>
            <Sans size="1">Share</Sans>
          </Box>
        </TouchableOpacity>
        <LoadBar loadProgress={loadProgress} />
      </Flex>
      <Separator />
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <WebView source={{ uri }} onLoad={onLoaded} />
    </Container>
  )
})

const LoadBar = styled(Box)<{ loadProgress: string }>`
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 0;
  height: 4;
  width: ${(p) => p.loadProgress + "%"};
  background-color: ${color("black100")};
`
