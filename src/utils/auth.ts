import { config, Env } from "App/utils/config"
import Auth0 from "react-native-auth0"

import AsyncStorage from "@react-native-community/async-storage"

const auth0Domain = config.get(Env.AUTH0_DOMAIN)
const auth0ClientId = config.get(Env.AUTH0_CLIENT_ID)

const auth0 = new Auth0({
  domain: auth0Domain,
  clientId: auth0ClientId,
})

export interface UserSession {
  token: string
  refreshToken: string
  user?: {
    email: string
  }
}

export const getUserSession: () => Promise<UserSession | null> = async () => {
  const data = await AsyncStorage.getItem("userSession")

  try {
    const userSession = JSON.parse(data)
    return userSession
  } catch (e) {}

  return {}
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
        .catch(async (e) => {
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
  const session = await getUserSession()
  const { refreshToken } = session

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
