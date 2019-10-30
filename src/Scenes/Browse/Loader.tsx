import React from "react"
import Svg, { Defs, LinearGradient, Stop, Path, G, Use } from "react-native-svg"
import ContentLoader from "react-content-loader/native"
import { Col, Row } from "native-base"
import { Box } from "App/Components"

export const BrowseItemLoader = props => (
  <Box m={0.5}>
    <Svg width={184} height={316} {...props}>
      <Defs>
        <LinearGradient x1="79.389%" y1="0%" x2="20.611%" y2="100%" id="prefix__b">
          <Stop stopColor="#F2F2F2" offset="0%" />
          <Stop stopColor="#F2F2F2" offset="100%" />
        </LinearGradient>
        <Path id="prefix__a" d="M0 0h184v240H0z" />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Use fill="url(#prefix__b)" xlinkHref="#prefix__a" />
        <Path fill="#F2F2F2" d="M20 260h88v8H20zM20 284h112v8H20zM20 308h80v8H20z" />
      </G>
    </Svg>
  </Box>
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
  return (
    <>
      <Col>
        <Row>
          <BrowseItemLoader />
          <BrowseItemLoader />
        </Row>
        <Row>
          <BrowseItemLoader />
          <BrowseItemLoader />
        </Row>
      </Col>
      <TabBarLoader />
    </>
  )
}
