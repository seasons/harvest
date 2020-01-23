import Auth0 from "react-native-auth0"

import AsyncStorage from "@react-native-community/async-storage"

export const auth0 = new Auth0({
  domain: "seasons-staging.auth0.com",
  clientId: "fcHPQx7KYqpkqI2yn31fcLgt7nuU2S5D",
})

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
      const refreshToken = userSession.refreshToken

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
            const newToken = auth0.auth.refreshToken({
              refreshToken,
            })

            const newUserSession = {
              token: newToken.token,
              refreshToken,
            }

            await AsyncStorage.setItem("userSession", JSON.stringify(newUserSession))
            resolve(newUserSession)
          } catch (e) {
            console.log(e)
          }
        })
    }
  })
}
