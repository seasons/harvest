import Auth0 from "react-native-auth0"
import Config from "react-native-config"

import AsyncStorage from "@react-native-community/async-storage"

const auth0 = () => {
  if (Config.AUTH0_DOMAIN && Config.AUTH0_CLIENT_ID) {
    return new Auth0({
      domain: Config.AUTH0_DOMAIN,
      clientId: Config.AUTH0_CLIENT_ID,
    })
  } else {
    return null
  }
}

export interface UserSession {
  token: string
  refreshToken: string
}

export const getUserSession: () => Promise<UserSession | null> = async () => {
  const data = await AsyncStorage.getItem("userSession")

  try {
    const userSession = JSON.parse(data)
    return userSession
  } catch (e) {}

  return null
}

export const getAccessTokenFromSession = async () => {
  const userSession = await getUserSession()
  const accessToken = userSession ? userSession.token : ""
  return accessToken
}

export const getAccessTokenOrRefresh = async () => {
  return new Promise(async (resolve, reject) => {
    const userSession = await getUserSession()

    if (userSession) {
      const accessToken = userSession.token

      return auth0.auth
        .userInfo({
          token: accessToken,
        })
        .then(() => {
          resolve(accessToken)
        })
        .catch(async e => {
          console.log(e)

          try {
            const newUserSession = await getNewToken()
            resolve(newUserSession)
          } catch (e) {
            console.log(e)
          }
        })
    }
  })
}

export const getNewToken = async () => {
  const { refreshToken } = await getUserSession()
  const newToken = await auth0.auth.refreshToken({
    refreshToken,
  })

  const newUserSession = {
    token: newToken.accessToken,
    refreshToken,
  }
  await AsyncStorage.setItem("userSession", JSON.stringify(newUserSession))
  return newUserSession
}
