import db from "../db/database.js";
import { convertQty } from "./units.js";


// إنشاء قيد يومية عام
function createJournalEntry({
  companyId,
  date,
  referenceType,
  referenceId,
  description,
  lines,
}) {

  const transaction = db.transaction(() => {

    const result = db.prepare(`
      INSERT INTO journal_entries
      (
        company_id,
        entry_date,
        reference_type,
        reference_id,
        description
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(
      companyId,
      date || new Date().toISOString().slice(0,10),
      referenceType || null,
      referenceId || null,
      description || ""
    );


    const journalEntryId = result.lastInsertRowid;


    const insertLine = db.prepare(`
      INSERT INTO journal_lines
      (
        journal_entry_id,
        account_id,
        debit,
        credit
      )
      VALUES (?, ?, ?, ?)
    `);


    for (const line of lines) {

      insertLine.run(
        journalEntryId,
        line.accountId,
        Number(line.debit) || 0,
        Number(line.credit) || 0
      );

    }


    return journalEntryId;

  });


  return transaction();

}




function getAccountId(companyId, code) {

  const account = db.prepare(`
    SELECT id
    FROM accounts
    WHERE company_id = ?
    AND code = ?
  `).get(companyId, code);


  if (!account) {
    throw new Error(`Account ${code} not found`);
  }


  return account.id;

}





// حساب تكلفة المنتج

function calculateProductCost(productId) {

  const recipe = db.prepare(`
    SELECT *
    FROM recipes
    WHERE product_id = ?
    ORDER BY id DESC
    LIMIT 1
  `).get(productId);



  if (!recipe) {

    const item = db.prepare(`
      SELECT purchase_price
      FROM items
      WHERE id = ?
    `).get(productId);


    return Number(item?.purchase_price) || 0;

  }



  const materials = db.prepare(`
    SELECT
      ri.qty,
      ri.unit,
      i.purchase_price,
      i.base_unit
    FROM recipe_items ri
    JOIN items i
      ON i.id = ri.material_id
    WHERE ri.recipe_id = ?
  `).all(recipe.id);



  let total = 0;



  for (const material of materials) {

    const qtyInBase = convertQty(
      material.qty,
      material.unit,
      material.base_unit
    );


    total +=
      qtyInBase *
      Number(material.purchase_price || 0);

  }



  return total /
    (Number(recipe.output_qty) || 1);

}





// قيد شراء

function createPurchaseJournal({
  companyId = 1,
  purchaseId,
  amount,
  date,
}) {

  return createJournalEntry({

    companyId,
    date,

    referenceType:"PURCHASE",
    referenceId:purchaseId,

    description:
      `Purchase Invoice #${purchaseId}`,

    lines:[

      {
        accountId:getAccountId(companyId,"1300"),
        debit:amount,
        credit:0
      },

      {
        accountId:getAccountId(companyId,"2000"),
        debit:0,
        credit:amount
      }

    ]

  });

}





// قيد بيع

function createSaleJournal({
  companyId=1,
  saleId,
  amount,
  date,
}) {

  return createJournalEntry({

    companyId,
    date,

    referenceType:"SALE",
    referenceId:saleId,

    description:
      `Sales Invoice #${saleId}`,

    lines:[

      {
        accountId:getAccountId(companyId,"1200"),
        debit:amount,
        credit:0
      },

      {
        accountId:getAccountId(companyId,"4000"),
        debit:0,
        credit:amount
      }

    ]

  });

}







// قيد تكلفة المبيعات

function createSaleCostJournal({

  companyId=1,

  saleId,

  items,

  date,

}) {


  let totalCost = 0;



  for (const item of items) {


    const product = db.prepare(`
      SELECT base_unit
      FROM items
      WHERE id = ?
    `).get(item.itemId);



    const productCost =
      calculateProductCost(item.itemId);



    const qtyInBase = convertQty(
      Number(item.qty),
      item.unit,
      product?.base_unit
    );



    totalCost +=
      qtyInBase *
      productCost;


  }





  if(totalCost <= 0){

    return null;

  }






  return createJournalEntry({

    companyId,

    date,

    referenceType:"SALE_COGS",

    referenceId:saleId,

    description:
      `COGS For Sales Invoice #${saleId}`,

    lines:[

      {
        accountId:getAccountId(companyId,"5000"),
        debit:totalCost,
        credit:0
      },

      {
        accountId:getAccountId(companyId,"1400"),
        debit:0,
        credit:totalCost
      }

    ]

  });


}







// قيد الإنتاج
// تحويل تكلفة الخامات إلى مخزون منتجات تامة

function createProductionJournal({

  companyId = 1,

  productionId,

  productId,

  qty,

  date,

}) {


  const productCost =
    calculateProductCost(productId);


  const totalCost =
    Number(qty) * productCost;



  if(totalCost <= 0){

    return null;

  }



  return createJournalEntry({

    companyId,

    date,

    referenceType:"PRODUCTION",

    referenceId:productionId,

    description:
      `Production Order #${productionId}`,

    lines:[

      {
        accountId:getAccountId(companyId,"1400"),
        debit:totalCost,
        credit:0
      },

      {
        accountId:getAccountId(companyId,"1300"),
        debit:0,
        credit:totalCost
      }

    ]

  });


}







export {

  createJournalEntry,
  getAccountId,
  createPurchaseJournal,
  createSaleJournal,
  calculateProductCost,
  createSaleCostJournal,
  createProductionJournal

};