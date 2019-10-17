import React from "react"
import styled from "styled-components/native"
import { useSafeArea } from "react-native-safe-area-context"
import { LeftTabCorner, RightTabCorner } from "Assets/svgs"

export const Tabs = props => {
  const { renderIcon, activeTintColor, inactiveTintColor, onTabPress, navigation } = props
  const insets = useSafeArea()
  const { routes, index: activeRouteIndex } = navigation.state

  return (
    <TabContainer style={{ marginBottom: insets.bottom }}>
      <LeftCorner />
      <RightCorner />
      {routes.map((route, routeIndex) => {
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
      })}
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
