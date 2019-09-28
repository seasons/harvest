import { Navigation } from "react-native-navigation"

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: "BottomTabsId",
        children: [
          {
            component: {
              name: "SignIn",
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "Sign In",
                },
              },
            },
          },
        ],
      },
    },
  })

export const goHome = () =>
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
                  icon: require("../assets/images/Home.png"),
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
                  icon: require("../assets/images/Browse.png"),
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
                  icon: require("../assets/images/Bag.png"),
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
                  icon: require("../assets/images/Account.png"),
                },
              },
            },
          },
        ],
      },
    },
  })
