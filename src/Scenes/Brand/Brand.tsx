import { useQuery } from "@apollo/react-hooks"
import { Container, FixedBackArrow, Flex } from "App/Components"
import { GetBrand } from "App/generated/GetBrand"
import { Schema, screenTrack } from "App/utils/track"
import React, { useEffect, useState } from "react"
import { Loader } from "App/Components/Loader"
import { GET_BRAND } from "./queries/brandQueries"
import { BrandBottomSheet } from "./BrandBottomSheet"
import { color } from "App/utils"
import { StatusBar } from "react-native"
import { BrandPhotos } from "./BrandPhotos"

export const Brand = screenTrack({
  entityType: Schema.EntityTypes.Brand,
})((props: any) => {
  const { navigation, route, error } = props
  const [currentImage, setCurrentImage] = useState(1)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      StatusBar.setBarStyle("light-content")
    })
    return unsubscribe
  }, [navigation])

  const brandID = route?.params?.id
  if (error) {
    console.log("error Brand.tsx: ", error)
  }

  const { data, loading, fetchMore } = useQuery<GetBrand>(GET_BRAND, {
    variables: {
      brandID,
      first: 10,
      skip: 0,
      orderBy: "createdAt_DESC",
    },
  })

  if (!data) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteTransparent" />
        <Loader />
      </>
    )
  }

  const images = data?.brand?.images

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <FixedBackArrow navigation={navigation} variant="whiteTransparent" />
      <BrandPhotos images={images} currentImage={currentImage} setCurrentImage={setCurrentImage} />
      <BrandBottomSheet data={data} loading={loading} fetchMore={fetchMore} />
    </Container>
  )
})
