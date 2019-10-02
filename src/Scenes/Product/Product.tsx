import React from "react"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Theme } from "App/Components"
import { FlatList } from "react-native"
import { ImageRail, ProductDetails, MoreLikeThis, AboutTheBrand } from "./Components"

const GET_PRODUCT = gql`
  {
    productById(id: 1) {
      name
      id
      description
      retailPrice
      modelSize
      modelHeight
      brandByBrandId {
        name
      }
      images
    }
  }
`

export const Product = () => {
  const { loading, data } = useQuery(GET_PRODUCT)

  if (loading) {
    return null
  }

  const { productById } = data

  const renderItem = ({ item: section }) => {
    switch (section) {
      case "imageRail":
        return <ImageRail images={productById.images} />
      case "productDetails":
        return <ProductDetails product={productById} />
      case "moreLikeThis":
        return <MoreLikeThis products={productById.images} />
      case "aboutTheBrand":
        return <AboutTheBrand product={productById} />
      default:
        return null
    }
  }

  const sections = () => {
    return ["imageRail", "productDetails", "moreLikeThis", "aboutTheBrand"]
  }

  console.log("data", data)

  return (
    <Container>
      <Theme>
        <FlatList data={sections()} keyExtractor={item => item} renderItem={item => renderItem(item)} />
      </Theme>
    </Container>
  )
}
