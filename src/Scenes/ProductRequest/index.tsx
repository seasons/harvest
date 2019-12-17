import { Container } from "Components/Container"
import React, { useEffect, useState } from "react"
import * as Animatable from "react-native-animatable"
import { connect } from "react-redux"

export const ProductRequestComponent = (props: any) => {
  return (
    <Container>
      <Animatable.View animation="fadeIn" duration={300}>
      </Animatable.View>
    </Container>
  )
}

const mapStateToProps = state => {
  return {}
}

export const ProductRequest = connect(mapStateToProps)(ProductRequestComponent)
