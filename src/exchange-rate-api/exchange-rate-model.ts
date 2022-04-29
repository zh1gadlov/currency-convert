export interface CurrencyExchangeRate {
    cource: number,
    baseCurrency: string,
    targetCurrency: string,
    type: ExchangeType
}

export enum ExchangeType {
    BUYING = 'Buying',
    SELLING = 'Selling',
    OTHER = 'Other'
}
