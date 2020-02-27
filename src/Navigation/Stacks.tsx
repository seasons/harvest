import { Account, PaymentAndShipping } from "App/Scenes/Account"
import { PersonalPreferences } from "App/Scenes/Account/PersonalPreferences"
import { Bag, CurrentRotation } from "App/Scenes/Bag"
import { Browse, Filters } from "App/Scenes/Browse"
import { Home } from "App/Scenes/Home"
import { Product } from "App/Scenes/Product"
import { FinishProductRequest, ProductRequest, ProductRequestConfirmation } from "App/Scenes/ProductRequest"
import { Reservation, ReservationConfirmation } from "App/Scenes/Reservation"
import { AllowNotifications, ResetPassword, ResetPasswordConfirmation, SignIn, Welcome } from "App/Scenes/SignIn"
import { ProductRequestGallery } from "App/Scenes/ProductRequest/Components"
import { Webview } from "App/Scenes/Webview"
import React from "react"
import { MembershipInfo } from "Scenes/Account/MembershipInfo"
import { NavBar } from "./NavBar"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { color } from "App/Utils"
import { Faq } from "App/Scenes/Faq"
import { Brand } from "App/Scenes/Brand"

const HomeStack = createStackNavigator()
const BagStack = createStackNavigator()
const AccountStack = createStackNavigator()
const BrowseStack = createStackNavigator()
const ModalStack = createStackNavigator()

const Tab = createBottomTabNavigator()

const defaultOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: color("white100"),
    opacity: 1,
  },
}

export const TabsStack = ({ currentScreen }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        // https://reactnavigation.org/docs/en/bottom-tab-navigator.html
        // @ts-ignore
        safeAreaInset: { bottom: "never" },
      }}
      tabBar={props => {
        return <NavBar {...props} currentScreen={currentScreen} />
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="BrowseStack" component={BrowseStackScreen} />
      <Tab.Screen name="BagStack" component={BagStackScreen} />
      <Tab.Screen name="AccountStack" component={AccountStackScreen} />
    </Tab.Navigator>
  )
}

export const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ModalStack.Screen name="FiltersModal" component={Filters} />
      <ModalStack.Screen name="ResetPasswordModal" component={ResetPassword} />
      <ModalStack.Screen name="ResetPasswordConfirmationModal" component={ResetPasswordConfirmation} />
      <ModalStack.Screen name="SignInModal" component={SignIn} />
      <ModalStack.Screen name="ReservationConfirmationModal" component={ReservationConfirmation} />
      <ModalStack.Screen name="ReservationModal" component={Reservation} />
      <ModalStack.Screen name="AllowNotificationsModal" component={AllowNotifications} />
    </ModalStack.Navigator>
  )
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{ ...defaultOptions }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Product" component={Product} initialParams={{ id: "" }} />
      <BrowseStack.Screen name="Brand" component={Brand} initialParams={{ id: "" }} />
    </HomeStack.Navigator>
  )
}

const BrowseStackScreen = () => {
  return (
    <BrowseStack.Navigator initialRouteName="Browse" screenOptions={{ ...defaultOptions }}>
      <BrowseStack.Screen name="Browse" component={Browse} initialParams={{ sizeFilters: [] }} />
      <BrowseStack.Screen name="Product" component={Product} initialParams={{ id: "" }} />
      <BrowseStack.Screen name="Brand" component={Brand} initialParams={{ id: "" }} />
    </BrowseStack.Navigator>
  )
}

const BagStackScreen = () => {
  return (
    <BagStack.Navigator initialRouteName="Bag" screenOptions={{ ...defaultOptions }}>
      <BagStack.Screen name="Bag" component={Bag} />
      <BagStack.Screen name="Webview" component={Webview} />
      <BagStack.Screen name="Product" component={Product} initialParams={{ id: "" }} />
      <BrowseStack.Screen name="Brand" component={Brand} initialParams={{ id: "" }} />
      <BagStack.Screen name="CurrentRotation" component={CurrentRotation} />
      <BagStack.Screen name="Faq" component={Faq} />
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
      <AccountStack.Screen name="FinishProductRequest" component={FinishProductRequest} />
      <AccountStack.Screen name="ProductRequestConfirmation" component={ProductRequestConfirmation} />
      <AccountStack.Screen name="ProductRequestGallery" component={ProductRequestGallery} />
      <AccountStack.Screen name="Faq" component={Faq} />
    </AccountStack.Navigator>
  )
}
