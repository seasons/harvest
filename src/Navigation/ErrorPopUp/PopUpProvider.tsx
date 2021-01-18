import { PopUpData } from "@seasons/eclipse"
import React, { useReducer } from "react"
import PopUpContext from "./PopUpContext"

enum PopUpAction {
  Show = "SHOW",
  Hide = "HIDE",
  Clear = "CLEAR",
}

export const PopUpProvider = ({ children }) => {
  const [popUpState, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case PopUpAction.Show:
          return {
            ...prevState,
            data: action.data,
            show: true,
          }
        case PopUpAction.Hide:
          return {
            ...prevState,
            show: false,
          }
        case PopUpAction.Clear:
          return {
            ...prevState,
            data: null,
            show: false,
          }
      }
    },
    {
      data: null,
      show: false,
    }
  )

  let clearData

  const popUpContext = {
    showPopUp: async (data: PopUpData) => {
      clearTimeout(clearData)
      dispatch({ type: PopUpAction.Show, data })
    },
    hidePopUp: async () => {
      dispatch({ type: PopUpAction.Hide })
      clearData = setTimeout(() => {
        dispatch({ type: PopUpAction.Clear })
      }, 1000)
    },
    popUpState,
  }

  return <PopUpContext.Provider value={popUpContext}>{children}</PopUpContext.Provider>
}
