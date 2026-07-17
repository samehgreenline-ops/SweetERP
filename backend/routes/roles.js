import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// Get roles
router.get("/", (req, res) => {
  const roles = db.prepare(`
    SELECT
      roles.id,
      roles.name,
      roles.description,
      roles.active,
      companies.name AS company_name
    FROM roles
    JOIN companies
      ON companies.id = roles.company_id
    ORDER BY roles.id
  `).all();

  res.json(roles);
});


// Create role
router.post("/", (req, res) => {

  const {
    company_id,
    name,
    description
  } = req.body;


  if (!company_id || !name) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }


  const result = db.prepare(`
    INSERT INTO roles
    (
      company_id,
      name,
      description
    )
    VALUES (?, ?, ?)
  `).run(
    company_id,
    name,
    description || ""
  );


  res.json({
    id: result.lastInsertRowid,
    company_id,
    name,
    description: description || ""
  });
});


export { router as rolesRouter };