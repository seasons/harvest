import React from "react"
import { StyleSheet } from "react-native"
import { Body, Container, Button, Header, Text, Title, Content, StyleProvider } from "native-base"
import { Box } from "./components"
import { Palette } from "./screens/Palette"
import styled from "styled-components/native"
import getTheme from "./native-base-theme/components"
import seasons from "./native-base-theme/variables/seasons"
import { Bag } from "./Scenes/Bag"
import { Profile } from "./Scenes/Profile"
import { registerScreens } from "./screens"
import { Navigation } from "react-native-navigation"

// const theme = getTheme(seasons)

// export default function App() {
//   return (
//     <StyleProvider style={theme}>
//       <Container>
//         <Header>
//           <Body>
//             <Text>Buttons</Text>
//           </Body>
//         </Header>
//         <Content>
//           <Bag />
//           <Section dark>
//             <Box py={3}>
//               <Box py={2}>
//                 <Text style={{ color: "white" }}>Primary Light - Active</Text>
//               </Box>
//               <Button rounded light block>
//                 <Text>Buy</Text>
//               </Button>
//             </Box>

//             <Box py={3}>
//               <Box py={2}>
//                 <Text style={{ color: "white" }}>Primary Light - Inactive</Text>
//               </Box>
//               <Button rounded block light disabled>
//                 <Text>Buy</Text>
//               </Button>
//             </Box>

//             <Box py={3}>
//               <Box py={2}>
//                 <Text style={{ color: "white" }}>Secondary Light - Active</Text>
//               </Box>
//               <Button rounded block bordered disabled>
//                 <Text>Buy</Text>
//               </Button>
//             </Box>
//           </Section>
//           <Section>
//             <Button rounded dark block>
//               <Text>Buy</Text>
//             </Button>
//           </Section>
//         </Content>
//       </Container>
//     </StyleProvider>
//   )
// }

export default function App() {
  return (
    <>
      <Bag />
      <Profile />
    </>
  )
}

export function start() {
  registerScreens()

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      layout: {
        componentBackgroundColor: '#fff',
        orientation: ['portrait'],
        direction: 'ltr'
      },
      bottomTabs: {
        titleDisplayMode: 'alwaysShow'
      },
      bottomTab: {
        selectedIconColor: '#000',
        selectedTextColor: '#000'
      },
    });

    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Layouts'
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: 'Layouts',
                    icon: require('../img/layouts.png'),
                    fontSize: 10,
                  }
                }
              }
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Options'
                    }
                  }
                ],
                options: {
                  topBar: {
                    title: {
                      text: 'Default Title'
                    }
                  },
                  bottomTab: {
                    text: 'Options',
                    icon: require('../img/options.png'),
                  }
                }
              }
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Navigation'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    });
  })
}

const Section = styled.View`
  padding: 10px;
  background: ${p => (p.dark ? "black" : "white")};
`
