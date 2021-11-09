import React from "react"
import { StyleSheet } from "react-native"
import Animated, { Extrapolate, interpolateNode, Value } from "react-native-reanimated"
import BottomSheet from "reanimated-bottom-sheet"

type BottomSheetProps = JSX.LibraryManagedAttributes<typeof BottomSheet, React.ComponentProps<typeof BottomSheet>>

export const BottomSheetContext = React.createContext({
  bottomSheetSetProps: (_props: BottomSheetProps) => null,
  bottomSheetSnapToIndex: (_index: number) => null,
  bottomSheetBackdropIsVisible: false,
})

export const useBottomSheetContext = () => React.useContext(BottomSheetContext)

export const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = React.useRef(null)
  const [backdropIsVisible, setBackdropIsVisible] = React.useState(false)
  const [bottomSheetProps, setBottomSheetProps] = React.useState<BottomSheetProps>(null)
  const awaitingPropUpdate = React.useRef(false)
  const deferredSnapToIndex = React.useRef<number | null>(null)

  const animatedPosition = React.useRef(new Value(0))
  const opacity = interpolateNode(animatedPosition.current, {
    inputRange: [0, 1],
    outputRange: [0.75, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  const handleSetProps = (props: BottomSheetProps) => {
    awaitingPropUpdate.current = true
    setBottomSheetProps(props)
  }

  const handleSnapToIndex = (index: number) => {
    if (awaitingPropUpdate.current) {
      deferredSnapToIndex.current = index
    } else if (bottomSheetRef.current) {
      setBackdropIsVisible(true)
      bottomSheetRef.current.snapTo(index)
    }
  }

  React.useEffect(() => {
    if (awaitingPropUpdate.current) {
      awaitingPropUpdate.current = false
    }
    if (typeof deferredSnapToIndex.current === "number" && bottomSheetRef.current) {
      setBackdropIsVisible(true)
      bottomSheetRef.current.snapTo(deferredSnapToIndex.current)
      deferredSnapToIndex.current = null
    }
  }, [bottomSheetProps])

  return (
    <>
      <BottomSheetContext.Provider
        value={{
          bottomSheetSetProps: handleSetProps,
          bottomSheetSnapToIndex: handleSnapToIndex,
          bottomSheetBackdropIsVisible: backdropIsVisible,
        }}
      >
        {children}
      </BottomSheetContext.Provider>
      {backdropIsVisible && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, { backgroundColor: "black", opacity }]}
        />
      )}
      {bottomSheetProps && (
        <BottomSheet
          {...bottomSheetProps}
          ref={bottomSheetRef}
          callbackNode={animatedPosition.current}
          onOpenStart={() => setBackdropIsVisible(true)}
          onCloseEnd={() => setBackdropIsVisible(false)}
        />
      )}
    </>
  )
}
