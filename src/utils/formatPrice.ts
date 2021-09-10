export const formatPrice = (price, fmt: "cents" | "dollars" = "dollars") => {
  const denominator = fmt === "dollars" ? 100 : 1
  return (price / denominator || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}
