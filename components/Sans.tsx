import styled from "styled-components/native"
import { typography } from "styled-system"

interface SansProps {
  size: "large" | "medium" | "small" | "tiny"
}

export const Sans = styled.Text<SansProps>`
  ${p => {
    switch (p.size) {
      case "large":
        return `
        font-size: 24px;
        line-height: 32pt;
        `
        break
      case "small":
        return `
        font-size: 18px;
        line-height: 24pt;
        `
        break
      case "tiny":
        return `
        font-size: 14px;
        line-height: 24pt;
        `
        break
      default:
        return `
        font-size: 18px;
        line-height: 20pt;
        `
    }
  }}
  ${typography}
`
