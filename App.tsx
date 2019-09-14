import React from "react"
import styled from "styled-components/native"
import { Bag } from "./Scenes/Bag"
import { Profile } from "./Scenes/Profile"
import { MembershipInfo } from "./Scenes/MembershipInfo"
import { SignInOrApply } from "./Scenes/SignIn"

export default function App() {
  return (
    <>
      <SignInOrApply />
    </>
  )
}

const Section = styled.View`
  padding: 10px;
  background: ${p => (p.dark ? "black" : "white")};
`
