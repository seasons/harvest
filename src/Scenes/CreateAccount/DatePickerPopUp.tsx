import { Box, Button, CloseButton, Container, Flex, Sans, Spacer, TextInput } from "App/Components"
import { color } from "App/utils"
import React, { useEffect, useRef, useState, MutableRefObject } from "react"
import { Animated, Dimensions, Modal, SafeAreaView, StyleSheet, View } from "react-native"
import DatePicker from "react-native-date-picker"

export interface DatePickerData {
    day: number
    month: number
    year: number
}

export interface DatePickerPopUpProps {
    buttonText: string
    onRequestClose: (DatePickerData) => void
    title: string
    visible: boolean
}

export const DatePickerPopUp: React.FC<DatePickerPopUpProps> = ({
    buttonText,
    onRequestClose,
    visible,
    title,
}) => {
    // animation setup
    const [lastVisibility, setLastVisibility] = useState(false)

    const screenHeight = Dimensions.get('screen').height
    const [animationValue, setAnimationValue] = useState(new Animated.Value(screenHeight))
    const openAnimation = Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
    })
    const closeAnimation = Animated.timing(animationValue, {
        toValue: screenHeight,
        duration: 300,
    })

    const handleDismiss = () => {
        onRequestClose({
            day: 0,
            month: 0,
            year: 0,
        })
    }

    if (visible !== lastVisibility) {
        if (visible === true) {
            // open
            openAnimation.start(() => {

            })
        } else {
            // close
            closeAnimation.start(() => {

            })
        }
        setLastVisibility(visible)
    }

    const top = animationValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    })

    // picker

    const setDate = (date: Date) => {

    }

    // render

    return (
        <Modal
            animated
            animationType="fade"
            transparent
            onRequestClose={() => handleDismiss()}
            visible={visible}
        >
            <View style={styles.overlay}>
                <Animated.View style={[styles.container, { top }]}>
                    <SafeAreaView>
                        <Box p={4} pb={4}>
                            <Sans color={color("black100")} size="3">
                                {title}
                            </Sans>
                            <Spacer mb={3} />
                            <DatePicker onDateChange={setDate} />
                            <Spacer mb={3} />
                            <Button block variant="primaryBlack" onPress={() => onRequestClose(2)}>
                                {buttonText}
                            </Button>
                        </Box>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "rgba(0,0,0,0.7)",
        flex: 1,
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "white",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 0,
    },
    box: {
        backgroundColor: "white",
    },
})