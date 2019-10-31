import React, { useEffect, useState } from "react"
import { get, chunk } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { Theme } from "App/Components"
import { FlatList, SafeAreaView, Image } from "react-native"
import { ProductGrid, CollectionText } from "./Components"
import styled from "styled-components/native"
import { imageResize } from "App/helpers/imageResize"
import { GET_COLLECTION } from "App/Apollo/Queries"
import { Dimensions } from "react-native"

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
    console.log("groupedProducts", collection)

    if (firstImage) {
      sectionsArray.push({ section: "collectionImage", data: firstImage })
    }
    if (collection.title || collection.subTitle || collection.description) {
      sectionsArray.push({ section: "collectionText" })
    }
    groupedProducts.forEach(group => {
      if (clonedImages.length) {
        const image = clonedImages.shift()
        sectionsArray.push({ section: "collectionImage", data: image })
      }
      console.log("group,", group)
      sectionsArray.push({ section: "productGrid", data: group })
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

  const renderItem = ({ item }) => {
    switch (item.section) {
      case "collectionText":
        return <CollectionText collection={data.collection} />
      case "collectionImage":
        const imageURL = get(item, "data.url")
        const aspectRatio = getAspectRatio(item)
        const resizedImage = imageResize(imageURL, "large")
        return (
          <Image source={{ uri: resizedImage }} style={{ width: windowWidth, height: windowWidth * aspectRatio }} />
        )
      case "productGrid":
        return <ProductGrid products={item.data} />
      default:
        return null
    }
  }

  return (
    <Theme>
      <Outer>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList data={sections} keyExtractor={(_item, index) => `${index}`} renderItem={item => renderItem(item)} />
        </SafeAreaView>
      </Outer>
    </Theme>
  )
}

const Outer = styled.View`
  flex: 1;
  background-color: white;
`
