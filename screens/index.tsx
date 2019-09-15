import { Navigation } from 'react-native-navigation'


export function registerScreens() {
    Navigation.registerComponent('Home', () => require('./Home'))
}