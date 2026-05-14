Day 3 Journal: Building the Foundation of Naija Commerce
Today was a steep climb into the Next.js 15 App Router. I spent over 36 minutes just waiting for the scaffolding to finish due to some stubborn network timeouts, but I didn't let that stop the progress. I successfully initialized the naija_commerce repository using pnpm with TypeScript and Tailwind CSS 4.0.

What I Built
I spent most of my energy architecting the folder structure to support a real-world commerce flow. I implemented Route Groups by creating (auth) and (shop) folders. This allows me to keep my URLs clean (like /login and /products) while separating their logic. I also built my first Nested Layout; I kept the root layout for global elements and added a specific layout with a sidebar for the shop section. I also replaced the traditional ESLint/Prettier combo with Biome, setting up a unified toolchain for faster linting and formatting.

What Broke
The most frustrating part was the clash between Biome and the new Tailwind CSS v4. Biome kept screaming about "parsing errors" because it didn't recognize the @theme directives in my CSS files. I had to dive into the biome.json configuration to enable tailwindDirectives and migrate the schema version before the terminal would turn green again. I also struggled with the "reserved" nature of filenames—initially naming files login.tsx before realizing Next.js strictly requires page.tsx to actually render a route.

What I Don’t Yet Understand
I’m still wrapping my head around the "Mental Pivot" of Server vs. Client Components. While I know everything is a Server Component by default in Next.js 15, I’m not entirely sure when I’ll reach the limit of what a Server Component can do before I must use 'use client'. I also need to dive deeper into Parallel Routes and the Metadata API to ensure my product pages have unique titles for SEO. It’s a lot to take in, but the structure is finally solid.