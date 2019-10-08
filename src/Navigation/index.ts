import { Navigation } from "react-native-navigation"
import { bottomTabs } from "./tabs"

export const goToWelcome = () =>
  Navigation.setRoot({
    root: {
      component: {
        // name: "Notifications",
        // name: "SignIn",
        name: "Home",
      },
    },
  })

export const goToSignIn = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: "SignIn",
      },
    },
  })

export const goToBrowse = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: bottomTabs,
      component: {
        name: "Browse",
      },
    },
  })

export const goHome = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: bottomTabs,
      component: {
        name: "Home",
      },
    },
  })

export const goToBag = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: bottomTabs,
      component: {
        name: "Bag",
      },
    },
  })
