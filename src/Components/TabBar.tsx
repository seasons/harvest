import { color } from "App/utils"
import React from "react"
import { Animated, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import { Box, Sans } from "./"

/**
 * Nearly all props are given by the ScrollableTabView,
 * these are prefixed with Auto:
 */
interface TabBarProps {
  /** Auto: A list of strings for the buttons */
  tabs: string[]
  /** Auto:  A callback for usage in the tab buttons */
  goToPage?: (page: Number) => null | void
  /** Auto: The index of the currently active tab */
  activeTab?: number
  /** Auto: How much horiztonal space do you have */
  containerWidth?: number
  /** Auto: Handled by ScrollableTabView */
  scrollValue?: Animated.AnimatedInterpolation
  /** Should space tabs evenly */
  spaceEvenly?: boolean
}

const Button = styled(TouchableWithoutFeedback)`
  flex: 1;
`

const Tabs = styled(View)`
  height: 55px;
  flex-direction: row;
  justify-content: space-around;
`

const TabButton = styled.View<{ spaceEvenly?: boolean; active?: boolean }>`
  align-items: center;
  justify-content: center;
  padding-top: 5;
  flex-grow: 1;
  border-color: transparent;
  border-bottom-width: 3px;
  ${p => p.spaceEvenly && `flex: 1;`};
  ${p =>
    p.active &&
    `
    border-color: #000000;
  `};
`

interface TabProps {
  tabLabel: string
}

export const Tab: React.SFC<TabProps> = ({ children }) => (
  <View style={{ flex: 1, overflow: "hidden" }}>{children}</View>
)

export class TabBar extends React.Component<TabBarProps, null> {
  renderTab(name, page, isTabActive, onPressHandler) {
    return (
      <Button
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <TabButton spaceEvenly={this.props.spaceEvenly} active={isTabActive}>
          <Sans numberOfLines={1} weight="medium" size="2" color={isTabActive ? "black" : color("black50")}>
            {name}
          </Sans>
        </TabButton>
      </Button>
    )
  }

  render() {
    return (
      <Wrapper>
        <Tabs>
          {this.props.tabs.map((name, index) => {
            const isTabActive = this.props.activeTab === index
            return this.renderTab(name, index, isTabActive, this.props.goToPage)
          })}
        </Tabs>
      </Wrapper>
    )
  }
}

const Wrapper = styled(Box)`
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
`
