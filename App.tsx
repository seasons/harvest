import { Bag } from "./Scenes/Bag"
import { Profile, PaymentAndShipping } from "./Scenes/Account"
import { Home } from "./Scenes/Home"
import { Browse } from "./Scenes/Browse"
import { Navigation } from "react-native-navigation"
import { EditView } from "./Scenes/Account/PaymentAndShipping/EditView"

export function start() {
  Navigation.registerComponent("Home", () => Home)
  Navigation.registerComponent("Browse", () => Browse)
  Navigation.registerComponent("Bag", () => Bag)
  Navigation.registerComponent("Account", () => Profile)
  Navigation.registerComponent("Account.PaymentAndShipping", () => PaymentAndShipping)
  Navigation.registerComponent("Account.EditView", () => EditView)

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      layout: {
        componentBackgroundColor: "black",
        orientation: ["portrait"],
        direction: "ltr",
      },
      bottomTabs: {
        titleDisplayMode: "alwaysHide",
        backgroundColor: "black",
        hideShadow: true,
      },
      bottomTab: {
        iconColor: "#4D4D4D",
        selectedIconColor: "#fff",
      },
      topBar: {
        visible: false,
      },
    })

    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: "Home",
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: require("./assets/images/Home.png"),
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: "Browse",
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: require("./assets/images/Browse.png"),
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: "Bag",
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: require("./assets/images/Bag.png"),
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: "Account",
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: require("./assets/images/Account.png"),
                  },
                },
              },
            },
          ],
        },
      },
    })
  })
}
