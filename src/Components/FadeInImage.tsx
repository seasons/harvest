import React, { useState } from "react"
import { Image, ImageProps, View } from "react-native"
import { useSpring, animated } from "react-spring/native.cjs"
import styled from "styled-components/native"

const AnimatedView = animated(View)

export const FadeInImage: React.FC<ImageProps> = props => {
  const [show, setShow] = useState(false)
  const animation = useSpring({ opacity: show ? 1 : 0, from: { opacity: 0 } })

  return (
    <Container>
      <AnimatedView style={animation as any}>
        <Image
          {...props}
          onLoadEnd={() => {
            const minimumWait = 100
            const staggerNonce = 200 * Math.random()

            setTimeout(() => {
              setShow(true)
            }, minimumWait + staggerNonce)
          }}
        />
      </AnimatedView>
    </Container>
  )
}

const Container = styled(View)`
  background-color: #f6f6f6;
`
