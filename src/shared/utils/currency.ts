export enum DOMIN_CURRENCY{
    USD = 'USD',
    CAD = 'CAD',
    YEN = 'YEN',
    EURO = 'EURO',
    INR = 'INR',
    CNY = 'CNY',
    AUD = 'AUD',
    JPY = 'JPY'
};

export const DOMIN_CURRENCY_INFO = {
    'USD': {rate: 1, unit: '$'},
    'CAD': {rate: 1, unit: '$'},
    'YEN': {rate: 1, unit: '¥'},
    'EURO': {rate: 0.89, unit: '€'},
    'INR': {rate:74.5, unit:'₹'},
    'CNY': {rate:1, unit:'¥'},
    'AUD': {rate:1, unit:'$'},
    'JPY': {rate:1, unit:'¥'}
}

export const convertToCurrency = (usd_price:any, currency:DOMIN_CURRENCY) => {
    return usd_price * DOMIN_CURRENCY_INFO[currency].rate;
} 

export const getCurrencyStr = (currency: DOMIN_CURRENCY) => {
    return currency;
}

export const getCurrencyUnit = (currency: DOMIN_CURRENCY) => {
    return DOMIN_CURRENCY_INFO[currency].unit;
}