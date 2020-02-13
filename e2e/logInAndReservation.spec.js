describe("Tests login and reserve flow", () => {
  afterEach(async () => {
    await device.reloadReactNative()
  })

  it("should have welcome screen", async () => {
    // 1. Tap Sign In button
    await element(by.text("Sign in")).tap()

    // 2. Sign in
    await element(by.id("logIn-emailInput")).typeText("kieran+5@seasons.nyc")
    await element(by.id("logIn-passwordInput")).typeText("Happy3232")
    await element(by.id("logIn-signInButton")).tap()

    // 3. Navigate to browse
    await element(by.id("nav-browseButton")).tap()

    // 4.
    // await waitFor(element(by.id("browse-flatlist")))
    // .toBeVisible()
    // .withTimeout(3000)
    // await element(by.id("browse-flatlist")).swipe("up", "fast", 0.9)
    // await element(by.id("browse-flatlist")).swipe("down", "fast", 0.9)
    // try {
    await expect(element(by.id("browse-inStockItem-0"))).toBeVisible()
    // } catch (e) {
    //   await waitFor(element(by.id("browse-inStockItem-0")))
    //     .toBeVisible()
    //     .whileElement(by.id("browse-flatlist"))
    //     .scroll(100, "down")
    // }
    await element(by.id("browse-inStockItem-0")).tap()
    // await element(by.id("product-addToBagButton")).tap()
  })
})
