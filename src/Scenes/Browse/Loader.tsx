import { Box } from "App/Components"
import { number } from "prop-types"
import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { Dimensions } from "react-native"
import Svg, { Defs, G, LinearGradient, Path, Use } from "react-native-svg"
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

  const renderCard = ({ x, y }) => (
    <>
      <Rect x={x + 0} y={y + 100} width={cardWidth} height="238" />
      <Rect x={x + 10} y={y + 360} width="80" height={8} />
      <Rect x={x + 10} y={y + 390} width="80" height={8} />
      <Rect x={x + 10} y={y + 420} width="30" height={8} />
    </>
  )

  const secondRowHeight = height - 180 - 487

  return (
    <ContentLoader height={height}>
      <Rect x={20} y={20} width={80} height={25} />
      <Rect x={20} y={60} width={180} height={15} />

      {renderCard({ x: 0, y: 0 })}
      {renderCard({ x: cardWidth + 14, y: 0 })}
      <Rect x={0} y={462} width={cardWidth} height={secondRowHeight} />
      <Rect x={cardWidth + 14} y={462} width={cardWidth} height={secondRowHeight} />
      <>
        <Rect x={20} y={height - 180} height={10} width={30} />
        <Rect x={70} y={height - 180} height={10} width={55} />
        <Rect x={140} y={height - 180} height={10} width={30} />
        <Rect x={190} y={height - 180} height={10} width={80} />
        <Rect x={290} y={height - 180} height={10} width={60} />
      </>
    </ContentLoader>
  )
}

const HeaderContainer = animated(styled(Box)`
  height: 100;
  position: absolute;
`)
