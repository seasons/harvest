import React, { useContext } from "react"

export const useNotificationsContext = () => useContext(NotificationsContext)

const NotificationsContext = React.createContext({
  requestPermissions: (callback: (status: string) => void) => null,
  init: () => null,
  unsubscribe: () => null,
})

export default NotificationsContext
