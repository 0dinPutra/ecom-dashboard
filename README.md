# ✨ Commerce Dashboard

**A smarter way to manage your online store.**

Commerce Dashboard is a modern, responsive e-commerce administration dashboard designed to bring your store operations together in one place. From tracking revenue and analyzing sales performance to managing products, orders, customers, and inventory, everything is organized into a clean and intuitive interface.

Built with React, TypeScript, and Tailwind CSS, this project combines a polished dashboard experience with interactive charts, data-driven insights, and practical store management tools.

---

## 🚀 Features

### 📊 Overview
Get a quick snapshot of your store's performance.
- Revenue, orders, customers, and conversion metrics.
- Interactive analytics charts.
- Recent orders and store activity.
- At-a-glance business performance indicators.

### 📈 Analytics
Understand your store's performance through visual insights.
- Sales and revenue trends.
- Traffic source breakdown.
- Performance comparisons.
- Data-driven business insights.

### 🛍️ Product Management
Keep your product catalog organized.
- Browse and search products.
- Filter by category.
- Manage product statuses.
- Export product data to CSV.

### 📦 Order Management
Stay on top of every order.
- View and manage orders.
- Track payment statuses.
- Explore individual order details.
- Export order records to CSV.

### 👥 Customer Management
Keep customer information accessible.
- Browse the customer directory.
- Search and filter customers.
- View individual customer details.
- Manage customer statuses.

### 🏬 Inventory Management
Monitor stock levels and stay ahead of shortages.
- Track inventory levels.
- Identify low-stock products.
- Adjust product quantities.
- Generate inventory reports.

### ⚙️ Settings
Manage your workspace preferences.
- Update store profile information.
- Configure notification preferences.
- View workspace information.
- Restore the original demo data.

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI development |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS v4 | Styling and responsive layouts |
| Motion | Animations and transitions |
| Recharts | Interactive data visualizations |
| React Router | Application navigation |
| Zustand | State management |
| Lucide React | Icons |
| Radix UI | Accessible UI primitives |

---

## 💻 Getting Started

Get the project running locally in just a few steps.

### Prerequisites

Make sure you have installed:

- [Node.js 20 or later](https://nodejs.org/)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/0dinPutra/ecom-dashboard
```

### 2. Navigate into the project

```bash
cd ecom-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

By default:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files will be available in the `dist` directory.

---

## 📁 Project Structure

```text
ecom-dashboard/
├── public/
│   ├── images/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── inventory/
│   │   ├── settings/
│   │   └── ui/
│   ├── pages/
│   ├── data/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🧪 Demo Data & State Management

This project currently operates using local mock data.

- Products, orders, customers, analytics, and inventory are populated with sample data.
- Zustand manages interactive application state.
- Product stock and order status changes update the local application state.
- The Settings page provides an option to restore the original sample data.

**Note:** Changes are held in browser memory and are not persisted after a full page reload.

---

## ⚠️ Project Limitations

This is a frontend-only demonstration project. It currently does not include:

- Backend API integration.
- Database persistence.
- User authentication.
- Real payment processing.
- Live order synchronization.
- Actual email or push notifications.

Some product and avatar images are loaded from external image URLs and require an internet connection.

---

## 🌟 Project Goals

This project explores how a modern e-commerce administration interface can bring together store operations, analytics, and inventory management in one cohesive experience.

It also demonstrates practical frontend development concepts, including component-based architecture, reusable UI elements, state management, responsive layouts, and interactive data visualization.

---

## 📄 License

This project is intended for personal learning, experimentation, and portfolio development.