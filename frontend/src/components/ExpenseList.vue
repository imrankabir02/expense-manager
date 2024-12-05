<template>
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-white">Expenses Overview</h2>
                <div class="flex items-center space-x-2">
                    <label class="text-sm font-medium text-white">Base Currency:</label>
                    <select v-model="store.selectedBaseCurrency" @change="store.fetchSummary()"
                        class="px-3 py-1 rounded-lg border border-blue-400 bg-white/10 text-black focus:outline-none focus:ring-2 focus:ring-white/50">
                        <option v-for="(rate, currency) in store.rates" :key="currency" :value="currency">
                            {{ currency }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="p-6">
            <div v-if="store.loading" class="flex justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>

            <template v-else>
                <div class="mb-8 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <h3 class="text-sm font-medium text-gray-500">Total Expenses</h3>
                            <p class="text-2xl font-bold text-blue-600">
                                {{ formatAmount(store.summary.total) }} {{ store.selectedBaseCurrency }}
                            </p>
                        </div>
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <h3 class="text-sm font-medium text-gray-500">Number of Expenses</h3>
                            <p class="text-2xl font-bold text-blue-600">
                                {{ store.summary.expenses.length }}
                            </p>
                        </div>
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <h3 class="text-sm font-medium text-gray-500">Average Expense</h3>
                            <p class="text-2xl font-bold text-blue-600">
                                {{ formatAmount(store.summary.total / (store.summary.expenses.length || 1)) }}
                                {{ store.selectedBaseCurrency }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-4">
                    <div v-for="expense in store.summary.expenses" :key="expense.id"
                        class="group p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-all duration-200 bg-white hover:shadow-md">
                        <div class="flex justify-between items-start">
                            <div class="space-y-1">
                                <h3
                                    class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                    {{ expense.description }}
                                </h3>
                                <p class="text-sm text-gray-500">
                                    Original: {{ formatAmount(expense.amount) }} {{ expense.currency }}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="font-semibold text-gray-900">
                                    {{ formatAmount(expense.convertedAmount) }} {{ store.selectedBaseCurrency }}
                                </p>
                                <p class="text-xs text-gray-400 mt-1">
                                    {{ formatDate(expense.createdAt) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="!store.summary.expenses.length" class="text-center py-12">
                    <div class="text-gray-400">
                        <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p class="mt-4 text-gray-500 text-lg">No expenses yet</p>
                        <p class="text-sm text-gray-400">Add your first expense using the form</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useExpenseStore } from '../stores/expense'

const store = useExpenseStore()

onMounted(async () => {
    await store.fetchExpenses()
    await store.fetchSummary()
})

const formatAmount = (amount: number) => {
    return amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}

const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
</script>