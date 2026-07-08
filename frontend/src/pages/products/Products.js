import { useEffect, useMemo, useState } from "react";

import { Box, Typography } from "@mui/material";

import ProductToolbar from "../../components/products/ProductToolbar";
import ProductTable from "../../components/products/ProductTable";
import ProductDialog from "../../components/products/ProductDialog";

import {
  getProducts,
  saveProducts,
} from "../../services/productService";


function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    const savedProducts = getProducts();
    setProducts(savedProducts);
  }, []);


  useEffect(() => {
    saveProducts(products);
  }, [products]);


  const handleSaveProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      product
    ]);
  };


  const filteredProducts = useMemo(() => {

    return products.filter((item) => {

      const value =
        `${item.code || ""} ${item.name || ""} ${item.category || ""}`
        .toLowerCase();

      return value.includes(search.toLowerCase());

    });

  }, [products, search]);


  return (

    <Box sx={{ direction: "rtl", p: 2 }}>

      <Typography variant="h4" sx={{ mb: 3 }}>
        📦 إدارة الأصناف
      </Typography>


      <ProductToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setOpenDialog(true)}
      />


      <ProductTable
        products={filteredProducts}
      />


      <ProductDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveProduct}
      />


    </Box>

  );

}


export default Products;