import { Flex, Theme, Box } from "App/Components"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"
import { get } from "lodash"
import React, { useState } from "react"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { Confirmation } from "./Confirmation"
import { useNavigationState } from "./NavigationState"
import { VariantPicker } from "./VariantPicker"
import { Dimensions } from "react-native"
import { color } from "App/Utils"

const variantPickerHeight = Dimensions.get("window").height / 2

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
  })

  const mainNavStyle = useSpring({
    opacity: isProductRoute ? 0 : 1,
  })

  const trayStyle = useSpring({
    translateY: 0,
  })

  const trayWrapperStyle = useSpring({
    translateY: isProductRoute ? 0 : -insets.bottom,
  })

  console.log("variantPickerHeight", variantPickerHeight)

  return (
    <Theme>
      <AnimatedTrayWrapper style={{ transform: [{ translateY: trayWrapperStyle.translateY }] }}>
        {showConfirmation.show && <Confirmation type={showConfirmation.type} />}
        <AnimatedTray style={{ transform: [{ translateY: trayStyle.translateY }] }}>
          <LeftCorner />
          <RightCorner />
          <AnimatedProductTabs style={{ opacity: productTabStyles.opacity, height: variantPickerHeight }}>
            {isProductRoute && (
              <VariantPicker
                height={variantPickerHeight}
                displayConfirmation={displayConfirmation}
                navigation={navigation}
                productID={productID}
              />
            )}
          </AnimatedProductTabs>
          <AnimatedMainTabs style={{ opacity: mainNavStyle.opacity }}>{tabs}</AnimatedMainTabs>
        </AnimatedTray>
      </AnimatedTrayWrapper>
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
  background-color: pink;
  align-content: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
`
const ProductTabs = styled.View`
  background-color: yellow;
`

const Tray = styled.View`
  /* background-color: ${color("black")}; */
  background-color: green;
`

const AnimatedTray = animated(Tray)
const AnimatedTrayWrapper = animated(Box)
const AnimatedProductTabs = animated(ProductTabs)
const AnimatedMainTabs = animated(MainTabs)
