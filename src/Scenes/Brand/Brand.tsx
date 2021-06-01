import { useQuery } from "@apollo/client"
import { Container, FixedBackArrow } from "App/Components"
import { GetBrand } from "App/generated/GetBrand"
import { Schema, screenTrack } from "App/utils/track"
import React, { useEffect, useState } from "react"
import { Loader } from "App/Components/Loader"
import { GET_BRAND } from "./queries/brandQueries"
import { BrandBottomSheet } from "./BrandBottomSheet"
import { StatusBar } from "react-native"
import { BrandPhotos } from "./BrandPhotos"

export const Brand = screenTrack({
  entityType: Schema.EntityTypes.Brand,
})((props: any) => {
  const PAGE_LENGTH = 10
  const { navigation, route, error } = props
  const [productCount, setProductCount] = useState(PAGE_LENGTH)
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

  const { previousData, data = previousData, loading, fetchMore } = useQuery<GetBrand>(GET_BRAND, {
    variables: {
      brandID,
      first: productCount,
      skip: 0,
      orderBy: "publishedAt_DESC",
    },
  })

  if (!data) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const images = data?.brand?.images

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <FixedBackArrow navigation={navigation} variant="whiteTransparent" />
      <BrandPhotos images={images} currentImage={currentImage} setCurrentImage={setCurrentImage} />
      <BrandBottomSheet
        PAGE_LENGTH={PAGE_LENGTH}
        setProductCount={setProductCount}
        data={data}
        loading={loading}
        fetchMore={fetchMore}
        currentImage={currentImage}
      />
    </Container>
  )
})
