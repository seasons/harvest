import React, { createContext, useContext, useReducer } from "react"

export const StateContext = createContext([{}])

export const StateProvider = ({ reducer, initialState, children }) => {
  const value = useReducer(reducer, initialState)
  console.log("?")
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export const useStateValue = () => {
  return useContext(StateContext)
}
