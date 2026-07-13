import { Router } from "express";
import db from "../db/database.js";

const router = Router();

router.get("/", (req, res) => {
  const suppliers = db.prepare("SELECT * FROM suppliers ORDER BY name").all();
  res.json(suppliers.map(formatSupplier));
});

router.post("/", (req, res) => {
  const { name, phone, address } = req.body;
  const result = db.prepare(`
    INSERT INTO suppliers (name, phone, address) VALUES (?, ?, ?)
  `).run(name, phone || "", address || "");

  const supplier = db.prepare("SELECT * FROM suppliers WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(formatSupplier(supplier));
});

router.put("/:id", (req, res) => {
  const existing = db.prepare("SELECT * FROM suppliers WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "المورد غير موجود" });

  const { name, phone, address } = req.body;
  db.prepare("UPDATE suppliers SET name = ?, phone = ?, address = ? WHERE id = ?")
    .run(name ?? existing.name, phone ?? existing.phone, address ?? existing.address, req.params.id);

  const supplier = db.prepare("SELECT * FROM suppliers WHERE id = ?").get(req.params.id);
  res.json(formatSupplier(supplier));
});

router.delete("/:id", (req, res) => {
  db.prepare("DELETE FROM suppliers WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

function formatSupplier(s) {
  return {
    id: s.id,
    name: s.name,
    phone: s.phone,
    address: s.address,
    active: !!s.active,
    createdAt: s.created_at,
  };
}

export { router as suppliersRouter };
