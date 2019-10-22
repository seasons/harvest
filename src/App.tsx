import React from "react"
import { AppContainer } from "App/Navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { persistor, store } from "./Store"
import { PersistGate } from "redux-persist/lib/integration/react"
import { View, Text } from "react-native"

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View>
            <Text>{"Loading..."}</Text>
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
