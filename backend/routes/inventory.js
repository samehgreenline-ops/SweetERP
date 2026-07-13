import { Router } from "express";
import db from "../db/database.js";
import { updateStock } from "./items.js";

const router = Router();

router.get("/", (req, res) => {
  const items = db.prepare(`
    SELECT id, name, code, item_type, base_unit, stock_qty, track_inventory
    FROM items
    WHERE track_inventory = 1
    ORDER BY name
  `).all();

  res.json(items.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    itemType: item.item_type,
    baseUnit: item.base_unit,
    stockQty: item.stock_qty,
    trackInventory: !!item.track_inventory,
  })));
});

router.get("/movements", (req, res) => {
  const movements = db.prepare(`
    SELECT m.*, i.name as item_name
    FROM inventory_movements m
    JOIN items i ON i.id = m.item_id
    ORDER BY m.id DESC
    LIMIT 100
  `).all();

  res.json(movements.map((m) => ({
    id: m.id,
    itemId: m.item_id,
    itemName: m.item_name,
    movementType: m.movement_type,
    qty: m.qty,
    unit: m.unit,
    referenceType: m.reference_type,
    referenceId: m.reference_id,
    notes: m.notes,
    createdAt: m.created_at,
  })));
});

router.post("/adjust", (req, res) => {
  const { itemId, qty, notes } = req.body;
  const item = db.prepare("SELECT * FROM items WHERE id = ?").get(itemId);

  if (!item) return res.status(404).json({ error: "الصنف غير موجود" });

  const newQty = Number(qty);
  const diff = newQty - (item.stock_qty || 0);

  try {
    updateStock(itemId, diff, diff >= 0 ? "IN" : "OUT", "manual", null, notes || "تعديل يدوي للمخزون");
    const updated = db.prepare("SELECT * FROM items WHERE id = ?").get(itemId);
    res.json({
      id: updated.id,
      name: updated.name,
      stockQty: updated.stock_qty,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as inventoryRouter };
