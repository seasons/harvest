import React from "react"
import styled from "styled-components/native"
import { Bag } from "./Scenes/Bag"
import { Profile } from "./Scenes/Profile"
import { MembershipInfo } from "./Scenes/MembershipInfo"
import { SignInOrApply, SignIn } from "./Scenes/SignIn"

export default function App() {
  return (
    <>
      <SignIn />
    </>
  )
}

const Section = styled.View`
  padding: 10px;
  background: ${p => (p.dark ? "black" : "white")};
`
