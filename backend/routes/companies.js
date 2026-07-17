import { Router } from "express";
import db from "../db/database.js";

const router = Router();

router.get("/", (req, res) => {
  const companies = db.prepare(`
    SELECT *
    FROM companies
    ORDER BY id DESC
  `).all();

  res.json(companies);
});

router.post("/", (req, res) => {
  const {
    name,
    business_type,
    logo,
    background,
    theme,
    currency,
    phone,
    address,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Company name is required",
    });
  }

  const result = db.prepare(`
    INSERT INTO companies
    (
      name,
      business_type,
      logo,
      background,
      theme,
      currency,
      phone,
      address
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name,
    business_type || "",
    logo || "",
    background || "",
    theme || "default",
    currency || "EGP",
    phone || "",
    address || ""
  );

  const company = db.prepare(`
    SELECT *
    FROM companies
    WHERE id = ?
  `).get(result.lastInsertRowid);

  res.json(company);
});

export { router as companiesRouter };