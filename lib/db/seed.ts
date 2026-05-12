import { config } from "dotenv";

config({ path: ".env" });

import { db } from "./index";
import { categories, products, variants, inventory } from "./schema";

async function seed() {
  console.log("🌱 Unlocking the warehouse...");

  try {

    console.log("📦 Building Categories...");
    await db.insert(categories).values([
      { id: "cat_fashion", name: "Owambe Fashion", slug: "owambe-fashion" },
      { id: "cat_tech", name: "Computer Village Gadgets", slug: "tech-gadgets" },
      { id: "cat_food", name: "Naija Premium Snacks", slug: "naija-snacks" }
    ]);

    console.log("👕 Stocking Products...");
    await db.insert(products).values([
      { id: "prod_agbada", name: "Aso-Oke Agbada Set", description: "Premium woven Aso-Oke for your next Owambe.", price: 7500000, categoryId: "cat_fashion" },
      { id: "prod_infinix", name: "Infinix Note 40 Pro", description: "Latest smartphone with fast charging.", price: 35000000, categoryId: "cat_tech" },
      { id: "prod_kilishi", name: "Abuja Special Kilishi", description: "Authentic, spicy beef jerky.", price: 550000, categoryId: "cat_food" }
    ]);


    console.log("🎨 Setting up Variants...");
    await db.insert(variants).values([
      { id: "var_agbada_navy_L", name: "Navy Blue / Large", sku: "AGB-NAVY-L", productId: "prod_agbada" },
      { id: "var_agbada_navy_XL", name: "Navy Blue / Extra Large", sku: "AGB-NAVY-XL", productId: "prod_agbada" },
      { id: "var_infinix_gold", name: "Titanium Gold / 256GB", sku: "INF-GOLD-256", productId: "prod_infinix" },
      { id: "var_kilishi_spicy", name: "Extra Spicy / 500g", sku: "KIL-SPCY-500", productId: "prod_kilishi" }
    ]);

    console.log("📊 Counting Inventory...");
    await db.insert(inventory).values([
      { id: "inv_1", variantId: "var_agbada_navy_L", quantity: 12 },
      { id: "inv_2", variantId: "var_agbada_navy_XL", quantity: 5 },
      { id: "inv_3", variantId: "var_infinix_gold", quantity: 50 },
      { id: "inv_4", variantId: "var_kilishi_spicy", quantity: 100 }
    ]);

    console.log("✅ Seeding complete! Your Naija-Commerce warehouse is fully stocked.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error stocking the warehouse:", error);
    process.exit(1);
  }
}

seed();