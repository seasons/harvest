import React, { useState, useEffect } from "react"
import { Separator, Spacer, Flex, Box, Toggle, Sans } from "App/Components"
import { color } from "App/Utils"
import { checkNotifications } from "react-native-permissions"
import { unsubscribe, requestPermission } from "App/setupNotifications"

export const NotificationToggle: React.FC<{ beamsToken: string; email: string }> = ({ beamsToken, email }) => {
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

  const onChange = bool => {
    if (bool) {
      requestPermission(null, beamsToken, email)
    } else {
      // FIXME: what do we do for removing request
      unsubscribe(null)
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
