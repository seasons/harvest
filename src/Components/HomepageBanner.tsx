import { color } from "App/utils/color"
import { CloseXIcon } from "Assets/icons"
import React, { ComponentType, useState } from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import { Box } from "./Box"
import { Flex } from "./Flex"
import { Separator } from "./Separator"
import { Sans } from "./Typography"
import { InviteSVG } from "Assets/svgs/Invite"
import { useNavigation } from "@react-navigation/native"

type BannerProperties = {
  icon: string
  requiredCustomerStatus: string[]
  published: boolean
  route: {
    stack: string
    screen: string
  }
}

type Banner = {
  id: string
  type: string
  title: string
  caption: string
  properties: BannerProperties
}

export interface HomepageBannerProps {
  banner: Banner
}

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const HomepageBanner: React.FC<HomepageBannerProps> = ({ banner }) => {
  const [show, setShow] = useState(true)
  const navigation = useNavigation()

  const icon = banner?.properties?.icon
  const text = banner?.title
  const subText = banner?.caption
  const onPress = () => {
    navigation.navigate(banner?.properties?.route?.stack, {
      screen: banner?.properties?.route?.screen,
    })
  }

  if (!show) {
    return <></>
  }

  let Icon
  if (icon) {
    switch (icon) {
      case "InviteSVG":
        Icon = <InviteSVG />
        break
    }
  }

  return (
    <>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center" pt={2}>
        <TouchableOpacity onPress={onPress}>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center" pl={2}>
            {!!Icon && <Box pr={2}>{Icon}</Box>}
            <Flex flexDirection="column" style={{ width: windowWidth - 110 }}>
              {!!text && <Sans size="4">{text}</Sans>}
              {!!subText && (
                <Sans size="4" color="black50">
                  {subText}
                </Sans>
              )}
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
