import AsyncStorage from "@react-native-community/async-storage"
import { EMPTY_BAG } from "App/App"

export const persistCache = async data => {
  console.log("persisting", data)
  try {
    await AsyncStorage.setItem("@initial_state", JSON.stringify(data))
  } catch (e) {
    console.warn("Error saving AsyncStorage: ", e)
  }
}

export const restoreCache = async () => {
  try {
    const value = await AsyncStorage.getItem("@initial_state")
    if (value !== null) {
      console.log("value", value)
      return JSON.parse(value)
    } else {
      return EMPTY_BAG
    }
  } catch (e) {
    return EMPTY_BAG
  }
}
