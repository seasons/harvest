import { Navigation } from "react-native-navigation"

export const goToWelcome = () =>
  Navigation.setRoot({
    root: {
      component: {
        // name: "Welcome",
        name: "Notifications",
        // name: "SignIn",
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
                  icon: require("../../assets/images/Home.png"),
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
                  icon: require("../../assets/images/Browse.png"),
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
                  icon: require("../../assets/images/Bag.png"),
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
                  icon: require("../../assets/images/Account.png"),
                },
              },
            },
          },
        ],
      },
    },
  })
