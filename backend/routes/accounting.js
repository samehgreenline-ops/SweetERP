import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// دليل الحسابات
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



// القيود اليومية
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



// تفاصيل قيد يومية
router.get("/journal/:id", (req, res) => {

  const entry = db.prepare(`
    SELECT *
    FROM journal_entries
    WHERE id = ?
  `).get(req.params.id);


  if (!entry) {

    return res.status(404).json({
      error:"Journal entry not found"
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





// الأستاذ العام لحساب معين
// مثال:
// /api/accounting/ledger/5

router.get("/ledger/:accountId", (req,res)=>{


  const account = db.prepare(`
    SELECT *
    FROM accounts
    WHERE id = ?
  `).get(req.params.accountId);



  if(!account){

    return res.status(404).json({
      error:"Account not found"
    });

  }



  const movements = db.prepare(`
    SELECT

      je.entry_date,
      je.description,
      je.reference_type,

      jl.debit,
      jl.credit

    FROM journal_lines jl

    JOIN journal_entries je
      ON je.id = jl.journal_entry_id

    WHERE jl.account_id = ?

    ORDER BY je.entry_date, je.id

  `).all(req.params.accountId);



  let balance = 0;


  const ledger = movements.map(row=>{

    balance +=
      Number(row.debit) -
      Number(row.credit);


    return {

      date: row.entry_date,

      description: row.description,

      reference: row.reference_type,

      debit: row.debit,

      credit: row.credit,

      balance

    };

  });



  res.json({

    account,

    ledger

  });


});





// كشف حساب بين تاريخين

router.get("/statement/:accountId",(req,res)=>{


  const {
    from,
    to
  } = req.query;



  const rows = db.prepare(`
    SELECT

      je.entry_date,
      je.description,
      jl.debit,
      jl.credit

    FROM journal_lines jl

    JOIN journal_entries je
      ON je.id = jl.journal_entry_id

    WHERE jl.account_id = ?

    AND je.entry_date BETWEEN ? AND ?

    ORDER BY je.entry_date

  `).all(
    req.params.accountId,
    from || "2000-01-01",
    to || "2099-12-31"
  );



  res.json(rows);


});



export { router as accountingRouter };