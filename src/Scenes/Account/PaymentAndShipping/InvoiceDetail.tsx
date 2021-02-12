import { Box, Container, FixedBackArrow, Sans, Spacer, Separator, Flex } from "App/Components"
import { Loader } from "App/Components/Loader"
import React from "react"
import { FlatList } from "react-native"
import { screenTrack } from "App/utils/track"
import { color } from "App/utils"
import { Schema as NavigationSchema } from "App/Navigation"
import { centsToDollars, formatInvoiceDate, getAdjustedInvoiceTotal } from "./utils"

const BillingToSection: React.FC<{ title: string; value: string | [string] }> = ({ title, value }) => {
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

const LineItemsSection: React.FC<{ title: string; value: { name: string; amount: string; date: string }[] }> = ({
  title,
  value,
}) => {
  return (
    <Box key={title} px={2}>
      <Box mb={0.5} />
      <Sans size="4">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("black10")} />
      <Spacer mb={2} />
      {value?.map(({ name, amount, date }) => (
        <Box key={name}>
          <Flex flexDirection="row" style={{ flex: 1 }} justifyContent="space-between">
            <Flex flexDirection="row" style={{ flex: 1 }} justifyContent="flex-start">
              <Box pr={3}>
                <Sans size="4" color="black50">
                  {date}
                </Sans>
              </Box>
              <Sans size="4" color="black50">
                {name}
              </Sans>
            </Flex>
            <Sans size="4">
              {name === "Refund" ? "-" : ""}
              {amount}
            </Sans>
          </Flex>
          <Spacer mb={2} />
          <Separator color={color("black10")} />
          <Spacer mb={2} />
        </Box>
      ))}
      <Spacer mb={1} />
    </Box>
  )
}

export const createBillingAddress = (billingAddress) => {
  const addressArray = []
  if (billingAddress.firstName && billingAddress.lastName) {
    addressArray.push(`${billingAddress.firstName} ${billingAddress.lastName}`)
  }
  if (billingAddress.line1) {
    addressArray.push(billingAddress.line1)
  }
  if (billingAddress.line2) {
    addressArray.push(billingAddress.line2)
  }
  if (billingAddress.city && billingAddress.state && billingAddress.zip) {
    addressArray.push(`${billingAddress.city}, ${billingAddress.state}, ${billingAddress.zip}`)
  }
  return addressArray
}

export const InvoiceDetail = screenTrack()(({ navigation, route }) => {
  if (!route?.params?.invoice) {
    console.error("error InvoiceDetail.tsx: ", "No invoice passed to InvoiceDetail")
    return (
      <>
        <FixedBackArrow
          navigation={navigation}
          variant="whiteBackground"
          onPress={() => navigation.navigate(NavigationSchema.PageNames.PaymentAndShipping)}
        />
        <Loader />
      </>
    )
  }
  const invoice = route.params.invoice

  const renderItem = (item) => {
    switch (item.title) {
      case "Billed to":
        return <BillingToSection title={item.title} value={item.value} />
      case "Line items":
        return <LineItemsSection title={item.title} value={item.value} />
      default:
        return <TopSection title={item.title} value={item.value} />
    }
  }

  const totalTaxes = invoice.lineItems?.reduce((taxes, curLineItem) => taxes + curLineItem.taxAmount, 0)
  const totalPaid = getAdjustedInvoiceTotal(invoice)
  const formattedInvoiceDueDate = formatInvoiceDate(invoice.dueDate, false)
  const items = [
    { title: "Amount", value: totalPaid },
    { title: "Invoice date", value: formattedInvoiceDueDate },
    { title: "Billed to", value: createBillingAddress(invoice.billingAddress) },
    {
      title: "Line items",
      value: [
        ...invoice.lineItems?.map((a) => ({
          name: a.description,
          amount: centsToDollars(a.amount),
          date: formattedInvoiceDueDate,
        })),
        ...(totalTaxes
          ? [
              {
                name: "Taxes",
                amount: centsToDollars(totalTaxes),
                date: formattedInvoiceDueDate,
              },
            ]
          : []),
        ...(invoice.discounts?.map((a) => ({
          name: a.description,
          amount: "-" + centsToDollars(a.amount),
          date: formattedInvoiceDueDate,
        })) || []),
        ...(invoice.creditNotes?.map((a) => ({
          name: "Refund",
          amount: centsToDollars(a.total),
          date: formatInvoiceDate(a.date, false),
        })) || []),
      ],
    },
  ]
  return (
    <Container insetsBottom={false}>
      <FixedBackArrow
        navigation={navigation}
        variant="whiteBackground"
        onPress={() => navigation.navigate(NavigationSchema.PageNames.PaymentAndShipping)}
      />
      <FlatList
        data={items}
        ListHeaderComponent={() => (
          <Box px={2}>
            <Spacer mb={80} />
            <Sans size="7">Invoice #{invoice.id}</Sans>
            <Spacer mb={1} />
          </Box>
        )}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => renderItem(item)}
      />
    </Container>
  )
})
