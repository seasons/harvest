import { Box } from "App/Components"
import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { Dimensions } from "react-native"
import Svg, { Defs, G, LinearGradient, Path, Stop, Use } from "react-native-svg"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"

export const BrowseItemLoader = props => (
  <G>
    <Rect x="0" y="0" width="240" height="184" />
    <Rect x="0" y="5" width="120" height="8" />
    <Rect x="0" y="26" width="80" height="8" />
    <Rect x="0" y="36" width="90" height="8" />
  </G>
)

export const TabBarLoader = props => (
  <Svg width={375} height={69} {...props}>
    <Defs>
      <Path id="prefix__b" d="M0 0h375v68H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <G transform="translate(0 1)">
        <Use fill="#000" xlinkHref="#prefix__b" />
        <Use fill="#FFF" xlinkHref="#prefix__b" />
      </G>
      <Path fill="#F2F2F2" d="M177 25h59v7h-59zM266 25h54v7h-54zM352 25h54v7h-54z" />
      <G fill="#F2F2F2">
        <Path d="M20 25h20v7H20zM77 25h64v7H77z" />
      </G>
    </G>
  </Svg>
)

export const BrowseLoader = props => {
  const { width, height } = Dimensions.get("window")

  const cardWidth = width / 2 - 7

  // const renderCard =

  return (
    <ContentLoader height={676}>
      <>
        <Rect x="0" y="100" width={cardWidth} height="240" />
        <Rect x="5" y="250" width="120" height="8" />
        <Rect x="5" y="260" width="80" height="8" />
        <Rect x="5" y="270" width="90" height="8" />
      </>
    </ContentLoader>
  )
}

const HeaderContainer = animated(styled(Box)`
  height: 100;
  position: absolute;
`)
