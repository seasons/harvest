import React, { createContext, useContext, useReducer } from "react"

interface StateContext {
  bag?: Array<any>
}
type StateContextTuple = [StateContext, React.Dispatch<StateContext>]

export const StateContext = createContext([{}])

export const StateProvider = ({ reducer, initialState, children }) => {
  const value = useReducer(reducer, initialState) as StateContextTuple
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export const useStateContext = () => {
  return useContext(StateContext) as StateContextTuple
}
