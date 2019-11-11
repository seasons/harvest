import { Box, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import gql from "graphql-tag"
import { get } from "lodash"
import React from "react"
import { DateTime } from "luxon"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import { Bag } from "./Bag"
import { CurrentRotationItem } from "./Components/CurrentRotationItem"

const ACTIVE_RESERVATION = gql`
  {
    me {
      activeReservation {
        id
        shipped
        createdAt
        products {
          id
          seasonsUID
          inventoryStatus
          productStatus
          productVariant {
            size
            product {
              name
              retailPrice
              brand {
                name
              }
              images
            }
          }
        }
      }
    }
  }
`

export const CurrentRotation = props => {
  const { data, loading } = useQuery(ACTIVE_RESERVATION)
  const insets = useSafeArea()

  if (loading) {
    return <Loader />
  }

  const activeReservation = get(data, "me.activeReservation", null)
  const returnDate = !!activeReservation
    ? DateTime.fromISO(activeReservation.createdAt)
        .plus({ days: 30 })
        .toLocaleString(DateTime.DATE_FULL)
    : ""

  if (!activeReservation) {
    console.log("Inside navigate to Bag")

    return <Bag {...props} />
  }

  const renderItem = ({ item, index }) => {
    return (
      <Box mx={2} key={index}>
        <CurrentRotationItem physicalProduct={item} />
      </Box>
    )
  }

  return (
    <Container>
      <Box style={{ flex: 1, paddingTop: insets.top }}>
        <Animatable.View animation="fadeIn" duration={300}>
          <Box>
            <FlatList
              data={activeReservation ? activeReservation.products : []}
              ListHeaderComponent={() => (
                <Box p={2}>
                  <Sans size="3" color="black">
                    Current Rotation
                  </Sans>
                  <Sans size="2" color="gray">
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
              renderItem={item => renderItem(item)}
              ListFooterComponent={() => <Spacer mb={40} />}
            />
          </Box>
        </Animatable.View>
      </Box>
    </Container>
  )
}
