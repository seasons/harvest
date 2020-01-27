import { Flex, Theme, Box } from "App/Components"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import React, { useState } from "react"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { useNavigationState } from "./NavigationState"
import { color } from "App/Utils"

export const TabsComponent = props => {
  const { renderIcon, activeTintColor, inactiveTintColor, onTabPress, navigation, bag } = props
  const navigationState = useNavigationState()
  const insets = useSafeArea()

  const [isProductRoute, setIsProductRoute] = useState(false)
  const { routes, index: activeRouteIndex } = navigation.state
  const { action } = navigationState

  // Handle routing to the product view
  if (action.type === "Navigation/NAVIGATE" && action.routeName && action.routeName === "Product" && !isProductRoute) {
    setIsProductRoute(true)
  } else if ((action.type === "Navigation/POP_TO_TOP" || action.type === "Navigation/BACK") && isProductRoute) {
    setIsProductRoute(false)
  }

  const tabs = routes.map((route, routeIndex) => {
    const isRouteActive = routeIndex === activeRouteIndex
    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor

    return (
      <TabButton
        key={routeIndex}
        onPress={() => {
          onTabPress({ route })
        }}
      >
        {renderIcon({ route, focused: isRouteActive, tintColor })}
      </TabButton>
    )
  })

  const animation = useSpring({
    mainNavTranslateY: isProductRoute ? 50 : 0,
    trayranslateY: isProductRoute ? 0 : -insets.bottom,
  })

  return (
    <Theme>
      <AnimatedTray style={{ transform: [{ translateY: animation.trayranslateY }] }}>
        <LeftCorner />
        <RightCorner />
        <Box style={{ backgroundColor: color("black") }}>
          <AnimatedMainTabs style={{ transform: [{ translateY: animation.mainNavTranslateY }] }}>
            {tabs}
          </AnimatedMainTabs>
        </Box>
      </AnimatedTray>
    </Theme>
  )
}

const mapStateToProps = state => {
  const { productState, bag } = state
  return { productState, bag }
}

export const Tabs = connect(mapStateToProps)(TabsComponent)

const TabButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
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
  height: 44;
  align-content: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  background-color: ${color("black")};
`

const AnimatedTray = animated(Box)
const AnimatedMainTabs = animated(MainTabs)
