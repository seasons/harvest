import styled from "styled-components/native"
import { View } from "react-native"
import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  background,
  BackgroundProps,
  bottom,
  BottomProps,
  display,
  DisplayProps,
  flexBasis,
  FlexBasisProps,
  flexDirection,
  FlexDirectionProps,
  flexWrap,
  FlexWrapProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  order,
  OrderProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  style,
  width,
  WidthProps,
  zIndex,
  ZIndexProps,
} from "styled-system"
import { ClassAttributes, HTMLAttributes } from "react"

const flexGrow = style({
  prop: "flexGrow",
})

export interface FlexProps
  extends AlignItemsProps,
    AlignContentProps,
    BackgroundProps,
    BottomProps,
    DisplayProps,
    FlexBasisProps,
    FlexDirectionProps,
    FlexWrapProps,
    HeightProps,
    JustifyContentProps,
    MaxHeightProps,
    MaxWidthProps,
    OrderProps,
    PositionProps,
    SpaceProps,
    WidthProps,
    ZIndexProps {
  flexGrow?: number | string
}

/**
 * A utility component that encapsulates flexbox behavior
 */
export const Flex = styled(View)<FlexProps>`
  display: flex;
  ${alignContent};
  ${alignItems};
  ${background};
  ${bottom};
  ${display};
  ${flexBasis};
  ${flexDirection};
  ${flexGrow};
  ${flexWrap};
  ${height};
  ${justifyContent};
  ${maxHeight};
  ${maxWidth};
  ${order};
  ${position};
  ${space};
  ${width};
  ${zIndex};
`

Flex.displayName = "Flex"
