import db from "../db/database.js";


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
  `).get(
    companyId,
    code
  );


  if (!account) {

    throw new Error(
      `Account ${code} not found`
    );

  }


  return account.id;

}




// قيد شراء خامات
function createPurchaseJournal({
  companyId = 1,
  purchaseId,
  amount,
  date,
}) {


  const inventoryAccount =
    getAccountId(companyId,"1300");


  const supplierAccount =
    getAccountId(companyId,"2000");



  return createJournalEntry({

    companyId,

    date,

    referenceType:"PURCHASE",

    referenceId:purchaseId,

    description:
      `Purchase Invoice #${purchaseId}`,

    lines:[

      {
        accountId:inventoryAccount,
        debit:amount,
        credit:0
      },

      {
        accountId:supplierAccount,
        debit:0,
        credit:amount
      }

    ]

  });

}




// قيد بيع الإيراد
function createSaleJournal({
  companyId = 1,
  saleId,
  amount,
  date,
}) {


  const customerAccount =
    getAccountId(companyId,"1200");


  const salesAccount =
    getAccountId(companyId,"4000");



  return createJournalEntry({

    companyId,

    date,

    referenceType:"SALE",

    referenceId:saleId,

    description:
      `Sales Invoice #${saleId}`,

    lines:[

      {
        accountId:customerAccount,
        debit:amount,
        credit:0
      },

      {
        accountId:salesAccount,
        debit:0,
        credit:amount
      }

    ]

  });

}





// قيد تكلفة المبيعات
function createCOGSJournal({
  companyId = 1,
  saleId,
  costAmount,
  date,
}) {


  const costAccount =
    getAccountId(companyId,"5000");


  const inventoryAccount =
    getAccountId(companyId,"1400");



  return createJournalEntry({

    companyId,

    date,

    referenceType:"SALE_COGS",

    referenceId:saleId,

    description:
      `Cost of Sales Invoice #${saleId}`,

    lines:[

      {
        accountId:costAccount,
        debit:costAmount,
        credit:0
      },

      {
        accountId:inventoryAccount,
        debit:0,
        credit:costAmount
      }

    ]

  });

}





export {
  createJournalEntry,
  getAccountId,
  createPurchaseJournal,
  createSaleJournal,
  createCOGSJournal
};