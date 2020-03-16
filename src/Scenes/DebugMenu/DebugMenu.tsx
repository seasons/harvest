import { Container, Sans, Spacer, CloseButton, Flex, Separator, Box } from "App/Components"
import React, { useState, useEffect } from "react"
import { FlatList, TouchableOpacity, NativeModules } from "react-native"
import { space } from "App/utils"
import RNRestart from "react-native-restart"
import AsyncStorage from "@react-native-community/async-storage"

export const DebugMenu = () => {
  const [isMutating, setIsMutating] = useState(false)
  const [showDevMenu, setShowDevMenu] = useState(false)
  const [envTitle, setEnvTitle] = useState("")
  const [environment, setEnvironment] = useState("Production")

  const switchEnvTitle = async () => {
    const data = (await AsyncStorage.getItem("environment")) || ""
    const environment = data ? JSON.parse(data) : null
    console.log("data", data)
    if (!environment || (environment && environment === "Production")) {
      setEnvTitle("Switch to Staging")
      setEnvironment("Production")
    } else {
      setEnvTitle("Switch to Production")
      setEnvironment("Staging")
    }
  }

  const switchEnvironment = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    if (environment === "Production") {
      await AsyncStorage.setItem("environment", "Staging")
    } else {
      await AsyncStorage.setItem("environment", "Production")
    }
    await AsyncStorage.removeItem("userSession")
    await AsyncStorage.removeItem("beamsData")
    RNRestart.Restart()
  }

  useEffect(() => {
    switchEnvTitle()
  }, [])

  const listItems = [
    {
      title: "Debug",
      onPress: () => {
        if (showDevMenu) {
          NativeModules.DevMenu.hide()
        } else {
          NativeModules.DevMenu.show()
        }
        setShowDevMenu(!showDevMenu)
      },
      key: "debug",
    },
    { title: envTitle, onPress: switchEnvironment, key: "switch-env" },
  ]

  const renderItem = ({ item }) => {
    return (
      <Box px={2}>
        <TouchableOpacity>
          <Spacer mb={2} />
          <Flex flexDirection="row">
            <Sans size="2">{item.title}</Sans>
          </Flex>
          <Spacer mb={2} />
        </TouchableOpacity>
        <Separator />
      </Box>
    )
  }

  return (
    <Container insetsBottom={false}>
      <CloseButton />
      <FlatList
        ListHeaderComponent={() => (
          <Box px={2}>
            <Spacer mb={80} />
            <Separator />
          </Box>
        )}
        renderItem={item => renderItem(item)}
        ListFooterComponent={() => <Spacer mb={space(2)} />}
        data={listItems}
      />
    </Container>
  )
}
