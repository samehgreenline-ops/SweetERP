import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import RecipeHeader from "../../components/recipes/RecipeHeader.jsx";
import RecipeItemsTable from "../../components/recipes/RecipeItemsTable.jsx";
import RecipeItemDialog from "../../components/recipes/RecipeItemDialog.jsx";
import RecipeSummary from "../../components/recipes/RecipeSummary.jsx";

import { apiGet } from "../../services/api.js";
import { addRecipe, getRecipe } from "../../services/recipeService.js";


function Recipes() {


  const [allItems, setAllItems] = useState([]);

  const [products, setProducts] = useState([]);

  const [materials, setMaterials] = useState([]);

  const [recipes, setRecipes] = useState([]);

  const [loadOpen, setLoadOpen] = useState(false);


  const [recipe, setRecipe] = useState({
    productId: "",
    outputQty: "",
    outputUnit: "",
  });


  const [items, setItems] = useState([]);

  const [open, setOpen] = useState(false);


  const [item, setItem] = useState({
    materialId: "",
    qty: 0,
    unit: "",
  });



  useEffect(() => {


    async function loadData() {

      try {

        const data = await apiGet("/items");

        setAllItems(data);


        setProducts(
          data.filter(
            item => item.itemType === "FINISHED_PRODUCT"
          )
        );


        setMaterials(
          data.filter(
            item =>
              item.itemType === "RAW_MATERIAL" ||
              item.itemType === "SEMI_FINISHED"
          )
        );


        const recipesData = await apiGet("/recipes");

        setRecipes(recipesData);


      } catch (error) {

        alert(error.message);

      }

    }


    loadData();


  }, []);





  const handleAddItem = () => {

    setItem({
      materialId: "",
      qty: 0,
      unit: "",
    });


    setOpen(true);

  };





  const handleSaveItem = () => {


    const material =
      materials.find(
        m => m.id === Number(item.materialId)
      );


    if (!material) {

      alert("اختر المادة أولاً");
      return;

    }


    const newItem = {

      id: Date.now(),

      materialId: material.id,

      name: material.name,

      qty: Number(item.qty),

      unit: item.unit || material.baseUnit,

      cost: Number(material.purchasePrice || 0),

    };


    setItems([
      ...items,
      newItem,
    ]);


    setOpen(false);


  };





  const handleSaveRecipe = async () => {


    try {


      const data = await addRecipe({

        ...recipe,

        productId: Number(recipe.productId),

        outputQty: Number(recipe.outputQty),

        items,

      });



      alert(
        `تم حفظ الوصفة بنجاح - التكلفة ${data.totalCost.toFixed(2)} جنيه`
      );


      setItems([]);


      const recipesData = await apiGet("/recipes");

      setRecipes(recipesData);



    } catch (error) {


      alert(error.message);


    }


  };


const handleLoadRecipe = async (recipeId) => {

  try {

    const data = await getRecipe(recipeId);

    setRecipe({
      id: data.id,
      productId: data.productId,
      outputQty: data.outputQty,
      outputUnit: data.outputUnit,
    });

    setItems(
      data.items.map((item) => ({
        id: item.id,
        materialId: item.materialId,
        name: item.name,
        qty: Number(item.qty),
        unit: item.unit,
        cost: Number(item.cost || 0),
      }))
    );

    setLoadOpen(false);

  } catch (error) {

    alert(error.message);

  }

};


  return (

    <Box
      sx={{
        direction:"rtl",
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
          marginBottom:2,
          marginLeft:2,
        }}
      >
        إضافة مكون
      </Button>



      <Button
        variant="contained"
        color="primary"
        onClick={() => setLoadOpen(true)}
        sx={{
          marginBottom:2,
          marginLeft:2,
        }}
      >
        تحميل وصفة موجودة
      </Button>



      <Button
        variant="contained"
        color="success"
        onClick={handleSaveRecipe}
        sx={{
          marginBottom:2,
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

        onClose={() => setOpen(false)}

        onSave={handleSaveItem}

        item={item}

        setItem={setItem}

        materials={materials}

      />





      <Dialog

        open={loadOpen}

        onClose={() => setLoadOpen(false)}

      >


        <DialogTitle>
          تحميل وصفة موجودة
        </DialogTitle>



        <DialogContent>


          <List>


            {recipes.map((r) => (


              <ListItem
                key={r.id}
                disablePadding
              >


                <ListItemButton
  onClick={() => handleLoadRecipe(r.id)}
>


                  <ListItemText

                    primary={r.productName}

                    secondary={
                      `تكلفة الوصفة: ${r.totalCost} جنيه`
                    }

                  />


                </ListItemButton>


              </ListItem>


            ))}


          </List>


        </DialogContent>



        <DialogActions>


          <Button
            onClick={() => setLoadOpen(false)}
          >
            إغلاق
          </Button>


        </DialogActions>



      </Dialog>



    </Box>

  );


}


export default Recipes;