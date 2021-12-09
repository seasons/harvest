import Item from "./Item"

const shoeSizes: Item[] = (() => {
  const items: Item[] = []
  for (let shoeSize = 7; shoeSize <= 14; shoeSize++) {
    items.push({ label: `Size ${shoeSize}`, value: shoeSize })
  }
  return items
})()

const pantLengths: Item[] = [
  { label: `Short 30"`, value: 30 },
  { label: `Regular 32"`, value: 32 },
  { label: `Long 34"`, value: 34 },
  { label: `Tall 36"`, value: 36 },
]

const topSizes: Item[] = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "XXXL", value: "XXXL" },
]

const waistSizes: Item[] = (() => {
  const items: Item[] = []
  for (let waistSize = 28; waistSize <= 40; waistSize++) {
    items.push({ label: String(waistSize), value: waistSize })
  }
  return items
})()

const fits: Item[] = [
  { label: "Sometimes too small", value: "Small" },
  { label: "It fits me every time", value: "Perfect" },
  { label: "Sometimes too big", value: "Big" },
]

const Measurements = {
  shoeSizes,
  pantLengths,
  topSizes,
  waistSizes,
  fits,
}

export default Measurements
