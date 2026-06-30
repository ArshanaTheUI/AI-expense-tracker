npm create vite@latest expense-tracker -- --template react-ts

cd expense-tracker

npm install

npm install react-router-dom

npm install zustand

npm install react-hook-form

npm install recharts

npm install react-icons

npm install uuid

npm install dayjs

Step 2: Install Tailwind
npm install tailwindcss @tailwindcss/vite

Update vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

// Step 3: Add Tailwind

// src/index.css

// @import "tailwindcss";

// body {
//   margin: 0;
//   background: #f8fafc;
//   font-family: Inter, sans-serif;
// }


src
│
├── components
│   ├── Layout
│   ├── Dashboard
│   ├── Income
│   ├── Expense
│   ├── Category
│   └── Charts
│
├── pages
│
├── store
│
├── types
│
├── utils
│
├── routes
│
└── App.tsx






src/pages/
├── Dashboard.jsx
├── Income.jsx
├── Expenses.jsx
├── Categories.jsx
└── Reports.jsx