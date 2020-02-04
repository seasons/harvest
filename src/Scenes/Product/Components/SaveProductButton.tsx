import { Box } from "App/Components"
import React from "react"
import gql from "graphql-tag"
import { head } from "lodash"
import { useMutation } from "react-apollo"
import { GET_PRODUCT } from "App/Apollo/Queries"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SaveIcon } from "Assets/icons"
import { CircledSaveIcon } from "Assets/icons/CircledSaveIcon"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"

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
  const variantToUse: any = head((product.variants || []).filter(a => a.id === selectedVariant.id))

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
