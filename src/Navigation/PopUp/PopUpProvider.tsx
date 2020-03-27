import React, { useReducer } from "react"
import PopUpContext from "./PopUpContext"

export interface PopUpData {
  title?: string
  icon?: JSX.Element
  note?: string
  buttonText?: string
  onClose: any
  theme?: "light" | "dark"
  secondaryButtonText?: string
  secondaryButtonOnPress?: () => void
}

export const PopUpProvider = ({ children }) => {
  const [popUpState, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SHOW":
          return {
            ...prevState,
            data: action.data,
            show: true,
          }
        case "HIDE":
          return {
            ...prevState,
            show: false,
          }
        case "CLEAR":
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
      dispatch({ type: "SHOW", data })
    },
    hidePopUp: async () => {
      dispatch({ type: "HIDE" })
      clearData = setTimeout(() => {
        console.log("clearing")
        dispatch({ type: "CLEAR" })
      }, 500)
    },
    popUpState,
  }

  return <PopUpContext.Provider value={popUpContext}>{children}</PopUpContext.Provider>
}
