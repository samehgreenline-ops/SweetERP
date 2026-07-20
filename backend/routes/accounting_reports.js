import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// ===============================
// دفتر الأستاذ العام
// ===============================

router.get("/gl", (req,res)=>{

  const rows = db.prepare(`
    SELECT
      a.code,
      a.name,
      je.entry_date,
      je.description,
      jl.debit,
      jl.credit

    FROM journal_lines jl

    JOIN journal_entries je
      ON je.id = jl.journal_entry_id

    JOIN accounts a
      ON a.id = jl.account_id

    ORDER BY
      a.code,
      je.entry_date,
      je.id
  `).all();


  res.json(rows);

});





// ===============================
// كشف حساب
// ===============================

router.get("/account/:code",(req,res)=>{


  const account = db.prepare(`
    SELECT *
    FROM accounts
    WHERE code = ?
  `).get(req.params.code);



  if(!account){

    return res.status(404).json({
      error:"الحساب غير موجود"
    });

  }



  const {
    from="2000-01-01",
    to="2099-12-31"
  } = req.query;



  const movements = db.prepare(`
    
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

    ORDER BY je.id

  `).all(
    account.id,
    from,
    to
  );



  let balance = 0;


  const result = movements.map(row=>{

    balance +=
      Number(row.debit || 0)
      -
      Number(row.credit || 0);


    return {

      ...row,

      balance

    };

  });



  res.json({

    account,

    movements:result,

    finalBalance:balance

  });


});





// ===============================
// ميزان المراجعة
// ===============================

router.get("/trial-balance",(req,res)=>{


  const {
    from="2000-01-01",
    to="2099-12-31"
  } = req.query;



  const data = db.prepare(`

    SELECT

      a.code,
      a.name,

      COALESCE(SUM(jl.debit),0) debit,

      COALESCE(SUM(jl.credit),0) credit


    FROM accounts a


    LEFT JOIN journal_lines jl

      ON jl.account_id = a.id


    LEFT JOIN journal_entries je

      ON je.id = jl.journal_entry_id

      AND je.entry_date BETWEEN ? AND ?


    GROUP BY a.id


    ORDER BY a.code


  `).all(
    from,
    to
  );



  res.json(data);


});





// ===============================
// قائمة الدخل
// ===============================

router.get("/income-statement",(req,res)=>{


  const revenues = db.prepare(`

    SELECT
      SUM(jl.credit-jl.debit) total

    FROM journal_lines jl

    JOIN journal_entries je
      ON je.id=jl.journal_entry_id

    JOIN accounts a
      ON a.id = jl.account_id

    WHERE a.account_type='REVENUE'

  `).get();



  const expenses = db.prepare(`

    SELECT
      SUM(jl.debit-jl.credit) total

    FROM journal_lines jl

    JOIN accounts a
      ON a.id = jl.account_id

    WHERE a.account_type='EXPENSE'

  `).get();



  const revenue =
    Number(revenues.total)||0;

  const expense =
    Number(expenses.total)||0;



  res.json({

    revenues:revenue,

    expenses:expense,

    netProfit:
      revenue-expense

  });


});





// ===============================
// الميزانية العمومية
// ===============================

router.get("/balance-sheet",(req,res)=>{


  const result = db.prepare(`

    SELECT

      a.account_type,

      a.code,

      a.name,


      COALESCE(
        SUM(jl.debit-jl.credit),
        0
      ) balance


    FROM accounts a


    LEFT JOIN journal_lines jl

      ON jl.account_id=a.id


    WHERE a.account_type IN
    (
      'ASSET',
      'LIABILITY',
      'EQUITY'
    )


    GROUP BY a.id


    ORDER BY a.code


  `).all();



  res.json(result);


});



export {
  router as accountingReportsRouter
};