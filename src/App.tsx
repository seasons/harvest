import React from "react"
import { StateProvider } from "App/helpers/StateProvider"
import { AppContainer } from "App/Navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { reducer } from "./Reducer"

export const BAG_NUM_ITEMS = 3
export const EMPTY_BAG = {
  bag: { items: [], itemCount: 0 },
}

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
