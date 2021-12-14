import { Loader } from "App/Components/Loader"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import React, { useRef, useState } from "react"
import { Schema as NavigationSchema } from "App/Navigation"
import { FlatList, RefreshControl, StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useFocusEffect, useNavigation, useScrollToTop } from "@react-navigation/native"
import { SavedItemsTab } from "./SavedItemsTab/SavedItemsTab"
import { ReservationHistoryTab } from "./ReservationHistoryTab/ReservationHistoryTab"
import { useLazyQuery, useQuery } from "@apollo/client"
import { ReservationHistoryTab_Query, SavedTab_Query } from "./queries"
import { FixedBackArrow, Spacer } from "App/Components"

export enum SavedAndHistoryView {
  Saved = 0,
  History = 1,
}

export const SavedAndHistory = screenTrack()(({ route }) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { previousData, data = previousData, refetch } = useQuery(SavedTab_Query)
  const [
    getReservationData,
    { previousData: prevHistoryData, data: historyData = prevHistoryData, loading: loadingHistory },
  ] = useLazyQuery(ReservationHistoryTab_Query)

  const [refreshing, setRefreshing] = useState(false)
  const flatListRef = useRef(null)
  const { bottomSheetBackdropIsVisible } = useBottomSheetContext()
  const tracking = useTracking()

  const routeTab = route?.params?.tab
  const [currentView, setCurrentView] = useState<SavedAndHistoryView>(SavedAndHistoryView.Saved)

  useScrollToTop(flatListRef)

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content")
      if (!!routeTab && currentView !== routeTab) {
        setCurrentView(routeTab)
      }
    }, [])
  )

  const isSavedView = SavedAndHistoryView.Saved == currentView

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  if (!data) {
    return (
      <>
        <FixedBackArrow
          navigation={navigation}
          variant="whiteBackground"
          onPress={() => navigation.navigate(NavigationSchema.PageNames.Account)}
        />
        <Loader />
      </>
    )
  }

  const renderItem = ({ item }) => {
    if (isSavedView) {
      return <SavedItemsTab items={item.data?.me?.savedItems} />
    } else {
      return <ReservationHistoryTab items={item.data?.me?.customer?.reservations} loading={loadingHistory} />
    }
  }

  let sections
  if (isSavedView) {
    sections = [{ data: data }]
  } else {
    sections = [{ data: historyData }]
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <FixedBackArrow
        navigation={navigation}
        variant="whiteBackground"
        onPress={() => navigation.navigate(NavigationSchema.PageNames.Account)}
      />
      <View
        pointerEvents={bottomSheetBackdropIsVisible ? "none" : "auto"}
        style={{ flexDirection: "column", flex: 1, paddingTop: insets?.top }}
      >
        <Spacer mb={4} />
        <TabBar
          spaceEvenly
          tabs={[{ name: "Saved items" }, { name: "History" }]}
          activeTab={currentView}
          goToPage={(page: SavedAndHistoryView) => {
            tracking.trackEvent({
              actionName: (() => {
                if (page === SavedAndHistoryView.Saved) {
                  return TrackSchema.ActionNames.SavedTabTapped
                } else {
                  getReservationData()
                  return TrackSchema.ActionNames.HistoryTabTapped
                }
              })(),
              actionType: TrackSchema.ActionTypes.Tap,
            })
            setCurrentView(page)
          }}
        />
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={sections}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => String(index) + item.id + String(currentView)}
          renderItem={(item) => {
            return renderItem(item)
          }}
          ref={flatListRef}
        />
      </View>
    </Container>
  )
})
