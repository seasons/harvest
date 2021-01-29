import { useNavigation } from "@react-navigation/native"
import { Box, Flex, Sans } from "App/Components"
import { ChevronIcon } from "Assets/icons"
import React from "react"
import { TouchableOpacity } from "react-native"

interface InvitedFriendsRowProps {
  referralLink: string
}

export const InvitedFriendsRow: React.FC<InvitedFriendsRowProps> = ({ referralLink }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ReferralView")}>
      <Box my={4} mx={2}>
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box style={{ maxWidth: 300 }}>
              <Sans size="5">Refer a friend & earn</Sans>
              <Sans size="4" color="black50">
                You have a new invite. Get your link
              </Sans>
            </Box>
          </Flex>
          <ChevronIcon />
        </Flex>
      </Box>
    </TouchableOpacity>
  )
}
