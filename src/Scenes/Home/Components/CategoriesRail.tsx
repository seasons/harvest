import React from "react"
import { Box, Sans } from "App/Components"
import { ScrollView } from "react-native"
import styled from "styled-components/native"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"

interface CategoriesRailProps {
  categories: any
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export const CategoriesRail: React.FC<CategoriesRailProps> = ({ categories, navigation }) => {
  return (
    <Box my={2}>
      <Sans size="2">Categories</Sans>
      <Box mt={2}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, width: "100%", height: 130 }}>
          {categories.map(category => {
            return (
              <Box mr={1} key={category}>
                <CategoryContainer />
                <Sans size="0" color="gray" mt={1} textAlign="center">
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
