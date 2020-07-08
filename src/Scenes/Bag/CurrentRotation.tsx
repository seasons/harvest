import { ACTIVE_RESERVATION } from "App/Apollo/Queries"
import { Box, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { get } from "lodash"
import { DateTime } from "luxon"
import React, { useEffect } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import * as Animatable from "react-native-animatable"
import { Bag } from "./Bag"
import { CurrentRotationItem } from "./Components/CurrentRotationItem"

export const CurrentRotation = (props) => {
  const { data, loading, refetch } = useQuery(ACTIVE_RESERVATION)

  useEffect(() => {
    refetch()
  }, [get(props, "route.params.reservationID", "")])

  if (loading) {
    return <Loader />
  }

  const activeReservation = get(data, "me.activeReservation", null)

  if (!activeReservation) {
    return <Bag {...props} />
  }

  const returnDate = !!activeReservation
    ? DateTime.fromISO(activeReservation.createdAt).plus({ days: 30 }).toLocaleString(DateTime.DATE_FULL)
    : ""

  const renderItem = ({ item, index }) => {
    return (
      <Box mx={2} key={index}>
        <CurrentRotationItem physicalProduct={item} />
      </Box>
    )
  }

  return (
    <Container>
      <Animatable.View animation="fadeIn" duration={300}>
        <Box>
          <FlatList
            data={activeReservation ? activeReservation.products : []}
            ListHeaderComponent={() => (
              <Box p={2}>
                <Sans size="3" color="black">
                  Current Rotation
                </Sans>
                <Sans size="2" color="black50">
                  Return By {returnDate}
                </Sans>
              </Box>
            )}
            ItemSeparatorComponent={() => (
              <Box px={2}>
                <Spacer mb={2} />
              </Box>
            )}
            keyExtractor={(_item, index) => String(index)}
            renderItem={(item) => renderItem(item)}
            ListFooterComponent={() => <Spacer mb={40} />}
          />
        </Box>
      </Animatable.View>
    </Container>
  )
}
