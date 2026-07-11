import { useState } from "react";

import { Box } from "@mui/material";

import ItemToolbar from "../../components/items/ItemToolbar.jsx";
import ItemTable from "../../components/items/ItemTable.jsx";
import ItemDialog from "../../components/items/ItemDialog.jsx";

import {
  getItems,
  addItem,
} from "../../services/itemService.js";


function Items() {


  const [items, setItems] = useState(
    getItems()
  );


  const [open, setOpen] = useState(false);


  const [item, setItem] = useState({});


  const handleAdd = () => {

    setItem({
      name: "",
      code: "",
      itemType: "",
      baseUnit: "",
    });

    setOpen(true);

  };


  const handleSave = () => {

    const newItem = addItem(item);

    setItems([
      ...items,
      newItem,
    ]);

    setOpen(false);

  };


  return (

    <Box
      sx={{
        direction: "rtl",
      }}
    >

      <ItemToolbar
        onAdd={handleAdd}
      />


      <ItemTable
        items={items}
      />


      <ItemDialog

        open={open}

        onClose={() =>
          setOpen(false)
        }

        onSave={handleSave}

        item={item}

        setItem={setItem}

      />


    </Box>

  );

}


export default Items;