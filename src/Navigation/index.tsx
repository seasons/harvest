import React, { useState } from "react"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createAppContainer, createSwitchNavigator, NavigationEvents } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { Home } from "App/Scenes/Home"
import { Browse } from "App/Scenes/Browse"
import { Bag } from "App/Scenes/Bag"
import { SignIn, Initializing, Welcome, SignInOrApply } from "App/Scenes/SignIn"
import { Product } from "App/Scenes/Product"
import { Account } from "App/Scenes/Account"
import { Image, Dimensions } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
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
    Welcome,
    SignInOrApply,
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

// class CustomNavigator extends React.Component {
//   static router = {
//     ...MainNavigator.router,
//   }

//   render() {
//     const { navigation } = this.props
//     const screenHeight = Math.round(Dimensions.get("window").height)
//     const height = screenHeight - 106

//     return (
//       <NavigationContainer style={{ flex: 1 }}>
//         <NavigationEvents
//           onWillFocus={payload => console.log("will focus", payload)}
//           onDidFocus={payload => console.log("did focus", payload)}
//           onWillBlur={payload => console.log("will blur", payload)}
//           onDidBlur={payload => console.log("did blur", payload)}
//         />
//         <MainNavigator navigation={navigation} />
//       </NavigationContainer>
//     )
//   }
// }

const CustomNavigator = props => {
  const { navigation } = props
  const screenHeight = Math.round(Dimensions.get("window").height)
  const insets = useSafeArea()
  const height = screenHeight - 106

  return (
    <NavigationContainer style={{ flex: 1, marginTop: insets.top }}>
      <NavigationEvents
        onWillFocus={payload => console.log("will focus", payload)}
        onDidFocus={payload => console.log("did focus", payload)}
        onWillBlur={payload => console.log("will blur", payload)}
        onDidBlur={payload => console.log("did blur", payload)}
      />
      <MainNavigator navigation={navigation} />
    </NavigationContainer>
  )
}
CustomNavigator.router = {
  ...MainNavigator.router,
}

const SwitchNavigator = createSwitchNavigator(
  {
    Initializing,
    AuthStack,
    Home: CustomNavigator,
  },
  {
    initialRouteName: "Initializing",
  }
)

// const Outer = styled.View`
//   flex: 1;
//   background-color: turquoise;
// `

const NavigationContainer = styled.View`
  background-color: black;
`

export const AppContainer = createAppContainer(SwitchNavigator)
