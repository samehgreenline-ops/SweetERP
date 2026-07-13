import { Router } from "express";
import db from "../db/database.js";
import { convertQty } from "../utils/units.js";
import { updateStock } from "./items.js";

const router = Router();

function getOrder(id) {
  const order = db.prepare(`
    SELECT po.*, r.output_qty, r.output_unit, i.name as product_name
    FROM production_orders po
    JOIN recipes r ON r.id = po.recipe_id
    JOIN items i ON i.id = po.product_id
    WHERE po.id = ?
  `).get(id);

  if (!order) return null;

  return {
    id: order.id,
    recipeId: order.recipe_id,
    productId: order.product_id,
    productName: order.product_name,
    plannedQty: order.planned_qty,
    actualQty: order.actual_qty,
    status: order.status,
    notes: order.notes,
    outputQty: order.output_qty,
    outputUnit: order.output_unit,
    createdAt: order.created_at,
    completedAt: order.completed_at,
  };
}

router.get("/", (req, res) => {
  const orders = db.prepare("SELECT id FROM production_orders ORDER BY id DESC").all();
  res.json(orders.map((o) => getOrder(o.id)));
});

router.post("/", (req, res) => {
  const { recipeId, plannedQty, notes } = req.body;

  const recipe = db.prepare("SELECT * FROM recipes WHERE id = ?").get(recipeId);
  if (!recipe) return res.status(404).json({ error: "الوصفة غير موجودة" });

  const result = db.prepare(`
    INSERT INTO production_orders (recipe_id, product_id, planned_qty, notes)
    VALUES (?, ?, ?, ?)
  `).run(recipeId, recipe.product_id, Number(plannedQty), notes || "");

  res.status(201).json(getOrder(result.lastInsertRowid));
});

router.post("/:id/complete", (req, res) => {
  const order = db.prepare("SELECT * FROM production_orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: "أمر الإنتاج غير موجود" });
  if (order.status === "COMPLETED") return res.status(400).json({ error: "تم تنفيذ الأمر مسبقاً" });

  const recipe = db.prepare("SELECT * FROM recipes WHERE id = ?").get(order.recipe_id);
  const recipeItems = db.prepare("SELECT * FROM recipe_items WHERE recipe_id = ?").all(order.recipe_id);
  const product = db.prepare("SELECT * FROM items WHERE id = ?").get(order.product_id);

  const batches = Number(order.planned_qty);
  const outputPerBatch = Number(recipe.output_qty) || 1;
  const totalOutput = batches * outputPerBatch;

  try {
    const transaction = db.transaction(() => {
      for (const ri of recipeItems) {
        const material = db.prepare("SELECT * FROM items WHERE id = ?").get(ri.material_id);
        const neededQty = convertQty(
          Number(ri.qty) * batches,
          ri.unit,
          material.base_unit
        );
        updateStock(
          ri.material_id,
          -neededQty,
          "OUT",
          "production",
          order.id,
          `استهلاك إنتاج - أمر #${order.id}`
        );
      }

      updateStock(
        order.product_id,
        convertQty(totalOutput, recipe.output_unit, product.base_unit),
        "IN",
        "production",
        order.id,
        `إنتاج - أمر #${order.id}`
      );

      db.prepare(`
        UPDATE production_orders
        SET status = 'COMPLETED', actual_qty = ?, completed_at = datetime('now')
        WHERE id = ?
      `).run(totalOutput, order.id);
    });

    transaction();
    res.json(getOrder(order.id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  const order = db.prepare("SELECT * FROM production_orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: "أمر الإنتاج غير موجود" });
  if (order.status === "COMPLETED") return res.status(400).json({ error: "لا يمكن حذف أمر منفّذ" });

  db.prepare("DELETE FROM production_orders WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

export { router as productionRouter };
