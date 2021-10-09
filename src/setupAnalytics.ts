import { config, Env } from "App/utils/config"
import analytics from "@segment/analytics-react-native"

export default analytics.setup(config.get(Env.SEGMENT_KEY), {
  trackAppLifecycleEvents: true,
  trackAttributionData: true,

  android: {
    flushInterval: 60,
    collectDeviceId: true,
  },
  ios: {
    trackAdvertising: true,
    trackDeepLinks: true,
  },
})
