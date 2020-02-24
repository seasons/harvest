import { GET_PRODUCT } from "App/Apollo/Queries"
import { Box } from "App/Components"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { SaveIcon } from "Assets/icons"
import { CircledSaveIcon } from "Assets/icons/CircledSaveIcon"
import gql from "graphql-tag"
import { head } from "lodash"
import React from "react"
import { useMutation } from "react-apollo"
import { TouchableOpacity } from "react-native"

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

export const SaveProductButton: React.FC<{
  selectedVariant: any
  product: any
  setPopUp: ({ show: boolean, data: any }) => void
}> = ({ selectedVariant, product, setPopUp }) => {
  if (!product.variants || product?.variants?.length === 0) {
    return <></>
  }
  const variantToUse: any = head((product.variants || []).filter(a => a.id === selectedVariant.id))

  if (!variantToUse) {
    return <></>
  }
  const { isSaved } = variantToUse

  const [saveItem] = useMutation(SAVE_ITEM, {
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

  const handleSaveButton = () => {
    const updatedState = !isSaved
    saveItem({
      variables: {
        item: selectedVariant.id,
        save: updatedState,
      },
      optimisticResponse: {
        __typename: "Mutation",
        saveProduct: {
          __typename: "Product",
          id: product.id,
          productVariant: {
            __typename: "ProductVariant",
            isSaved: updatedState,
            id: selectedVariant.id,
          },
        },
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
          onClose: () => setPopUp({ show: false, data: null }),
        },
      })
    }
  }

  return (
    <Box>
      <TouchableOpacity onPress={() => handleSaveButton()}>
        <Box pl={2} pb={2}>
          <SaveIcon enabled={isSaved} />
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
