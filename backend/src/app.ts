import express from 'express';
import cors from 'cors';
import { ExpenseService } from './services/expenseService';
import { ExchangeRateService } from './services/exchangeRates';

const app = express()
app.use(express.json())
app.use(cors())

// Get exchange rates
app.get('/api/rates', (req, res) => {
    try {
        const rates = ExchangeRateService.getRates();
        res.json(rates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
});

// Add expense
app.post('/api/expenses', (req, res) => {
    try {
        const { description, amount, currency } = req.body;
        const expense = ExpenseService.addExpense(description, amount, currency);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Get all expenses
app.get('/api/expenses', (req, res) => {
    try {
        const expenses = ExpenseService.getExpenses();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});

// Get expense summary
app.get('/api/summary', (req, res) => {
    try {
        const { baseCurrency } = req.query;
        if (!baseCurrency || typeof baseCurrency !== 'string') {
            throw new Error('Base currency is required');
        }
        const summary = ExpenseService.getSummary(baseCurrency);
        res.json(summary);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});