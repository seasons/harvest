import { Item as BoxPickerItem } from "./BoxPicker"

const heights: BoxPickerItem[] = (() => {
  const totalInches = (feet: number, inches: number) => 12 * feet + inches
  let items: BoxPickerItem[] = [{ label: "4'11\"", value: totalInches(4, 11) }]
  new Array(5, 6).forEach((feet) => {
    items.push({ label: `${feet}\'`, value: totalInches(feet, 0) })
    for (let inches = 1; inches < 12; inches++) {
      items.push({ label: `${feet}\'${inches}\"`, value: totalInches(feet, inches) })
    }
  })
  return items
})()

const weights: BoxPickerItem[] = (() => {
  const items: BoxPickerItem[] = []
  for (let weight = 90; weight <= 250; weight += 10) {
    items.push({ label: String(weight), value: weight })
  }
  return items
})()

const topSizes: BoxPickerItem[] = [
  { label: "XXS", value: "XXS" },
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "XXXL", value: "XXXL" },
]

const waistSizes: BoxPickerItem[] = (() => {
  const items: BoxPickerItem[] = []
  for (let waistSize = 26; waistSize <= 40; waistSize++) {
    items.push({ label: String(waistSize), value: waistSize })
  }
  return items
})()

const fits: BoxPickerItem[] = [
  { label: "Sometimes too small", value: "Small" },
  { label: "It fits me every time", value: "Perfect" },
  { label: "Sometimes too big", value: "Big" },
]

const Measurements = {
  heights,
  weights,
  topSizes,
  waistSizes,
  fits,
}

export default Measurements
