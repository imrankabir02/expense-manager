# Multi-Currency Expense Management System

A full-stack application for managing expenses in multiple currencies, built with Node.js (Express) and Vue 3.

## Features

- Add expenses in various currencies
- View expenses list with automatic currency conversion
- Real-time currency conversion based on exchange rates
- Responsive design with Tailwind CSS
- TypeScript support for better type safety
- State management with Pinia
- Proper handling of currencies without decimal places (e.g., JPY)

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- Jest for testing
- CORS support
- In-memory storage (easily extensible to persistent storage)

### Frontend
- Vue 3 with Composition API
- TypeScript
- Pinia for state management
- Tailwind CSS for styling
- Axios for API calls
- Vite for development and building

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/expense-manager.git
   cd expense-manager
   ```

2. Setup Backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The backend will run on http://localhost:3000

3. Setup Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## Project Structure

```
expense-manager/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── types.ts
│   │   └── services/
│   │       ├── exchangeRates.ts
│   │       └── expenseService.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── App.vue
    │   ├── types.ts
    │   ├── components/
    │   │   ├── ExpenseForm.vue
    │   │   └── ExpenseList.vue
    │   └── stores/
    │       └── expense.ts
    ├── package.json
    └── vite.config.ts
```

## API Endpoints

- `GET /api/rates` - Get available exchange rates
- `POST /api/expenses` - Add a new expense
- `GET /api/expenses` - Get all expenses
- `GET /api/summary?baseCurrency=USD` - Get expense summary in specified currency

## Development

### Running Tests (Backend)
```bash
cd backend
npm test
```

### Building for Production

Backend:
```bash
cd backend
npm run build
```

Frontend:
```bash
cd frontend
npm run build
```