import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// Get all companies
router.get("/", (req, res) => {

  const companies = db.prepare(`
    SELECT *
    FROM companies
    ORDER BY id DESC
  `).all();

  res.json(companies);

});



// Get company by id
router.get("/:id", (req, res) => {

  const company = db.prepare(`
    SELECT *
    FROM companies
    WHERE id = ?
  `).get(req.params.id);


  if (!company) {

    return res.status(404).json({
      error: "Company not found"
    });

  }


  res.json(company);

});



// Create company
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




// Update company settings
router.put("/:id", (req, res) => {

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


  db.prepare(`
    UPDATE companies
    SET
      name = ?,
      business_type = ?,
      logo = ?,
      background = ?,
      theme = ?,
      currency = ?,
      phone = ?,
      address = ?
    WHERE id = ?
  `).run(
    name,
    business_type,
    logo,
    background,
    theme,
    currency,
    phone,
    address,
    req.params.id
  );



  const company = db.prepare(`
    SELECT *
    FROM companies
    WHERE id = ?
  `).get(req.params.id);



  res.json(company);

});



export { router as companiesRouter };