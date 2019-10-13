import React from "react"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createAppContainer, StackActions } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { Home } from "App/Scenes/Home"
import { Browse } from "App/Scenes/Browse"
import { Bag } from "App/Scenes/Bag"
import { Product } from "App/Scenes/Product"
import { Account } from "App/Scenes/Account"
import { Image } from "react-native"
import { color } from "App/Utils"

const shouldRenderTabBar = navigation => {
  let renderTabs = true
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Product") {
        renderTabs = false
      }
    })
  }
  return renderTabs
}

const HomeStack = createStackNavigator(
  {
    Home,
    Product,
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

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: HomeStack,
      Browse: BrowseStack,
      Bag: BagStack,
      Account: AccountStack,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
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
      tabBarOptions: {
        activeTintColor: "white",
        inactiveTintColor: "gray",
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: color("black"),
          height: 50,
          borderTopWidth: 0,
        },
      },
    }
  )
)
