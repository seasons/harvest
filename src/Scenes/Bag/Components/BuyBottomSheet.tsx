import React from "react"
import { Linking } from "react-native"
import { Flex, Button, Spacer, Sans } from "App/Components"
import { TabBar } from "Components/TabBar"
import styled from "styled-components/native"
import { color } from "App/utils"

export const height = 298

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
}

export const BuyBottomSheet: React.FC<Props> = ({ onDismiss, tabs }) => {
  const [activeTabIdx, setActiveTabIdx] = React.useState<number>(0)
  const handleBuyNew = () => {
    /** TODO: implement **/
  }

  const onNavigateToPartner = (href: string) => {
    Linking.openURL(href)
  }

  const onNotifyMe = () => {
    /** TODO: implement **/
  }

  const renderTab = (tab: Tab) => {
    switch (tab.type) {
      case TabType.NEW:
        return (
          <Flex flexDirection="column" alignItems="center" px="3" py="4" key={TabType.NEW}>
            <Button variant="primaryBlack" block onPress={handleBuyNew}>
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
            <Button variant="primaryGray" block disabled>
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
            <Button variant="secondaryWhite" block onPress={onNotifyMe}>
              Buy new for{" "}
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
