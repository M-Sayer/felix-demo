export const toCents = dollars => Math.trunc(dollars * 100)

export const toDollars = cents => (cents / 100).toFixed(2)