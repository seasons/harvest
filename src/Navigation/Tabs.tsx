import React, { useState } from "react"
import styled from "styled-components/native"
import { useSafeArea } from "react-native-safe-area-context"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import { useNavigationState } from "./NavigationState"
import { Theme, Flex, Spacer, Sans } from "App/Components"
import { ProductTabs } from "./ProductTabs"
import { connect } from "react-redux"
import { get } from "lodash"
import { GreenCheck } from "Assets/svgs"
import { color } from "styled-system"
import { useSpring, animated } from "react-spring"
import { BAG_NUM_ITEMS } from "App/Redux/reducer"

const PRODUCT_SELECTION_HEIGHT = 440

export const TabsComponent = props => {
  const [showConfirmation, setShowConfirmation] = useState({ show: false, type: "" })
  const { renderIcon, activeTintColor, inactiveTintColor, onTabPress, navigation, bag } = props
  const navigationState = useNavigationState()
  const insets = useSafeArea()

  const [isProductRoute, setIsProductRoute] = useState(false)
  const [productID, setProductID] = useState("")
  const { routes, index: activeRouteIndex } = navigation.state
  const { action } = navigationState

  // Handle routing to the product view
  if (action.type === "Navigation/NAVIGATE" && action.routeName && action.routeName === "Product" && !isProductRoute) {
    setIsProductRoute(true)
    setProductID(get(action, "params.id") || "")
  } else if ((action.type === "Navigation/POP_TO_TOP" || action.type === "Navigation/BACK") && isProductRoute) {
    setIsProductRoute(false)
    setProductID("")
  }

  const Confirmation = ({ type }) => {
    const remainingPieces = BAG_NUM_ITEMS - bag.itemCount
    let text = "Added to bag"
    let subtext = `(${remainingPieces} slots remaining)`
    if (type === "want") {
      text = "Got it!"
      subtext = "We'll let you know when it's back in stock."
    }
    return (
      <ConfirmationWrapper alignContent="center" justifyContent="center" flexDirection="column">
        <Flex flexDirection="row" alignContent="center" justifyContent="center">
          <Flex alignContent="center" justifyContent="center" flexDirection="column">
            <Flex flexDirection="row" alignContent="center" justifyContent="center">
              <GreenCheck />
            </Flex>
            <Spacer mb={2} />
            <Sans size="2" color="white" textAlign="center">
              {text}
            </Sans>
            <Spacer mb={1} />
            <Sans size="2" color="gray" textAlign="center">
              {subtext}
            </Sans>
          </Flex>
        </Flex>
      </ConfirmationWrapper>
    )
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

  const displayConfirmation = type => {
    setShowConfirmation({ show: true, type })
    setTimeout(() => {
      setShowConfirmation({ show: false, type })
    }, 2000)
  }

  const productTabStyles = useSpring({
    opacity: isProductRoute ? 1 : 0,
    translateY: isProductRoute ? 0 : 100,
  })
  const mainTabStyles = useSpring({
    opacity: isProductRoute ? 0 : 1,
    translateY: isProductRoute ? 100 : 0,
  })
  const containerStyles = useSpring({
    height: props.productState.showSizeSelection && isProductRoute ? PRODUCT_SELECTION_HEIGHT : 60,
  })

  return (
    <Theme>
      {showConfirmation.show && <Confirmation type={showConfirmation.type} />}
      <AnimatedTabContainer
        style={{
          height: containerStyles.height,
          marginBottom: insets.bottom,
        }}
      >
        <LeftCorner />
        <RightCorner />
        <AnimatedProductTabsWrapper
          pointerEvents={isProductRoute ? "auto" : "none"}
          style={{ transform: [{ translateY: productTabStyles.translateY }], opacity: productTabStyles.opacity }}
        >
          <Flex style={{ flex: 1, backgroundColor: color("black") }}>
            <ProductTabs displayConfirmation={displayConfirmation} navigation={navigation} productID={productID} />
          </Flex>
        </AnimatedProductTabsWrapper>
        <AnimatedMainNavWrapper
          pointerEvents={isProductRoute ? "none" : "auto"}
          style={{ transform: [{ translateY: mainTabStyles.translateY }], opacity: mainTabStyles.opacity }}
        >
          <Flex pt={2} alignContent="center" justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
            {tabs}
          </Flex>
        </AnimatedMainNavWrapper>
      </AnimatedTabContainer>
    </Theme>
  )
}

const mapStateToProps = state => {
  const { productState, bag } = state
  return { productState, bag }
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
  height: 50;
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

const ConfirmationWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
`

const AnimatedTabContainer = animated(TabContainer)
const AnimatedProductTabsWrapper = animated(NavWrapper)
const AnimatedMainNavWrapper = animated(NavWrapper)
