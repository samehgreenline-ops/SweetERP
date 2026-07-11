import {
  Box,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";


function RecipeHeader({
  recipe,
  setRecipe,
  products,
}) {

  return (

    <Box
      sx={{
        direction: "rtl",
        marginBottom: 3,
      }}
    >

      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        بيانات الوصفة
      </Typography>


      <TextField
        select
        label="الصنف الناتج"
        fullWidth
        margin="normal"
        value={recipe.productId || ""}
        onChange={(e) =>
          setRecipe({
            ...recipe,
            productId: e.target.value,
          })
        }
      >

        {products.map((product) => (

          <MenuItem
            key={product.id}
            value={product.id}
          >
            {product.name}
          </MenuItem>

        ))}

      </TextField>


      <TextField
        label="كمية الإنتاج"
        type="number"
        fullWidth
        margin="normal"
        value={recipe.outputQty ?? ""}
        onChange={(e) =>
          setRecipe({
            ...recipe,
            outputQty: e.target.value,
          })
        }
      />


      <TextField
        label="وحدة الإنتاج"
        fullWidth
        margin="normal"
        value={recipe.outputUnit || ""}
        onChange={(e) =>
          setRecipe({
            ...recipe,
            outputUnit: e.target.value,
          })
        }
      />


    </Box>

  );

}


export default RecipeHeader;