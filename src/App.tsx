import React from "react"
import { StateProvider } from "App/helpers/StateProvider"
import { AppContainer } from "App/Navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { reducer } from "./Reducer"

interface AppProps {
  cacheData: any
}

export const App: React.FC<AppProps> = ({ cacheData }) => {
  const initialState = {
    productState: {
      showSizeSelection: false,
      sizeSelection: { size: "", abbreviated: "X", id: null },
      showReserveConfirmation: false,
      displayFooter: false,
    },
    currentScreen: null,
    ...cacheData,
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </StateProvider>
  )
}
