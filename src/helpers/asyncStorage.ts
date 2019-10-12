import AsyncStorage from "@react-native-community/async-storage"

export const persistCache = async data => {
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
      return JSON.parse(value)
    } else {
      return {
        bag: { items: [], itemCount: 0 },
      }
    }
  } catch (e) {
    return {
      bag: { items: [], itemCount: 0 },
    }
  }
}
