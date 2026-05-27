import { config } from "dotenv";
import path from "path";
import { categories, products, variants, inventory } from "@/lib/db/schema"; 

config({ path: path.resolve(process.cwd(), ".env.local") });

async function seed() {
  console.log("🔍 Checking Environment Variables...");
  
  if (!process.env.DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is missing! Ensure .env.local exists.");
  }
  
  console.log("✅ DATABASE_URL found!");

  const { db } = await import("./index");

  console.log("🌱 Unlocking the warehouse...");

  try {
    console.log("🧹 Clearing old inventory...");
    await db.delete(inventory);
    await db.delete(variants);
    await db.delete(products);
    await db.delete(categories);
    
    console.log("📦 Building Categories...");
    await db.insert(categories).values([
      { id: "cat_fashion", name: "Owambe Fashion", slug: "owambe-fashion" },
      { id: "cat_tech", name: "Computer Village Gadgets", slug: "tech-gadgets" },
      { id: "cat_food", name: "Naija Premium Snacks", slug: "naija-snacks" },
      { id: "cat_skincare", name: "Lagos Glow Skincare", slug: "lagos-glow" }
    ]);

    console.log("🛒 Stocking 50 Products & Variants with Slugs...");
    

    const bulkProducts: (typeof products.$inferInsert)[] = [];
    const bulkVariants: (typeof variants.$inferInsert)[] = [];
    const bulkInventory: (typeof inventory.$inferInsert)[] = [];

    const addProduct = (pId: string, name: string, description: string, price: number, catId: string) => {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      bulkProducts.push({ 
        id: pId, 
        name, 
        slug, 
        description, 
        priceKobo: price, 
        category_id: catId 
      });
    };


    for (let i = 1; i <= 15; i++) {
      const pId = `prod_fash_${i}`;
      const vId = `var_fash_${i}`;
      addProduct(pId, `Premium Ankara Style ${i}`, `Design #${i}`, 1500000 + (i * 100000), "cat_fashion");
      bulkVariants.push({ id: vId, name: `Standard Size`, sku: `ANK-${i}-STD`, productId: pId });
      bulkInventory.push({ id: `inv_fash_${i}`, variantId: vId, quantity: 20 + i });
    }


    for (let i = 1; i <= 15; i++) {
      const pId = `prod_tech_${i}`;
      const vId = `var_tech_${i}`;
      addProduct(pId, `Wireless Earbuds Pro V${i}`, `Audio gear ${i}`, 2500000 + (i * 500000), "cat_tech");
      bulkVariants.push({ id: vId, name: `Black`, sku: `EAR-PRO-${i}-BLK`, productId: pId });
      bulkInventory.push({ id: `inv_tech_${i}`, variantId: vId, quantity: 50 });
    }


    for (let i = 1; i <= 10; i++) {
      const pId = `prod_skin_${i}`;
      const vId = `var_skin_${i}`;
      addProduct(pId, `Osun Black Soap ${i}`, `Skin blend ${i}`, 450000 + (i * 50000), "cat_skincare");
      bulkVariants.push({ id: vId, name: `250ml Jar`, sku: `OSN-BLK-${i}-250`, productId: pId });
      bulkInventory.push({ id: `inv_skin_${i}`, variantId: vId, quantity: 100 });
    }


    for (let i = 1; i <= 10; i++) {
      const pId = `prod_food_${i}`;
      const vId = `var_food_${i}`;
      addProduct(pId, `Abuja Kilishi Batch ${i}`, `Spicy beef ${i}`, 550000 + (i * 20000), "cat_food");
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