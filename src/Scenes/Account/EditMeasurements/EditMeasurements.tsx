import { Container, FixedBackArrow, Spacer } from "App/Components"
import React from "react"
import { useSafeArea } from "react-native-safe-area-context"
import { GetMeasurementsPane, Measurements } from "App/Scenes/CreateAccount/Undetermined"

export interface InitialMeasurements {
  height?: any
  weight?: any
  topSizes?: any
  waistSizes?: any
}

export const EditMeasurements: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const layout = useSafeArea()

  const rawMeasurements = route?.params?.measurements
  const height = rawMeasurements?.height
  const weightRange = rawMeasurements?.weight
  const topSizes = rawMeasurements?.topSizes
  const waistSizes = rawMeasurements?.waistSizes

  const measurements = { height: null, weight: null, topSizeIndices: null, waistSizeIndices: null }

  if (height) {
    measurements.height = Measurements.heights.find((item) => item.value == height)
  }

  if (weightRange && weightRange?.length == 2) {
    measurements.weight = Measurements.weights.find(
      (item) => item.value[0] == weightRange[0] && item.value[1] == weightRange[1]
    )
  }

  if (topSizes) {
    measurements.topSizeIndices = Measurements.topSizes.reduce(
      (accumulator, item, index) => (topSizes.includes(item.value) ? [...accumulator, index] : accumulator),
      [] as number[]
    )
  }

  if (waistSizes) {
    measurements.waistSizeIndices = Measurements.waistSizes.reduce(
      (accumulator, item, index) => (waistSizes.includes(item.value) ? [...accumulator, index] : accumulator),
      [] as number[]
    )
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Spacer mb={layout.top} />
      <GetMeasurementsPane
        initialMeasurements={measurements}
        onGetMeasurements={() => {}}
        onRequestBack={navigation.goBack}
        useEditingLayout
      />
    </Container>
  )
}
