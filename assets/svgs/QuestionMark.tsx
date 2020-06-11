import * as React from "react"
import Svg, { G, Path, Rect, Text, TSpan } from "react-native-svg"

export const QuestionMark = (props) => {
  return (
    <Svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h20v36H0z" />
        <G transform="translate(0 5)">
          <Rect stroke="#000" strokeWidth={2} fill="#FFF" x={1} y={1} width={18} height={24} rx={5.6} />
          <Text fontFamily="ProximaNova-Bold, Proxima Nova" fontSize={16} fontWeight="bold" fill="#000">
            <TSpan x={6} y={18}>
              {"?"}
            </TSpan>
          </Text>
        </G>
      </G>
    </Svg>
  )
}
