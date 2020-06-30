import { Sans, Flex, Separator, Spacer, Box } from "App/Components"
import React, { useState } from "react"
import WebView from "react-native-webview"
import { CloseXIcon } from "Assets/icons"
import { Modal, StatusBar, TouchableOpacity } from "react-native"
import { animated, useSpring } from "react-spring"
import { WebViewProgressEvent, WebViewNavigationEvent } from "react-native-webview/lib/WebViewTypes"
import { useSafeArea } from "react-native-safe-area-context"

interface WebviewModalProps {
  onRequestBack: () => boolean
  url?: string
  visible: boolean
}

export const WebviewModal: React.FC<WebviewModalProps> = ({ onRequestBack, url, visible }) => {
  const [loadProgress, setLoadProgress] = useState(5)
  const [showProgressBar, setShowProgressBar] = useState(true)
  const [title, setTitle] = useState("")
  const insets = useSafeArea()

  const progressBarAnimation = useSpring({
    width: loadProgress + "%",
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

  const _onRequestBack = () => {
    if (onRequestBack()) {
      StatusBar.setBarStyle("light-content")
    }
  }

  if (!url) {
    return null
  }

  StatusBar.setBarStyle("default")

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
        <TouchableOpacity onPress={_onRequestBack}>
          <CloseXIcon style={{ margin: 16 }} color="black100" />
        </TouchableOpacity>
      </Flex>
      <Separator mt={1} />
      <AnimatedBox
        opacity={progressBarAnimation.opacity}
        width={progressBarAnimation.width}
        height={4}
        backgroundColor="black100"
        position="absolute"
        zIndex={100}
        bottom={0}
        left={0}
      />
      <WebView source={{ uri: url }} onLoadStart={onLoadStart} onLoadProgress={onLoadProgress} onLoad={onLoad} />
    </Modal>
  )
}

const AnimatedBox = animated(Box)
