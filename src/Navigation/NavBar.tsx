import { Box, Flex } from "App/Components"
import { color, space } from "App/utils"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { Image } from "react-native"
import { NotificationBar } from "@seasons/eclipse"
import { navigateTo } from "App/Navigation"

export const NavBar = ({ state, navigation, currentScreen }) => {
  const insets = useSafeAreaInsets()
  const hideNav = ["Product", "FitPicDetail"].includes(currentScreen)
  const buttonHeight = 50
  const trayHeight = buttonHeight + insets.bottom

  const tabs = state.routes.map((route, routeIndex) => {
    const isRouteActive = state.index === routeIndex
    const routeName = route.name
    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      })
    }

    let URL
    if (routeName === "HomeStack") {
      URL = require(`../../assets/images/Home.png`)
    } else if (routeName === "BrowseStack") {
      URL = require(`../../assets/images/Browse.png`)
    } else if (routeName === "BagStack") {
      URL = require(`../../assets/images/Bag.png`)
    } else if (routeName === "AccountStack") {
      URL = require(`../../assets/images/Profile.png`)
    }

    return (
      <TabButton
        key={routeIndex}
        onLongPress={onLongPress}
        onPress={() => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          })

          if (!isRouteActive && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }}
      >
        <Box style={{ marginBottom: space(2) }} />
        <Image source={URL} style={{ opacity: isRouteActive ? 1.0 : 0.3 }} />
      </TabButton>
    )
  })

  const animation = useSpring({
    translateY: hideNav ? trayHeight : 0,
    spacerHeight: hideNav ? insets.bottom : trayHeight,
    config: { mass: 1, tension: 450, friction: 50 },
  })

  const onClickNotificationBar = ({ mobile }) => {
    navigateTo(navigation, mobile)
  }

  return (
    <>
      <AnimatedTray style={{ height: trayHeight, transform: [{ translateY: animation.translateY }] }}>
        <NotificationBar onClick={onClickNotificationBar} />
        <MainTabs>{tabs}</MainTabs>
      </AnimatedTray>
      <AnimatedSpacer style={{ backgroundColor: color("black100"), height: animation.spacerHeight }}>
        <LeftCorner />
        <RightCorner />
      </AnimatedSpacer>
    </>
  )
}

const TabButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  height: 44;
`

const LeftCorner = styled(LeftTabCorner)`
  position: absolute;
  top: -28;
  left: 0;
`

const RightCorner = styled(RightTabCorner)`
  position: absolute;
  top: -28;
  right: 0;
`

const MainTabs = styled(Flex)`
  width: 100%;
  height: 100;
  background-color: ${color("black100")};
  align-content: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
`

const Tray = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`

const AnimatedTray = animated(Tray)
const AnimatedSpacer = animated(Box)
