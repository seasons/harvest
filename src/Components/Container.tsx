import React from "react"
import styled from "styled-components/native"
import { SafeAreaView } from "react-native"

export const Container = ({ children }) => {
  return (
    <Outer>
      <Content>
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </Content>
    </Outer>
  )
}

const Outer = styled.View`
  flex: 1;
  background-color: black;
`

const Content = styled.View`
  height: 100%;
  background-color: white;
  overflow: hidden;
  margin-bottom: 15;
`
