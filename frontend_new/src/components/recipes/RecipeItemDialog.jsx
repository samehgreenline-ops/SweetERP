import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";


function RecipeItemDialog({
  open,
  onClose,
  onSave,
  item,
  setItem,
  materials,
}) {


  const handleChange = (field, value) => {

    setItem({
      ...item,
      [field]: value,
    });

  };


  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        إضافة مكون للوصفة
      </DialogTitle>


      <DialogContent>


        <TextField
          select
          label="المادة"
          fullWidth
          margin="normal"
          value={item.materialId || ""}
          onChange={(e) =>
            handleChange(
              "materialId",
              e.target.value
            )
          }
        >

          {materials.map((material) => (

            <MenuItem
              key={material.id}
              value={material.id}
            >
              {material.name}
            </MenuItem>

          ))}

        </TextField>



        <TextField
          label="الكمية"
          type="number"
          fullWidth
          margin="normal"
          value={item.qty ?? ""}
          inputProps={{
            min: 0,
            step: "0.001",
          }}
          onChange={(e) =>
            handleChange(
              "qty",
              Number(e.target.value)
            )
          }
        />



        <TextField
          select
          label="الوحدة"
          fullWidth
          margin="normal"
          value={item.unit || ""}
          onChange={(e) =>
            handleChange(
              "unit",
              e.target.value
            )
          }
        >

          <MenuItem value="كيلو">
            كيلو
          </MenuItem>

          <MenuItem value="جرام">
            جرام
          </MenuItem>

          <MenuItem value="لتر">
            لتر
          </MenuItem>

          <MenuItem value="مل">
            مل
          </MenuItem>

        </TextField>


      </DialogContent>


      <DialogActions>

        <Button
          onClick={onClose}
        >
          إلغاء
        </Button>


        <Button
          variant="contained"
          onClick={onSave}
        >
          إضافة
        </Button>


      </DialogActions>


    </Dialog>

  );

}


export default RecipeItemDialog;