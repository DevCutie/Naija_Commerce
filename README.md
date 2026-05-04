# Naija Commerce 🇳🇬
vercel: naija-commerce-iota.vercel.app


A high-performance e-commerce platform built with **Next.js 15**, focused on the Nigerian market. This project explores the fundamentals of the App Router, Server Components, and optimized routing patterns.

## 🚀 Key Features 
- **Nested Layouts:** Implemented a global root layout and a specialized shop layout with a persistent sidebar.
- **Route Grouping:** Organized authentication and shopping logic using `(auth)` and `(shop)` groups to keep URLs clean.
- **Modern Tooling:** Powered by **Biome** for lightning-fast linting and formatting (replacing the ESLint/Prettier combo).
- **Type Safety:** Built with **TypeScript** for robust, error-free development.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4.0
- **Linting/Formatting:** Biome
- **Package Manager:** pnpm

## 📁 Project Structure
Brief overview of the `app/` directory:
- `app/layout.tsx` - Global provider and base shell.
- `app/(shop)/` - Group for all commerce routes (Products, Cart).
- `app/(auth)/` - Group for authentication (Login, Register).

## 🚦 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- pnpm `corepack enable pnpm`

### Installation
Clone the repo:

Bash
git clone https://github.com/DevCutie/Naija_Commerce.git