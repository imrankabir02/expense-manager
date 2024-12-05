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
- npm 
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

<!-- ## Future Improvements

1. Add persistent storage (e.g., PostgreSQL)
2. Implement user authentication
3. Add expense categories and tags
4. Implement expense filtering and sorting
5. Add data export functionality
6. Integrate with a live exchange rate API
7. Add expense editing and deletion
8. Implement expense reports and charts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->