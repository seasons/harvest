import { Box, Button, CloseButton, Container, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

interface ChoosePlanPaneProps {
    onChoosePlan: () => void
}

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = (props) => {
    const [footerBoxHeight, setFooterBoxHeight] = useState(0)

    return (
        <Container insetsBottom={false} insetsTop={false}>
            <CloseButton />
            <Box style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Spacer mb={5} />
                    <Spacer mb={4} />
                    <Box p={2}>
                        <Sans color={color("black100")} size="3">
                            You're in.{"\n"}
                            Let's choose your plan
                        </Sans>
                        <Spacer mb={1} />
                        <Sans color={color("black50")} size="2">
                            Don't worry, you can change your plan from your profile settings at any time.
                        </Sans>

                        <Spacer mb={5} />
                    </Box>
                    <Box height={footerBoxHeight} />
                </ScrollView>
            </Box>
            <Box style={{ position: "absolute", bottom: 0 }}>
                {/* <LinearGradient colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]} style={{ position: "absolute", bottom: 0 }}> */}
                <Box p={2} pb={2} onLayout={e => setFooterBoxHeight(e.nativeEvent.layout.height)}>
                    <Button block variant="primaryBlack">
                        Choose plan
                    </Button>
                    <Box style={{ height: useSafeArea().bottom }} />
                </Box>
                {/* </LinearGradient> */}
            </Box>
        </Container>
    )
}