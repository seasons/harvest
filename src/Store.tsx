import { reducer, EMPTY_BAG } from "./Redux/reducer"
import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import AsyncStorage from "@react-native-community/async-storage"
import { devToolsEnhancer } from "redux-devtools-extension"
import * as actionCreators from "App/Redux/actions"

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
  ...EMPTY_BAG,
}

const pReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
  pReducer,
  initialState,
  devToolsEnhancer({
    actionCreators,
  })
)
export const persistor = persistStore(store)
