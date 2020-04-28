import { GET_PRODUCT } from "App/Apollo/Queries"
import { Box } from "App/Components"
import { GetProduct_product } from "App/generated/GetProduct"
import { Schema as NavigationSchema } from "App/Navigation"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { SaveIcon } from "Assets/icons"
import gql from "graphql-tag"
import React from "react"
import { useMutation } from "react-apollo"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuthContext } from "App/Navigation/AuthContext"
import { useTracking, Schema } from "App/utils/track"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

export const SAVE_ITEM = gql`
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

export interface SaveProductButtonProps {
  product: GetProduct_product
  selectedVariant?: any
  onPressSaveButton: () => void
  grayStroke?: boolean
  height?: number
  width?: number
}

export const SaveProductButton: React.FC<SaveProductButtonProps> = ({
  product,
  selectedVariant,
  onPressSaveButton,
  grayStroke,
  height,
  width,
}) => {
  const navigation = useNavigation()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()
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
  const { authState } = useAuthContext()
  const userHasSession = !!authState?.userSession

  if (!product.variants || product?.variants?.length === 0) {
    return null
  }

  const isSaved = product.variants.filter((variant) => variant.isSaved).length > 0

  const handleSaveButton = () => {
    onPressSaveButton()
    if (!userHasSession) {
      navigation.navigate("Modal", { screen: NavigationSchema.PageNames.SignInModal })
      return
    }

    const updatedState = !isSaved
    // Open SaveProductModal if:
    // 1) User wants to save a specific variant inside ProductDetails screen OR
    // 2) User wants to save the product, i.e. clicked button outside of ProductDetails screen
    if (updatedState || !selectedVariant) {
      navigation.navigate("Modal", {
        screen: NavigationSchema.PageNames.SaveProductModal,
        params: {
          hidePopUp,
          product,
          showPopUp,
        },
      })
    } else {
      tracking.trackEvent({
        actionName: Schema.ActionNames.ProductSaved,
        actionType: Schema.ActionTypes.Tap,
        saved: false,
      })
      saveItem({
        variables: {
          item: selectedVariant.id,
          save: false,
        },
        optimisticResponse: {
          __typename: "Mutation",
          saveProduct: {
            __typename: "Product",
            id: product.id,
            productVariant: {
              __typename: "ProductVariant",
              isSaved: false,
              id: selectedVariant.id,
            },
          },
        },
      })
    }
  }

  return (
    <TouchableOpacity onPress={handleSaveButton}>
      <Box px={2} pb={2} pt={0.5}>
        <SaveIcon width={width} height={height} enabled={isSaved} grayStroke={grayStroke} />
      </Box>
    </TouchableOpacity>
  )
}
