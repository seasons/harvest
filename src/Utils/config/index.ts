import * as RNConfig from "react-native-config"
import AsyncStorage from "@react-native-community/async-storage"
import { downloadFromS3 } from "../downloadFromS3"

export enum EnvVars {
  RN_PUSHER_ID = "RN_PUSHER_ID",
  RN_SRC_EXT = "RN_SRC_EXT",
  SEGMENT_KEY = "SEGMENT_KEY",
  ENGINE_API_KEY = "ENGINE_API_KEY",
  AUTH0_CLIENT_ID = "AUTH0_CLIENT_ID",
  AUTH0_DOMAIN = "AUTH0_DOMAIN",
  MONSOON_ENDPOINT = "MONSOON_ENDPOINT",
}

const downloadAndSetNewStoredEnv = async () => {
  const envJson = await downloadFromS3("harvest-scripts", "env.json")
  await AsyncStorage.setItem("env", JSON.stringify(envJson))
}

class Config {
  variables: {}
  constructor() {
    this.variables = RNConfig?.default
  }
  start = async () => {
    const environment = await AsyncStorage.getItem("environment")
    if (environment) {
      const configFromStorage = await AsyncStorage.getItem("env")
      if (configFromStorage) {
        this.variables = configFromStorage[environment]
        downloadAndSetNewStoredEnv()
      } else {
        await downloadAndSetNewStoredEnv()
        const configFromStorage = await AsyncStorage.getItem("env")
        this.variables = configFromStorage[environment]
      }
      return
    }
  }
  get(variable) {
    return this.variables[variable]
  }
}

export const config = new Config()
