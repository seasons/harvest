import React from "react"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { Spacer, Box } from "App/Components"
import { FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { CurrentRotationItem } from "./Components/CurrentRotationItem"
import * as Animatable from "react-native-animatable"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import { get } from "lodash"
import { DateTime } from "luxon"
import { Loader } from "App/Components/Loader"
import { Bag } from "./Bag"

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
                <Box p={3}>
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
