import React, { useState } from "react"
import styled from "styled-components/native"
import { useSafeArea } from "react-native-safe-area-context"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import { useNavigationState } from "./NavigationState"

export const Tabs = props => {
  const { renderIcon, activeTintColor, inactiveTintColor, onTabPress, navigation } = props
  const navigationState = useNavigationState()
  const insets = useSafeArea()

  const [isProductRoute, setIsProductRoute] = useState(false)
  const { routes, index: activeRouteIndex } = navigation.state
  const { action, type } = navigationState

  // Handle routing to the product view
  if (action.routeName === "Product" && !isProductRoute) {
    setIsProductRoute(true)
    console.log("Routing to Product", action)
  } else if (action.routeName !== "Product" && isProductRoute) {
    setIsProductRoute(false)
    console.log("Routing away from Product")
  }

  // Handle routing away from the product view
  if (action.key === "Browse") {
    console.log("Routing away from Product", action)
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

  return (
    <TabContainer style={{ marginBottom: insets.bottom }}>
      <LeftCorner />
      <RightCorner />
      {tabs}
    </TabContainer>
  )
}

const TabContainer = styled.View`
  position: relative;
  flex-direction: row;
  height: 52;
`

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
