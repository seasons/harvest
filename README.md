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

1. Run `$ yarn start-servers` from the top directory, which will:

   - Start the app’s React Native packager.
   - Start the storybook server

1. Now run `$ yarn ios` to run the app in the simulator.

- If you already have the app installed, you can run `open -a Simulator` to open the last sim.
- If you run into any issues with the above commands oftentimes a full clean can help. Run `rm -rf node_modules; rm -rf ios/Pods; yarn install; cd Example; bundle exec pod install` and then repeat the steps above.

### Generating Types from graphql schema

You only need to run the below if you are changing the types. Otherwise, you can work with what you pulled from github.

1. Generate Apollo types: `$ yarn apollo`

### Make a build on your phone

1. Call Luc

### Create a Story for use in Storybook

Storybook is a UI component dev environment for your app. A story is a single state of one or more UI components. You can have as many stories as you want. Basically a story is like a visual test case.

To add new story, go to `storybook/stories` and look at an existing example.

Enable storybooks by updating the `STORYBOOK_START` value to `true` in the main `index.tsx` entry file.

### Finding the latest production build

Check the git logs for a commit message of the form X => Y, e.g 101 => 102. That's how we annotate version changes. Whichever is the latest commit with a message that fits that format is the latest commit to go to production.

### Working on components in @seasons/eclipse

Follow the instructions in order to get the best development experience with live reload.
First and foremost, we need to register `eclipse` to the yarn local registry

`cd eclipse && yarn link`

you run the following command in the root of harvest

`yarn link @seasons/eclipse`

the last step is to run `yarn start-packager --reset-cache` in order to reset Metro's internal cache.
You should now see the following warning message in the console

```
$ yarn start-packager --reset-cache

Warning: you have symlinked dependencies in node_modules!

The following directories are symlink destinations of one or more node_modules
(i.e. `yarn link` or `npm link` was used to link in a dependency locally). Metro
bundler doesn't support symlinks so instead we'll manually watch the symlink
destination. Note that if you get errors about name collisions, you need to inform
`@carimus/metro-symlinked-deps` of the colliding module(s) in metro.config.js via the
`blacklistLinkedModules` option passed to `applyConfigForLinkedDependencies`.

-   /Users/luc/Projects/eclipse
```

You're all set to start making changes in eclipse and

### Creating a release via CI

1. Create a new build:
   - For staging builds, create a PR to `staging` from master
   - For production builds, create a PR to `production` from master
1. That will kick off the build process on CircleCI (Should take about ~25mins to complete)
1. That will bump the minor version in package.json and push a commit back to github along with a release tag
