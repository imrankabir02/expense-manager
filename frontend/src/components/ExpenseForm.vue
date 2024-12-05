<template>
    <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white">Add New Expense</h2>
        </div>

        <div class="p-6">
            <form @submit.prevent="handleSubmit" class="space-y-5">
                <div class="group">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <input v-model="form.description" type="text" required placeholder="Enter expense description"
                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="group">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                        <div class="relative">
                            <input v-model.number="form.amount" type="number" step="0.01" required min="0"
                                placeholder="0.00"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" />
                        </div>
                    </div>

                    <div class="group">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                        <select v-model="form.currency" required
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white">
                            <option value="" disabled>Select currency</option>
                            <option v-for="(rate, currency) in store.rates" :key="currency" :value="currency">
                                {{ currency }}
                            </option>
                        </select>
                    </div>
                </div>

                <button type="submit" :disabled="store.loading"
                    class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium
                   hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden">
                    <span v-if="!store.loading">Add Expense</span>
                    <div v-else class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Processing...
                    </div>
                </button>

                <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 rounded-lg">
                    <p class="text-red-600 text-sm">{{ errorMessage }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useExpenseStore } from '../stores/expense'

const store = useExpenseStore()
const errorMessage = ref('')

const form = ref({
    description: '',
    amount: '' as string | number,
    currency: '',
})

onMounted(async () => {
    try {
        if (!Object.keys(store.rates).length) {
            await store.fetchRates()
            form.value.currency = 'USD'
        }
    } catch (error) {
        errorMessage.value = 'Failed to load currencies. Please try again.'
    }
})

const handleSubmit = async () => {
    errorMessage.value = ''
    try {
        await store.addExpense({
            ...form.value,
            amount: Number(form.value.amount)
        })
        form.value = {
            description: '',
            amount: '',
            currency: 'USD',
        }
    } catch (error) {
        errorMessage.value = 'Failed to add expense. Please try again.'
    }
}
</script>