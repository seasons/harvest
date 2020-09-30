import { ShareIcon } from "Assets/icons/ShareIcon"
import React from "react"
import { TouchableOpacity } from "react-native"
import Share from "react-native-share"
import styled from "styled-components/native"

import { Flex } from "./"
import { themeProps } from "./Theme"

type ShareIconVariant = "blackBackground" | "whiteBackground" | "black04Background"

export const ShareButton: React.FC<{
  onPress?: () => void
  variant?: ShareIconVariant
  options: {
    title: string
    message: string
    url?: string
    icon?: string
  }
}> = ({ onPress, variant, options: { title, message, url, icon } }) => {
  const options = {
    title,
    message,
    url,
    excludedActivityTypes: [],
    activityItemSources: [
      {
        // For sharing url with custom title.
        placeholderItem: { type: "url", content: url },
        item: {
          default: {
            type: "url",
            content: `${message} ${url}`,
          },
        },
        subject: {
          default: title,
        },
        linkMetadata: { originalUrl: url, url, title, image: icon },
      },
    ],
  }

  const getColorsForVariant = (variant: ShareIconVariant) => {
    const {
      colors: { black100, white100, black10, black04 },
    } = themeProps

    switch (variant) {
      case "blackBackground":
        return {
          backgroundColor: black100,
          arrowColor: white100,
        }
      case "whiteBackground":
        return {
          backgroundColor: white100,
          arrowColor: black100,
        }
      case "black04Background":
        return {
          backgroundColor: black04,
          arrowColor: black100,
        }
      default:
        return {
          backgroundColor: black10,
          arrowColor: black100,
        }
    }
  }

  const variantColors = getColorsForVariant(variant)

  return (
    <TouchableOpacity
      onPress={
        !!onPress
          ? onPress
          : () => {
              Share.open(options)
                .then((res) => {
                  console.log(res)
                })
                .catch((err) => {
                  err && console.log(err)
                })
            }
      }
    >
      <Wrapper backgroundColor={variantColors.backgroundColor}>
        <ShareIcon color={variantColors.arrowColor} />
      </Wrapper>
    </TouchableOpacity>
  )
}

const Wrapper = styled(Flex)<{ backgroundColor: string }>`
  flex-direction: row;
  border-radius: 100;
  background-color: ${(p) => p.backgroundColor};
  height: 40;
  width: 40;
  align-items: center;
  justify-content: center;
`
