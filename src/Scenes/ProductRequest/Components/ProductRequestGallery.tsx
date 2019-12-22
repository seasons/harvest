import { Box } from "App/Components"
import React from "react"
import styled from "styled-components/native"
import { Image } from "react-native"

export interface Props {
  images: [String]
}

export const ProductRequestGallery: React.FC<Props> = ({ images }) => {
  const shouldDisplayImages = images.length >= 4;
  if (!shouldDisplayImages) {
    return null;
  }

  return (
    <Box style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 256 }}>
      <ImageContainer
        resizeMode="contain"
        style={{ flex: 3, marginRight: 8 }}
        source={{ uri: images[0] }}
      />
      <Box style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        {images.slice(1, 4).map((image: String, index: number) =>
          <ImageContainer
            resizeMode="contain"
            style={{ flex: 1, marginBottom: index !== 2 ? 8 : 0 }}
            source={{ uri: image }}
          />
        )}
      </Box>
    </Box>
  )
}

const ImageContainer = styled(Image)`
  border-width: 1px;
  border-color: rgba(240, 240, 240, 1);
`