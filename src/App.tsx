import { AppContainer } from "App/Navigation"
import React from "react"
import { Text, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"

import setupAnalytics from "./setupAnalytics"
import { persistor, store } from "./Store"

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View>
            <Text>Loading...</Text>
          </View>
        }
        persistor={persistor}
      >
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
