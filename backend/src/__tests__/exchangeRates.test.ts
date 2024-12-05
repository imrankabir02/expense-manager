import { ExchangeRateService } from '../services/exchangeRates';

describe('ExchangeRateService', () => {
    describe('getRates', () => {
        it('should return exchange rates', () => {
            const rates = ExchangeRateService.getRates();
            expect(rates).toHaveProperty('USD');
            expect(rates).toHaveProperty('EUR');
            expect(rates).toHaveProperty('JPY');
        });
    });

    describe('validateCurrency', () => {
        it('should return true for supported currencies', () => {
            expect(ExchangeRateService.validateCurrency('USD')).toBe(true);
            expect(ExchangeRateService.validateCurrency('EUR')).toBe(true);
        });

        it('should return false for unsupported currencies', () => {
            expect(ExchangeRateService.validateCurrency('XXX')).toBe(false);
        });
    });

    describe('convertAmount', () => {
        it('should correctly convert between currencies', () => {
            const amount = 100;
            const converted = ExchangeRateService.convertAmount(amount, 'USD', 'EUR');
            expect(converted).toBe(91);
        });

        it('should round amounts for whole number currencies', () => {
            const amount = 100;
            const converted = ExchangeRateService.convertAmount(amount, 'USD', 'JPY');
            expect(Number.isInteger(converted)).toBe(true);
        });

        it('should throw error for unsupported currencies', () => {
            expect(() => {
                ExchangeRateService.convertAmount(100, 'XXX', 'USD');
            }).toThrow('Unsupported currency');
        });
    });
});
