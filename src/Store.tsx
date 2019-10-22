import { reducer } from "./Redux/reducer"
import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import AsyncStorage from "@react-native-community/async-storage"
import devToolsEnhancer from "remote-redux-devtools"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
}

const initialState = {
  productState: {
    showSizeSelection: false,
    variant: { size: "", abbreviated: "X", id: null },
    displayFooter: false,
    product: null,
  },
  bag: { items: [], itemCount: 0 },
}

const pReducer = persistReducer(persistConfig, reducer)

export const store = createStore(pReducer, initialState, devToolsEnhancer())
export const persistor = persistStore(store)
