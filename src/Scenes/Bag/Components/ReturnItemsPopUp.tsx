import { useNavigation } from "@react-navigation/native"
import { Flex, Box, PopUp, Sans, Button, Separator, Spacer } from "App/Components"
import { space } from "App/utils"
import React from "react"
import { Schema as NavigationSchema } from "App/Navigation"
import { TouchableOpacity } from "react-native-gesture-handler"

export const ReturnItemsPopUp = ({ show, windowWidth, setShowReturnItemPopup, startReservation }) => {
  const buttonWidth = windowWidth / 2 - space(2) - space(0.5)
  const navigation = useNavigation()

  const onYes = () => {
    setShowReturnItemPopup(false)
    navigation.navigate(NavigationSchema.PageNames.ReturnYourBag)
  }

  const onNo = async () => {
    setShowReturnItemPopup(false)
    await startReservation()
  }

  return (
    <PopUp show={show} paddingBottom={80}>
      <Box pt={4} pb={2}>
        <Sans size="4" textAlign="center">
          Are you returning anything?
        </Sans>
      </Box>
      <Separator />
      <Spacer mb={3} />
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap" px={2}>
        <Button variant="secondaryWhite" width={buttonWidth} onPress={onYes}>
          Yes
        </Button>
        <Button variant="secondaryWhite" width={buttonWidth} onPress={onNo}>
          No
        </Button>
      </Flex>
      <Spacer mb={2} />
      <Box px={4} mb={3}>
        <Sans size="3" textAlign="center" color="black50">
          {`Before placing another order, we need to know\nwhether or not you returned your current items.`}
        </Sans>
      </Box>
      <TouchableOpacity onPress={() => setShowReturnItemPopup(false)}>
        <Sans underline size="4" textAlign="center">
          Cancel
        </Sans>
      </TouchableOpacity>
    </PopUp>
  )
}
