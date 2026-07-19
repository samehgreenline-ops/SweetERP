import { Router } from "express";
import db from "../db/database.js";
import { convertQty } from "../utils/units.js";
import { updateStock } from "./items.js";

const router = Router();


function getPurchase(id) {

  const purchase = db.prepare(`
    SELECT
      p.*,
      s.name AS supplier_name
    FROM purchases p
    LEFT JOIN suppliers s
      ON s.id = p.supplier_id
    WHERE p.id = ?
  `).get(id);


  if (!purchase) return null;


  const items = db.prepare(`
    SELECT
      pi.*,
      i.name AS item_name
    FROM purchase_items pi
    JOIN items i
      ON i.id = pi.item_id
    WHERE pi.purchase_id = ?
  `).all(id);


  return formatPurchase(purchase, items);

}



router.get("/", (req, res) => {

  const purchases = db.prepare(`
    SELECT id
    FROM purchases
    ORDER BY id DESC
  `).all();


  res.json(
    purchases.map(p => getPurchase(p.id))
  );

});





router.post("/", (req, res) => {


  const {
    supplierId,
    invoiceNumber,
    purchaseDate,
    notes,
    items
  } = req.body;



  const transaction = db.transaction(() => {


    let totalAmount = 0;


    const preparedItems = (items || []).map((line) => {


      const item = db.prepare(`
        SELECT *
        FROM items
        WHERE id = ?
      `).get(line.itemId);



      if (!item) {

        throw new Error("الصنف غير موجود");

      }



      let unitPrice =
        Number(line.unitPrice);



      if (!unitPrice || unitPrice <= 0) {

        unitPrice =
          Number(item.purchase_price) || 0;

      }



      const totalPrice =
        Number(line.qty) * unitPrice;



      totalAmount += totalPrice;



      return {
        ...line,
        unitPrice,
        totalPrice,
        item
      };


    });



    const result = db.prepare(`
      INSERT INTO purchases
      (
        supplier_id,
        invoice_number,
        purchase_date,
        total_amount,
        notes
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(

      supplierId || null,

      invoiceNumber || "",

      purchaseDate ||
        new Date().toISOString().slice(0,10),

      totalAmount,

      notes || ""

    );



    const purchaseId =
      result.lastInsertRowid;



    const insertLine = db.prepare(`
      INSERT INTO purchase_items
      (
        purchase_id,
        item_id,
        qty,
        unit,
        unit_price,
        total_price
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);



    const updatePurchasePrice = db.prepare(`
      UPDATE items
      SET purchase_price = ?
      WHERE id = ?
    `);



    for (const line of preparedItems) {


      insertLine.run(

        purchaseId,

        line.itemId,

        Number(line.qty),

        line.unit,

        line.unitPrice,

        line.totalPrice

      );



      updatePurchasePrice.run(

        line.unitPrice,

        line.itemId

      );



      const qtyInBase =
        convertQty(
          line.qty,
          line.unit,
          line.item.base_unit
        );



      updateStock(

        line.itemId,

        qtyInBase,

        "IN",

        "purchase",

        purchaseId,

        `مشتريات - فاتورة #${purchaseId}`

      );


    }



    return purchaseId;


  });



  try {


    const purchaseId =
      transaction();


    res.status(201).json(
      getPurchase(purchaseId)
    );


  } catch(error) {


    res.status(400).json({

      error:error.message

    });


  }


});





function formatPurchase(purchase, items) {


  return {

    id: purchase.id,

    supplierId: purchase.supplier_id,

    supplierName:
      purchase.supplier_name || "",

    invoiceNumber:
      purchase.invoice_number,

    purchaseDate:
      purchase.purchase_date,

    totalAmount:
      purchase.total_amount,

    status:
      purchase.status,

    notes:
      purchase.notes,

    createdAt:
      purchase.created_at,


    items: items.map(item => ({

      id:item.id,

      itemId:item.item_id,

      itemName:item.item_name,

      qty:item.qty,

      unit:item.unit,

      unitPrice:item.unit_price,

      totalPrice:item.total_price

    }))

  };


}



export { router as purchasesRouter };