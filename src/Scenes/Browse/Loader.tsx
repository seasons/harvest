import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { Dimensions } from "react-native"
import Svg, { Defs, G, Path, Use } from "react-native-svg"

export const BrowseItemLoader = () => (
  <G>
    <Rect x="0" y="0" width="240" height="184" />
    <Rect x="0" y="5" width="120" height="8" />
    <Rect x="0" y="26" width="80" height="8" />
    <Rect x="0" y="36" width="90" height="8" />
  </G>
)

export const TabBarLoader = props => (
  <Svg width={375} height={60} {...props}>
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

export const BrowseLoader: React.FC<{ imageHeight: number }> = props => {
  const { imageHeight } = props
  const { width, height } = Dimensions.get("window")
  const cardWidth = width / 2 - 2

  const renderCard = ({ x, y, maxCardHeight, doesOverlap }) => (
    <>
      <Rect x={x + 0} y={y} width={cardWidth} height={imageHeight > maxCardHeight ? maxCardHeight : imageHeight} />
      {!doesOverlap && <Rect x={x + 8} y={y + imageHeight + 8} width="80" height={8} />}
      {!doesOverlap && <Rect x={x + 8} y={y + imageHeight + 23} width="80" height={8} />}
    </>
  )

  const rowHeight = imageHeight + 45
  const rowCount = Math.floor(height / rowHeight)

  return (
    <ContentLoader height={height} width={width}>
      {[...Array(rowCount)].map((_, index) => {
        const yPosition = index * rowHeight
        const maxCardHeight = height - yPosition - 183
        const doesOverlap = yPosition + rowHeight > height - 190
        return (
          <React.Fragment key={index}>
            {renderCard({ x: 0, y: yPosition, maxCardHeight, doesOverlap })}
            {renderCard({ x: cardWidth + 4, y: yPosition, maxCardHeight, doesOverlap })}
          </React.Fragment>
        )
      })}
      <>
        <Rect x={20} y={height - 156} height={10} width={20} />
        <Rect x={60} y={height - 156} height={10} width={55} />
        <Rect x={140} y={height - 156} height={10} width={30} />
        <Rect x={190} y={height - 156} height={10} width={80} />
        <Rect x={290} y={height - 156} height={10} width={60} />
        <Rect x={340} y={height - 156} height={10} width={55} />
      </>
    </ContentLoader>
  )
}
