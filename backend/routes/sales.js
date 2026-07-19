import { Router } from "express";
import db from "../db/database.js";
import { convertQty } from "../utils/units.js";
import { updateStock } from "./items.js";
import { createSaleJournal } from "../utils/accounting.js";

const router = Router();


function getSale(id) {

  const sale = db.prepare(`
    SELECT
      s.*,
      c.name AS customer_name
    FROM sales s
    LEFT JOIN customers c
      ON c.id = s.customer_id
    WHERE s.id = ?
  `).get(id);


  if (!sale) return null;


  const items = db.prepare(`
    SELECT
      si.*,
      i.name AS item_name
    FROM sale_items si
    JOIN items i
      ON i.id = si.item_id
    WHERE si.sale_id = ?
  `).all(id);


  return formatSale(sale, items);

}



router.get("/", (req,res)=>{

  const sales = db.prepare(`
    SELECT id
    FROM sales
    ORDER BY id DESC
  `).all();


  res.json(
    sales.map(s => getSale(s.id))
  );

});





router.post("/", (req,res)=>{


  const {
    customerId,
    invoiceNumber,
    saleDate,
    notes,
    items
  } = req.body;



  const transaction = db.transaction(()=>{


    let totalAmount = 0;



    const preparedItems = (items || []).map((line)=>{


      const item = db.prepare(`
        SELECT *
        FROM items
        WHERE id = ?
      `).get(line.itemId);



      if(!item){

        throw new Error(
          "الصنف غير موجود"
        );

      }



      let unitPrice =
        Number(line.unitPrice);



      if(!unitPrice || unitPrice <= 0){

        unitPrice =
          Number(item.sale_price) || 0;

      }



      const totalPrice =
        Number(line.qty) * unitPrice;



      totalAmount += totalPrice;



      return {
        ...line,
        item,
        unitPrice,
        totalPrice
      };


    });
    const result = db.prepare(`
      INSERT INTO sales
      (
        customer_id,
        invoice_number,
        sale_date,
        total_amount,
        notes
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(

      customerId || null,

      invoiceNumber || "",

      saleDate ||
        new Date()
        .toISOString()
        .slice(0,10),

      totalAmount,

      notes || ""

    );



    const saleId =
      result.lastInsertRowid;




    const insertLine = db.prepare(`
      INSERT INTO sale_items
      (
        sale_id,
        item_id,
        qty,
        unit,
        unit_price,
        total_price
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);



    const updateSalePrice = db.prepare(`
      UPDATE items
      SET sale_price = ?
      WHERE id = ?
    `);




    for(const line of preparedItems){



      insertLine.run(

        saleId,

        line.itemId,

        Number(line.qty),

        line.unit,

        line.unitPrice,

        line.totalPrice

      );



      updateSalePrice.run(

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

        -qtyInBase,

        "OUT",

        "sale",

        saleId,

        `مبيعات - فاتورة #${saleId}`

      );


    }



    createSaleJournal({

      companyId: 1,

      saleId,

      amount: totalAmount,

      date:
        saleDate ||
        new Date()
        .toISOString()
        .slice(0,10),

    });



    return saleId;


  });




  try{


    const saleId =
      transaction();


    res.status(201).json(
      getSale(saleId)
    );


  }catch(error){


    res.status(400).json({

      error:error.message

    });


  }


});
function formatSale(sale,items){


  return {

    id:sale.id,

    customerId:sale.customer_id,

    customerName:
      sale.customer_name || "",


    invoiceNumber:
      sale.invoice_number,


    saleDate:
      sale.sale_date,


    totalAmount:
      sale.total_amount,


    status:
      sale.status,


    notes:
      sale.notes,


    createdAt:
      sale.created_at,


    items:items.map(item=>({


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



export { router as salesRouter };