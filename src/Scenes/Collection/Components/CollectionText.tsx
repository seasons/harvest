import React from "react"
import { Box, Sans, Spacer } from "App/Components"

export const CollectionText: React.FC<{ collection: any }> = ({ collection }) => {
  return (
    <Box px={2} mb={2}>
      {collection.title && (
        <>
          <Sans size="3">{collection.title}</Sans>
        </>
      )}
      {collection.subTitle && (
        <>
          <Spacer mb={0.5} />
          <Sans size="2" color="gray">
            {collection.subTitle}
          </Sans>
        </>
      )}
      {collection.description && (
        <>
          <Spacer mb={2} />
          <Sans size="1" color="gray">
            {collection.description}
          </Sans>
        </>
      )}
    </Box>
  )
}
