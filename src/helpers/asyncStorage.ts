import AsyncStorage from "@react-native-community/async-storage"
import { EMPTY_BAG } from "App/Redux/reducer"

export const persistCache = async bagData => {
  if (bagData) {
    try {
      await AsyncStorage.setItem("@initial_state", JSON.stringify({ bag: bagData }))
    } catch (e) {
      console.warn("Error saving AsyncStorage: ", e)
    }
  }
}

export const restoreCache = async () => {
  try {
    const value = await AsyncStorage.getItem("@initial_state")
    if (value !== null) {
      return JSON.parse(value)
    } else {
      return EMPTY_BAG
    }
  } catch (e) {
    return EMPTY_BAG
  }
}
