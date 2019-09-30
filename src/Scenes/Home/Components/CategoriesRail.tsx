import React from "react"
import { Box, Sans } from "../../../components"
import { ScrollView } from "react-native"
import { styled } from "../../../components/platform/primitives"

interface CategoriesRailProps {
  categories: any
}

export const CategoriesRail: React.FC<CategoriesRailProps> = ({ categories }) => {
  return (
    <Box my={2}>
      <Sans size="2">Categories</Sans>
      <Box mt={2}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, width: "100%", height: 130 }}>
          {categories.map(category => {
            return (
              <Box mr={1} key={category}>
                <CategoryContainer />
                <Sans size="1" style={{ textAlign: "center" }}>
                  {category}
                </Sans>
              </Box>
            )
          })}
        </ScrollView>
      </Box>
    </Box>
  )
}

const CategoryContainer = styled.View`
  height: 92;
  width: 92;
  border-radius: 46;
  background: rgba(0, 0, 0, 0.1);
`
