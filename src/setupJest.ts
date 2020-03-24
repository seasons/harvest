import "./testUtils/renderUntil"

import chalk from "chalk"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import expect from "expect"
import track, { useTracking } from "react-tracking"
// Waiting on https://github.com/thymikee/snapshot-diff/pull/17
import diff from "snapshot-diff"
import { format } from "util"

import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock"

jest.mock("react-tracking")
const trackEvent = jest.fn()
;(track as jest.Mock).mockImplementation((_ => x => x) as any)
;(useTracking as jest.Mock).mockImplementation(() => {
  return {
    trackEvent,
  }
})

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage)
jest.mock("react-native-safe-area-context", () => ({
  useSafeArea: () => ({
    bottom: 0,
    top: 0,
  }),
}))

jest.mock("react-native-permissions", () => ({
  checkNotifications: () => jest.fn(),
}))

jest.mock("react-native-pusher-push-notifications", () => ({
  RNPusherPushNotifications: () => jest.fn(),
}))

jest.mock("@segment/analytics-react-native", () => ({
  setup: jest.fn(),
}))

jest.mock("react-native-config", () => ({
  SEGMENT_KEY: "1234",
}))

Enzyme.configure({ adapter: new Adapter() })

expect.extend({ toMatchDiffSnapshot: (diff as any).toMatchDiffSnapshot })

const originalConsoleError = console.error

// TODO: Remove once we're no longer using JSDOM for enzyme static rendering.
console.error = (message?: any) => {
  if (
    typeof message === "string" &&
    (message.includes("is using uppercase HTML. Always use lowercase HTML tags in React.") ||
      /Warning: React does not recognize the `\w+` prop on a DOM element\./.test(message) ||
      /Warning: The tag <\w+> is unrecognized in this browser\./.test(message) ||
      /Warning: Unknown event handler property `\w+`\./.test(message) ||
      /Warning: Received `\w+` for a non-boolean attribute `\w+`\./.test(message) ||
      /Warning: [\w\s]+ has been extracted from react-native core/.test(message))
  ) {
    // NOOP
  } else {
    originalConsoleError(message)
  }
}

declare const process: any

if (process.env.ALLOW_CONSOLE_LOGS !== "true") {
  const originalLoggers = {
    error: console.error,
    warn: console.warn,
  }

  function logToError(type, args, constructorOpt: () => void) {
    const explanation =
      chalk.white(`Test failed due to \`console.${type}(…)\` call.\n`) +
      chalk.gray("(Disable with ALLOW_CONSOLE_LOGS=true env variable.)\n\n")
    if (args[0] instanceof Error) {
      const msg = explanation + chalk.red(args[0].message)
      const err = new Error(msg)
      err.stack = args[0].stack.replace(`Error: ${args[0].message}`, msg)
      return err
    } else if (
      // Because we use react-dom in tests to render react-native components, a few warnings are being logged that we do
      // not care for, so ignore these.
      !args[0].includes("is using incorrect casing") &&
      !args[0].includes("is unrecognized in this browser") &&
      ![args[0].includes("React does not recognize the `testID` prop on a DOM element.")]
    ) {
      const err = new Error(explanation + chalk.red(format(args[0], ...args.slice(1))))
      ;(Error as any).captureStackTrace(err, constructorOpt)
      return err
    }
    return null
  }

  beforeEach(done => {
    const types: Array<"error" | "warn"> = ["error", "warn"]
    types.forEach(type => {
      // Don't spy on loggers that have been modified by the current test.
      if (console[type] === originalLoggers[type]) {
        const handler = (...args) => {
          const error = logToError(type, args, handler)
          if (error) {
            done.fail(error)
          }
        }
        jest.spyOn(console, type).mockImplementation(handler)
      }
    })
    done() // it is important to call this here or every test will timeout
  })
}
