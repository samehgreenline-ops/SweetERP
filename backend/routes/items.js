import { Router } from "express";
import db from "../db/database.js";
import { convertQty } from "../utils/units.js";

const router = Router();


function generateItemCode(itemType) {

  let prefix = "IT";

  if (itemType === "RAW_MATERIAL") {
    prefix = "RM";
  }

  if (itemType === "FINISHED_PRODUCT") {
    prefix = "FG";
  }

  const count = db.prepare(
    "SELECT COUNT(*) AS total FROM items WHERE item_type = ?"
  ).get(itemType).total;

  return `${prefix}-${String(count + 1).padStart(5, "0")}`;
}


function updateStock(itemId, qtyChange, movementType, referenceType, referenceId, notes) {
  const item = db.prepare("SELECT * FROM items WHERE id = ?").get(itemId);
  if (!item) throw new Error("الصنف غير موجود");

  if (item.track_inventory) {
    const newStock = (item.stock_qty || 0) + qtyChange;

    if (newStock < -0.0001) {
      throw new Error(`رصيد غير كافي للصنف: ${item.name}`);
    }

    db.prepare(
      "UPDATE items SET stock_qty = ? WHERE id = ?"
    ).run(newStock, itemId);
  }

  db.prepare(`
    INSERT INTO inventory_movements
    (item_id, movement_type, qty, unit, reference_type, reference_id, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    itemId,
    movementType,
    Math.abs(qtyChange),
    item.base_unit,
    referenceType,
    referenceId,
    notes
  );
}


router.get("/", (req, res) => {
  const items = db.prepare("SELECT * FROM items ORDER BY id DESC").all();
  res.json(items.map(formatItem));
});


router.get("/:id", (req, res) => {

  const item = db.prepare(
    "SELECT * FROM items WHERE id = ?"
  ).get(req.params.id);


  if (!item) {
    return res.status(404).json({ error: "الصنف غير موجود" });
  }


  res.json(formatItem(item));
});


router.post("/", (req, res) => {

  const {
    name,
    code,
    item_type,
    base_unit,
    purchase_price,
    sale_price,
    active,
    track_inventory,
    stock_qty,
    reorder_level,
    notes
  } = req.body;


  const itemCode = code || generateItemCode(item_type);


  const result = db.prepare(`
    INSERT INTO items
    (
      name,
      code,
      item_type,
      base_unit,
      purchase_price,
      sale_price,
      active,
      track_inventory,
      stock_qty,
      reorder_level,
      notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name,
    itemCode,
    item_type,
    base_unit,
    Number(purchase_price) || 0,
    Number(sale_price) || 0,
    active !== false ? 1 : 0,
    track_inventory !== false ? 1 : 0,
    Number(stock_qty) || 0,
    Number(reorder_level) || 0,
    notes || ""
  );


  const item = db.prepare(
    "SELECT * FROM items WHERE id = ?"
  ).get(result.lastInsertRowid);


  res.status(201).json(formatItem(item));
});


router.put("/:id", (req, res) => {

  const existing = db.prepare(
    "SELECT * FROM items WHERE id = ?"
  ).get(req.params.id);


  if (!existing) {
    return res.status(404).json({ error: "الصنف غير موجود" });
  }


  const {
    name,
    code,
    item_type,
    base_unit,
    purchase_price,
    sale_price,
    active,
    track_inventory,
    stock_qty,
    reorder_level,
    notes
  } = req.body;


  db.prepare(`
    UPDATE items SET

      name = ?,
      code = ?,
      item_type = ?,
      base_unit = ?,
      purchase_price = ?,
      sale_price = ?,
      active = ?,
      track_inventory = ?,
      stock_qty = ?,
      reorder_level = ?,
      notes = ?

    WHERE id = ?

  `).run(

    name ?? existing.name,
    code ?? existing.code,
    item_type ?? existing.item_type,
    base_unit ?? existing.base_unit,

    purchase_price !== undefined
      ? Number(purchase_price)
      : existing.purchase_price,

    sale_price !== undefined
      ? Number(sale_price)
      : existing.sale_price,

    active !== undefined
      ? (active ? 1 : 0)
      : existing.active,

    track_inventory !== undefined
      ? (track_inventory ? 1 : 0)
      : existing.track_inventory,

    stock_qty !== undefined
      ? Number(stock_qty)
      : existing.stock_qty,

    reorder_level !== undefined
      ? Number(reorder_level)
      : existing.reorder_level,

    notes !== undefined
      ? notes
      : existing.notes,

    req.params.id
  );


  const item = db.prepare(
    "SELECT * FROM items WHERE id = ?"
  ).get(req.params.id);


  res.json(formatItem(item));

});


router.delete("/:id", (req, res) => {

  const existing = db.prepare(
    "SELECT * FROM items WHERE id = ?"
  ).get(req.params.id);


  if (!existing) {
    return res.status(404).json({ error: "الصنف غير موجود" });
  }


  db.prepare(
    "DELETE FROM items WHERE id = ?"
  ).run(req.params.id);


  res.json({ success: true });

});


function formatItem(item) {

  return {

    id: item.id,

    name: item.name,

    code: item.code,

    itemType: item.item_type,

    baseUnit: item.base_unit,

    purchasePrice: item.purchase_price,

    salePrice: item.sale_price,

    active: !!item.active,

    trackInventory: !!item.track_inventory,

    stockQty: item.stock_qty,

    reorderLevel: item.reorder_level,

    notes: item.notes,

    createdAt: item.created_at

  };

}


export { updateStock, router as itemsRouter };