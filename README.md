# 🇳🇬 Naija Commerce

![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)
![Version](https://img.shields.io/badge/version-v0.2.0--mvp-blue.svg)
**Live Demo:** [naija-commerce-iota.vercel.app](https://naija-commerce-iota.vercel.app)

A high-performance, full-stack e-commerce platform built with Next.js 15, specifically engineered for the Nigerian market. This project explores the fundamentals of the App Router, Server Components, optimized routing patterns, scalable design systems, and a complete type-safe relational database architecture.

---

## 🚀 Key Features

* **Server-First Architecture:** Leverages Next.js async Server Components for direct, highly performant database queries without API middleware overhead.
* **Streaming & Suspense:** Implements React Suspense boundaries for progressive UI rendering, ensuring instant initial page loads.
* **Edge-Ready Security:** Middleware-enforced Role-Based Access Control (RBAC) and session-based authentication powered by Better-Auth (supporting both Magic Links and Passwords).
* **Hybrid Cart State:** Utilizes Zustand for lightning-fast client-side cart management, seamlessly bridged to a PostgreSQL backend via Server Actions.
* **Integrated Payment Gateway:** Features a seamless, server-initialized Paystack Inline Checkout experience with instant transaction verification and cart clearing.
* **Dynamic Checkout Engine:** Features a hydration-safe checkout experience with real-time NGN VAT (7.5%) computation.
* **Robust Data Layer:** Engineered with Drizzle ORM for a schema-first design and type-safe relational queries.

---

## 🛠 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **State Management:** Zustand, React Query
* **Authentication:** Better-Auth
* **Payments:** Paystack (`react-paystack`)
* **Database:** PostgreSQL (via Supabase)
* **ORM:** Drizzle ORM
* **UI & Styling:** Tailwind CSS v4, shadcn/ui, Radix UI
* **Quality Assurance:** Vitest, Playwright (E2E), Biome

---

## 🗄️ Database Architecture

The backend is built on a highly structured, relational inventory and checkout engine.

* **Security & Auth:** `users` (RBAC) → `sessions` → `accounts`
* **Inventory Vault:** `categories` → `products` → `variants` → `inventory`
* **Shopping & Checkout:** `carts` → `cart_items` → `orders` → `order_items`

---

## 📁 Project Structure

* `/app` - Grouped commerce, checkout, account, and auth routes.
* `/actions` - Secure Next.js Server Actions for database mutations.
* `/store` - Global Zustand stores and custom hooks.
* `middleware.ts` - Edge bouncer for route protection and RBAC.
* `/e2e` - End-to-end Playwright testing environment and auth setup.
* `/lib/db` - Core Drizzle ORM schema and seed scripts.

---

## 🚦 Getting Started

### Prerequisites
* Node.js (Latest LTS)
* pnpm (`corepack enable pnpm`)
* Supabase PostgreSQL database
* Paystack API Keys

### Installation

```bash
# Clone the repo
git clone [https://github.com/DevCutie/Naija_Commerce.git](https://github.com/DevCutie/Naija_Commerce.git)
cd Naija_Commerce

# Install dependencies
pnpm install

# Setup env variables
cp .env.example .env.local

# Sync database schema
pnpm exec drizzle-kit push

# Start development
pnpm dev
🧪 Testing & CI/CD
This project is guarded by a comprehensive testing suite running on GitHub Actions:

Unit Tests: Vitest + React Testing Library (Cart math, NGN formatting, Zod schemas).

E2E Tests: Playwright for critical path verification (Browse → Auth → Cart → Checkout).

Pipeline: Automated checks via ci.yml on every pull request.


