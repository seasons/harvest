# Seasons App

Codename: _Harvest_

Mobile App (iOS and Android) for Seasons.
This project is the mobile client for Seasons.nyc


## Prerequisites

- Node v10.13.0 or above
- Xcode (if working on iOS version)
- Android Studio (if working on Android version)

### Installation

1. Install [Node.js][node], and [Yarn][yarn]: `$ brew install node yarn`
1. Install file watcher used by React Native:
   - `$ brew install watchman`
1. Install NPM modules: `$ yarn install`
1. Install Pods: `$ cd ios && pod install`

### Running the project

1. Run `$ yarn start` from the top directory, which will:

   - Start the app’s React Native packager.

1. Now from Xcode you can run the app in `ios/Seasons.xcworkspace`.

- If you already have the app installed, you can run `open -a Simulator` to open the last sim.
- If you run into any issues with the above commands oftentimes a full clean can help. Run `rm -rf node_modules; rm -rf ios/Pods; yarn install; cd Example; bundle exec pod install` and then repeat the steps above.
