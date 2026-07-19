import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// Get Chart Of Accounts
router.get("/accounts", (req, res) => {

  const accounts = db.prepare(`
    SELECT
      id,
      company_id,
      code,
      name,
      account_type,
      parent_id,
      active,
      created_at
    FROM accounts
    ORDER BY code
  `).all();


  res.json(accounts);

});


// Get Journal Entries
router.get("/journal", (req, res) => {

  const entries = db.prepare(`
    SELECT
      id,
      company_id,
      entry_date,
      reference_type,
      reference_id,
      description,
      created_at
    FROM journal_entries
    ORDER BY id DESC
  `).all();


  res.json(entries);

});


// Get Journal Entry Details
router.get("/journal/:id", (req, res) => {

  const entry = db.prepare(`
    SELECT
      id,
      company_id,
      entry_date,
      reference_type,
      reference_id,
      description,
      created_at
    FROM journal_entries
    WHERE id = ?
  `).get(req.params.id);


  if (!entry) {

    return res.status(404).json({
      error: "Journal entry not found"
    });

  }


  const lines = db.prepare(`
    SELECT
      jl.id,
      jl.debit,
      jl.credit,
      a.code,
      a.name,
      a.account_type
    FROM journal_lines jl
    JOIN accounts a
      ON a.id = jl.account_id
    WHERE jl.journal_entry_id = ?
  `).all(req.params.id);



  res.json({
    ...entry,
    lines
  });

});


export { router as accountingRouter };