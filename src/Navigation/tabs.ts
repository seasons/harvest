export const bottomTabs = {
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
}
