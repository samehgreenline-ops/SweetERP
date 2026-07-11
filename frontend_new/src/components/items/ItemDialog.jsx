import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import {
  ITEM_TYPES,
  UNITS,
} from "../../services/itemService.js";


function ItemDialog({
  open,
  onClose,
  onSave,
  item,
  setItem,
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
        إضافة صنف جديد
      </DialogTitle>


      <DialogContent>


        <TextField
          label="اسم الصنف"
          fullWidth
          margin="normal"
          value={item.name || ""}
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
        />


        <TextField
          label="كود الصنف"
          fullWidth
          margin="normal"
          value={item.code || ""}
          onChange={(e) =>
            handleChange("code", e.target.value)
          }
        />


        <TextField
          select
          label="نوع الصنف"
          fullWidth
          margin="normal"
          value={item.itemType || ""}
          onChange={(e) =>
            handleChange("itemType", e.target.value)
          }
        >

          {ITEM_TYPES.map((type) => (

            <MenuItem
              key={type.value}
              value={type.value}
            >
              {type.label}
            </MenuItem>

          ))}

        </TextField>


        <TextField
          select
          label="الوحدة الأساسية"
          fullWidth
          margin="normal"
          value={item.baseUnit || ""}
          onChange={(e) =>
            handleChange("baseUnit", e.target.value)
          }
        >

          {UNITS.map((unit) => (

            <MenuItem
              key={unit.value}
              value={unit.value}
            >
              {unit.label}
            </MenuItem>

          ))}

        </TextField>


        <TextField
          label="سعر الشراء"
          type="number"
          fullWidth
          margin="normal"
          value={item.purchasePrice || ""}
          onChange={(e) =>
            handleChange("purchasePrice", e.target.value)
          }
        />


        <TextField
          label="سعر البيع"
          type="number"
          fullWidth
          margin="normal"
          value={item.salePrice || ""}
          onChange={(e) =>
            handleChange("salePrice", e.target.value)
          }
        />


      </DialogContent>


      <DialogActions>

        <Button onClick={onClose}>
          إلغاء
        </Button>


        <Button
          variant="contained"
          onClick={onSave}
        >
          حفظ
        </Button>


      </DialogActions>


    </Dialog>

  );

}


export default ItemDialog;