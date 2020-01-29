import { Box, Sans, Separator, Spacer, Flex } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import { GET_PRODUCT, GET_BAG } from "App/Apollo/Queries"
import { ProductInfoItem } from "./ProductInfoItem"
import { TouchableOpacity } from "react-native"
import { SaveIcon } from "Assets/icons"
import { head } from "lodash"
import gql from "graphql-tag"
import { CircledSaveIcon } from "Assets/icons/CircledSaveIcon"
import { useMutation } from "react-apollo"

const SAVE_ITEM = gql`
  mutation SaveItem($item: ID!, $save: Boolean!) {
    saveProduct(item: $item, save: $save) {
      id
      productVariant {
        id
        isSaved
      }
    }
  }
`

export const ProductDetails = ({ setPopUp, selectedVariant, product }) => {
  if (!(selectedVariant && selectedVariant.id) || !(product && product.variants)) {
    return <></>
  }

  const variantToUse: any = head((product.variants || []).filter(a => a.id === selectedVariant.id))

  const { isSaved } = variantToUse
  const productID = product.id

  const updateCache = (cache, { data }) => {
    const { product } = cache.readQuery({
      query: GET_PRODUCT,
      variables: {
        productID,
      },
    })
    const productVariants = product.variants.slice()
    const updatedVariants = productVariants.map(variant =>
      variant.id === selectedVariant.id
        ? { ...variant, isSaved: data.savedProduct ? data.savedProduct.isSaved : false }
        : variant
    )
    cache.writeQuery({
      query: GET_PRODUCT,
      data: { product: { ...product, product: { variants: updatedVariants } } },
    })
  }

  const [saveItem] = useMutation(SAVE_ITEM, {
    update: updateCache,
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
        item: selectedVariant.id,
        save: !isSaved,
      },
    })

    if (!isSaved) {
      const updateText = isSaved ? "been removed from" : "been added to"
      setPopUp({
        show: true,
        data: {
          icon: <CircledSaveIcon />,
          title: "Saved for later",
          note: `The ${product.name}, size ${selectedVariant.size} has ${updateText} your saved items.`,
          buttonText: "Got It",
        },
      })
    }
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
