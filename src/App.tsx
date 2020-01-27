import { AppContainer } from "App/Navigation"
import React, { useEffect } from "react"
import { Text, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"

import { ApolloProvider } from "@apollo/react-hooks"

import { apolloClient } from "./Apollo"
import { persistor, store } from "./Store"

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  )
}
