import { Box, CloseButton } from "App/Components"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { Dimensions, FlatList } from "react-native"
import { ApplyPromoCodePane } from "./ApplyPromoCodePane"
import { PromoCodeAppliedConfirmationPane } from "./PromoCodeAppliedConfirmationPane"

const { width: windowWidth } = Dimensions.get("window")

export enum State {
  ApplyPromoCode = "ApplyPromoCode",
  Confirmation = "Confirmation"
}

export const ApplyPromoCode: React.FC = (props: any) => {
  const { navigation, route } = props
  const source = route?.params?.source
  const [discount, setDiscount] = useState(0)
  const [discountType, setDiscountType] = useState("Flat")
  // The current index into the `states(userState)` array
  const [index, setIndex] = useState(0)
  // All the states (after the initial state)
  const states = [State.ApplyPromoCode, State.Confirmation]

  const flatListRef: MutableRefObject<FlatList<State>> = useRef(null)
  // The maximum index shown in the FlatList
  const maxScrollableIndex = states.length - 1
  useEffect(() => flatListRef?.current?.scrollToIndex?.({ index: Math.min(index, maxScrollableIndex) }), [index])
  const setNextState = () => setIndex(index + 1)

  const paneForState = (state: State) => {
    let pane

    switch (state) {
      case State.ApplyPromoCode:
        pane = <ApplyPromoCodePane onApplyPromoCode={(discount, type) => {
          setDiscount(discount)
          setDiscountType(type)
          setNextState()
        }}/>
        break
      
      case State.Confirmation:
        pane = <PromoCodeAppliedConfirmationPane onComplete={() => navigation.navigate(source, { discount, discountType })}/>
        break
    }
    return (
      <Box key={state.toString()} width={windowWidth}>
        {pane}
      </Box>
    )
  }

  // Render
  return (
    <>
    <CloseButton variant="light" />
    <FlatList
      data={states}
      horizontal
      initialScrollIndex={Math.min(index, maxScrollableIndex)}
      keyExtractor={(item) => item.toString()}
      ref={flatListRef}
      renderItem={({ item }) => paneForState(item)}
      scrollEnabled={false}
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
    />
    </>
  )
}
