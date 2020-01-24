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
    <Container>
      <ImageContainer
        resizeMode="contain"
        style={{ flex: 3, marginRight: 8 }}
        source={{ uri: images[0] }}
      />
      <ColumnContainer>
        {images.slice(1, 4).map((image: String, index: number) =>
          <ImageContainer
            resizeMode="contain"
            style={{ flex: 1, marginBottom: index !== 2 ? 8 : 0 }}
            source={{ uri: image }}
          />
        )}
      </ColumnContainer>
    </Container>
  )
}

const Container = styled(Box)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  height: 256;
`

const ColumnContainer = styled(Box)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const ImageContainer = styled(Image)`
  border-width: 1px;
  border-color: rgba(240, 240, 240, 1);
`