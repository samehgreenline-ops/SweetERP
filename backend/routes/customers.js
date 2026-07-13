import { Router } from "express";
import db from "../db/database.js";

const router = Router();

router.get("/", (req, res) => {
  const customers = db.prepare("SELECT * FROM customers ORDER BY name").all();
  res.json(customers.map(formatCustomer));
});

router.post("/", (req, res) => {
  const { name, phone, address } = req.body;
  const result = db.prepare(`
    INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)
  `).run(name, phone || "", address || "");

  const customer = db.prepare("SELECT * FROM customers WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(formatCustomer(customer));
});

router.put("/:id", (req, res) => {
  const existing = db.prepare("SELECT * FROM customers WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "العميل غير موجود" });

  const { name, phone, address } = req.body;
  db.prepare("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?")
    .run(name ?? existing.name, phone ?? existing.phone, address ?? existing.address, req.params.id);

  const customer = db.prepare("SELECT * FROM customers WHERE id = ?").get(req.params.id);
  res.json(formatCustomer(customer));
});

router.delete("/:id", (req, res) => {
  db.prepare("DELETE FROM customers WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

function formatCustomer(c) {
  return {
    id: c.id,
    name: c.name,
    phone: c.phone,
    address: c.address,
    active: !!c.active,
    createdAt: c.created_at,
  };
}

export { router as customersRouter };
