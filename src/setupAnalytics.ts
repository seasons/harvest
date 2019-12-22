import Config from "react-native-config"

import analytics from "@segment/analytics-react-native"
import GoogleAnalytics from "@segment/analytics-react-native-google-analytics"
import Mixpanel from "@segment/analytics-react-native-mixpanel"

export default analytics
  .setup(Config.SEGMENT_API_KEY, {
    using: [Mixpanel, GoogleAnalytics],
    recordScreenViews: true,
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
  .then(() => console.log("Analytics is ready"))
  .catch(err => console.error("Something went wrong", err))
