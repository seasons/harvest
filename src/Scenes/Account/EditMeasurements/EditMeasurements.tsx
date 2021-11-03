import { CloseButton, Container } from "App/Components"
import React from "react"
import { screenTrack } from "App/utils/track"
import { GetMeasurementsPane, Measurements } from "App/Scenes/CreateAccount/Undetermined"

export interface InitialMeasurements {
  shoeSize?: any
  pantLength?: any
  topSizes?: any
  waistSizes?: any
}

const measurementsFrom = (params: any) => {
  if (params?.measurements) {
    return params?.measurements
  } else {
    const rawMeasurements = params?.rawMeasurements
    const shoeSize = rawMeasurements?.shoeSize
    const pantLength = rawMeasurements?.pantLength
    const topSizes = rawMeasurements?.topSizes
    const waistSizes = rawMeasurements?.waistSizes

    const measurements = { shoeSize: null, pantLength: null, topSizeIndices: null, waistSizeIndices: null }

    if (shoeSize) {
      measurements.shoeSize = Measurements.shoeSizes.find((item) => item.value == shoeSize)
    }

    if (pantLength) {
      measurements.pantLength = Measurements.pantLengths.find((item) => item.value == pantLength)
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
}> = screenTrack()(({ navigation, route }) => {
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
})
