🇳🇬 Naija Commerce
Live Demo: naija-commerce-iota.vercel.app

A high-performance, full-stack e-commerce platform built with Next.js 15, focused on the Nigerian market. This project explores the fundamentals of the App Router, Server Components, optimized routing patterns, scalable design systems, and a complete type-safe relational database architecture.

🚀 Key Features
Robust Data Layer: Fully relational PostgreSQL database powered by Supabase.

Type-Safe ORM: Engineered with Drizzle ORM for schema-first design, type-safe queries, and zero-downtime migrations.

Design System & Headless UI: Integrated shadcn/ui and Radix UI primitives for fully accessible, highly customizable components built on a "Bones & Skin" architecture.

Living Styleguide: A dedicated /design route showcasing all core UI components (Cards, Dialogs, Tables, Forms) in both Light and Dark themes, complete with native Nigerian Naira (₦) formatting.

Smart Styling: Utilizing the cn() utility (combining clsx and tailwind-merge) for clean, conflict-free conditional Tailwind classes.

Modern Tooling: Powered by Biome for lightning-fast linting and formatting (replacing the ESLint/Prettier combo).

🛠 Tech Stack
Framework: Next.js 15 (App Router)

Database: PostgreSQL (Supabase)

ORM: Drizzle ORM

UI & Styling: Tailwind CSS v4, shadcn/ui, Radix UI

Linting/Formatting: Biome

Package Manager: pnpm

🗄️ Database Architecture
The backend is built on a highly structured, relational inventory and checkout engine.

Inventory Vault: categories → products → variants → inventory

Shopping Engine: carts → cart_items

Checkout Engine: orders → order_items

📁 Project Structure
Brief overview of the core architecture:

app/layout.tsx - Global provider and base shell (including Toast notification providers).

app/(shop)/ - Group for all commerce routes.

app/(shop)/design/ - Interactive living styleguide.

app/(auth)/ - Group for authentication (Login, Register).

components/ui/ - Owned, easily customizable shadcn/ui component source files.

lib/db/ - Core database client, schema blueprints, and the automated seed script.

drizzle/ - Generated SQL migrations.

🚦 Getting Started
Prerequisites
Node.js (Latest LTS)

pnpm (corepack enable pnpm)

A Supabase PostgreSQL database URL

Installation & Setup
Clone the repo:

```Bash
git clone https://github.com/DevCutie/Naija_Commerce.git
cd Naija_Commerce
pnpm install
Environment Variables:
Create a .env and .env.local file in the root directory and add your Supabase connection string (Ensure you use port 5432 to bypass the transaction pooler for migrations):

Code snippet
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
Build the Database:
Push the Drizzle schema to your live Supabase database:

```Bash
pnpm drizzle-kit push
Stock the Warehouse:
Run the automated seed script to inject 50 real-world Nigerian SKUs into the database:

```Bash
pnpm run seed
Start the Development Server:

```Bash
pnpm dev
```