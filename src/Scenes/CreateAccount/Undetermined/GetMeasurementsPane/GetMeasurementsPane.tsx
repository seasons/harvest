import { Box, Button, Container, Sans, Spacer, Flex } from "App/Components"
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
    $height: Int
    $weight: CustomerDetailCreateweightInput
    $topSizes: CustomerDetailCreatetopSizesInput
    $waistSizes: CustomerDetailCreatewaistSizesInput
  ) {
    addCustomerDetails(
      details: { height: $height, weight: $weight, topSizes: $topSizes, waistSizes: $waistSizes }
      event: CompletedWaitlistForm
    ) {
      id
    }
  }
`

interface GetMeasurementsPaneProps {
  initialMeasurements?: {
    height?: Item
    weight?: Item
    topSizeIndices?: number[]
    waistSizeIndices?: number[]
  }
  onGetMeasurements: () => void
  onRequestBack?: () => void
  // Whether this pane should use the layout for editing (like in the Account onboarding checklist)
  useEditingLayout?: boolean
}

export const GetMeasurementsPane: React.FC<GetMeasurementsPaneProps> = ({
  initialMeasurements,
  onGetMeasurements,
  onRequestBack,
  useEditingLayout = false,
}) => {
  const [height, setHeight] = useState(initialMeasurements?.height)
  const [weight, setWeight] = useState(initialMeasurements?.weight)
  const [topSizeIndices, setTopSizeIndices] = useState(initialMeasurements?.topSizeIndices || Array<number>())
  const [waistSizeIndices, setWaistSizeIndices] = useState(initialMeasurements?.waistSizeIndices || Array<number>())

  const [footerBoxHeight, setFooterBoxHeight] = useState(0)
  const insets = useSafeArea()

  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const [addMeasurements] = useMutation(ADD_MEASUREMENTS, {
    onCompleted: () => {
      setIsMutating(false)
      onGetMeasurements()
    },
    onError: (err) => {
      console.log("Error GetMeasurementsPane.tsx", err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue sending your measurements and sizing. Please retry.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const submitMeasurements = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)
    await addMeasurements({
      variables: {
        height: height.value,
        weight: { set: weight.value },
        topSizes: { set: topSizeIndices.map((i) => Measurements.topSizes[i].value) },
        waistSizes: { set: waistSizeIndices.map((i) => Measurements.waistSizes[i].value) },
      },
    })
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p={2} pt={useEditingLayout ? "80px" : "85px"}>
          <Sans color="black100" size="3">
            {useEditingLayout ? "Measurements" : "One last step"}
          </Sans>
          {!useEditingLayout && (
            <>
              <Spacer mb={1} />
              <Sans color="black50" size="1">
                Let's get your measurements and sizing info so we can make sure we have enough inventory for you.
              </Sans>
            </>
          )}

          <Spacer mb={5} />

          <Flex flexDirection="row">
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
          </Flex>

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

          <Spacer mb={5} />

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
        <Spacer mb={2} />
        <Flex
          p={2}
          flexDirection="row"
          onLayout={(e) => setFooterBoxHeight(e.nativeEvent.layout.height + insets.bottom)}
        >
          {useEditingLayout && (
            <>
              <Box flex={1}>
                <Button block onPress={onRequestBack} variant="primaryWhite">
                  Cancel
                </Button>
              </Box>
              <Spacer mr={1} />
            </>
          )}
          <Box flex={1}>
            <Button
              block
              disabled={!(height && weight && topSizeIndices.length && waistSizeIndices.length)}
              loading={isMutating}
              onPress={submitMeasurements}
              variant="primaryBlack"
            >
              {useEditingLayout ? "Save" : "Finish"}
            </Button>
          </Box>
        </Flex>
        <Spacer height={insets.bottom} />
      </FadeBottom2>
    </Container>
  )
}
