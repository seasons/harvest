import React from "react"
import { AppContainer } from "App/Navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { reducer } from "./Redux/reducer"
import { createStore } from "redux"

interface AppProps {
  cacheData: any
}

export const App: React.FC<AppProps> = ({ cacheData }) => {
  const initialState = {
    productState: {
      showSizeSelection: false,
      variant: { size: "", abbreviated: "X", id: null },
      showReserveConfirmation: false,
      displayFooter: false,
      product: null,
    },
    ...cacheData,
  }

  const store = createStore(reducer, initialState)

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </Provider>
  )
}
