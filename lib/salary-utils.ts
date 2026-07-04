import type { CurrencyEnum } from '@/types'

export function formatCurrency(amount: number, currency: CurrencyEnum): string {
  if (currency === 'INR') {
    return formatIndian(amount)
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return formatter.format(amount)
}

function formatIndian(amount: number): string {
  const absAmount = Math.abs(amount)
  if (absAmount >= 10000000) {
    const crores = amount / 10000000
    return `₹${crores.toFixed(crores % 1 === 0 ? 0 : 1)} Cr`
  }
  if (absAmount >= 100000) {
    const lakhs = amount / 100000
    return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 2)} L`
  }
  if (absAmount >= 1000) {
    const thousands = amount / 1000
    return `₹${thousands.toFixed(thousands % 1 === 0 ? 0 : 1)} K`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

export function computeMedian(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 1) return sorted[mid]
  return Math.round((sorted[mid - 1] + sorted[mid]) / 2)
}
