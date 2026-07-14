import { Router } from "express";
import db from "../db/database.js";
import { convertQty } from "../utils/units.js";

const router = Router();


function getRecipeWithItems(id) {

  const recipe = db.prepare(
    "SELECT * FROM recipes WHERE id = ?"
  ).get(id);


  if (!recipe) return null;


  const items = db.prepare(`
    SELECT 
      ri.*, 
      i.name as material_name, 
      i.purchase_price,
      i.base_unit
    FROM recipe_items ri
    JOIN items i ON i.id = ri.material_id
    WHERE ri.recipe_id = ?
  `).all(id);



  const product = db.prepare(
    "SELECT name FROM items WHERE id = ?"
  ).get(recipe.product_id);



  return formatRecipe(recipe, items, product?.name);

}



router.get("/", (req, res) => {

  const recipes = db.prepare(
    "SELECT id FROM recipes ORDER BY id DESC"
  ).all();


  res.json(
    recipes.map((r) => getRecipeWithItems(r.id))
  );

});



router.get("/:id", (req, res) => {

  const recipe = getRecipeWithItems(req.params.id);


  if (!recipe) {
    return res.status(404).json({
      error: "الوصفة غير موجودة"
    });
  }


  res.json(recipe);

});



router.post("/", (req, res) => {

  const {
    productId,
    outputQty,
    outputUnit,
    notes,
    items
  } = req.body;



  const insertRecipe = db.prepare(`
    INSERT INTO recipes
    (product_id, output_qty, output_unit, notes)
    VALUES (?, ?, ?, ?)
  `);



  const insertItem = db.prepare(`
    INSERT INTO recipe_items
    (recipe_id, material_id, qty, unit)
    VALUES (?, ?, ?, ?)
  `);



  const transaction = db.transaction(() => {


    const result = insertRecipe.run(
      productId,
      Number(outputQty) || 1,
      outputUnit || "",
      notes || ""
    );


    const recipeId = result.lastInsertRowid;



    for (const item of items || []) {

      insertItem.run(
        recipeId,
        item.materialId,
        Number(item.qty),
        item.unit
      );

    }


    return recipeId;

  });



  const recipeId = transaction();


  res.status(201).json(
    getRecipeWithItems(recipeId)
  );

});




router.put("/:id", (req, res) => {


  const existing = db.prepare(
    "SELECT * FROM recipes WHERE id = ?"
  ).get(req.params.id);



  if (!existing) {

    return res.status(404).json({
      error: "الوصفة غير موجودة"
    });

  }



  const {
    productId,
    outputQty,
    outputUnit,
    notes,
    items
  } = req.body;




  const transaction = db.transaction(() => {


    db.prepare(`
      UPDATE recipes
      SET product_id = ?,
          output_qty = ?,
          output_unit = ?,
          notes = ?
      WHERE id = ?
    `).run(

      productId ?? existing.product_id,

      outputQty !== undefined
        ? Number(outputQty)
        : existing.output_qty,

      outputUnit ?? existing.output_unit,

      notes ?? existing.notes,

      req.params.id

    );




    db.prepare(
      "DELETE FROM recipe_items WHERE recipe_id = ?"
    ).run(req.params.id);




    const insertItem = db.prepare(`
      INSERT INTO recipe_items
      (recipe_id, material_id, qty, unit)
      VALUES (?, ?, ?, ?)
    `);




    for (const item of items || []) {

      insertItem.run(
        req.params.id,
        item.materialId,
        Number(item.qty),
        item.unit
      );

    }


  });



  transaction();


  res.json(
    getRecipeWithItems(req.params.id)
  );


});





router.delete("/:id", (req, res) => {


  const existing = db.prepare(
    "SELECT * FROM recipes WHERE id = ?"
  ).get(req.params.id);



  if (!existing) {

    return res.status(404).json({
      error: "الوصفة غير موجودة"
    });

  }



  db.prepare(
    "DELETE FROM recipes WHERE id = ?"
  ).run(req.params.id);



  res.json({
    success: true
  });


});







function formatRecipe(recipe, items, productName) {


  const totalCost = items.reduce((sum, item) => {



    const fromUnit = String(
      item.unit || ""
    ).trim();



    const toUnit = String(
      item.base_unit || ""
    ).trim();




    const qtyInBase = convertQty(

      Number(item.qty),

      fromUnit,

      toUnit

    );




    console.log(
      "RECIPE COST DEBUG:",
      item.name,
      "qty:",
      item.qty,
      "from:",
      fromUnit,
      "to:",
      toUnit,
      "converted:",
      qtyInBase,
      "price:",
      item.purchase_price
    );




    return sum +
      Number(qtyInBase) *
      Number(item.purchase_price || 0);



  }, 0);





  const outputQty =
    Number(recipe.output_qty) || 1;



  const unitCost =
    outputQty > 0
      ? totalCost / outputQty
      : 0;





  return {

    id: recipe.id,

    productId: recipe.product_id,

    productName: productName || "",

    outputQty: recipe.output_qty,

    outputUnit: recipe.output_unit,

    notes: recipe.notes,

    totalCost,

    unitCost,

    createdAt: recipe.created_at,



    items: items.map((item) => ({

      id: item.id,

      materialId: item.material_id,

      name: item.material_name,

      qty: item.qty,

      unit: item.unit,

      cost: item.purchase_price

    }))


  };


}




export { router as recipesRouter };