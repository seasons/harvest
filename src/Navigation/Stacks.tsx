import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { Schema } from "App/Navigation"
import {
  Account,
  EditPaymentAndShipping,
  PaymentAndShipping,
  EditShippingAddress,
  EditStylePreferences,
  EditMeasurements,
} from "App/Scenes/Account"
import { PersonalPreferences } from "App/Scenes/Account/PersonalPreferences"
import { Bag, CurrentRotation } from "App/Scenes/Bag"
import { Brand } from "App/Scenes/Brand"
import { Brands } from "App/Scenes/Brands"
import { Tag } from "App/Scenes/Tag"
import { Browse, Filters } from "App/Scenes/Browse"
import { DebugMenu } from "App/Scenes/DebugMenu"
import { Faq } from "App/Scenes/Faq"
import { Home } from "App/Scenes/Home"
import { Product, SaveProduct } from "App/Scenes/Product"
import { FinishProductRequest, ProductRequest, ProductRequestConfirmation } from "App/Scenes/ProductRequest"
import { ProductRequestGallery } from "App/Scenes/ProductRequest/Components"
import { Reservation, ReservationConfirmation } from "App/Scenes/Reservation"
import {
  ReservationFeedback,
  ReservationFeedbackConfirmation,
  ReservationFeedbackFinish,
} from "App/Scenes/ReservationFeedback"
import { AllowNotifications, ResetPassword, ResetPasswordConfirmation, SignIn } from "App/Scenes/SignIn"
import { Webview } from "App/Scenes/Webview"
import { color } from "App/utils"
import React from "react"
import { MembershipInfo } from "Scenes/Account/MembershipInfo"
import { NavBar } from "./NavBar"
import { ResumeConfirmation, PauseConfirmation, ExtendPauseConfirmation } from "App/Components/Pause"
import { CreateAccount } from "App/Scenes/CreateAccount"

const HomeStack = createStackNavigator()
const BagStack = createStackNavigator()
const AccountStack = createStackNavigator()
const BrowseStack = createStackNavigator()
const ModalStack = createStackNavigator()
const ModalAndMainStack = createStackNavigator()

const Tab = createBottomTabNavigator()

const defaultOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: color("white100"),
    opacity: 1,
  },
}

export const ModalAndMainScreens = ({ currentScreen }) => {
  return (
    <ModalAndMainStack.Navigator
      mode="modal"
      initialRouteName={Schema.StackNames.Main}
      screenOptions={{
        ...defaultOptions,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <ModalAndMainStack.Screen name={Schema.StackNames.Main} options={{ headerShown: false }}>
        {() => <TabsStack currentScreen={currentScreen} />}
      </ModalAndMainStack.Screen>
      <ModalAndMainStack.Screen name={Schema.StackNames.Modal} component={ModalStackScreen} />
    </ModalAndMainStack.Navigator>
  )
}

const TabsStack = ({ currentScreen }) => {
  return (
    <Tab.Navigator
      initialRouteName={Schema.PageNames.Home}
      tabBarOptions={{
        // https://reactnavigation.org/docs/en/bottom-tab-navigator.html
        // @ts-ignore
        safeAreaInset: { bottom: "never" },
      }}
      tabBar={(props) => {
        return <NavBar {...props} currentScreen={currentScreen} />
      }}
    >
      <Tab.Screen name={Schema.StackNames.HomeStack} component={HomeStackScreen} />
      <Tab.Screen name={Schema.StackNames.BrowseStack} component={BrowseStackScreen} />
      <Tab.Screen name={Schema.StackNames.BagStack} component={BagStackScreen} />
      <Tab.Screen name={Schema.StackNames.AccountStack} component={AccountStackScreen} />
    </Tab.Navigator>
  )
}

const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ModalStack.Screen name={Schema.PageNames.FiltersModal} component={Filters} />
      <ModalStack.Screen name={Schema.PageNames.ResetPasswordModal} component={ResetPassword} />
      <ModalStack.Screen name={Schema.PageNames.ResetPasswordConfirmationModal} component={ResetPasswordConfirmation} />
      <ModalStack.Screen name={Schema.PageNames.SignInModal} component={SignIn} />
      <ModalStack.Screen name={Schema.PageNames.CreateAccountModal} component={CreateAccount} />
      <ModalStack.Screen name={Schema.PageNames.EditShippingAddress} component={EditShippingAddress} />
      <ModalStack.Screen name={Schema.PageNames.EditStylePreferences} component={EditStylePreferences} />
      <ModalStack.Screen name={Schema.PageNames.EditMeasurements} component={EditMeasurements} />
      <ModalStack.Screen name={Schema.PageNames.ReservationFeedbackModal} component={ReservationFeedback} />
      <ModalStack.Screen
        name={Schema.PageNames.ReservationFeedbackConfirmationModal}
        component={ReservationFeedbackConfirmation}
      />
      <ModalStack.Screen name={Schema.PageNames.ReservationFeedbackFinishModal} component={ReservationFeedbackFinish} />
      <ModalStack.Screen name={Schema.PageNames.AllowNotificationsModal} component={AllowNotifications} />
      <ModalStack.Screen name={Schema.PageNames.SaveProductModal} component={SaveProduct} />
      <ModalStack.Screen name={Schema.PageNames.DebugMenu} component={DebugMenu} />
      <ModalStack.Screen name={Schema.PageNames.ResumeConfirmation} component={ResumeConfirmation} />
      <ModalStack.Screen name={Schema.PageNames.PauseConfirmation} component={PauseConfirmation} />
      <ModalStack.Screen name={Schema.PageNames.ExtendPauseConfirmation} component={ExtendPauseConfirmation} />
    </ModalStack.Navigator>
  )
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName={Schema.PageNames.Home} screenOptions={{ ...defaultOptions }}>
      <HomeStack.Screen name={Schema.PageNames.Home} component={Home} />
      <HomeStack.Screen name={Schema.PageNames.Product} component={Product} initialParams={{ id: "" }} />
      <HomeStack.Screen name={Schema.PageNames.Brand} component={Brand} initialParams={{ id: "" }} />
      <HomeStack.Screen name={Schema.PageNames.Tag} component={Tag} />
      <HomeStack.Screen name={Schema.PageNames.Brands} component={Brands} />
      <HomeStack.Screen name={Schema.PageNames.Webview} component={Webview} />
    </HomeStack.Navigator>
  )
}

const BrowseStackScreen = () => {
  return (
    <BrowseStack.Navigator initialRouteName={Schema.PageNames.Browse} screenOptions={{ ...defaultOptions }}>
      <BrowseStack.Screen name={Schema.PageNames.Browse} component={Browse} initialParams={{ sizeFilters: [] }} />
      <BrowseStack.Screen name={Schema.PageNames.Product} component={Product} initialParams={{ id: "" }} />
      <BrowseStack.Screen name={Schema.PageNames.Brand} component={Brand} initialParams={{ id: "" }} />
    </BrowseStack.Navigator>
  )
}

const BagStackScreen = () => {
  return (
    <BagStack.Navigator initialRouteName={Schema.PageNames.Bag} screenOptions={{ ...defaultOptions }}>
      <BagStack.Screen name={Schema.PageNames.Bag} component={Bag} />
      <BagStack.Screen name={Schema.PageNames.Webview} component={Webview} />
      <BagStack.Screen name={Schema.PageNames.Product} component={Product} initialParams={{ id: "" }} />
      <BrowseStack.Screen name={Schema.PageNames.Brand} component={Brand} initialParams={{ id: "" }} />
      <BagStack.Screen name={Schema.PageNames.CurrentRotation} component={CurrentRotation} />
      <BagStack.Screen name={Schema.PageNames.Faq} component={Faq} />
      <BagStack.Screen name={Schema.PageNames.Reservation} component={Reservation} />
      <BagStack.Screen name={Schema.PageNames.ReservationConfirmation} component={ReservationConfirmation} />
    </BagStack.Navigator>
  )
}

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator initialRouteName={Schema.PageNames.Account} screenOptions={{ ...defaultOptions }}>
      <AccountStack.Screen name={Schema.PageNames.Account} component={Account} />
      <AccountStack.Screen name={Schema.PageNames.MembershipInfo} component={MembershipInfo} />
      <AccountStack.Screen name={Schema.PageNames.PaymentAndShipping} component={PaymentAndShipping} />
      <AccountStack.Screen name={Schema.PageNames.EditPaymentAndShipping} component={EditPaymentAndShipping} />
      <AccountStack.Screen name={Schema.PageNames.PersonalPreferences} component={PersonalPreferences} />
      <AccountStack.Screen name={Schema.PageNames.Webview} component={Webview} />
      <AccountStack.Screen name={Schema.PageNames.ProductRequest} component={ProductRequest} />
      <AccountStack.Screen name={Schema.PageNames.FinishProductRequest} component={FinishProductRequest} />
      <AccountStack.Screen name={Schema.PageNames.ProductRequestConfirmation} component={ProductRequestConfirmation} />
      <AccountStack.Screen name={Schema.PageNames.ProductRequestGallery} component={ProductRequestGallery} />
      <AccountStack.Screen name={Schema.PageNames.Faq} component={Faq} />
    </AccountStack.Navigator>
  )
}
