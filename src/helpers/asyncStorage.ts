import AsyncStorage from "@react-native-community/async-storage"

export const storeAsyncStorageData = async data => {
  try {
    await AsyncStorage.setItem("@initial_state", JSON.stringify(data))
  } catch (e) {
    console.warn("Error saving AsyncStorage: ", e)
  }
}

export const getAsyncStorageData = async () => {
  try {
    const value = await AsyncStorage.getItem("@initial_state")
    if (value !== null) {
      return JSON.parse(value)
    } else {
      return {
        bag: { items: [] },
      }
    }
  } catch (e) {
    console.warn("Error getting AsyncStorage: ", e)
    return {
      bag: { items: [] },
    }
  }
}
