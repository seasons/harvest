import React from "react"
import styled from "styled-components/native"
import { Bag } from "./Scenes/Bag/Bag"
import { Profile } from "./Scenes/Profile/Profile"
import { MembershipInfo } from "./Scenes/MembershipInfo/MembershipInfo"

export default function App() {
  return (
    <>
      <MembershipInfo />
    </>
  )
}

const Section = styled.View`
  padding: 10px;
  background: ${p => (p.dark ? "black" : "white")};
`
