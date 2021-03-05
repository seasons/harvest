export const navigateTo = (navigation, { route, screen, params }) => {
  if (route && screen && params) {
    navigation?.navigate(route, { screen, params })
  } else if (route && params) {
    navigation?.navigate(route, params)
  } else if (route && screen) {
    navigation?.navigate(route, {
      screen,
    })
  } else if (route) {
    navigation?.navigate(route)
  }
}
