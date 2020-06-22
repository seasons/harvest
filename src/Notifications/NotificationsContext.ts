import React, { useContext } from "react"

export const useNotificationsContext = () => useContext(NotificationsContext)

const NotificationsContext = React.createContext({
  requestPermissions: (callback: () => void) => null,
  init: () => null,
  unsubscribe: () => null,
  subscribedToNotifs: null,
})

export default NotificationsContext
