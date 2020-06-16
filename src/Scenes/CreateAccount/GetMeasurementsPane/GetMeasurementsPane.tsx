import { Box, Button, CloseButton, Container, Sans, Separator, Spacer } from "App/Components"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { BoxPicker } from "./BoxPicker"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

const sampleData = [
    { display: "Hot", value: 0 },
    { display: "Cold", value: 2 },
    { display: "Just right", value: 1 },
]

interface GetMeasurementsPaneProps {
    onGetMeasurements: () => void
}

export const GetMeasurementsPane: React.FC<GetMeasurementsPaneProps> = ({
    onGetMeasurements,
}) => {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [topSize, setTopSize] = useState(null)
    const [topSizeFit, setTopSizeFit] = useState(null)
    const [waistSize, setWaistSize] = useState(null)
    const [waistSizeFit, setWaistSizeFit] = useState(null)

    const [footerBoxHeight, setFooterBoxHeight] = useState(0)

    const submitMeasurements = () => {
        onGetMeasurements()
    }

    /////////////////////////
    // TODO: Fix text color
    /////////////////////////

    return (
        <Container insetsBottom={false} insetsTop={false}>
            <CloseButton />
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
                                    onChange={(value,) => setHeight(value)}
                                    title="Height"
                                    currentValue={height}
                                    values={sampleData}
                                />
                            </Box>
                            <Box style={{ flex: 0.5, marginLeft: 6 }}>
                                <Sans color="black100" size="1">
                                    Weight
                                </Sans>
                                <Spacer mb={1} />
                                <BoxPicker
                                    onChange={(value,) => setWeight(value)}
                                    title="Weight"
                                    currentValue={weight}
                                    values={sampleData}
                                />
                            </Box>
                        </Box>

                        <Separator mt={3} mb={3} />

                        <Sans color="black100" size="1">
                            What's your preferred top size?
                        </Sans>
                        <Spacer mb={1} />
                        <BoxPicker
                            onChange={(value,) => setTopSize(value)}
                            title="Top size"
                            currentValue={topSize}
                            values={sampleData}
                        />

                        <Spacer mb={3} />
                        <Sans color="black100" size="1">
                            How does this size usually run?
                        </Sans>
                        <Spacer mb={1} />
                        <BoxPicker
                            onChange={(value,) => setTopSizeFit(value)}
                            title="How does this size run?"
                            currentValue={topSizeFit}
                            values={sampleData}
                        />

                        <Separator mt={3} mb={3} />

                        <Sans color="black100" size="1">
                            Your preferred waist size?
                        </Sans>
                        <Spacer mb={1} />
                        <BoxPicker
                            onChange={(value,) => setWaistSize(value)}
                            title="Waist size"
                            currentValue={waistSize}
                            values={sampleData}
                        />
                        <Spacer mb={3} />
                        <Sans color="black100" size="1">
                            How does this size run?
                        </Sans>
                        <Spacer mb={1} />
                        <BoxPicker
                            onChange={(value,) => setWaistSizeFit(value)}
                            title="How does this size run?"
                            currentValue={waistSize}
                            values={sampleData}
                        />
                    </Box>
                    <Box height={footerBoxHeight} />
                </ScrollView>
                <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
                    <Box p={2} pb={2} onLayout={e => setFooterBoxHeight(e.nativeEvent.layout.height)}>
                        <Button block variant="primaryBlack" onPress={submitMeasurements}>
                            Finish
                        </Button>
                        <Box style={{ height: useSafeArea().bottom }} />
                    </Box>
                </FadeBottom2>
            </Box>
        </Container>
    )
}