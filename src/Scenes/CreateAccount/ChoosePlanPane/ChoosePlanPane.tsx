import { PlanTile } from "./PlanTile"
import { Box, Button, CloseButton, Container, Sans, Spacer } from "App/Components"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

interface ChoosePlanPaneProps {
    onChoosePlan: () => void
}

enum Plan {
    ESSENTIAL, ALL_ACCESS, NONE
}

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = (props) => {
    const [footerBoxHeight, setFooterBoxHeight] = useState(0)
    const [selectedPlan, setSelectedPlan] = useState(Plan.NONE)

    return (
        <Container insetsBottom={false} insetsTop={false}>
            <CloseButton />
            <Box style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Spacer mb={5} />
                    <Spacer mb={4} />
                    <Box p={2}>
                        <Sans color="black100" size="3">
                            You're in.{"\n"}
                            Let's choose your plan
                        </Sans>
                        <Spacer mb={1} />
                        <Sans color="black50" size="2">
                            Don't worry, you can change your plan from your profile settings at any time.
                        </Sans>

                        <Spacer mb={2} />
                    </Box>
                    <PlanTile
                        description="A monthly wardrobe refresh to make getting dressed more exciting. The must have."
                        inputKey={Plan.ESSENTIAL}
                        price={155}
                        shouldSelect={setSelectedPlan}
                        selected={selectedPlan == Plan.ESSENTIAL}
                        subtitle="1 swap, 3 items per month"
                        title="Essential"
                    />
                    <PlanTile
                        description="Experience that new-clothes feeling every week."
                        inputKey={Plan.ALL_ACCESS}
                        price={195}
                        shouldSelect={setSelectedPlan}
                        selected={selectedPlan == Plan.ALL_ACCESS}
                        subtitle="Unlimited swaps, 3 items at a time"
                        title="All Access"
                    />

                    <Box height={footerBoxHeight} />
                </ScrollView>
            </Box>
            <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
                <Box p={2} onLayout={e => setFooterBoxHeight(e.nativeEvent.layout.height)}>
                    <Button disabled={selectedPlan === Plan.NONE} block variant="primaryBlack">
                        Choose plan
                    </Button>
                    <Box style={{ height: useSafeArea().bottom }} />
                </Box>
            </FadeBottom2>
        </Container>
    )
}