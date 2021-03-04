import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { ExtendPauseConfirmation, PauseConfirmation, ResumeConfirmation } from "App/Components/Pause"
import { PauseModal } from "App/Components/Pause/PauseModal"
import { navigateTo, Schema } from "App/Navigation"
import {
  Account,
  EditMeasurements,
  EditPaymentAndShipping,
  EditShippingAddress,
  EditStylePreferences,
  PaymentAndShipping,
} from "App/Scenes/Account"
import { useNavigation } from "@react-navigation/native"
import { InviteFromContacts } from "App/Scenes/Account/InviteFriends"
import { UpdatePaymentPlanModal } from "App/Scenes/Account/MembershipInfo/UpdatePaymentPlanModal"
import { EditCreditCard } from "App/Scenes/Account/PaymentAndShipping/EditCreditCard"
import { EditPaymentMethod } from "App/Scenes/Account/PaymentAndShipping/EditPaymentMethod"
import { InvoiceDetail } from "App/Scenes/Account/PaymentAndShipping/InvoiceDetail"
import { PersonalPreferences } from "App/Scenes/Account/PersonalPreferences"
import { Bag, CurrentRotation } from "App/Scenes/Bag"
import { SurpriseMe } from "App/Scenes/Bag/SurpriseMe"
import { Brand } from "App/Scenes/Brand"
import { Brands } from "App/Scenes/Brands"
import { Browse, Filters } from "App/Scenes/Browse"
import { CollectionScene } from "App/Scenes/Collection"
import { CreateAccount } from "App/Scenes/CreateAccount"
import { ApplyPromoCode } from "App/Scenes/CreateAccount/Admitted/ApplyPromoCode/ApplyPromoCode"
import { DebugMenu } from "App/Scenes/DebugMenu"
import { Faq } from "App/Scenes/Faq"
import { FitPicConfirmation, FitPicDetail, ShareFitPicToIG } from "App/Scenes/FitPic"
import { Home } from "App/Scenes/Home"
import { Order, OrderConfirmation } from "App/Scenes/Order"
import { Product, SaveProduct } from "App/Scenes/Product"
import { FinishProductRequest, ProductRequest, ProductRequestConfirmation } from "App/Scenes/ProductRequest"
import { ProductRequestGallery } from "App/Scenes/ProductRequest/Components"
import { ReferralView } from "App/Scenes/ReferralView"
import { Reservation, ReservationConfirmation, ShareReservationToIG } from "App/Scenes/Reservation"
import {
  ReservationFeedback,
  ReservationFeedbackConfirmation,
  ReservationFeedbackFinish,
} from "App/Scenes/ReservationFeedback"
import { AllowNotifications, ResetPassword, ResetPasswordConfirmation, SignIn } from "App/Scenes/SignIn"
import { Tag } from "App/Scenes/Tag"
import { Webview } from "App/Scenes/Webview"
import { color } from "App/utils"
import React from "react"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import { MembershipInfo } from "Scenes/Account/MembershipInfo"
import { Homepage_fitPics as FitPic } from "src/generated/Homepage"
import { NavBar } from "./NavBar"
import { NotificationBar } from "@seasons/eclipse"

const HomeStack = createSharedElementStackNavigator()
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
  const navigation = useNavigation()
  const onClickNotificationBar = (route) => {
    navigateTo(navigation, route)
  }
  return (
    <Tab.Navigator
      initialRouteName={Schema.PageNames.Home}
      tabBarOptions={{
        // https://reactnavigation.org/docs/en/bottom-tab-navigator.html
        // @ts-ignore
        safeAreaInset: { bottom: "never" },
      }}
      tabBar={(props) => {
        return (
          <>
            <NotificationBar onClick={onClickNotificationBar} />
            <NavBar {...props} currentScreen={currentScreen} />
          </>
        )
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
      <ModalStack.Screen name={Schema.PageNames.UpdatePaymentPlanModal} component={UpdatePaymentPlanModal} />
      <ModalStack.Screen name={Schema.PageNames.ResetPasswordModal} component={ResetPassword} />
      <ModalStack.Screen name={Schema.PageNames.ResetPasswordConfirmationModal} component={ResetPasswordConfirmation} />
      <ModalStack.Screen name={Schema.PageNames.SignInModal} component={SignIn} />
      <ModalStack.Screen name={Schema.PageNames.CreateAccountModal} component={CreateAccount} />
      <ModalStack.Screen name={Schema.PageNames.SurpriseMe} component={SurpriseMe} />
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
      <ModalStack.Screen name={Schema.PageNames.ApplyPromoCode} component={ApplyPromoCode} />
      <ModalStack.Screen name={Schema.PageNames.InviteFromContactsModal} component={InviteFromContacts} />
      <ModalStack.Screen name={Schema.PageNames.ShareReservationToIGModal} component={ShareReservationToIG} />
      <ModalStack.Screen name={Schema.PageNames.ShareFitPicToIGModal} component={ShareFitPicToIG} />
      <ModalStack.Screen name={Schema.PageNames.PauseModal} component={PauseModal} />
    </ModalStack.Navigator>
  )
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName={Schema.PageNames.Home} screenOptions={{ ...defaultOptions }}>
      <HomeStack.Screen name={Schema.PageNames.Home} component={Home} />
      <HomeStack.Screen name={Schema.PageNames.Product} component={Product} initialParams={{ id: "" }} />
      <HomeStack.Screen name={Schema.PageNames.Brand} component={Brand} initialParams={{ id: "" }} />
      <HomeStack.Screen
        name={Schema.PageNames.Collection}
        component={CollectionScene}
        initialParams={{ collectionSlug: "" }}
      />
      <HomeStack.Screen name={Schema.PageNames.Tag} component={Tag} />
      <HomeStack.Screen name={Schema.PageNames.Brands} component={Brands} />
      <HomeStack.Screen name={Schema.PageNames.Webview} component={Webview} />
      <HomeStack.Screen name={Schema.PageNames.ReferralView} component={ReferralView} />
      <HomeStack.Screen name={Schema.PageNames.FitPicConfirmation} component={FitPicConfirmation} />
      <HomeStack.Screen name={Schema.PageNames.Order} component={Order} />
      <HomeStack.Screen name={Schema.PageNames.OrderConfirmation} component={OrderConfirmation} />
      <HomeStack.Screen
        name={Schema.PageNames.FitPicDetail}
        component={FitPicDetail}
        sharedElements={(route, otherRoute) => {
          if (otherRoute.name === Schema.PageNames.Home) {
            const { item } = route.params as { item: FitPic }
            return item ? [`fitpic.photo.${item.id}`] : []
          }
        }}
      />
    </HomeStack.Navigator>
  )
}

const BrowseStackScreen = () => {
  return (
    <BrowseStack.Navigator initialRouteName={Schema.PageNames.Browse} screenOptions={{ ...defaultOptions }}>
      <BrowseStack.Screen
        name={Schema.PageNames.Browse}
        component={Browse}
        initialParams={{ sizeFilters: [], categorySlug: "" }}
      />
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
      <BagStack.Screen name={Schema.PageNames.Brand} component={Brand} initialParams={{ id: "" }} />
      <BagStack.Screen name={Schema.PageNames.CurrentRotation} component={CurrentRotation} />
      <BagStack.Screen name={Schema.PageNames.Faq} component={Faq} />
      <BagStack.Screen name={Schema.PageNames.ReferralView} component={ReferralView} />
      <BagStack.Screen name={Schema.PageNames.Reservation} component={Reservation} />
      <BagStack.Screen name={Schema.PageNames.ReservationConfirmation} component={ReservationConfirmation} />
      <BagStack.Screen name={Schema.PageNames.Order} component={Order} />
      <BagStack.Screen name={Schema.PageNames.OrderConfirmation} component={OrderConfirmation} />
    </BagStack.Navigator>
  )
}

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator initialRouteName={Schema.PageNames.Account} screenOptions={{ ...defaultOptions }}>
      <AccountStack.Screen name={Schema.PageNames.Account} component={Account} />
      <AccountStack.Screen name={Schema.PageNames.MembershipInfo} component={MembershipInfo} />
      <AccountStack.Screen name={Schema.PageNames.PaymentAndShipping} component={PaymentAndShipping} />
      <AccountStack.Screen name={Schema.PageNames.InvoiceDetail} component={InvoiceDetail} />
      <AccountStack.Screen name={Schema.PageNames.EditPaymentAndShipping} component={EditPaymentAndShipping} />
      <AccountStack.Screen name={Schema.PageNames.PersonalPreferences} component={PersonalPreferences} />
      <AccountStack.Screen name={Schema.PageNames.Webview} component={Webview} />
      <AccountStack.Screen name={Schema.PageNames.ProductRequest} component={ProductRequest} />
      <AccountStack.Screen name={Schema.PageNames.FinishProductRequest} component={FinishProductRequest} />
      <AccountStack.Screen name={Schema.PageNames.ProductRequestConfirmation} component={ProductRequestConfirmation} />
      <AccountStack.Screen name={Schema.PageNames.ProductRequestGallery} component={ProductRequestGallery} />
      <AccountStack.Screen name={Schema.PageNames.Faq} component={Faq} />
      <AccountStack.Screen name={Schema.PageNames.ReferralView} component={ReferralView} />
      <AccountStack.Screen name={Schema.PageNames.EditPaymentMethod} component={EditPaymentMethod} />
      <AccountStack.Screen name={Schema.PageNames.EditCreditCard} component={EditCreditCard} />
    </AccountStack.Navigator>
  )
}
