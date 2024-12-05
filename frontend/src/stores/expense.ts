import { defineStore } from 'pinia'
import axios from 'axios'
import type { Expense, ExchangeRates } from '../types'

const API_BASE_URL = 'http://localhost:3000/api'

export const useExpenseStore = defineStore('expense', {
    state: () => ({
        expenses: [] as Expense[],
        rates: {} as ExchangeRates,
        loading: false,
        error: null as string | null,
        selectedBaseCurrency: 'USD',
        summary: {
            total: 0,
            expenses: [] as Array<Expense & { convertedAmount: number }>,
        },
    }),

    actions: {
        async fetchRates() {
            try {
                const response = await axios.get(`${API_BASE_URL}/rates`)
                this.rates = response.data
            } catch (error: any) {
                this.error = 'Failed to fetch exchange rates'
                throw error
            }
        },

        async addExpense(expense: { description: string; amount: number; currency: string }) {
            this.loading = true
            try {
                const response = await axios.post(`${API_BASE_URL}/expenses`, expense)
                this.expenses.push(response.data)
                await this.fetchSummary()
            } catch (error: any) {
                this.error = 'Failed to add expense'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchExpenses() {
            this.loading = true
            try {
                const response = await axios.get(`${API_BASE_URL}/expenses`)
                this.expenses = response.data
            } catch (error: any) {
                this.error = 'Failed to fetch expenses'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchSummary() {
            this.loading = true
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/summary?baseCurrency=${this.selectedBaseCurrency}`
                )
                this.summary = response.data
            } catch (error: any) {
                this.error = 'Failed to fetch summary'
                throw error
            } finally {
                this.loading = false
            }
        },

        setBaseCurrency(currency: string) {
            this.selectedBaseCurrency = currency
            this.fetchSummary()
        },
    },
})
