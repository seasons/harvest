import React, { useEffect } from "react"
import RNShake from "react-native-shake"
import { useNavigation } from "@react-navigation/native"

export const DebugListener = ({ children }) => {
  const navigation = useNavigation()
  useEffect(() => {
    RNShake.addEventListener("ShakeEvent", () => {
      navigation.navigate("Modal", {
        screen: "DebugMenu",
      })
    })
  }, [])

  return <>{children}</>
}
