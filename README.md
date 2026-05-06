# Naija Commerce 🇳🇬
vercel: naija-commerce-iota.vercel.app

A high-performance e-commerce platform built with **Next.js 15**, focused on the Nigerian market. This project explores the fundamentals of the App Router, Server Components, optimized routing patterns, and scalable design systems.

## 🚀 Key Features 
- **Design System & Headless UI:** Integrated **shadcn/ui** and **Radix UI** primitives for fully accessible, highly customizable components built on a "Bones & Skin" architecture.
- **Living Styleguide:** A dedicated `/design` route showcasing all core UI components (Cards, Dialogs, Tables, Forms) in both Light and Dark themes, complete with native Nigerian Naira (₦) formatting.
- **Smart Styling:** Utilizing the `cn()` utility (combining `clsx` and `tailwind-merge`) for clean, conflict-free conditional Tailwind classes.
- **Nested Layouts:** Implemented a global root layout and a specialized shop layout with a persistent sidebar.
- **Route Grouping:** Organized authentication and shopping logic using `(auth)` and `(shop)` groups to keep URLs clean.
- **Modern Tooling:** Powered by **Biome** for lightning-fast linting and formatting (replacing the ESLint/Prettier combo).
- **Type Safety:** Built with **TypeScript** for robust, error-free development.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **UI & Styling:** Tailwind CSS v4, shadcn/ui, Radix UI
- **Linting/Formatting:** Biome
- **Package Manager:** pnpm

## 📁 Project Structure
Brief overview of the core architecture:
- `app/layout.tsx` - Global provider and base shell (including Toast notification providers).
- `app/(shop)/` - Group for all commerce routes.
- `app/(shop)/design/` - Interactive living styleguide.
- `app/(auth)/` - Group for authentication (Login, Register).
- `components/ui/` - Owned, easily customizable shadcn/ui component source files.

## 🚦 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- pnpm (`corepack enable pnpm`)

### Installation
Clone the repo and start the development server:
```bash
git clone https://github.com/DevCutie/Naija_Commerce.git
cd Naija_Commerce
pnpm install
pnpm dev
