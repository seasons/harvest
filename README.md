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
1. Install Apollo CLI: `$ npm install -g apollo`
1. Install file watcher used by React Native:
   - `$ brew install watchman`
1. Install NPM modules: `$ yarn install`
1. Install cocoapods: `$ sudo gem install cocoapods`
1. Install Pods: `$ cd ios && pod install`
1. Intall React Native Debugger `$ brew update && brew cask install react-native-debugger`

### Running the project

1. Run `cp .env.example .env` and update values

1. Run `$ yarn start` from the top directory, which will:

   - Start the app’s React Native packager.

1. Now run `$ yarn ios` to run the app in the simulator.

- If you already have the app installed, you can run `open -a Simulator` to open the last sim.
- If you run into any issues with the above commands oftentimes a full clean can help. Run `rm -rf node_modules; rm -rf ios/Pods; yarn install; cd Example; bundle exec pod install` and then repeat the steps above.

### Generating Types from graphql schema

You only need to run the below if you are changing the types. Otherwise, you can work with what you pulled from github.

1. Generate Apollo types: `$ yarn apollo`

### Make a build on your phone

1. Call Luc

### Finding the latest production build

Check the git logs for a commit message of the form X => Y, e.g 101 => 102. That's how we annotate version changes. Whichever is the latest commit with message that fits that format is the latest commit to go to production.
