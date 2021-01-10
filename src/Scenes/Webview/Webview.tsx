import { FixedBackArrow, Container, Box, Separator, Flex, Sans } from "App/Components"
import React, { useState } from "react"
import { WebView } from "react-native-webview"
import { TouchableOpacity } from "react-native"
import Share from "react-native-share"
import { Platform } from "react-native"
import styled from "styled-components/native"
import { useTracking, Schema, screenTrack } from "App/utils/track"
import { animated, useSpring } from "react-spring"
import { color } from "App/utils"
import { WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes"

export const WebviewComponent = screenTrack()(({ navigation, route }) => {
  const [loadProgress, setLoadProgress] = useState(5)
  const [showLoadBar, setShowLoadBar] = useState(true)
  const loadProgressAnimation = useSpring({
    width: loadProgress + "%",
    opacity: showLoadBar ? 1 : 0,
  })
  const tracking = useTracking()
  const uri = route?.params?.uri || ""

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

  const onLoadProgress = (event: WebViewProgressEvent) => {
    setLoadProgress(event.nativeEvent.progress * 100)
  }

  const onLoaded = () => {
    setTimeout(() => {
      setShowLoadBar(false)
    }, 100)
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
            <Sans size="4">Share</Sans>
          </Box>
        </TouchableOpacity>
        <AnimatedLoadBar opacity={loadProgressAnimation.opacity} width={loadProgressAnimation.width} />
      </Flex>
      <Separator />
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <WebView source={{ uri }} onLoadProgress={onLoadProgress} onLoad={onLoaded} />
    </Container>
  )
})

const LoadBar = styled(Box)<{ loadProgress: string; opacity: number }>`
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 0;
  height: 4;
  background-color: ${color("black100")};
`

const AnimatedLoadBar = animated(LoadBar)
