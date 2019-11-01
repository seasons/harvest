import React, { useEffect, useState } from "react"
import { get, chunk } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { Theme, Box, CloseButton, Spacer, Sans } from "App/Components"
import { FlatList, SafeAreaView, Image } from "react-native"
import { ProductGrid, CollectionText } from "./Components"
import styled from "styled-components/native"
import { imageResize } from "App/helpers/imageResize"
import { GET_COLLECTION } from "App/Apollo/Queries"
import { Dimensions } from "react-native"
import { color } from "App/Utils"

export const Collection = props => {
  const [sections, setSections] = useState([])
  const collectionID = get(props, "navigation.state.params.id")
  const { loading, error, data } = useQuery(GET_COLLECTION, {
    variables: {
      collectionID,
    },
  })

  const windowWidth = Dimensions.get("window").width

  useEffect(() => {
    if (!data || !data.collection) {
      return
    }
    const { collection } = data
    const sectionsArray = []
    const clonedImages = collection.images.slice(0)
    const firstImage = clonedImages.shift()
    const groupedProducts = chunk(collection.products, 4)
    let descriptionBottomPushed = false

    if (firstImage) {
      sectionsArray.push({ section: "collectionImage", data: firstImage })
    }
    if (collection.title || collection.subTitle || collection.descriptionTop) {
      sectionsArray.push({ section: "collectionText" })
    }
    groupedProducts.forEach(group => {
      sectionsArray.push({ section: "productGrid", data: group })
      if (collection.descriptionBottom && !descriptionBottomPushed) {
        descriptionBottomPushed = true
        sectionsArray.push({ section: "descriptionBottom" })
      }
      if (clonedImages.length) {
        const image = clonedImages.shift()
        sectionsArray.push({ section: "collectionImage", data: image })
      }
    })

    setSections(sectionsArray)
  }, [data])

  if (loading || !data) {
    return null
  }

  if (error) {
    console.error("error: ", error)
  }

  const getAspectRatio = image => {
    const largeSize = get(image, "data.thumbnails.large")
    const width = largeSize.width
    const height = largeSize.height
    return height / width
  }

  const renderItem = (item, index) => {
    switch (item.section) {
      case "collectionText":
        return <CollectionText collection={data.collection} />
      case "collectionImage":
        const imageURL = get(item, "data.url")
        const aspectRatio = getAspectRatio(item)
        const resizedImage = imageResize(imageURL, "large")
        const imageWidth = index === 0 ? windowWidth - 50 : windowWidth
        return (
          <Box
            mb={index === 0 ? 2 : 50}
            mt={index === 0 ? 0 : 30}
            pl={index === 0 ? 50 : 0}
            styles={{ width: imageWidth, backgroundColor: color("white") }}
          >
            <Image source={{ uri: resizedImage }} style={{ width: imageWidth, height: imageWidth * aspectRatio }} />
          </Box>
        )
      case "descriptionBottom":
        return (
          <Box px={2}>
            <Sans size="1" color="gray">
              {data.collection.descriptionBottom}
            </Sans>
            <Spacer mb={2} />
          </Box>
        )
      case "productGrid":
        return <ProductGrid products={item.data} windowWidth={windowWidth} navigation={props.navigation} />
      default:
        return null
    }
  }

  return (
    <>
      <Theme>
        <CloseButton navigation={props.navigation} />
        <Outer>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={sections}
              keyExtractor={(_item, index) => `${index}`}
              renderItem={({ item, index }) => renderItem(item, index)}
            />
          </SafeAreaView>
        </Outer>
      </Theme>
    </>
  )
}

const Outer = styled.View`
  flex: 1;
  background-color: white;
`
