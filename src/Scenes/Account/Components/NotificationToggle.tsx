import React, { useState, useEffect } from "react"
import { Separator, Spacer, Flex, Box, Toggle, Sans } from "App/Components"
import { color } from "App/Utils"
import { checkNotifications } from "react-native-permissions"
import { unsubscribe, requestPermission, seasonsNotifInterest } from "App/setupNotifications"
import AsyncStorage from "@react-native-community/async-storage"

export const NotificationToggle: React.FC<{ email: string }> = ({ email }) => {
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    checkNotifications()
      .then(({ status }) => {
        if (status === "granted") {
          setSelected(true)
        }
      })
      .catch(error => {
        console.log("error checking for permission", error)
      })
  }, [])

  const onChange = async bool => {
    if (bool) {
      const beamsData = await AsyncStorage.getItem("beamsData")
      try {
        const { beamsToken, email } = JSON.parse(beamsData)
        requestPermission(null, beamsToken, email)
      } catch (e) {
        console.error("No beamsData in async storage ", e)
        setSelected(false)
      }
    } else {
      unsubscribe(seasonsNotifInterest)
    }
  }

  return (
    <Box px={2}>
      <Separator />
      <Spacer m={2} />
      <Flex flexDirection="row" justifyContent="space-between">
        <Box>
          <Sans size="2">Order updates</Sans>
          <Sans size="2" color={color("black50")}>
            Send me push notifications
          </Sans>
        </Box>
        <Toggle onChange={onChange} selected={selected} setSelected={setSelected} />
      </Flex>
      <Spacer m={2} />
    </Box>
  )
}
