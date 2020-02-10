import { Account, PaymentAndShipping } from "App/Scenes/Account"
import { PersonalPreferences } from "App/Scenes/Account/PersonalPreferences"
import { Bag, CurrentRotation } from "App/Scenes/Bag"
import { Browse, Filters } from "App/Scenes/Browse"
import { Collection } from "App/Scenes/Collection"
import { Home } from "App/Scenes/Home"
import { Product } from "App/Scenes/Product"
import {
  FinishProductRequest, ProductRequest, ProductRequestConfirmation
} from "App/Scenes/ProductRequest"
import { Reservation, ReservationConfirmation } from "App/Scenes/Reservation"
import {
  Initializing, ResetPassword, ResetPasswordConfirmation, SignIn, Welcome
} from "App/Scenes/SignIn"
import { Webview } from "App/Scenes/Webview"
import { color } from "App/Utils"
import React, { useState } from "react"
import { Image } from "react-native"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator, TransitionPresets } from "react-navigation-stack"
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

const MainAuthStack = createStackNavigator(
  {
    SignIn,
    Welcome,
    Webview,
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
)

MainAuthStack.navigationOptions = () => {
  return {
    tabBarVisible: false,
  }
}

const ResetPasswordModal = DismissableStackNavigator(
  {
    ResetPassword,
    ResetPasswordConfirmation,
  },
  {
    headerMode: "none",
  }
)

const AuthStack = createStackNavigator(
  {
    MainAuthStack: {
      screen: MainAuthStack,
    },
    ResetPasswordModal: {
      screen: ResetPasswordModal,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
)

const HomeStack = createStackNavigator(
  {
    Home,
    Product,
    Collection,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: color("white100"),
        opacity: 1,
      },
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
      headerShown: false,
      cardStyle: {
        backgroundColor: color("white100"),
        opacity: 1,
      },
    },
  }
)

BrowseStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: shouldRenderTabBar(navigation),
    headerShown: false,
    cardStyle: {
      backgroundColor: color("white100"),
      opacity: 1,
    },
  }
}

const FiltersModal = DismissableStackNavigator(
  {
    Filters,
  },
  {
    headerMode: "none",
  }
)

const ProductRequestModal = DismissableStackNavigator(
  {
    ProductRequest,
    ProductRequestConfirmation,
    FinishProductRequest,
  },
  {
    headerMode: "none",
  }
)

const BagStack = createStackNavigator(
  {
    Bag,
    Product,
    CurrentRotation,
  },
  {
    initialRouteName: "Bag",
    defaultNavigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: color("white100"),
        opacity: 1,
      },
    },
  }
)

BagStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: shouldRenderTabBar(navigation),
    headerShown: false,
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
      headerShown: false,
      cardStyle: {
        backgroundColor: color("white100"),
        opacity: 1,
      },
    },
  }
)

AccountStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: shouldRenderTabBar(navigation),
    headerShown: false,
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
    ProductRequest: ProductRequestModal,
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
        } else if (routeName === "ProductRequest") {
          URL = require(`../../assets/images/Submit.png`)
        } else if (routeName === "Bag") {
          URL = require(`../../assets/images/Bag.png`)
        } else if (routeName === "Account") {
          URL = require(`../../assets/images/Account.png`)
        }

        return <Image source={URL} style={{ opacity: focused ? 1.0 : 0.3 }} />
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        const { routeName } = navigation.state
        if (routeName === "ProductRequest") {
          // Have to navigate in order for screen to pop up modally
          navigation.navigate("ProductRequestModal")
        } else {
          defaultHandler()
        }
      },
    }),
    tabBarComponent: Tabs,
  }
)

const CustomNavigator = props => {
  const [browseFilter, setBrowseFilter] = useState("all")
  const [isReserved, setIsReserved] = useState(false)

  const { navigation } = props
  const screenProps = { browseFilter, setBrowseFilter, isReserved, setIsReserved }

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
    ProductRequestModal: {
      screen: ProductRequestModal,
    },
    FiltersModal: {
      screen: FiltersModal,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    },
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
  background-color: ${color("black100")};
`

export const AppContainer = createAppContainer(SwitchNavigator)
