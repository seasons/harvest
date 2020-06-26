import { Box, Button, Container, Sans, Spacer } from "App/Components"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { BoxPicker } from "./BoxPicker"
import Item from "./Item"
import Measurements from "./Measurements"
import { MultiSelectionTable } from "./MultiSelectionTable"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const ADD_MEASUREMENTS = gql`
  mutation addMeasurements(
    $height: Int!
    $weight: String!
    $topSize: String!
    $waistSize: String!
    $topSizeFit: String!
    $waistSizeFit: String!
  ) {
    addCustomerDetails(
      details: { height: $height, weight: $weight, averageTopSize: $topSize, averageWaistSize: $waistSize }
      status: Authorized
      event: CompletedWaitlistForm
    ) {
      id
    }
  }
`

interface GetMeasurementsPaneProps {
  onGetMeasurements: () => void
}

export const GetMeasurementsPane: React.FC<GetMeasurementsPaneProps> = ({ onGetMeasurements }) => {
  const [height, setHeight] = useState(null as Item)
  const [weight, setWeight] = useState(null as Item)
  const [topSizeIndices, setTopSizeIndices] = useState(Array<number>())
  const [waistSizeIndices, setWaistSizeIndices] = useState(Array<number>())

  const [footerBoxHeight, setFooterBoxHeight] = useState(0)
  const insets = useSafeArea()

  const [isMutating, setIsMutating] = useState(false)
  const errorPopUpContext = usePopUpContext()
  const showErrorPopUp = errorPopUpContext.showPopUp
  const hideErrorPopUp = errorPopUpContext.hidePopUp

  const [addMeasurements] = useMutation(ADD_MEASUREMENTS, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("****\n\n", err, "\n\n****")
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue sending your measurements and sizing. Please retry.",
        buttonText: "Close",
        onClose: () => hideErrorPopUp(),
      }
      showErrorPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const submitMeasurements = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)
    const result = await addMeasurements({
      variables: {
        height: height.value,
        weight: weight.value.toString(),
        topSize: topSizeIndices.map((i) => Measurements.topSizes[i]),
        waistSize: waistSizeIndices.map((i) => Measurements.topSizes[i]),
      },
    })
    if (result?.data) {
      onGetMeasurements()
    }
  }

  /////////////////////////
  // TODO: Fix text color
  /////////////////////////

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer mb={5} />
          <Spacer mb={4} />
          <Box p={2}>
            <Sans color="black100" size="3">
              One last step
            </Sans>
            <Spacer mb={1} />
            <Sans color="black50" size="2">
              Let’s get your measurements and sizing info so we can make sure we have enough inventory for you.
            </Sans>

            <Spacer mb={5} />

            <Box style={{ flex: 1, flexDirection: "row" }}>
              <Box style={{ flex: 0.5, marginRight: 6 }}>
                <Sans color="black100" size="1">
                  Height
                </Sans>
                <Spacer mb={1} />
                <BoxPicker
                  onChange={(value) => setHeight(value)}
                  title="Height"
                  currentItem={height}
                  items={Measurements.heights}
                />
              </Box>
              <Box style={{ flex: 0.5, marginLeft: 6 }}>
                <Sans color="black100" size="1">
                  Weight
                </Sans>
                <Spacer mb={1} />
                <BoxPicker
                  onChange={(value) => setWeight(value)}
                  title="Weight"
                  currentItem={weight}
                  items={Measurements.weights}
                />
              </Box>
            </Box>

            <Spacer mb={5} />

            <Sans color="black100" size="1">
              What are your preferred top sizes?
            </Sans>
            <Spacer mb={1} />
            <MultiSelectionTable
              items={Measurements.topSizes}
              onTap={(_, index) =>
                // Recreate a new array reference so that the component reloads
                setTopSizeIndices([
                  ...(topSizeIndices.includes(index)
                    ? topSizeIndices.filter((i) => i !== index)
                    : topSizeIndices.concat([index])),
                ])
              }
              selectedItemIndices={topSizeIndices}
            />

            <Spacer mb={4} />

            <Sans color="black100" size="1">
              Your preferred waist size?
            </Sans>
            <Spacer mb={1} />
            <MultiSelectionTable
              items={Measurements.waistSizes}
              onTap={(_, index) =>
                // Recreate a new array reference so that the component reloads
                setWaistSizeIndices([
                  ...(waistSizeIndices.includes(index)
                    ? waistSizeIndices.filter((i) => i !== index)
                    : waistSizeIndices.concat([index])),
                ])
              }
              selectedItemIndices={waistSizeIndices}
            />
          </Box>
          <Box height={footerBoxHeight} />
        </ScrollView>
        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Box p={2} pb={2} onLayout={(e) => setFooterBoxHeight(e.nativeEvent.layout.height)}>
            <Button
              block
              disabled={!(height && weight && topSizeIndices.length && waistSizeIndices.length)}
              onPress={submitMeasurements}
              variant="primaryBlack"
            >
              Finish
            </Button>
            <Box style={{ height: insets.bottom }} />
          </Box>
        </FadeBottom2>
      </Box>
    </Container>
  )
}
