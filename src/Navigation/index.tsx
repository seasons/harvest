import React from "react"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { Home } from "App/Scenes/Home"
import { Browse } from "App/Scenes/Browse"
import { Bag } from "App/Scenes/Bag"
import { Account } from "App/Scenes/Account"
import { Image } from "react-native"
// import { createStackNavigator } from "react-navigation-stack"
import { color } from "App/Utils"

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Browse,
    Bag,
    Account,
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

export default createAppContainer(TabNavigator)

// const AppNavigator = createStackNavigator(
//   {
//     Home: {
//       screen: Home,
//     },
//     Browse: {
//       screen: Browse,
//     },
//     Bag: {
//       screen: Bag,
//     },
//     Account: {
//       screen: Account,
//     },
//   },
//   {
//     initialRouteName: "Home",
//   }
// )

// import { Navigation } from "react-native-navigation"
// import { bottomTabs } from "./tabs"

// export const goToWelcome = () =>
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: "Welcome",
//       },
//     },
//   })

// export const goToProduct = (componentId, id) =>
//   Navigation.push(componentId, {
//     component: {
//       name: "Product",
//       passProps: {
//         id,
//       },
//       options: {
//         bottomTabs: {
//           visible: false,
//         },
//       },
//     },
//   })

// export const goToSignIn = () =>
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: "SignIn",
//       },
//     },
//   })

// export const goToBrowse = () =>
//   Navigation.setRoot({
//     root: {
//       bottomTabs: bottomTabs,
//       component: {
//         name: "Browse",
//       },
//     },
//   })

// export const goHome = () =>
//   Navigation.setRoot({
//     root: {
//       bottomTabs: bottomTabs,
//       component: {
//         name: "Home",
//       },
//     },
//   })

// export const goToBag = () =>
//   Navigation.setRoot({
//     root: {
//       bottomTabs: bottomTabs,
//       component: {
//         name: "Bag",
//       },
//     },
//   })
