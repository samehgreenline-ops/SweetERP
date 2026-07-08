import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

function ProductDialog({ open, onClose, onSave }) {
  const emptyProduct = {
    code: "",
    name: "",
    category: "",
    cost: "",
    price: "",
  };

  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    if (open) {
      setProduct(emptyProduct);
    }
  }, [open]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!product.code || !product.name) {
      alert("برجاء إدخال الكود واسم الصنف");
      return;
    }

    onSave({
      ...product,
      id: Date.now(),
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>

      <DialogTitle>إضافة صنف جديد</DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="الكود"
              name="code"
              value={product.code}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="اسم الصنف"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="الفئة"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="التكلفة"
              name="cost"
              value={product.cost}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="سعر البيع"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          إلغاء
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          حفظ
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default ProductDialog;