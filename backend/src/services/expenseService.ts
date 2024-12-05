import { v4 as uuidv4 } from 'uuid';
import { Expense } from '../types';
import { ExchangeRateService } from './exchangeRates';

export class ExpenseService {
    private static expenses: Expense[] = [];

    static addExpense(description: string, amount: number, currency: string): Expense {
        if (!ExchangeRateService.validateCurrency(currency)) {
            throw new Error('Unsupported currency');
        }

        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        const expense: Expense = {
            id: uuidv4(),
            description,
            amount: ExchangeRateService.isWholeNumberCurrency(currency)
                ? Math.round(amount)
                : Number(amount.toFixed(2)),
            currency,
            createdAt: new Date(),
        };

        this.expenses.push(expense);
        return expense;
    }

    static getExpenses(): Expense[] {
        return this.expenses;
    }

    static getSummary(baseCurrency: string): {
        total: number;
        expenses: Array<Expense & { convertedAmount: number }>;
    } {
        if (!ExchangeRateService.validateCurrency(baseCurrency)) {
            throw new Error('Unsupported base currency');
        }

        const convertedExpenses = this.expenses.map(expense => ({
            ...expense,
            convertedAmount: ExchangeRateService.convertAmount(
                expense.amount,
                expense.currency,
                baseCurrency
            ),
        }));

        const total = convertedExpenses.reduce(
            (sum, expense) => sum + expense.convertedAmount,
            0
        );

        return {
            total: ExchangeRateService.isWholeNumberCurrency(baseCurrency)
                ? Math.round(total)
                : Number(total.toFixed(2)),
            expenses: convertedExpenses,
        };
    }
}