import { Box, Container, FixedBackArrow, Sans, Spacer, Separator, Flex } from "App/Components"
// import { Loader } from "App/Components/Loader"
// import gql from "graphql-tag"
import React, { useEffect } from "react"
// import { useQuery } from "@apollo/client"
import { FlatList } from "react-native"
import { screenTrack } from "App/utils/track"
import { color } from "App/utils"
import { Schema as NavigationSchema } from "App/Navigation"

const AccountSection: React.FC<{ title: string; value: string | [string] }> = ({ title, value }) => {
  return (
    <Box key={title} px={2}>
      <Box mb={40} />
      <Sans size="4">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("black10")} />
      <Box mb={1} />
      {Array.isArray(value) ? (
        value.map((text) => (
          <Sans key={text} size="4" color="black50">
            {text}
          </Sans>
        ))
      ) : (
        <Sans size="5" color="black50">
          {value}
        </Sans>
      )}
      <Spacer mb={4} />
    </Box>
  )
}

const TopSection: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <Box key={title} px={2}>
      <Spacer mb={2} />
      <Flex flexDirection="row" style={{ flex: 1 }} justifyContent="space-between">
        <Sans size="4">{title}</Sans>
        <Sans key={value} size="4" color="black50">
          {value}
        </Sans>
      </Flex>
      <Spacer mb={1} />
      <Separator color={color("black10")} />
    </Box>
  )
}

const LineItemsSection: React.FC<{ title: string; value: { name: string; amount: string }[] }> = ({ title, value }) => {
  return (
    <Box key={title} px={2}>
      <Box mb={0.5} />
      <Sans size="4">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("black10")} />
      <Spacer mb={2} />
      {value.map(({ name, amount }) => (
        <>
          <Flex flexDirection="row" style={{ flex: 1 }} justifyContent="space-between">
            <Sans size="4" color="black50">
              {name}
            </Sans>
            <Sans size="4">{amount}</Sans>
          </Flex>
          <Spacer mb={2} />
          <Separator color={color("black10")} />
          <Spacer mb={2} />
        </>
      ))}
      <Spacer mb={1} />
    </Box>
  )
}

export const InvoiceDetail = screenTrack()(({ navigation }) => {
  //   const { error, previousData, data = previousData, startPolling, stopPolling } = useQuery(GET_PAYMENT_DATA)
  //   useEffect(() => {
  //     // The Chargebee address update takes multiple seconds to update
  //     // therefore we must check and refetch data if the user leaves this view
  //     const unsubscribe = navigation?.addListener("focus", () => {
  //       if (data) {
  //         startPolling(1500)
  //         setTimeout(stopPolling, 20000)
  //       }
  //     })

  //     return unsubscribe
  //   }, [navigation])

  //   if (!data || error) {
  //     if (error) console.error("error PaymentAndShipping.tsx: ", error)
  //     return (
  //       <>
  //         <FixedBackArrow
  //           navigation={navigation}
  //           variant="whiteBackground"
  //           onPress={() => navigation.navigate(NavigationSchema.PageNames.Account)}
  //         />
  //         <Loader />
  //       </>
  //     )
  //   }

  const renderItem = (item) => {
    if (item.title === "Billed to") {
      return <AccountSection title={item.title} value={item.value} />
    }
    if (item.title === "Line items") {
      return <LineItemsSection title={item.title} value={item.value} />
    }
    return <TopSection title={item.title} value={item.value} />
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow
        navigation={navigation}
        variant="whiteBackground"
        onPress={() => navigation.navigate(NavigationSchema.PageNames.PaymentAndShipping)}
      />
      <FlatList
        data={[
          { title: "Amount", value: "$110.50" },
          { title: "Invoice date", value: "Nov 12, 2020" },
          { title: "Next billing date", value: "Dec 12, 2020" },
          { title: "Billed to", value: ["Regy Perlera", "55 Washington St,", "Unit 736", "Brooklyn, NY 11201"] },
          {
            title: "Line items",
            value: [
              { name: "Select shipping", amount: "$9.95" },
              { name: "State tax", amount: "$6.75" },
              { name: "Essential 2", amount: "$95" },
            ],
          },
        ]}
        ListHeaderComponent={() => (
          <Box px={2}>
            <Spacer mb={80} />
            <Sans size="7">Invoice #24672</Sans>
            <Spacer mb={1} />
          </Box>
        )}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => renderItem(item)}
      />
    </Container>
  )
})
