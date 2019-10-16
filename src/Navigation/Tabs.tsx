import React from "react"
import { LeftTabCorner, RightTabCorner } from "../../assets/svgs"
import styled from "styled-components/native"
import { View, StyleSheet, TouchableOpacity } from "react-native"

const S = StyleSheet.create({
  container: { position: "relative", flexDirection: "row", height: 52 },
  tabButton: { flex: 1, justifyContent: "center", alignItems: "center" },
})

export const Tabs = props => {
  const { renderIcon, activeTintColor, inactiveTintColor, onTabPress, navigation } = props

  const { routes, index: activeRouteIndex } = navigation.state

  return (
    <View style={S.container}>
      <LeftCorner />
      <RightCorner />
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor

        return (
          <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({ route })
            }}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor })}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

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
