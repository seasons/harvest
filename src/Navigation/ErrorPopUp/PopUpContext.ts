import { PopUpData } from "@seasons/eclipse"
import React, { useContext } from "react"

export const usePopUpContext = () => useContext(PopUpContext)

const PopUpContext = React.createContext({
  showPopUp: (data: PopUpData) => null,
  hidePopUp: () => null,
  popUpState: { data: null, show: false },
})

export default PopUpContext
