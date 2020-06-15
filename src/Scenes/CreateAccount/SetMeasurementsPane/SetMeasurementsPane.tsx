import { Box, Button, CloseButton, Container, Sans, Separator, Spacer } from "App/Components"
import { color } from "App/utils"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

interface SetMeasurementsPaneProps {
    onSetMeasurements: () => void
}

export const SetMeasurementsPane: React.FC<SetMeasurementsPaneProps> = (props) => {
    const [footerBoxHeight, setFooterBoxHeight] = useState(0)

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
                        <Sans color={color("black100")} size="3">
                            One last step
                        </Sans>
                        <Spacer mb={1} />
                        <Sans color={color("black50")} size="2">
                            Let’s get your measurements and sizing so that we can make sure we take care of you.
                        </Sans>

                        <Spacer mb={5} />

                        <Box style={{ flex: 1, flexDirection: "row" }}>
                            <Box style={{ flex: 0.5, marginRight: 6 }}>
                                <Sans color={color("black100")} size="1">
                                    Height
                                </Sans>
                                <Spacer mb={1} />

                            </Box>
                            <Box style={{ flex: 0.5, marginLeft: 6 }}>
                                <Sans color={color("black100")} size="1">
                                    Weight
                                </Sans>
                            </Box>
                        </Box>

                        <Separator mt={3} mb={3} />

                        <Sans color={color("black100")} size="1">
                            What's your average top size?
                        </Sans>
                        <Spacer mb={3} />
                        <Sans color={color("black100")} size="1">
                            How does this size usually run?
                        </Sans>

                        <Separator mt={3} mb={3} />

                        <Sans color={color("black100")} size="1">
                            Average waist size
                        </Sans>
                        <Spacer mb={3} />
                        <Sans color={color("black100")} size="1">
                            How does this size run?
                        </Sans>
                    </Box>
                    <Box height={footerBoxHeight} />
                </ScrollView>
                <Box style={{ position: "absolute", bottom: 0 }}>
                    {/* <LinearGradient colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]} style={{ position: "absolute", bottom: 0 }}> */}
                    <Box p={2} pb={2} onLayout={e => setFooterBoxHeight(e.nativeEvent.layout.height)}>
                        <Button block variant="primaryBlack">
                            Finish
                        </Button>
                        <Box style={{ height: useSafeArea().bottom }} />
                    </Box>
                    {/* </LinearGradient> */}
                </Box>
            </Box>
        </Container >
    )
}