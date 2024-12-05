import { ExchangeRates } from '../types';

export class ExchangeRateService {
    private static rates: ExchangeRates = {
        USD: 1,
        EUR: 0.91,
        BDT: 109.5,
        JPY: 140,
    };

    protected static wholeNumberCurrencies = new Set(['JPY', 'KRW']);

    static getRates(): ExchangeRates {
        return this.rates;
    }

    static convertAmount(
        amount: number,
        fromCurrency: string,
        toCurrency: string
    ): number {
        const fromRate = this.rates[fromCurrency];
        const toRate = this.rates[toCurrency];

        if (!fromRate || !toRate) {
            throw new Error('Unsupported currency');
        }

        const convertedAmount = (amount / fromRate) * toRate;

        return this.wholeNumberCurrencies.has(toCurrency)
            ? Math.round(convertedAmount)
            : Number(convertedAmount.toFixed(2));
    }

    static validateCurrency(currency: string): boolean {
        return currency in this.rates;
    }

    static isWholeNumberCurrency(currency: string): boolean {
        return this.wholeNumberCurrencies.has(currency);
    }
}