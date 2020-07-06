export const areIndicesEqual = (index1: Index, index2: Index) =>
  index1.sectionIndex === index2.sectionIndex && index1.itemIndex === index2.itemIndex

export type Decoration = {
  color: string
}

export type Index = {
  sectionIndex: number
  itemIndex: number
}

export type Item = {
  // The title displayed
  title: string
  // The other decorative elements to be placed beside the item, such as a colored box.
  decoration?: Decoration
}

export type Section = {
  title: string
  items: Item[]
}

export const sections: Section[] = [
  {
    title: "What styles are you most interested in?",
    items: [
      { title: "Shirts" },
      { title: "Tees" },
      { title: "Jeans" },
      { title: "Pants" },
      { title: "Shorts" },
      { title: "Sweaters" },
      { title: "Hoodies" },
      { title: "Outerwear" },
    ],
  },
  {
    title: "Which of these patterns are you interested in?",
    items: [
      { title: "Solids" },
      { title: "Stripes" },
      { title: "Plaid" },
      { title: "Floral" },
      { title: "Checkers" },
      { title: "Polka-Dots" },
      { title: "Animal prints" },
      { title: "Camo" },
    ],
  },
  {
    title: "What colors are you looking to wear?",
    items: [
      { title: "Black", decoration: { color: "rgb(0,0,0)" } },
      { title: "White", decoration: { color: "rgb(233,233,233)" } },
      { title: "Red", decoration: { color: "rgb(255,62,62)" } },
      { title: "Yellow", decoration: { color: "rgb(250,227,62)" } },
      { title: "Blue", decoration: { color: "rgb(48,86,255)" } },
      { title: "Orange", decoration: { color: "rgb(243,123,22)" } },
      { title: "Pink", decoration: { color: "rgb(255,149,149)" } },
      { title: "Purple", decoration: { color: "rgb(158,0,252)" } },
      { title: "Brown", decoration: { color: "rgb(124,96,74)" } },
      { title: "Green", decoration: { color: "rgb(62,157,84)" } },
    ],
  },
  {
    title: "What brands are you most interested in?",
    items: [
      { title: "Acne Studios" },
      { title: "Aimé Leon Dore" },
      { title: "1017 ALYX 9SM" },
      { title: "A-COLD-WALL" },
      { title: "Amiri" },
      { title: "Burberry" },
      { title: "Barbour" },
      { title: "Brain Dead" },
      { title: "CPFM.XYZ" },
      { title: "Cav Empt" },
      { title: "Comme des Garçons" },
      { title: "Craig Green" },
      { title: "Deveaux" },
      { title: "Fear of God" },
      { title: "Gucci" },
      { title: "Heron Preston" },
      { title: "Jill Sander" },
      { title: "John Elliott" },
      { title: "Junya Watanabe" },
      { title: "Kenzo" },
      { title: "Margaret Howell" },
      { title: "Landlord" },
      { title: "Martine Rose" },
      { title: "Moncler" },
      { title: "Nike" },
      { title: "Noah" },
      { title: "Off-White" },
      { title: "Our Legacy" },
      { title: "Palm Angels" },
      { title: "Prada" },
      { title: "Rhude" },
      { title: "Sacai" },
      { title: "Saturdays NYC" },
      { title: "Stone Island" },
      { title: "Stüssy" },
      { title: "Yeezy" },
      { title: "Y-3" },
    ],
  },
]
