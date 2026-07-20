import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// ===============================
// قائمة الدخل التفصيلية
// ===============================

router.get("/income-statement-full", (req, res) => {

  const revenues = db.prepare(`
    SELECT
      a.code,
      a.name,
      SUM(jl.credit - jl.debit) amount
    FROM journal_lines jl
    JOIN accounts a
      ON a.id = jl.account_id
    WHERE a.account_type = 'REVENUE'
    GROUP BY a.id
  `).all();



  const costOfSales = db.prepare(`
    SELECT
      a.code,
      a.name,
      SUM(jl.debit - jl.credit) amount
    FROM journal_lines jl
    JOIN accounts a
      ON a.id = jl.account_id
    WHERE a.code = '5000'
    GROUP BY a.id
  `).all();



  const expenses = db.prepare(`
    SELECT
      a.code,
      a.name,
      SUM(jl.debit - jl.credit) amount
    FROM journal_lines jl
    JOIN accounts a
      ON a.id = jl.account_id
    WHERE a.account_type = 'EXPENSE'
    AND a.code <> '5000'
    GROUP BY a.id
  `).all();



  const totalRevenue =
    revenues.reduce(
      (sum, x)=> sum + Number(x.amount || 0),
      0
    );


  const totalCost =
    costOfSales.reduce(
      (sum, x)=> sum + Number(x.amount || 0),
      0
    );


  const totalExpenses =
    expenses.reduce(
      (sum, x)=> sum + Number(x.amount || 0),
      0
    );



  res.json({

    revenues,

    costOfSales,

    expenses,

    totals:{

      sales: totalRevenue,

      grossProfit:
        totalRevenue - totalCost,

      operatingExpenses:
        totalExpenses,

      netProfit:
        totalRevenue
        -
        totalCost
        -
        totalExpenses

    }

  });


});





// ===============================
// المركز المالي التفصيلي
// ===============================

router.get("/financial-position", (req,res)=>{


  const data = db.prepare(`

    SELECT

      a.account_type,

      a.code,

      a.name,

      SUM(jl.debit - jl.credit) balance


    FROM accounts a

    LEFT JOIN journal_lines jl

      ON jl.account_id = a.id


    WHERE a.account_type IN
    (
      'ASSET',
      'LIABILITY',
      'EQUITY'
    )


    GROUP BY a.id

    ORDER BY a.code


  `).all();



  const assets =
    data.filter(
      x=>x.account_type==="ASSET"
    );


  const liabilities =
    data.filter(
      x=>x.account_type==="LIABILITY"
    );


  const equity =
    data.filter(
      x=>x.account_type==="EQUITY"
    );



  res.json({

    assets,

    liabilities,

    equity,


    totals:{


      assets:
        assets.reduce(
          (s,x)=>s+Number(x.balance||0),
          0
        ),


      liabilities:
        liabilities.reduce(
          (s,x)=>s+Number(x.balance||0),
          0
        ),


      equity:
        equity.reduce(
          (s,x)=>s+Number(x.balance||0),
          0
        )


    }


  });



});





// ===============================
// حركة المخزون بالقيمة
// ===============================

router.get("/inventory-value", (req,res)=>{


  const result = db.prepare(`

    SELECT

      i.code,

      i.name,


      SUM(

        CASE

          WHEN im.movement_type IN
          ('PURCHASE','IN')
          THEN im.qty

          ELSE 0

        END

      ) in_qty,


      SUM(

        CASE

          WHEN im.movement_type IN
          ('SALE','OUT')
          THEN im.qty

          ELSE 0

        END

      ) out_qty,


      i.purchase_price


    FROM items i


    LEFT JOIN inventory_movements im

      ON im.item_id = i.id


    GROUP BY i.id


  `).all();



  res.json(

    result.map(item=>({

      ...item,

      balance_qty:
        Number(item.in_qty||0)
        -
        Number(item.out_qty||0),


      stock_value:
        (
          Number(item.in_qty||0)
          -
          Number(item.out_qty||0)
        )
        *
        Number(item.purchase_price||0)

    }))

  );


});





export {
  router as financialReportsRouter
};