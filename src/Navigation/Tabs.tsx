import React, { useState } from "react"
import styled from "styled-components/native"
import { useSafeArea } from "react-native-safe-area-context"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import { useNavigationState } from "./NavigationState"
import { Theme } from "App/Components"
import { ProductTabs } from "./ProductTabs"
import { animated, Spring } from "react-spring/renderprops-native.cjs"

export const Tabs = props => {
  const { renderIcon, activeTintColor, inactiveTintColor, onTabPress, navigation } = props
  const navigationState = useNavigationState()
  const insets = useSafeArea()

  const [isProductRoute, setIsProductRoute] = useState(false)
  const { routes, index: activeRouteIndex } = navigation.state
  const { action, type } = navigationState

  console.log("action", action)

  // Handle routing to the product view
  if (action.type === "Navigation/NAVIGATE" && action.routeName && action.routeName === "Product" && !isProductRoute) {
    setIsProductRoute(true)
    console.log("Routing to Product", action)
  } else if ((action.type === "Navigation/POP_TO_TOP" || action.type === "Navigation/BACK") && isProductRoute) {
    setIsProductRoute(false)
    console.log("Routing away from Product 1", action.routeName)
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

  const hiddenStyles = { opacity: 0, height: 0 }
  const visibleStyles = { opacity: 1, height: 60 }

  return (
    <Theme>
      <TabContainer style={{ marginBottom: insets.bottom }}>
        <LeftCorner />
        <RightCorner />
        <Spring native from={hiddenStyles} to={isProductRoute ? visibleStyles : hiddenStyles}>
          {styleProps => (
            <AnimatedProductTabsWrapper style={styleProps}>
              <ProductTabs navigation={navigation} />
            </AnimatedProductTabsWrapper>
          )}
        </Spring>
        <Spring native from={visibleStyles} to={isProductRoute ? hiddenStyles : visibleStyles}>
          {styleProps => <AnimatedMainNavWrapper style={{ ...styleProps }}>{tabs}</AnimatedMainNavWrapper>}
        </Spring>
      </TabContainer>
    </Theme>
  )
}

const NavWrapper = styled.View`
  overflow: hidden;
  flex-direction: row;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  justify-content: space-between;
`

const TabContainer = styled.View`
  position: relative;
  flex-direction: row;
  height: 60;
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

const AnimatedProductTabsWrapper = animated(NavWrapper)
const AnimatedMainNavWrapper = animated(NavWrapper)
