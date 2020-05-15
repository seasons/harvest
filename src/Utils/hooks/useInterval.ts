import { useRef, useEffect } from "react"

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(null)
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback?.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
