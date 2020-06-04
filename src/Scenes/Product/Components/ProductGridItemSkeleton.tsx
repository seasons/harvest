import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import React from "react"
import { Dimensions } from "react-native"
import { Box, Skeleton, Flex, Spacer } from "App/Components"

export const ProductGridItemSkeleton: React.FC<{ addLeftSpacing: boolean }> = ({ addLeftSpacing }) => {
  const imageWidth = Dimensions.get("window").width / 2 - 2
  const imageHeight = imageWidth * PRODUCT_ASPECT_RATIO

  return (
    <Box mr={addLeftSpacing ? 0.5 : 0} mb={0.5}>
      <Skeleton width={imageWidth} height={imageHeight} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-start">
        <Box my={1} mx={1}>
          <Skeleton width={80} height={10} />
          <Box mt={0.5}>
            <Skeleton width={80} height={10} />
          </Box>
        </Box>
        <Box mt={1} pr={2}>
          <Skeleton width={12} height={16} />
        </Box>
      </Flex>
      <Spacer mb={0.5} />
    </Box>
  )
}
