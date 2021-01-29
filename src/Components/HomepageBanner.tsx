import { color } from "App/utils/color"
import { CloseXIcon } from "Assets/icons"
import React, { ComponentType, useState } from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import { Box } from "./Box"
import { Flex } from "./Flex"
import { Separator } from "./Separator"
import { Sans } from "./Typography"

export interface HomepageBannerProps {
  text: string
  subText: ComponentType
  Icon?: ComponentType
  onPress: () => void
}

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const HomepageBanner: React.FC<HomepageBannerProps> = ({ Icon, text, subText, onPress }) => {
  const [show, setShow] = useState(true)

  if (!show) {
    return <></>
  }

  return (
    <>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center" pt={2}>
        <TouchableOpacity onPress={onPress}>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center" pl={2}>
            {!!Icon && <Box pr={2}>{Icon}</Box>}
            <Flex flexDirection="column" style={{ width: windowWidth - 110 }}>
              {!!text && <Sans size="4">{text}</Sans>}
              {!!subText && subText}
            </Flex>
          </Flex>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShow(false)}>
          <Box p={2}>
            <CloseXIcon color={color("black25")} />
          </Box>
        </TouchableOpacity>
      </Flex>
      <Box px={2} pt={3} pb={4}>
        <Separator />
      </Box>
    </>
  )
}
