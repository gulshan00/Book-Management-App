# Book Management App

This is a **Book Management App** built with **React**, **TypeScript**, and **Vite**.  
It uses a mock JSON database (`db.json`) with **JSON Server** for CRUD operations and includes ESLint configuration for type-aware and React-specific linting.

---

## Features

- View, add, update, and delete books
- Responsive UI
- Routing using React Router
- Notifications using React Toastify
- Mock backend with JSON Server
- TypeScript type safety
- ESLint configured for best practices

---

## Tech Stack

- React + TypeScript
- Vite
- React Router DOM
- Axios
- Lucide Icons
- React Toastify
- JSON Server (mock backend)
- ESLint + Prettier

---

## 1. Project Setup

```bash
# Create Vite + React + TypeScript project
npm create vite@latest book-management-app
# Choose: React + TypeScript

cd book-management-app
npm install



# React Router
npm install react-router-dom

# Icons
npm install lucide-react

# HTTP client
npm install axios

# Notifications
npm install react-toastify

# ESLint & Prettier
npm install -D eslint prettier

# JSON Server for mock API
npm install -D json-server


# Run JSON Server to serve mock API
npx json-server --watch db.json --port 5000


# Start Vite development server
npm run dev

# Start JSON Server (in a separate terminal)
npm run server
