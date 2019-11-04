import React, { useState } from "react"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createAppContainer, createSwitchNavigator, NavigationEvents } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { Home } from "App/Scenes/Home"
import { Browse } from "App/Scenes/Browse"
import { Collection } from "App/Scenes/Collection"
import { Bag } from "App/Scenes/Bag"
import { SignIn, Initializing, Welcome, SignInOrApply } from "App/Scenes/SignIn"
import { Product } from "App/Scenes/Product"
import { Account, PaymentAndShipping } from "App/Scenes/Account"
import { MembershipInfo } from "Scenes/Account/MembershipInfo"
import { Reservation } from "Scenes/Browse/Reservation"
import { Image } from "react-native"
import styled from "styled-components"
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
    Reservation,
  },
  {
    initialRouteName: "Bag",
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

const SwitchNavigator = createSwitchNavigator(
  {
    Initializing,
    Auth: AuthStack,
    Root: CustomNavigator,
  },
  {
    initialRouteName: "Initializing",
  }
)

const NavigationContainer = styled.View`
  background-color: black;
`

export const AppContainer = createAppContainer(SwitchNavigator)
