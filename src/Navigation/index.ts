import { Navigation } from "react-native-navigation"
import { bottomTabs } from "./tabs"

export const goToWelcome = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: "Home",
      },
    },
  })

export const goToProduct = (componentId, id) =>
  Navigation.push(componentId, {
    component: {
      name: "Product",
      passProps: {
        id,
      },
      options: {
        bottomTabs: {
          visible: false,
        },
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
