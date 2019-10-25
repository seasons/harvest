import { Box, Flex, Spacer, Button } from "App/Components"
import { CategoriesRail } from "./Components/CategoriesRail"
import { Container } from "Components/Container"
import { FlatList, AppState } from "react-native"
import { HeroRail } from "./Components/HeroRail"
import { ProductRail } from "./Components/ProductRail"
import { LogoText, Sans } from "Components/Typography"
import React, { useEffect } from "react"
import { persistCache } from "App/helpers/asyncStorage"
import { connect } from "react-redux"
import { color } from "App/Utils"
import { AllCaughtUp } from "./Components/AllCaughtUp"

export const HomeComponent = (props: any) => {
  // The homescreen persists the local cache
  useEffect(() => {
    AppState.addEventListener("change", nextAppState => handleAppStateChange(nextAppState))
    return AppState.removeEventListener("change", nextAppState => handleAppStateChange(nextAppState))
  }, [])

  const handleAppStateChange = nextAppState => {
    if (nextAppState === "inactive") {
      persistCache(props.bag)
    }
  }

  const renderItem = item => {
    const { navigation } = props
    switch (item.type) {
      case "header":
        return <HeroRail navigation={navigation} items={item.data} />
      case "categories":
        return <CategoriesRail navigation={navigation} categories={item.data} />
      case "product-link-rail":
        return (
          <ProductRail title={item.title} navigation={navigation} componentId={props.componentId} items={item.data} />
        )
    }
  }

  const sections = [
    {
      type: "header",
      data: [
        { id: 1, url: "https://i.pinimg.com/564x/ef/84/64/ef84647415e51db15a87993393aa8fe2.jpg" },
        { id: 2, url: "https://i.pinimg.com/564x/f5/ba/30/f5ba30d71615c639199887f5e7cb2608.jpg" },
        { id: 3, url: "https://i.pinimg.com/564x/9e/de/54/9ede54d2e658c7b73c49f0c7051f0f3f.jpg" },
        { id: 4, url: "https://i.pinimg.com/564x/d8/ad/60/d8ad6000717d71e36fb828bfc1a64432.jpg" },
        { id: 5, url: "https://i.pinimg.com/564x/1e/ac/c1/1eacc1e8b6d30435c88cf0ef5a58a7de.jpg" },
      ],
    },
    {
      type: "categories",
      data: ["Coats", "Jackets", "Sweatshirts", "Tees"],
    },
    {
      type: "product-link-rail",
      title: "Just added",
      data: [
        {
          imageUrl:
            "https://media.endclothing.com/media/catalog/product/2/0/20-07-2019_helmutlang_printsidetee_white_red_j06dm505_ja_m1.jpg",
          colorway: "White & Red",
          productName: "Print Side Tee",
          brandName: "Helmut Lang",
          price: "$189",
          id: "ck1do0t6g00xr07546zzbai6a",
        },
        {
          imageUrl:
            "https://media.endclothing.com/media/catalog/product/1/1/11-09-2019_aimeleondore_distressedpopoverhoody_royaltypurple_ald-ch004-pr_th_m1.jpg",
          productName: "Distressed Popover Hoodie",
          brandName: "Aimé Leon",
          colorway: "Royalty Purple",
          price: "$255",
          id: "ck1do0tft00y20754vnf7l9cb",
        },
      ],
    },
    {
      type: "product-link-rail",
      title: "Latest picks",
      data: [
        {
          imageUrl:
            "https://media.endclothing.com/media/catalog/product/2/0/20-07-2019_helmutlang_printsidetee_white_red_j06dm505_ja_m1.jpg",
          colorway: "White & Red",
          productName: "Print Side Tee",
          brandName: "Helmut Lang",
          price: "$189",
          id: "ck1do0t6g00xr07546zzbai6a",
        },
        {
          imageUrl:
            "https://media.endclothing.com/media/catalog/product/1/1/11-09-2019_aimeleondore_distressedpopoverhoody_royaltypurple_ald-ch004-pr_th_m1.jpg",
          productName: "Distressed Popover Hoodie",
          brandName: "Aimé Leon",
          colorway: "Royalty Purple",
          price: "$255",
          id: "ck1do0tft00y20754vnf7l9cb",
        },
      ],
    },
  ]

  return (
    <Container>
      <Box style={{ backgroundColor: color("black") }}>
        <Box p={2} style={{ backgroundColor: color("white") }}>
          <LogoText>SEASONS</LogoText>
        </Box>
        <FlatList
          data={sections}
          keyExtractor={(item, index) => item.type + index}
          renderItem={({ item, index }) => {
            const styles =
              index === sections.length - 1
                ? {
                    backgroundColor: color("white"),
                    paddingBottom: 30,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                  }
                : { backgroundColor: color("white") }
            return <Box style={styles}>{renderItem(item)}</Box>
          }}
          ListFooterComponent={() => <AllCaughtUp navigation={props.navigation} />}
        />
      </Box>
    </Container>
  )
}

const mapStateToProps = state => {
  const { bag } = state
  return { bag }
}

export const Home = connect(mapStateToProps)(HomeComponent)
