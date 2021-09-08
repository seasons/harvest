export const seasonAndYear = () => {
  const now = new Date()
  let season = ""
  switch (now.getMonth()) {
    case 11:
    case 12:
    case 1:
      season = "Winter"
      break
    case 2:
    case 3:
    case 4:
      season = "Spring"
      break
    case 5:
    case 6:
    case 7:
      season = "Summer"
      break
    case 8:
    case 9:
    case 10:
      season = "Fall"
      break
  }
  return `${season} ${now.getFullYear()}`
}
