import { Box, Display, Flex, Sans } from "App/Components"
import { color } from "App/utils"
import { Instagram } from "Assets/svgs"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"

import { useNavigation } from "@react-navigation/native"

export enum Option {
  ShareToIG = "Share to IG",
  ReferAndEarn = "Refer and Earn",
}

const SectionWrapper = ({ isFirst = false, isLast = false, onPress, children }) => {
  const defaultBorderWidth = 1
  const cornerRadius = 4
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Box
        style={{
          borderWidth: defaultBorderWidth,
          flex: 2,
          display: "flex",
          borderColor: color("black10"),
          borderRightWidth: isFirst ? defaultBorderWidth / 2.0 : defaultBorderWidth,
          borderLeftWidth: isLast ? defaultBorderWidth / 2.0 : defaultBorderWidth,
          borderTopLeftRadius: isFirst ? cornerRadius : 0,
          borderBottomLeftRadius: isFirst ? cornerRadius : 0,
          borderTopRightRadius: isLast ? cornerRadius : 0,
          borderBottomRightRadius: isLast ? cornerRadius : 0,
        }}
      >
        {children}
      </Box>
    </TouchableWithoutFeedback>
  )
}

export const ReservationConfirmationOptionsSection = ({
  reservationID,
  options = [Option.ShareToIG, Option.ReferAndEarn],
}) => {
  const navigation = useNavigation()

  const shareToIG = async () => {
    navigation.navigate("Modal", { screen: "ShareReservationToIGModal", params: { reservationID } })
  }

  return (
    <Flex flexDirection={"row"} flexGrow={1}>
      {options.map((option, index) => {
        const isFirst = index === 0
        const isLast = index === options.length

        switch (option) {
          case Option.ShareToIG:
            return (
              <SectionWrapper isFirst={isFirst} isLast={isLast} onPress={() => shareToIG()} key={index}>
                <Flex py={2} alignItems="center">
                  <Instagram />
                  <Sans pt={0.5} size="4" color="black50">
                    Share to IG Stories
                  </Sans>
                </Flex>
              </SectionWrapper>
            )
          case Option.ReferAndEarn:
            return (
              <SectionWrapper
                isFirst={isFirst}
                isLast={isLast}
                onPress={() => navigation.navigate("ReferralView")}
                key={index}
              >
                <Flex py={2} alignItems="center">
                  <Box
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 12,
                      height: 24,
                      width: 24,
                      borderColor: color("black100"),
                      borderWidth: 1.5,
                    }}
                  >
                    <Display size="4" color="black100">
                      $
                    </Display>
                  </Box>
                  <Sans pt={0.5} size="4" color="black50">
                    Refer & earn
                  </Sans>
                </Flex>
              </SectionWrapper>
            )
        }
      })}
    </Flex>
  )
}
