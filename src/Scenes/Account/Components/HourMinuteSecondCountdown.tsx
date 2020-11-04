import React from "react"
import { Display } from "App/Components"
import { DateTime, Duration } from "luxon"

const formatDisplayDuration = (targetDate: DateTime) => {
  const duration =
    targetDate.isValid && targetDate.valueOf() > Date.now()
      ? targetDate.diffNow(["hours", "minutes", "seconds"])
      : Duration.fromMillis(0)
  return duration.toFormat("hh:mm:ss")
}

export const HourMinuteSecondCountdown: React.FC<{
  targetDate: DateTime
}> = ({ targetDate }) => {
  const [displayDuration, setDisplayDuration] = React.useState(formatDisplayDuration(targetDate))

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDisplayDuration(formatDisplayDuration(targetDate))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <Display size="4">{displayDuration}</Display>
}
