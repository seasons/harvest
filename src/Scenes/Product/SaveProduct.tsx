import { GET_PRODUCT } from "App/Apollo/Queries"
import { Box, Container, FixedBackArrow, Spacer, VariantSizes } from "App/Components"
import { Loader } from "App/Components/Loader"
import { GetProduct, GetProduct_product } from "App/generated/GetProduct"
import { ABBREVIATED_SIZES } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { Schema, screenTrack } from "App/utils/track"
import gql from "graphql-tag"
import { find, get } from "lodash"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { GET_HOMEPAGE } from "../Home/Home"
import { ImageRail, MoreLikeThis, ProductDetails, VariantWant } from "./Components"
import { SelectionButtons } from "./Components/SelectionButtons"
import { VariantPicker } from "./Components/VariantPicker"

const variantPickerHeight = Dimensions.get("window").height / 2.5 + 50
const VARIANT_WANT_HEIGHT = 52


interface SaveProductProps {
  route: any
  navigation: any
}

export const SaveProduct: React.FC<SaveProductProps> = screenTrack()(({
  route,
  navigation
}) => {
  return (
    <Container insetsTop={false}>
    </Container>
  )
})
