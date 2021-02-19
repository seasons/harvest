import { GET_PRODUCT } from "../Queries"
import { Box } from "App/Components"
import { GetProduct_products } from "App/generated/GetProduct"
import { Schema as NavigationSchema } from "App/Navigation"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { SaveIcon } from "Assets/icons"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuthContext } from "App/Navigation/AuthContext"
import { useTracking, Schema } from "App/utils/track"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GET_HOMEPAGE } from "App/Scenes/Home/queries/homeQueries"

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
  product: GetProduct_products
  selectedVariant?: any
  onPressSaveButton: () => void
  grayStroke?: boolean
  height?: number
  width?: number
  noModal?: boolean
}

export const SaveProductButton: React.FC<SaveProductButtonProps> = ({
  product,
  selectedVariant,
  onPressSaveButton,
  grayStroke,
  height,
  width,
  noModal,
}) => {
  const navigation = useNavigation()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const isSaved = selectedVariant?.isSaved
    ? selectedVariant?.isSaved
    : product?.variants?.filter((variant) => variant.isSaved).length > 0
  const [enabled, setEnabled] = useState(isSaved)
  const tracking = useTracking()
  const [saveItem] = useMutation(SAVE_ITEM, {
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          where: { id: product?.id },
        },
      },
      {
        query: GET_BAG,
      },
      {
        query: GET_HOMEPAGE,
        variables: { firstFitPics: 8, skipFitPics: 0 },
      },
    ],
  })
  const { authState } = useAuthContext()
  const userHasSession = !!authState?.userSession

  useEffect(() => {
    setEnabled(isSaved)
  }, [isSaved])

  if (product?.variants?.length === 0) {
    return null
  }

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
    if ((updatedState || !selectedVariant) && !noModal) {
      navigation.navigate("Modal", {
        screen: NavigationSchema.PageNames.SaveProductModal,
        params: {
          hidePopUp,
          product,
          showPopUp,
        },
      })
    } else {
      if (!selectedVariant?.id) {
        return
      }
      tracking.trackEvent({
        actionName: Schema.ActionNames.ProductSaved,
        actionType: Schema.ActionTypes.Tap,
        saved: !isSaved,
      })
      setEnabled(!isSaved)
      saveItem({
        variables: {
          item: selectedVariant.id,
          save: !isSaved,
        },
        awaitRefetchQueries: true,
        optimisticResponse: {
          __typename: "Mutation",
          saveProduct: {
            __typename: "Product",
            id: product.id,
            productVariant: {
              __typename: "ProductVariant",
              isSaved: !isSaved,
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
        <SaveIcon width={width} height={height} enabled={enabled} grayStroke={grayStroke} />
      </Box>
    </TouchableOpacity>
  )
}
