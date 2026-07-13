import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";

import {
  ITEM_TYPES,
  UNITS,
} from "../../utils/constants.js";


function ItemDialog({
  open,
  onClose,
  onSave,
  item,
  setItem,
  editMode,
}) {

  const handleChange = (field, value) => {
    setItem({ ...item, [field]: value });
  };


  return (

    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

      <DialogTitle>
        {editMode ? "تعديل صنف" : "إضافة صنف جديد"}
      </DialogTitle>


      <DialogContent>

        <TextField
          label="اسم الصنف"
          fullWidth
          margin="normal"
          value={item.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />


        <TextField
          label="كود الصنف"
          fullWidth
          margin="normal"
          value={item.code || ""}
          onChange={(e) => handleChange("code", e.target.value)}
        />


        <TextField
          select
          label="نوع الصنف"
          fullWidth
          margin="normal"
          value={item.itemType || ""}
          onChange={(e) => handleChange("itemType", e.target.value)}
        >

          {ITEM_TYPES.map((type) => (
            <MenuItem key={type.value} value={type.value}>
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
          onChange={(e) => handleChange("baseUnit", e.target.value)}
        >

          {UNITS.map((unit) => (
            <MenuItem key={unit.value} value={unit.value}>
              {unit.label}
            </MenuItem>
          ))}

        </TextField>


        <TextField
          label="سعر الشراء"
          type="number"
          fullWidth
          margin="normal"
          value={item.purchasePrice ?? ""}
          onChange={(e) => handleChange("purchasePrice", e.target.value)}
        />


        <TextField
          label="سعر البيع"
          type="number"
          fullWidth
          margin="normal"
          value={item.salePrice ?? ""}
          onChange={(e) => handleChange("salePrice", e.target.value)}
        />


        <TextField
          label="الرصيد الافتتاحي"
          type="number"
          fullWidth
          margin="normal"
          value={item.stockQty ?? ""}
          onChange={(e) => handleChange("stockQty", e.target.value)}
        />


        <TextField
          label="حد إعادة الطلب"
          type="number"
          fullWidth
          margin="normal"
          value={item.reorderLevel ?? ""}
          onChange={(e) => handleChange("reorderLevel", e.target.value)}
        />


        <TextField
          label="ملاحظات"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={item.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
        />


        <FormControlLabel
          control={
            <Switch
              checked={item.trackInventory !== false}
              onChange={(e) =>
                handleChange("trackInventory", e.target.checked)
              }
            />
          }
          label="تتبع المخزون"
        />

      </DialogContent>


      <DialogActions>

        <Button onClick={onClose}>
          إلغاء
        </Button>

        <Button variant="contained" onClick={onSave}>
          حفظ
        </Button>

      </DialogActions>


    </Dialog>

  );

}


export default ItemDialog;