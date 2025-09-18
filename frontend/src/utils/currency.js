// frontend/src/utils/currency.js
export const CURRENCY = import.meta.env.VITE_CURRENCY || "USD";
export const LOCALE   = import.meta.env.VITE_LOCALE   || "en-US";

export const money = (n) =>
  new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    currencyDisplay: "symbol",
    maximumFractionDigits: 2
  }).format(Number(n || 0));
