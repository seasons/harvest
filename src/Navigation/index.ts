import { Navigation } from "react-native-navigation"
import { bottomTabs } from "./tabs"

export const goToWelcome = () =>
  Navigation.setRoot({
    root: {
      component: {
        // name: "Notifications",
        // name: "SignIn",
        name: "Bag",
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
        name: "Bag",
      },
    },
  })

export const goHome = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: bottomTabs,
      component: {
        name: "Bag",
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
