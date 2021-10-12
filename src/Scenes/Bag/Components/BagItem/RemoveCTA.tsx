import { gql, useMutation } from "@apollo/client"
import { Button } from "App/Components"
import { useAuthContext } from "App/Navigation/AuthContext"
import { ADD_OR_REMOVE_FROM_LOCAL_BAG } from "App/queries/clientQueries"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { useTracking, Schema } from "App/utils/track"
import React, { useEffect, useState } from "react"
import { DELETE_BAG_ITEM, GetBag_NoCache_Query } from "../../BagQueries"

export const RemoveCTAFragment_BagItem = gql`
  fragment RemoveCTAFragment_BagItem on BagItem {
    id
    productVariant {
      id
      product {
        id
        slug
      }
    }
  }
`

export const RemoveCTA = ({ bagItem }) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const { authState } = useAuthContext()
  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM)

  useEffect(() => {
    return setIsMutating(false)
  }, [])

  const variant = bagItem?.productVariant
  const product = variant?.product

  const [removeFromLocalBag] = useMutation(ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      productID: product?.id,
      variantID: variant?.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
      {
        query: GET_PRODUCT,
        variables: { where: { id: product.id } },
      },
    ],
  })

  return (
    <Button
      size="small"
      variant="secondaryWhite"
      loading={isMutating}
      disabled={isMutating}
      onPress={() => {
        setIsMutating(true)
        tracking.trackEvent({
          actionName: Schema.ActionNames.BagItemRemoved,
          actionType: Schema.ActionTypes.Tap,
          productSlug: product.slug,
          productId: product.id,
          variantId: variant.id,
        })
        if (!authState.isSignedIn) {
          removeFromLocalBag()
        } else {
          deleteBagItem({
            variables: {
              itemID: bagItem.id,
            },
            refetchQueries: [
              {
                query: GetBag_NoCache_Query,
              },
              {
                query: GET_PRODUCT,
                variables: {
                  where: {
                    id: product.id,
                  },
                },
              },
            ],
          })
        }
      }}
    >
      Remove
    </Button>
  )
}
