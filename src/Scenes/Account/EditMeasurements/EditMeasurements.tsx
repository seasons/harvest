import { CloseButton, Container } from "App/Components"
import React from "react"
import { GetMeasurementsPane, Measurements } from "App/Scenes/CreateAccount/Undetermined"

export interface InitialMeasurements {
  height?: any
  weight?: any
  topSizes?: any
  waistSizes?: any
}

const measurementsFrom = (params: any) => {
  if (params?.measurements) {
    return params?.measurements
  } else {
    const rawMeasurements = params?.rawMeasurements
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
    return measurements
  }
}

export const EditMeasurements: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const measurements = measurementsFrom(route?.params)

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <CloseButton variant="light" />
      <GetMeasurementsPane
        initialMeasurements={measurements}
        onGetMeasurements={navigation.goBack}
        onRequestBack={navigation.goBack}
        useEditingLayout
      />
    </Container>
  )
}
