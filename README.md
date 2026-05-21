🇳🇬 Naija Commerce
Live Demo: naija-commerce-iota.vercel.app

A high-performance, full-stack e-commerce platform built with Next.js 15, focused on the Nigerian market. This project explores the fundamentals of the App Router, Server Components, optimized routing patterns, scalable design systems, and a complete type-safe relational database architecture.

🚀 Key Features
Server-First Architecture: Leverages Next.js async Server Components for direct, highly performant database queries without the overhead of intermediate API routes.

Streaming & Suspense: Implements React Suspense boundaries for progressive UI rendering (e.g., streaming "Related Products" on detail pages) to ensure instant initial page loads and zero layout-blocking.

Hybrid Cart State: Utilizes Zustand for lightning-fast, ephemeral client-side cart management, seamlessly bridging to the backend via Next.js Server Actions for persistent PostgreSQL database synchronization.

Dynamic Checkout Engine: Features a comprehensive, hydration-safe checkout experience including real-time order summaries, automated NGN VAT (7.5%) computation, and flat-rate delivery routing.

Dynamic & Optimistic UI: Features dynamic routing (/products/[id]) and instant, optimistic search filtering utilizing URL parameters (?q=) and React's useOptimistic hook.

🔒 Secure Authentication: Implemented robust session-based authentication using Better-Auth, featuring passwordless Magic Link emails and Google OAuth integration.

🛡️ Edge Route Protection & RBAC: Utilizes Next.js Middleware for lightning-fast route protection, strictly enforcing Role-Based Access Control (RBAC) to separate customer and merchant privileges (e.g., securing the /dashboard and /account routes).

Robust Data Layer: Fully relational PostgreSQL database powered by Supabase, persisting all inventory, orders, user sessions, and cart states.

Type-Safe ORM: Engineered with Drizzle ORM for schema-first design, type-safe queries, and zero-downtime migrations.

Design System & Headless UI: Integrated shadcn/ui and Radix UI primitives for fully accessible, highly customizable components built on a "Bones & Skin" architecture.

Living Styleguide: A dedicated /design route showcasing all core UI components (Cards, Dialogs, Tables, Forms) in both Light and Dark themes, complete with native Nigerian Naira (₦) formatting.

Smart Styling: Utilizing the cn() utility (combining clsx and tailwind-merge) for clean, conflict-free conditional Tailwind classes.

🛠 Tech Stack
Framework: Next.js 15 (App Router)

State Management: Zustand

Authentication: Better-Auth

Database: PostgreSQL (Supabase)

ORM: Drizzle ORM

UI & Styling: Tailwind CSS v4, shadcn/ui, Radix UI

Linting/Formatting: Biome

Package Manager: pnpm

🗄️ Database Architecture
The backend is built on a highly structured, relational inventory and checkout engine, securely tied to a scalable authentication layer.

Code snippet
    CATEGORIES ||--o{ PRODUCTS : contains
    PRODUCTS ||--o{ VARIANTS : has
    VARIANTS ||--|| INVENTORY : tracks
    USERS ||--o{ SESSIONS : maintains
    USERS ||--o{ CARTS : owns
    CARTS ||--o{ CART_ITEMS : holds
    VARIANTS ||--o{ CART_ITEMS : added_as
    USERS ||--o{ ORDERS : places
    ORDERS ||--o{ ORDER_ITEMS : contains
    VARIANTS ||--o{ ORDER_ITEMS : ordered_as
Security & Auth: users (with RBAC roles) → sessions → accounts

Inventory Vault: categories → products → variants → inventory

Shopping Engine: carts → cart_items

Checkout Engine: orders → order_items

📁 Project Structure
Brief overview of the core architecture:

app/layout.tsx - Global provider and base shell (including Toast notification providers).

app/(shop)/ - Group for all commerce routes (Home, Search).

app/(shop)/products/[id]/ - Dynamic product detail pages with streaming components.

app/checkout/ - Secure checkout flow with live VAT and subtotal calculations.

app/(shop)/account/ - Protected customer portal requiring active sessions.

app/(auth)/ - Group for authentication (Login, Magic Link verification).

app/(shop)/design/ - Interactive living styleguide.

actions/ - Secure Next.js Server Actions for direct database mutations (e.g., cart syncing).

store/ - Global Zustand stores for lightning-fast client state.

middleware.ts - Edge bouncer handling route protection and RBAC redirects.

components/shop/ - Domain-specific commerce UI components (Product Grids, Search Bars, Cart Drawers).

components/ui/ - Owned, easily customizable shadcn/ui component source files.

lib/db/ - Core database client, schema blueprints, and automated seed scripts.

lib/auth.ts & auth-client.ts - Server and client configurations for Better-Auth.

🚦 Getting Started
Prerequisites

Node.js (Latest LTS)

pnpm (corepack enable pnpm)

A Supabase PostgreSQL database URL

Google Cloud Console API credentials (for OAuth)

Database Infrastructure
This project utilizes Supabase for its PostgreSQL database, chosen for its bundled Authentication and Storage layers, which are critical for a full-scale e-commerce platform. (Note: Ensure you connect to the Supabase connection pooler via port 6543 rather than the direct port 5432 to prevent connection exhaustion in serverless environments).

Installation & Setup

Clone the repo:

```Bash
git clone https://github.com/DevCutie/Naija_Commerce.git
cd Naija_Commerce
pnpm install
Set up environment variables:

```Bash
cp .env.example .env.local
Open .env.local and add your Supabase DATABASE_URL, Next.js application URLs, and Google OAuth credentials.

Push the database schema:
Sync your Drizzle schema (including the Auth and Cart tables) with your Supabase instance:

```Bash
npx drizzle-kit push
Start the development server:

```Bash
pnpm dev
Visit the application: Open http://localhost:3000 to view the storefront.