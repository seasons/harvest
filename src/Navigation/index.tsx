import { Account, PaymentAndShipping } from "App/Scenes/Account"
import { PersonalPreferences } from "App/Scenes/Account/PersonalPreferences"
import { Bag, CurrentRotation } from "App/Scenes/Bag"
import { Browse, Filters } from "App/Scenes/Browse"
import { Home } from "App/Scenes/Home"
import { Product } from "App/Scenes/Product"
import SplashScreen from "react-native-splash-screen"
import { FinishProductRequest, ProductRequest, ProductRequestConfirmation } from "App/Scenes/ProductRequest"
import { Reservation, ReservationConfirmation } from "App/Scenes/Reservation"
import {
  AllowNotifications,
  Initializing,
  ResetPassword,
  ResetPasswordConfirmation,
  SignIn,
  Welcome,
} from "App/Scenes/SignIn"
import { Webview } from "App/Scenes/Webview"
import { color } from "App/Utils"
import React, { useEffect, useState } from "react"
import { Image } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MembershipInfo } from "Scenes/Account/MembershipInfo"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { TabBar } from "./TabBar"
import { ProductRequestGallery } from "App/Scenes/ProductRequest/Components"

const ModalStack = createStackNavigator()
const RootStack = createStackNavigator()
const HomeStack = createStackNavigator()
const BagStack = createStackNavigator()
const AccountStack = createStackNavigator()
const BrowseStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const defaultOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: color("white100"),
    opacity: 1,
  },
}

const getActiveRouteName = state => {
  const route = state.routes[state.index]

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state)
  }

  return route.name
}

export const AppContainer = () => {
  const routeNameRef = React.useRef()
  const navigationRef = React.useRef()
  const [currentScreen, setCurrentScreen] = useState("Home")
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = getActiveRouteName(state)

        if (previousRouteName !== currentRouteName) {
          setCurrentScreen(currentRouteName)
        }

        routeNameRef.current = currentRouteName
      }}
    >
      <RootStack.Navigator mode="modal" initialRouteName="Main" screenOptions={{ ...defaultOptions }}>
        <RootStack.Screen name="Main" options={{ headerShown: false }}>
          {() => <TabsStack currentScreen={currentScreen} />}
        </RootStack.Screen>
        <RootStack.Screen name="Modal" component={ModalStackScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const TabsStack = ({ currentScreen }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        // https://reactnavigation.org/docs/en/bottom-tab-navigator.html
        // @ts-ignore
        safeAreaInset: { bottom: "never" },
      }}
      tabBar={props => <TabBar {...props} currentScreen={currentScreen} />}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Browse" component={BrowseStackScreen} />
      <Tab.Screen name="Bag" component={BagStackScreen} />
      <Tab.Screen name="Account" component={AccountStackScreen} />
    </Tab.Navigator>
  )
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{ ...defaultOptions }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Product" component={Product} />
    </HomeStack.Navigator>
  )
}

const BrowseStackScreen = () => {
  return (
    <BrowseStack.Navigator initialRouteName="Browse" screenOptions={{ ...defaultOptions }}>
      <BrowseStack.Screen name="Browse" component={Browse} />
      <BrowseStack.Screen name="Product" component={Product} />
    </BrowseStack.Navigator>
  )
}

const BagStackScreen = () => {
  return (
    <BagStack.Navigator initialRouteName="Bag" screenOptions={{ ...defaultOptions }}>
      <BagStack.Screen name="Bag" component={Bag} />
      <BagStack.Screen name="Product" component={Product} />
      <BagStack.Screen name="CurrentRotation" component={CurrentRotation} />
    </BagStack.Navigator>
  )
}

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator initialRouteName="Account" screenOptions={{ ...defaultOptions }}>
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen name="MembershipInfo" component={MembershipInfo} />
      <AccountStack.Screen name="PaymentAndShipping" component={PaymentAndShipping} />
      <AccountStack.Screen name="PersonalPreferences" component={PersonalPreferences} />
      <AccountStack.Screen name="Webview" component={Webview} />
      <AccountStack.Screen name="ProductRequest" component={ProductRequest} />
      <AccountStack.Screen name="ProductRequestConfirmation" component={ProductRequestConfirmation} />
      <AccountStack.Screen name="ProductRequestGallery" component={ProductRequestGallery} />
    </AccountStack.Navigator>
  )
}

const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <ModalStack.Screen name="FiltersModal" component={Filters} />
      <ModalStack.Screen name="ResetPasswordModal" component={ResetPassword} />
      <ModalStack.Screen name="ResetPasswordConfirmationModal" component={ResetPasswordConfirmation} />
    </ModalStack.Navigator>
  )
}

// const ReservationModal = DismissableStackNavigator(
//   {
//     Reservation,
//     ReservationConfirmation,
//   },
//   {
//     headerMode: "none",
//   }
// )
