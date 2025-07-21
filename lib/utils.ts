import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/formatPrice.ts
export function formatPrice(amountInCents: number, currency: string = 'USD'): string {
  const amountInDollars = amountInCents / 100;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amountInDollars);
}