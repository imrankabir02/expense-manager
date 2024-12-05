export interface Expense {
    id: string
    description: string
    amount: number
    currency: string
    createdAt: Date
}

export interface ExchangeRates {
    [key: string] : number
}