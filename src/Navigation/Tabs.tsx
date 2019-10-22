import React, { useState } from "react"
import styled from "styled-components/native"
import { useSafeArea } from "react-native-safe-area-context"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import { useNavigationState } from "./NavigationState"
import { Theme, Flex } from "App/Components"
import { ProductTabs } from "./ProductTabs"
import { connect } from "react-redux"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import { get } from "lodash"
import { color } from "styled-system"

export const TabsComponent = props => {
  const { renderIcon, activeTintColor, inactiveTintColor, onTabPress, navigation } = props
  const navigationState = useNavigationState()
  const insets = useSafeArea()

  const [isProductRoute, setIsProductRoute] = useState(false)
  const [productID, setProductID] = useState("")
  const { routes, index: activeRouteIndex } = navigation.state
  const { action, type } = navigationState

  // Handle routing to the product view
  if (action.type === "Navigation/NAVIGATE" && action.routeName && action.routeName === "Product" && !isProductRoute) {
    setIsProductRoute(true)
    setProductID(get(action, "params.id") || "")
  } else if ((action.type === "Navigation/POP_TO_TOP" || action.type === "Navigation/BACK") && isProductRoute) {
    setIsProductRoute(false)
    setProductID("")
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

  const hiddenStyles = {
    opacity: 0,
    pointerEvents: "none",
    translateY: 100,
  }
  const visibleStyles = { opacity: 1, translateY: 0, pointerEvents: "auto" }

  return (
    <Theme>
      <TabContainer
        style={{
          height: props.productState.showSizeSelection && isProductRoute ? 440 : 60,
          marginBottom: insets.bottom,
        }}
      >
        <LeftCorner />
        <RightCorner />
        <Spring native from={hiddenStyles} to={isProductRoute ? visibleStyles : hiddenStyles}>
          {({ opacity, translateY, pointerEvents }) => (
            <AnimatedProductTabsWrapper pointerEvents={pointerEvents} style={{ opacity, transform: [{ translateY }] }}>
              <Flex style={{ flex: 1, backgroundColor: color("black") }}>
                <ProductTabs navigation={navigation} productID={productID} />
              </Flex>
            </AnimatedProductTabsWrapper>
          )}
        </Spring>
        <Spring native from={visibleStyles} to={isProductRoute ? hiddenStyles : visibleStyles}>
          {({ opacity, translateY, pointerEvents }) => (
            <AnimatedMainNavWrapper pointerEvents={pointerEvents} style={{ opacity, transform: [{ translateY }] }}>
              <Flex pt={2} alignContent="center" justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
                {tabs}
              </Flex>
            </AnimatedMainNavWrapper>
          )}
        </Spring>
      </TabContainer>
    </Theme>
  )
}

const mapStateToProps = state => {
  const { productState } = state
  return { productState }
}

export const Tabs = connect(mapStateToProps)(TabsComponent)

const NavWrapper = styled.View`
  overflow: hidden;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex: 1;
  position: absolute;
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
