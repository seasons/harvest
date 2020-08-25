import { Box, Container, Flex, Sans, Separator, Spacer } from "App/Components"
import { BackArrowIcon } from "Assets/icons"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import WebView from "react-native-webview"
import { WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes"
import { animated, useSpring } from "react-spring"

interface ChargebeeCheckoutPaneProps {
  url?: string
  onFinishedCheckout: () => void
  onRequestBack: () => void
}

export const ChargebeeCheckoutPane: React.FC<ChargebeeCheckoutPaneProps> = ({
  url,
  onFinishedCheckout,
  onRequestBack,
}) => {
  const [didFinishedCheckout, setDidFinishCheckout] = useState(false)
  const [loadProgress, setLoadProgress] = useState(5)
  const [showProgressBar, setShowProgressBar] = useState(true)
  const progressBarAnimation = useSpring({
    width: loadProgress + "%",
    height: showProgressBar ? 4 : 0,
    opacity: showProgressBar ? 1 : 0,
  })

  const onLoadProgress = (event: WebViewProgressEvent) => {
    setLoadProgress(event.nativeEvent.progress * 100)
  }

  const onFinishedLoading = () => {
    setTimeout(() => {
      setShowProgressBar(false)
    }, 100)
  }

  if (!url) {
    return null
  }

  return (
    <Container insetsTop={false} insetsBottom={false} backgroundColor="white100">
      <Flex mt={3} height={50} flexDirection="row" alignItems="center" justifyContent="space-between">
        <TouchableOpacity onPress={onRequestBack}>
          <BackArrowIcon style={{ marginLeft: 16 }} color="black100" />
        </TouchableOpacity>
        <Sans size="2" color="black100">
          www.chargebee.com
        </Sans>
        <Spacer width={16 + 26} />
      </Flex>
      <Separator mt={1} />
      <AnimatedBox
        opacity={progressBarAnimation.opacity}
        width={progressBarAnimation.width}
        height={progressBarAnimation.height}
        backgroundColor="black100"
      />
      <WebView
        source={{ uri: url }}
        onLoadProgress={onLoadProgress}
        onLoad={onFinishedLoading}
        onShouldStartLoadWithRequest={(e) => {
          if (e.url.includes("chargebee-mobile-checkout-success")) {
            if (!didFinishedCheckout) {
              setDidFinishCheckout(true)
              onFinishedCheckout()
            }
            return true
          } else {
            return true
          }
        }}
      />
    </Container>
  )
}

const AnimatedBox = animated(Box)
