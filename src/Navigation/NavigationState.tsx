import { useState, useContext, useEffect } from "react"
import { NavigationContext } from "react-navigation"

export function useNavigationState() {
  const navigation = useContext(NavigationContext)
  const [navigationState, setNavigationState] = useState({ action: { routeName: "" }, type: "" })

  function handleEvt(e) {
    const newState = e
    newState && setNavigationState(newState)
  }
  useEffect(() => {
    const subsA = navigation.addListener("action", handleEvt)
    const subsWF = navigation.addListener("willFocus", handleEvt)
    const subsDF = navigation.addListener("didFocus", handleEvt)
    const subsWB = navigation.addListener("willBlur", handleEvt)
    const subsDB = navigation.addListener("didBlur", handleEvt)
    return () => {
      subsA.remove()
      subsWF.remove()
      subsDF.remove()
      subsWB.remove()
      subsDB.remove()
    }
  })
  return navigationState
}
