import React, { useState } from "react"
import { Linking } from "react-native"
import { Flex, Button, Spacer, Sans } from "App/Components"
import { TabBar } from "Components/TabBar"
import { Schema as NavigationSchema } from "App/Navigation"
import styled from "styled-components/native"
import { color } from "App/utils"
import { PRODUCT_VARIANT_CREATE_DRAFT_ORDER } from "App/Scenes/Product/Mutations"
import { useMutation } from "@apollo/client"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { BagItemFragment_product_variants } from "App/generated/BagItemFragment"
import { OrderType } from "App/Scenes/Product/Product"

export const height = 310

const TAB_LABELS = ["New", "Used"]
export enum TabType {
  NEW = "NEW",
  NEW_UNAVAILABLE = "NEW_UNAVAILABLE",
  USED = "USED",
  USED_UNAVAILABLE = "USED_UNAVAILABLE",
}

export type Tab =
  | { type: TabType.NEW; price: number; brandHref: string; brandName: string }
  | { type: TabType.NEW_UNAVAILABLE; brandHref: string; brandName: string }
  | { type: TabType.USED; price: number; brandHref: string; brandName: string }
  | { type: TabType.USED_UNAVAILABLE }

type Props = {
  onDismiss: () => void
  tabs: Tab[]
  initialTab: number
  variant: BagItemFragment_product_variants
  navigation: any
}

export const BuyBottomSheet: React.FC<Props> = ({ onDismiss, tabs, initialTab = 0, variant, navigation }) => {
  const [activeTabIdx, setActiveTabIdx] = React.useState<number>(initialTab)
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const [createDraftOrder] = useMutation(PRODUCT_VARIANT_CREATE_DRAFT_ORDER, {
    onCompleted: (res) => {
      setIsMutating(false)
      if (res?.createDraftedOrder) {
        onDismiss()
        navigation.navigate(NavigationSchema.PageNames.Order, { order: res.createDraftedOrder })
      }
    },
    onError: (error) => {
      console.log("error createDraftOrder ", error)
      setIsMutating(false)
      showPopUp({
        title: "Sorry! There was a problem",
        note: "There was an issue purchasing this item, please contact us if the issue persists.",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
        },
      })
    },
  })

  const handleCreateDraftOrder = (orderType: "Used" | "New") => {
    return createDraftOrder({
      variables: {
        input: {
          productVariantID: variant?.id,
          orderType,
        },
      },
    })
  }

  const handleBuyNew = () => {
    /** TODO: implement **/
  }

  const onNavigateToPartner = (href: string) => {
    Linking.openURL(href)
  }

  const onNotifyMe = () => {
    /** TODO: implement **/
  }

  const onBuyUsed = () => {
    setIsMutating(true)
    handleCreateDraftOrder(OrderType.BUY_USED)
  }

  const renderTab = (tab: Tab) => {
    switch (tab.type) {
      case TabType.NEW:
        return (
          <Flex flexDirection="column" alignItems="center" px="3" py="4" key={TabType.NEW}>
            <Button variant="primaryBlack" block onPress={handleBuyNew} loading={isMutating}>
              Buy new for{" "}
              {(tab.price / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Button>
            <Spacer mb={3} />
            <Sans size="3" opacity={0.5} color="black100" textAlign="center">
              Orders fulfilled by{" "}
              <UnderlinedSans size="3" onPress={() => onNavigateToPartner(tab.brandHref)}>
                {tab.brandName}
              </UnderlinedSans>
              . Payment & shipping information on file will be used for checkout.
            </Sans>
            <Spacer mb={4} />
            <UnderlinedSans size="4" onPress={onDismiss}>
              Cancel
            </UnderlinedSans>
          </Flex>
        )
      case TabType.NEW_UNAVAILABLE:
        return (
          <Flex flexDirection="column" px="3" py="4" alignItems="center" key={TabType.NEW_UNAVAILABLE}>
            <Button variant="secondaryWhite" block disabled>
              Sold Out
            </Button>
            <Spacer mb={3} />
            <Sans size="3" opacity={0.5} color="black100" textAlign="center">
              Orders fulfilled by{" "}
              <UnderlinedSans size="3" onPress={() => onNavigateToPartner(tab.brandHref)}>
                {tab.brandName}
              </UnderlinedSans>
              . Payment & shipping information on file will be used for checkout.
            </Sans>
            <Spacer mb={4} />
            <UnderlinedSans size="4" onPress={onDismiss}>
              Cancel
            </UnderlinedSans>
          </Flex>
        )
      case TabType.USED:
        return (
          <Flex flexDirection="column" px="3" py="4" alignItems="center" key={TabType.USED}>
            <Button variant="primaryWhite" block onPress={onBuyUsed} disabled={isMutating} loading={isMutating}>
              Buy used for{" "}
              {(tab.price / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Button>
            <Spacer mb={3} />
            <Sans size="3" opacity={0.5} color="black100" textAlign="center">
              Orders fulfilled by Seasons. Payment & shipping information on file will be used for checkout.
            </Sans>
            <Spacer mb={4} />
            <UnderlinedSans size="4" onPress={onDismiss}>
              Cancel
            </UnderlinedSans>
          </Flex>
        )
      case TabType.USED_UNAVAILABLE:
        return (
          <Flex flexDirection="column" px="3" py="4" alignItems="center" key={TabType.USED_UNAVAILABLE}>
            <Button variant="secondaryWhite" block onPress={onNotifyMe}>
              Notify Me
            </Button>
            <Spacer mb={3} />
            <Sans size="3" opacity={0.5} color="black100" textAlign="center">
              This used item isn't available for purchase. Tap Notify Me to get updated when it becomes available.
            </Sans>
            <Spacer mb={4} />
            <UnderlinedSans size="4" onPress={onDismiss}>
              Cancel
            </UnderlinedSans>
          </Flex>
        )
    }
  }

  return (
    <Root flexDirection="column">
      <Spacer mb={2} />
      <TabBar
        spaceEvenly
        tabs={TAB_LABELS}
        activeTab={activeTabIdx}
        goToPage={(index) => {
          setActiveTabIdx(index)
        }}
      />
      {renderTab(tabs[activeTabIdx])}
    </Root>
  )
}

const Root = styled(Flex)`
  height: ${height};
  background-color: ${color("white100")};
  border-top-right-radius: 20;
  border-top-left-radius: 20;
`

const UnderlinedSans = styled(Sans)`
  text-decoration: underline;
`
