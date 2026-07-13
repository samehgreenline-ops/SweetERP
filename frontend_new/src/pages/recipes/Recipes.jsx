import { useState } from "react";

import { Box, Button } from "@mui/material";


import RecipeHeader from "../../components/recipes/RecipeHeader.jsx";
import RecipeItemsTable from "../../components/recipes/RecipeItemsTable.jsx";
import RecipeItemDialog from "../../components/recipes/RecipeItemDialog.jsx";
import RecipeSummary from "../../components/recipes/RecipeSummary.jsx";


import {
  getItems,
} from "../../services/itemService.js";


import {
  addRecipe,
} from "../../services/recipeService.js";



function Recipes() {


  const allItems = getItems();


  const products = allItems.filter(
    item =>
      item.itemType === "FINISHED_PRODUCT"
  );


  const materials = allItems.filter(
    item =>
      item.itemType === "RAW_MATERIAL" ||
      item.itemType === "SEMI_FINISHED"
  );



  const [recipe, setRecipe] = useState({

    productId: "",
    outputQty: "",
    outputUnit: "",

  });



  const [items, setItems] = useState([]);



  const [open, setOpen] = useState(false);



  const [item, setItem] = useState({});



  const handleAddItem = () => {

    setItem({

      materialId: "",
      qty: 0,
      unit: "",
      cost: 0,

    });


    setOpen(true);

  };



  const handleSaveItem = () => {


    const material =
      materials.find(
        m => m.id === item.materialId
      );


    const newItem = {

      id: Date.now(),

      name: material
        ? material.name
        : "",

      qty: Number(item.qty),

      unit: item.unit,

      cost: material
        ? Number(material.purchasePrice || 0)
        : 0,

    };


    setItems([
      ...items,
      newItem,
    ]);


    setOpen(false);


  };



  const handleSaveRecipe = () => {


    const newRecipe = {

      ...recipe,

      outputQty: Number(recipe.outputQty),

      items,

    };


    addRecipe(newRecipe);


    alert("تم حفظ الوصفة بنجاح");


  };



  return (

    <Box
      sx={{
        direction: "rtl",
      }}
    >


      <RecipeHeader

        recipe={recipe}

        setRecipe={setRecipe}

        products={products}

      />


      <Button
        variant="contained"
        onClick={handleAddItem}
        sx={{
          marginBottom: 2,
          marginLeft: 2,
        }}
      >
        إضافة مكون
      </Button>



      <Button
        variant="contained"
        color="success"
        onClick={handleSaveRecipe}
        sx={{
          marginBottom: 2,
        }}
      >
        حفظ الوصفة
      </Button>



      <RecipeItemsTable

        items={items}

      />



      <RecipeSummary

        items={items}

        outputQty={recipe.outputQty}

      />



      <RecipeItemDialog

        open={open}

        onClose={() =>
          setOpen(false)
        }

        onSave={handleSaveItem}

        item={item}

        setItem={setItem}

        materials={materials}

      />


    </Box>

  );

}


export default Recipes;