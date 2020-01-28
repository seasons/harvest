import { Box, Sans, Separator, Spacer, Flex } from "App/Components"
import { color } from "App/Utils"
import React, { useState } from "react"
import { GET_BAG, GET_PRODUCT } from "App/Apollo/Queries"
import { connect } from "react-redux"
import { ProductInfoItem } from "./ProductInfoItem"
import { TouchableOpacity } from "react-native"
import { SaveIcon } from "Assets/icons"
import { head } from "lodash"
import gql from "graphql-tag"
import { togglePopUp } from "App/Redux/actions"
import { CircledSaveIcon } from "Assets/icons/CircledSaveIcon"
import { useMutation } from "react-apollo"
import { bindActionCreators } from "redux"

const SAVE_ITEM = gql`
  mutation SaveItem($item: ID!, $save: Boolean!) {
    saveProduct(item: $item, save: $save) {
      id
      variant {
        id
        isSaved
      }
    }
  }
`

export const ProductDetailsComponent = ({ product, productState, togglePopUp }) => {
  const { variant } = productState
  const selectedVariant: any = head((product.variants || []).filter(a => a.id === variant.id)) || {
    isSaved: false,
    id: "",
  }
  const { isSaved } = selectedVariant

  const [saveItem] = useMutation(SAVE_ITEM, {
    optimisticResponse: {
      __typename: "Mutation",
      saveProduct: {
        __typename: "Product",
        id: product.id,
        variant: {
          __typename: "ProductVariant",
          isSaved: !selectedVariant.isSaved,
          id: selectedVariant.id,
        },
      },
    },
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          productID: product.id,
        },
      },
      {
        query: GET_BAG,
      },
    ],
  })

  if (!product) {
    return null
  }

  const {
    name,
    description,
    brand: { name: brandName },
  } = product

  const handleSaveButton = () => {
    saveItem({
      variables: {
        item: variant.id,
        save: !isSaved,
      },
    })
    const updateText = isSaved ? "been removed from" : "been added to"
    togglePopUp(true, {
      icon: <CircledSaveIcon />,
      title: "Saved for later",
      note: `The ${product.name}, size ${variant.size} has ${updateText} your saved items.`,
      buttonText: "Got It",
    })
  }

  return (
    <Box pt={2} px={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box>
          <Sans size="1" color="black">
            {name}
          </Sans>
          <Sans size="1" color="gray">
            {brandName}
          </Sans>
        </Box>
        <Box>
          <TouchableOpacity onPress={() => handleSaveButton()}>
            <Box pl={2} pb={2}>
              <SaveIcon enabled={isSaved} />
            </Box>
          </TouchableOpacity>
        </Box>
      </Flex>
      <Spacer mb={1} />
      <Sans size="1" color="gray" lineHeight={26}>
        {description}
      </Sans>
      <Spacer mb={1} />
      <Spacer mb={2} />
      <Separator color={color("lightGray")} />
      {product.color && <ProductInfoItem detailType="Color" detailValue={product.color.name} />}
      {product.modelSize && <ProductInfoItem detailType="Fit" detailValue={`Model size is ${product.modelSize}`} />}
      {product.outerMaterials && (
        <ProductInfoItem detailType="Materials" detailValue={product.outerMaterials.join(", ")} />
      )}
      {product.brand && <ProductInfoItem detailType="Brand" detailValue={product.brand.name} />}
      {product.retailPrice && <ProductInfoItem detailType="Retail price" detailValue={"$" + product.retailPrice} />}
    </Box>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      togglePopUp,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { productState } = state
  return { productState }
}

export const ProductDetails = connect(mapStateToProps, mapDispatchToProps)(ProductDetailsComponent)
