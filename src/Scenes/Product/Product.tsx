import React, { useEffect } from "react"
import gql from "graphql-tag"
import get from "lodash/get"
import { useQuery } from "@apollo/react-hooks"
import { Theme } from "App/Components"
import { FlatList, SafeAreaView, Dimensions } from "react-native"
import { ImageRail, ProductDetails, MoreLikeThis, AboutTheBrand } from "./Components"
import styled from "styled-components/native"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { setVariant } from "App/Redux/actions"

const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(where: { id: $productId }) {
      name
      id
      description
      retailPrice
      modelSize
      modelHeight
      brand {
        name
      }
      images
    }
  }
`

const screenHeight = Math.round(Dimensions.get("window").height)

// FIXME: use real sizes
const variants = [
  { size: "small", abbreviated: "s", id: 1, stock: 0 },
  { size: "medium", abbreviated: "m", id: 2, stock: 2 },
  { size: "large", abbreviated: "l", id: 3, stock: 1 },
  { size: "x-large", abbreviated: "xl", id: 4, stock: 3 },
  { size: "xx-large", abbreviated: "xxl", id: 5, stock: 3 },
]

export const ProductComponent = props => {
  const productID = get(props, "navigation.state.params.id")
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: productID,
    },
  })

  const product = data && data.product

  useEffect(() => {
    // Find the first product with stock
    const initialVariant = variants.find(variant => {
      return variant.stock > 0
    })
    setVariant(initialVariant)
  }, [])

  const { productState, bag, setVariant } = props

  if (loading || !data) {
    return null
  }
  if (error) {
    console.error("error: ", error)
  }

  const renderItem = ({ item: section }) => {
    const images = product && product.images
    switch (section) {
      case "imageRail":
        return <ImageRail images={images} />
      case "productDetails":
        return <ProductDetails product={product} />
      case "moreLikeThis":
        return <MoreLikeThis products={images} />
      case "aboutTheBrand":
        return <AboutTheBrand product={product} />
      default:
        return null
    }
  }

  const sections = () => {
    return ["imageRail", "productDetails", "moreLikeThis", "aboutTheBrand"]
  }
  return (
    <Theme>
      <Outer>
        <Spring
          native
          toggle={productState.showSizeSelection}
          from={{ height: screenHeight - 106 }}
          to={{ height: productState.showSizeSelection ? screenHeight - 436 : screenHeight - 106 }}
        >
          {props => (
            <AnimatedContent style={props}>
              {productState.showSizeSelection && <AnimatedOverlay style={props} />}
              <SafeAreaView style={{ flex: 1 }}>
                <FlatList data={sections()} keyExtractor={item => item} renderItem={item => renderItem(item)} />
              </SafeAreaView>
            </AnimatedContent>
          )}
        </Spring>
      </Outer>
    </Theme>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setVariant,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { bag, productState } = state
  return { bag, productState }
}

export const Product = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent)

const Outer = styled.View`
  flex: 1;
  background-color: white;
`

const Overlay = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  flex: 1;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`

const Content = styled.View`
  margin-bottom: 10;
`

const AnimatedContent = animated(Content)
const AnimatedOverlay = animated(Overlay)
