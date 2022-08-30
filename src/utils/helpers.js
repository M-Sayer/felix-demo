export const toCents = dollars => Math.trunc(dollars * 100)

export const toDollars = cents => (cents / 100).toFixed(2)

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export const formatDollarUS = amount => dollarUS.format(amount)