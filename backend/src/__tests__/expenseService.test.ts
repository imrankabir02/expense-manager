import { ExpenseService } from '../services/expenseService';

describe('ExpenseService', () => {
    beforeEach(() => {
        // Clear expenses before each test
        ExpenseService['expenses'] = [];
    });

    describe('addExpense', () => {
        it('should add a valid expense', () => {
            const expense = ExpenseService.addExpense('Test expense', 100, 'USD');
            expect(expense.description).toBe('Test expense');
            expect(expense.amount).toBe(100);
            expect(expense.currency).toBe('USD');
        });

        it('should round amount for whole number currencies', () => {
            const expense = ExpenseService.addExpense('Test expense', 100.50, 'JPY');
            expect(expense.amount).toBe(101);
        });

        it('should throw error for invalid currency', () => {
            expect(() => {
                ExpenseService.addExpense('Test expense', 100, 'XXX');
            }).toThrow('Unsupported currency');
        });

        it('should throw error for negative amount', () => {
            expect(() => {
                ExpenseService.addExpense('Test expense', -100, 'USD');
            }).toThrow('Amount must be greater than 0');
        });
    });

    describe('getExpenses', () => {
        it('should return all expenses', () => {
            ExpenseService.addExpense('Test 1', 100, 'USD');
            ExpenseService.addExpense('Test 2', 200, 'EUR');
            const expenses = ExpenseService.getExpenses();
            expect(expenses).toHaveLength(2);
        });
    });

    describe('getSummary', () => {
        it('should calculate correct summary in base currency', () => {
            ExpenseService.addExpense('Test USD', 100, 'USD');
            ExpenseService.addExpense('Test EUR', 100, 'EUR');

            const summary = ExpenseService.getSummary('USD');
            expect(summary.expenses).toHaveLength(2);
            expect(summary.total).toBe(209.89); // 100 USD + (100 EUR * 1.0989)
        });

        it('should throw error for invalid base currency', () => {
            expect(() => {
                ExpenseService.getSummary('XXX');
            }).toThrow('Unsupported base currency');
        });
    });
});