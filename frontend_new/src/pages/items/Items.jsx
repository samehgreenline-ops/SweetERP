import { useState, useEffect } from "react";
import {
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";

import ItemToolbar from "../../components/items/ItemToolbar.jsx";
import ItemTable from "../../components/items/ItemTable.jsx";
import ItemDialog from "../../components/items/ItemDialog.jsx";

import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../../services/itemService.js";


function Items() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [editMode, setEditMode] = useState(false);


  const loadItems = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getItems();
      setItems(data);

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadItems();
  }, []);


  const handleAdd = () => {

    setEditMode(false);

    setItem({
      name: "",
      code: "",
      itemType: "",
      baseUnit: "",
      purchasePrice: "",
      salePrice: "",
      trackInventory: true,
      active: true,
      stockQty: "",
      reorderLevel: "",
      notes: "",
    });

    setOpen(true);
  };


  const handleEdit = (selectedItem) => {

    setEditMode(true);

    setItem({
      ...selectedItem,
      purchasePrice: selectedItem.purchasePrice ?? "",
      salePrice: selectedItem.salePrice ?? "",
      stockQty: selectedItem.stockQty ?? "",
      reorderLevel: selectedItem.reorderLevel ?? "",
      notes: selectedItem.notes ?? "",
    });

    setOpen(true);
  };


  const handleDelete = async (id) => {

    if (!window.confirm("هل أنت متأكد من حذف هذا الصنف؟")) return;

    try {

      await deleteItem(id);
      await loadItems();

    } catch (err) {

      setError(err.message);

    }
  };


  const handleSave = async () => {

    try {

      const payload = {
        ...item,

        purchasePrice: Number(item.purchasePrice) || 0,
        salePrice: Number(item.salePrice) || 0,
        stockQty: Number(item.stockQty) || 0,
        reorderLevel: Number(item.reorderLevel) || 0,
      };


      if (editMode) {

        await updateItem(payload);

      } else {

        await addItem(payload);

      }


      setOpen(false);
      await loadItems();


    } catch (err) {

      setError(err.message);

    }

  };


  if (loading) {

    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );

  }


  return (

    <Box sx={{ direction: "rtl" }}>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}


      <ItemToolbar onAdd={handleAdd} />


      <ItemTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />


      <ItemDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        item={item}
        setItem={setItem}
        editMode={editMode}
      />


    </Box>

  );

}


export default Items;