import React from "react"
import { StyleSheet } from "react-native"
import { Body, Container, Button, Header, Text, Title, Content, StyleProvider } from "native-base"
import { Box } from "./components"
import { Palette } from "./screens/Palette"
import styled from "styled-components/native"
import getTheme from "./native-base-theme/components"
import seasons from "./native-base-theme/variables/seasons"

const theme = getTheme(seasons)

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
    <StyleProvider style={theme}>
      <Palette />
    </StyleProvider>
  )
}

const Section = styled.View`
  padding: 10px;
  background: ${p => (p.dark ? "black" : "white")};
`
