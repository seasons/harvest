import React from "react"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { Spacer, Box, Separator } from "App/Components"
import { FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { color } from "App/Utils"
import { CurrentRotationItem } from "./Components/CurrentRotationItem"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import { get } from "lodash"
import { Bag } from "./Bag"

const ACTIVE_RESERVATION = gql`
  {
    me {
      activeReservation {
        id
        shipped
        products {
          id
          seasonsUID
          inventoryStatus
          productStatus
          productVariant {
            size
            product {
              name
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
    // Show loading screen
  }

  const activeReservation = get(data, "me.activeReservation", null)

  if (!activeReservation) {
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
        {
          <Box>
            <FlatList
              data={activeReservation.products}
              ListHeaderComponent={() => (
                <Box p={2}>
                  <Sans size="3" color="black">
                    Current Rotation
                  </Sans>
                  <Sans size="2" color="gray">
                    Return By {``}
                  </Sans>
                </Box>
              )}
              ItemSeparatorComponent={() => (
                <Box px={2}>
                  <Spacer mb={2} />
                  <Separator color={color("lightGray")} />
                  <Spacer mb={2} />
                </Box>
              )}
              keyExtractor={(_item, index) => String(index)}
              renderItem={item => renderItem(item)}
              ListFooterComponent={() => <Spacer mb={200} />}
            />
          </Box>
        }
      </Box>
    </Container>
  )
}
