import styled from "styled-components/native"
import { typography } from "styled-system"
import { fontFamily } from "./platform/fonts"

interface SansProps {
  size: "large" | "medium" | "small" | "tiny"
}

export const Sans = styled.Text<SansProps>`
  font-family: ${fontFamily.sans.regular};

  ${p => {
    switch (p.size) {
      case "large":
        return `
        font-size: 24px;
        line-height: 32;
        `
        break
      case "small":
        return `
        font-size: 16px;
        line-height: 24;
        `
        break
      case "tiny":
        return `
        font-size: 14px;
        line-height: 24;
        `
        break
      default:
        return `
        font-size: 18px;
        line-height: 20;
        `
    }
  }}
  ${typography}
`
