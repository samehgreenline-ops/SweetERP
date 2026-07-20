import { Router } from "express";
import db from "../db/database.js";
import { convertQty } from "../utils/units.js";

const router = Router();


// تقرير تكلفة منتج حسب الوصفة
router.get("/product/:id", (req, res) => {

  try {

    const productId = Number(req.params.id);


    const product = db.prepare(`
      SELECT
        id,
        name,
        code,
        base_unit
      FROM items
      WHERE id = ?
    `).get(productId);



    if (!product) {
      return res.status(404).json({
        error: "المنتج غير موجود"
      });
    }



    const recipe = db.prepare(`
      SELECT *
      FROM recipes
      WHERE product_id = ?
      ORDER BY id DESC
      LIMIT 1
    `).get(productId);



    if (!recipe) {

      return res.status(404).json({
        error: "لا توجد وصفة لهذا المنتج"
      });

    }



    const materials = db.prepare(`
      SELECT

        ri.material_id,
        ri.qty,
        ri.unit,

        i.name,
        i.code,
        i.base_unit,
        i.purchase_price

      FROM recipe_items ri

      JOIN items i

        ON i.id = ri.material_id

      WHERE ri.recipe_id = ?

    `).all(recipe.id);



    let totalCost = 0;



    const details = materials.map(item => {


      const qtyInBase = convertQty(
        Number(item.qty),
        item.unit,
        item.base_unit
      );


      const cost =
        qtyInBase *
        Number(item.purchase_price || 0);



      totalCost += cost;



      return {

        materialId:item.material_id,

        name:item.name,

        code:item.code,

        quantity:item.qty,

        unit:item.unit,

        baseQuantity:qtyInBase,

        baseUnit:item.base_unit,

        purchasePrice:item.purchase_price,

        cost

      };


    });



    const outputQty =
      Number(recipe.output_qty) || 1;



    res.json({

      product:{
        id:product.id,
        name:product.name,
        code:product.code
      },


      recipeId:recipe.id,


      outputQty,

      outputUnit:recipe.output_unit,


      materials:details,


      totalCost,


      unitCost:
        totalCost / outputQty


    });



  } catch(error) {


    console.error(error);


    res.status(500).json({

      error:error.message

    });


  }


});



export { router as costingRouter };