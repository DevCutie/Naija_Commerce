Day 6 Journal: Building the Naija Commerce Database

What I Built
Today was a massive milestone: I officially crossed over into hardcore backend engineering by building the entire database architecture for Naija Commerce. Using Drizzle ORM and Supabase (PostgreSQL), I designed an 8-table relational schema from scratch using pure TypeScript. I successfully mapped out the core inventory vault (categories, products, variants, inventory) alongside a complete checkout engine (carts, cart_items, orders, order_items). To finish the day, I wired up the Next.js database client and wrote a custom seed script that injected real Nigerian SKUs into my live cloud database. My digital warehouse is structurally sound and fully stocked.

What Broke
Almost every step of the connection process threw an error, but I managed to troubleshoot them all. First, my drizzle-kit push failed because it couldn't read my .env.local file, leaving my database URL empty. After fixing that with dotenv, I hit the infamous "Supabase Pooler Bug." Drizzle crashed mid-read because the connection pooler (port 6543) juggled the connection. I learned to bypass this by targeting the direct port (5432) and explicitly filtering for the "public" schema. Finally, my seed script crashed due to JavaScript "import hoisting"—TypeScript was importing my database connection before loading the environment variables. Forcing the .env config to the absolute top of the file fixed it.

What I Don't Yet Understand
While my backend vault is live, the bridge to the frontend is still a bit foggy. I understand how to push data into the database, but I don't fully grasp how Next.js Server Components will query it out—especially when I need to join multiple tables (like fetching a product, its variants, and inventory levels simultaneously). I also left the user_id optional on the carts table to allow guest checkouts, but I am not entirely sure how I will seamlessly link an anonymous cart to a permanent user account once they finally log in.

**Day 6 Checkpoint Questions:**
1. **Supabase or Neon?** I chose Supabase. While Neon is incredibly fast for pure Postgres, an e-commerce platform inherently requires user authentication (for carts/checkout) and asset storage (for product images). Having Auth and Storage bundled with the database layer in Supabase prevents me from having to stitch together three separate services later.
2. **.env.example stub?** Yes. `DATABASE_URL` is stubbed and explicitly notes to use port `5432` for direct Drizzle migrations.
3. **README commands?** Yes. The `README.md` now explicitly outlines the database setup flow: `pnpm drizzle-kit generate`, `pnpm drizzle-kit push`, and `pnpm run seed`.