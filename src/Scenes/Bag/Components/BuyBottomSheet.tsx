import React from "react"
import { ProductBuyAlert as ProductBuyAlertBase, ProductBuyAlertTab } from "@seasons/eclipse"
import { Schema as NavigationSchema } from "App/Navigation"
import { Linking } from "react-native"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { useMutation } from "@apollo/client"
import { PRODUCT_VARIANT_CREATE_DRAFT_ORDER } from "App/Scenes/Product/Mutations"
import styled from "styled-components/native"
import { OrderType } from "App/generated/globalTypes"

export const height = 310

type Props = {
  productVariantId: string
  onDismiss: () => void
  tabs: ProductBuyAlertTab[]
  initialTab: number
  navigation: any
}

export const BuyBottomSheet = ({ productVariantId, onDismiss, tabs, initialTab, navigation }: Props) => {
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [createDraftOrder] = useMutation(PRODUCT_VARIANT_CREATE_DRAFT_ORDER)

  const handleError = (error) => {
    console.error(error)
    showPopUp({
      title: "Sorry! There was a problem",
      note: "There was an issue purchasing this item, please contact us if the issue persists.",
      buttonText: "Got it",
      onClose: () => {
        hidePopUp()
      },
    })
  }

  const handleCreateDraftOrder = async (orderType: OrderType) => {
    try {
      const res = await createDraftOrder({
        variables: {
          input: {
            productVariantId: productVariantId,
            orderType,
          },
        },
      })

      if (res.errors) {
        handleError(res.errors)
        return
      }

      navigation.navigate(NavigationSchema.PageNames.Order, { order: res.createDraftedOrder })
    } catch (err) {
      handleError(err)
    }
  }

  const handleNotifyMe = () => {
    /** FIXME **/
    return Promise.resolve()
  }

  const handleNavigateToPartner = (href: string) => {
    Linking.openURL(href)
  }

  return (
    <ProductBuyAlert
      onDismiss={onDismiss}
      tabs={tabs}
      initialTab={initialTab}
      onNavigateToPartner={handleNavigateToPartner}
      onCreateDraftOrder={handleCreateDraftOrder}
      onNotifyMe={handleNotifyMe}
    />
  )
}

const ProductBuyAlert = styled(ProductBuyAlertBase)`
  height: ${height};
`
