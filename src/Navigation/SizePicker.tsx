import { GET_PRODUCT } from "App/Apollo/Queries"
import { Box, Flex, Radio, Sans, Separator, Spacer } from "App/Components"
import { color } from "App/Utils"
import { capitalize, find, get } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"

import { useQuery } from "@apollo/react-hooks"

export interface Size {
  id: string
  name: string
  stock: number
  size: string
  abbreviated: string
}

const sizeToName = size => {
  switch (size) {
    case "XS":
      return "X-Small"
    case "S":
      return "Small"
    case "M":
      return "Medium"
    case "L":
      return "Large"
    case "XL":
      return "X-Large"
  }
}

const sizeDataForVariants = (variants = []) => {
  const sizeData = {
    XS: {},
    S: {},
    M: {},
    L: {},
    XL: {},
  }
  for (let size in sizeData) {
    sizeData[size] = {
      id: size,
      size: sizeToName(size),
      abbreviated: size,
      stock: 0,
    }
  }

  if (variants) {
    for (let variant of variants) {
      const { id, size, reservable } = variant

      sizeData[size] = {
        id,
        size: sizeToName(size),
        abbreviated: size,
        stock: reservable,
      }
    }
  }

  return sizeData
}

export const SizePicker = ({ productID, setVariant, productState, onSizeSelected }) => {
  const [sizeData, setSizeData] = useState({})
  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      productID,
    },
    onCompleted: () => {
      updateSizeData()
    },
  })

  useEffect(() => {
    updateSizeData()
  }, [])

  const updateSizeData = () => {
    const variants = get(data, "product.variants")
    const sizeData = sizeDataForVariants(variants)
    setSizeData(sizeData)

    // Update size data
    const firstAvailableSize = find(sizeData, (size: Size) => size.stock > 0) || sizeData["M"]
    setVariant(firstAvailableSize)
  }

  const rows = Object.values(sizeData).map((size: Size, i) => {
    return (
      <Box key={size.id || i}>
        <TouchableOpacity
          onPress={() => {
            setVariant(size)
            onSizeSelected(size)
          }}
        >
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap" my={2}>
            <Flex flexDirection="row" alignItems="center">
              <Radio selected={productState.variant.id === size.id} />
              <Spacer mr={1} />
              <Sans color={size.stock ? "white" : "gray"} size="2">
                {capitalize(size.size)}
              </Sans>
            </Flex>
            <Sans color="gray" size="2">
              {size.stock ? "(" + size.stock + " left)" : "(Out of stock)"}
            </Sans>
          </Flex>
        </TouchableOpacity>
        <Separator color={color("gray")} />
      </Box>
    )
  })

  return <>{rows}</>
}
