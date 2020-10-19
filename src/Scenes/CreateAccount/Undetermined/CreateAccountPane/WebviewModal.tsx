import { Sans, Flex, Separator, Spacer, Box } from "App/Components"
import React, { useState } from "react"
import WebView from "react-native-webview"
import { CloseXIcon } from "Assets/icons"
import { Modal, TouchableOpacity } from "react-native"
import { animated, useSpring } from "react-spring"
import { WebViewProgressEvent, WebViewNavigationEvent } from "react-native-webview/lib/WebViewTypes"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface WebviewModalProps {
  onRequestBack: () => void
  url?: string
  visible: boolean
}

export const WebviewModal: React.FC<WebviewModalProps> = ({ onRequestBack, url, visible }) => {
  const [loadProgress, setLoadProgress] = useState(5)
  const [showProgressBar, setShowProgressBar] = useState(true)
  const [title, setTitle] = useState("")
  const insets = useSafeAreaInsets()

  const progressBarAnimation = useSpring({
    width: loadProgress + "%",
    height: showProgressBar ? 4 : 0,
    opacity: showProgressBar ? 1 : 0,
  })

  const titleAnimation = useSpring({
    opacity: title.length ? 1 : 0,
  })

  const onLoadStart = () => {
    setTitle("")
  }

  const onLoadProgress = (event: WebViewProgressEvent) => {
    setLoadProgress(event.nativeEvent.progress * 100)
  }

  const onLoad = (event: WebViewNavigationEvent) => {
    setTitle(event.nativeEvent.title.replaceAll("-", " "))
    setTimeout(() => {
      setShowProgressBar(false)
    }, 100)
  }

  if (!url) {
    return null
  }

  return (
    <Modal animated presentationStyle="fullScreen" visible={visible}>
      <Spacer height={insets.top} />
      <Flex height={50} flexDirection="row" alignItems="center" justifyContent="space-between">
        <Spacer width={16 + 12 + 16} />
        <AnimatedBox opacity={titleAnimation.opacity}>
          <Sans size="2" color="black100">
            {title}
          </Sans>
        </AnimatedBox>
        <TouchableOpacity onPress={onRequestBack}>
          <CloseXIcon style={{ margin: 16 }} color="black100" />
        </TouchableOpacity>
      </Flex>
      <Separator mt={1} />
      <AnimatedBox
        opacity={progressBarAnimation.opacity}
        width={progressBarAnimation.width}
        height={progressBarAnimation.height}
        backgroundColor="black100"
      />
      <WebView source={{ uri: url }} onLoadStart={onLoadStart} onLoadProgress={onLoadProgress} onLoad={onLoad} />
    </Modal>
  )
}

const AnimatedBox = animated(Box)
