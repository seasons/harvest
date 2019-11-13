import { Account, PaymentAndShipping } from "App/Scenes/Account"
import { PersonalPreferences } from "App/Scenes/Account/PersonalPreferences"
import { Bag, CurrentRotation } from "App/Scenes/Bag"
import { Browse } from "App/Scenes/Browse"
import { Collection } from "App/Scenes/Collection"
import { Home } from "App/Scenes/Home"
import { Product } from "App/Scenes/Product"
import { Webview } from "App/Scenes/Webview"
import { Reservation, ReservationConfirmation } from "App/Scenes/Reservation"
import { Initializing, SignIn, SignInOrApply, Welcome } from "App/Scenes/SignIn"
import React, { useState } from "react"
import { Image } from "react-native"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { MembershipInfo } from "Scenes/Account/MembershipInfo"
import styled from "styled-components"
import DismissableStackNavigator from "./DismissableStackNavigator"
import { Tabs } from "./Tabs"

const shouldRenderTabBar = navigation => {
  let renderTabs = true
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Product") {
        renderTabs = true
      }
    })
  }
  return renderTabs
}

const AuthStack = createStackNavigator(
  {
    SignIn,
    SignInOrApply,
    Welcome,
    Webview,
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      header: null,
    },
  }
)

AuthStack.navigationOptions = () => {
  return {
    tabBarVisible: false,
  }
}

const HomeStack = createStackNavigator(
  {
    Home,
    Product,
    Collection,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null,
    },
  }
)

HomeStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: shouldRenderTabBar(navigation),
  }
}

const BrowseStack = createStackNavigator(
  {
    Browse,
    Product,
  },
  {
    initialRouteName: "Browse",
    defaultNavigationOptions: {
      header: null,
    },
  }
)

BrowseStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: shouldRenderTabBar(navigation),
    header: null,
  }
}

const BagStack = createStackNavigator(
  {
    Bag,
    Product,
    CurrentRotation,
  },
  {
    initialRouteName: "CurrentRotation",
    defaultNavigationOptions: {
      header: null,
    },
  }
)

BagStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: shouldRenderTabBar(navigation),
    header: null,
  }
}

const AccountStack = createStackNavigator(
  {
    Account,
    MembershipInfo,
    PaymentAndShipping,
    PersonalPreferences,
    Webview,
  },
  {
    initialRouteName: "Account",
    defaultNavigationOptions: {
      header: null,
    },
  }
)

AccountStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: shouldRenderTabBar(navigation),
    header: null,
  }
}

const ReservationModal = DismissableStackNavigator(
  {
    Reservation,
    ReservationConfirmation,
  },
  {
    headerMode: "none",
  }
)

const MainNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Browse: BrowseStack,
    Bag: BagStack,
    Account: AccountStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let URL

        if (routeName === "Home") {
          URL = require(`../../assets/images/Home.png`)
        } else if (routeName === "Browse") {
          URL = require(`../../assets/images/Browse.png`)
        } else if (routeName === "Bag") {
          URL = require(`../../assets/images/Bag.png`)
        } else if (routeName === "Account") {
          URL = require(`../../assets/images/Account.png`)
        }

        return <Image source={URL} style={{ opacity: focused ? 1.0 : 0.3 }} />
      },
    }),
    tabBarComponent: Tabs,
  }
)

const CustomNavigator = props => {
  const [browseFilter, setBrowseFilter] = useState("all")
  const { navigation } = props
  const screenProps = { browseFilter, setBrowseFilter }

  return (
    <NavigationContainer style={{ flex: 1 }}>
      <MainNavigator navigation={navigation} screenProps={screenProps} />
    </NavigationContainer>
  )
}
CustomNavigator.router = {
  ...MainNavigator.router,
}

const RootStack = createStackNavigator(
  {
    Main: {
      screen: CustomNavigator,
    },
    ReservationModal: {
      screen: ReservationModal,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
)

const SwitchNavigator = createSwitchNavigator(
  {
    Initializing,
    Auth: AuthStack,
    Root: RootStack,
  },
  {
    initialRouteName: "Initializing",
  }
)

const NavigationContainer = styled.View`
  background-color: black;
`

export const AppContainer = createAppContainer(SwitchNavigator)
