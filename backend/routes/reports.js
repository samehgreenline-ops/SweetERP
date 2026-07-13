import { Router } from "express";
import db from "../db/database.js";

const router = Router();

router.get("/dashboard", (req, res) => {
  const itemsCount = db.prepare("SELECT COUNT(*) as count FROM items").get().count;
  const recipesCount = db.prepare("SELECT COUNT(*) as count FROM recipes").get().count;
  const lowStock = db.prepare(`
    SELECT id, name, stock_qty, base_unit
    FROM items
    WHERE track_inventory = 1 AND stock_qty <= 10
    ORDER BY stock_qty
    LIMIT 10
  `).all();

  const totalPurchases = db.prepare("SELECT COALESCE(SUM(total_amount), 0) as total FROM purchases").get().total;
  const totalSales = db.prepare("SELECT COALESCE(SUM(total_amount), 0) as total FROM sales").get().total;
  const productionCount = db.prepare("SELECT COUNT(*) as count FROM production_orders WHERE status = 'COMPLETED'").get().count;

  res.json({
    itemsCount,
    recipesCount,
    productionCount,
    totalPurchases,
    totalSales,
    profit: totalSales - totalPurchases,
    lowStock: lowStock.map((item) => ({
      id: item.id,
      name: item.name,
      stockQty: item.stock_qty,
      baseUnit: item.base_unit,
    })),
  });
});

router.get("/inventory", (req, res) => {
  const items = db.prepare(`
    SELECT id, name, code, item_type, base_unit, stock_qty, purchase_price, sale_price
    FROM items
    WHERE track_inventory = 1
    ORDER BY name
  `).all();

  const totalValue = items.reduce((sum, item) => {
    return sum + (item.stock_qty || 0) * (item.purchase_price || 0);
  }, 0);

  res.json({
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      itemType: item.item_type,
      baseUnit: item.base_unit,
      stockQty: item.stock_qty,
      value: (item.stock_qty || 0) * (item.purchase_price || 0),
    })),
    totalValue,
  });
});

router.get("/production-costs", (req, res) => {
  const recipes = db.prepare("SELECT id FROM recipes").all();
  const costs = recipes.map((r) => {
    const recipe = db.prepare(`
      SELECT r.*, i.name as product_name
      FROM recipes r
      JOIN items i ON i.id = r.product_id
      WHERE r.id = ?
    `).get(r.id);

    const items = db.prepare(`
      SELECT ri.qty, ri.unit, i.purchase_price, i.base_unit
      FROM recipe_items ri
      JOIN items i ON i.id = ri.material_id
      WHERE ri.recipe_id = ?
    `).all(r.id);

    const totalCost = items.reduce((sum, item) => {
      return sum + Number(item.qty) * Number(item.purchase_price || 0);
    }, 0);

    const outputQty = Number(recipe.output_qty) || 1;

    return {
      recipeId: recipe.id,
      productName: recipe.product_name,
      outputQty: recipe.output_qty,
      outputUnit: recipe.output_unit,
      totalCost,
      unitCost: totalCost / outputQty,
    };
  });

  res.json(costs);
});

export { router as reportsRouter };
