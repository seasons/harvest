import * as actionCreators from "App/Redux/actions"
import { createStore } from "redux"
import { devToolsEnhancer } from "redux-devtools-extension"
import { persistReducer, persistStore } from "redux-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"

import AsyncStorage from "@react-native-community/async-storage"

import { EMPTY_BAG, reducer } from "./Redux/reducer"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
}

const initialState = {
  ...EMPTY_BAG,
  productState: {
    showVariantSelection: false,
    variant: { size: "", abbreviated: "X", id: null },
    displayFooter: false,
    product: null,
  },
  popUp: {
    title: "",
    note: "",
    buttonText: "",
    icon: null,
  },
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
