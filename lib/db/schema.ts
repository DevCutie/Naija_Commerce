import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  slug: text("slug").notNull().unique(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  description: text("description"),

  price: integer("price").notNull(),

  categoryId: text("category_id")
    .references(() => categories.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const variants = pgTable("variants", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  productId: text("product_id")
    .references(() => products.id)
    .notNull(),

  sku: text("sku").notNull().unique(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const inventory = pgTable("inventory", {
  id: text("id").primaryKey(),
  variantId: text("variant_id")
    .references(() => variants.id)
    .notNull(),
  quantity: integer("quantity").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const carts = pgTable("carts", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: text("id").primaryKey(),
  cartId: text("cart_id")
    .references(() => carts.id)
    .notNull(),
  variantId: text("variant_id")
    .references(() => variants.id)
    .notNull(),
  quantity: integer("quantity").default(1).notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id"),

  totalAmount: integer("total_amount").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const order_items = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .references(() => orders.id)
    .notNull(),
  variantId: text("variant_id")
    .references(() => variants.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});
