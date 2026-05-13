import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import { categories, products, variants, inventory } from "./schema";

async function seed() {
  console.log("🌱 Unlocking the warehouse...");

  try {
    console.log("📦 Building Categories...");
    await db.insert(categories).values([
      { id: "cat_fashion", name: "Owambe Fashion", slug: "owambe-fashion" },
      { id: "cat_tech", name: "Computer Village Gadgets", slug: "tech-gadgets" },
      { id: "cat_food", name: "Naija Premium Snacks", slug: "naija-snacks" },
      { id: "cat_skincare", name: "Lagos Glow Skincare", slug: "lagos-glow" }
    ]);

    console.log("🛒 Stocking 50 Products & Variants...");
    

    const bulkProducts = [];
    const bulkVariants = [];
    const bulkInventory = [];


    for (let i = 1; i <= 15; i++) {
      const pId = `prod_fash_${i}`;
      const vId = `var_fash_${i}`;
      bulkProducts.push({ id: pId, name: `Premium Ankara Style ${i}`, description: `Authentic tailored fit, design #${i}`, priceKobo: 1500000 + (i * 100000), categoryId: "cat_fashion" });
      bulkVariants.push({ id: vId, name: `Standard Size`, sku: `ANK-${i}-STD`, productId: pId });
      bulkInventory.push({ id: `inv_fash_${i}`, variantId: vId, quantity: 20 + i });
    }


    for (let i = 1; i <= 15; i++) {
      const pId = `prod_tech_${i}`;
      const vId = `var_tech_${i}`;
      bulkProducts.push({ id: pId, name: `Wireless Earbuds Pro V${i}`, description: `Noise cancelling audio gear series ${i}`, priceKobo: 2500000 + (i * 500000), categoryId: "cat_tech" });
      bulkVariants.push({ id: vId, name: `Black`, sku: `EAR-PRO-${i}-BLK`, productId: pId });
      bulkInventory.push({ id: `inv_tech_${i}`, variantId: vId, quantity: 50 });
    }


    for (let i = 1; i <= 10; i++) {
      const pId = `prod_skin_${i}`;
      const vId = `var_skin_${i}`;
      bulkProducts.push({ id: pId, name: `Osun Black Soap Formula ${i}`, description: `Natural glowing skin blend ${i}`, priceKobo: 450000 + (i * 50000), categoryId: "cat_skincare" });
      bulkVariants.push({ id: vId, name: `250ml Jar`, sku: `OSN-BLK-${i}-250`, productId: pId });
      bulkInventory.push({ id: `inv_skin_${i}`, variantId: vId, quantity: 100 });
    }


    for (let i = 1; i <= 10; i++) {
      const pId = `prod_food_${i}`;
      const vId = `var_food_${i}`;
      bulkProducts.push({ id: pId, name: `Abuja Special Kilishi Batch ${i}`, description: `Extra spicy beef jerky cut ${i}`, priceKobo: 550000 + (i * 20000), categoryId: "cat_food" });
      bulkVariants.push({ id: vId, name: `500g Pack`, sku: `KIL-SPCY-${i}-500`, productId: pId });
      bulkInventory.push({ id: `inv_food_${i}`, variantId: vId, quantity: 200 });
    }

    await db.insert(products).values(bulkProducts);
    await db.insert(variants).values(bulkVariants);
    await db.insert(inventory).values(bulkInventory);

    console.log("✅ Seeding complete! 50 SKUs generated.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seed();