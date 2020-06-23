import { Box, Button, Container, Sans, Separator, Spacer } from "App/Components"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { BoxPicker } from "./BoxPicker"
import Measurements from "./Measurements"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

interface GetMeasurementsPaneProps {
  onGetMeasurements: () => void
}

export const GetMeasurementsPane: React.FC<GetMeasurementsPaneProps> = ({ onGetMeasurements }) => {
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [topSize, setTopSize] = useState(null)
  const [topSizeFit, setTopSizeFit] = useState(null)
  const [waistSize, setWaistSize] = useState(null)
  const [waistSizeFit, setWaistSizeFit] = useState(null)

  const [footerBoxHeight, setFooterBoxHeight] = useState(0)
  const insets = useSafeArea()

  const submitMeasurements = () => {
    onGetMeasurements()
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
              Let’s get your measurements and sizing so that we can make sure we take care of you.
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

            <Separator mt={3} mb={3} />

            <Sans color="black100" size="1">
              What's your preferred top size?
            </Sans>
            <Spacer mb={1} />
            <BoxPicker
              onChange={(value) => setTopSize(value)}
              title="Top size"
              currentItem={topSize}
              items={Measurements.topSizes}
            />

            <Spacer mb={3} />
            <Sans color="black100" size="1">
              How does this size usually run?
            </Sans>
            <Spacer mb={1} />
            <BoxPicker
              onChange={(value) => setTopSizeFit(value)}
              title="How does this size run?"
              currentItem={topSizeFit}
              items={Measurements.fits}
            />

            <Separator mt={3} mb={3} />

            <Sans color="black100" size="1">
              Your preferred waist size?
            </Sans>
            <Spacer mb={1} />
            <BoxPicker
              onChange={(value) => setWaistSize(value)}
              title="Waist size"
              currentItem={waistSize}
              items={Measurements.waistSizes}
            />
            <Spacer mb={3} />
            <Sans color="black100" size="1">
              How does this size run?
            </Sans>
            <Spacer mb={1} />
            <BoxPicker
              onChange={(value) => setWaistSizeFit(value)}
              title="How does this size run?"
              currentItem={waistSizeFit}
              items={Measurements.fits}
            />
          </Box>
          <Box height={footerBoxHeight} />
        </ScrollView>
        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Box p={2} pb={2} onLayout={(e) => setFooterBoxHeight(e.nativeEvent.layout.height)}>
            <Button
              block
              disabled={!(height && weight && topSize && topSizeFit && waistSize && waistSizeFit)}
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
