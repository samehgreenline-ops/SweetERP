import { useEffect, useState } from "react";

import {
  Box,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert,
} from "@mui/material";


import {
  getSuppliers,
  getPurchases,
  addPurchase,
} from "../../services/purchaseService.js";


import { getItems } from "../../services/itemService.js";



function Purchases() {


  const [suppliers, setSuppliers] = useState([]);

  const [items, setItems] = useState([]);

  const [purchases, setPurchases] = useState([]);

  const [lines, setLines] = useState([]);


  const [supplierId, setSupplierId] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [notes, setNotes] = useState("");

  const [selectedItem, setSelectedItem] = useState("");

  const [qty, setQty] = useState("");

  const [unitPrice, setUnitPrice] = useState("");

  const [error, setError] = useState("");



  const loadData = async () => {

    try {

      setSuppliers(await getSuppliers());

      setItems(await getItems());

      setPurchases(await getPurchases());


    } catch(err) {

      setError(err.message);

    }

  };



  useEffect(() => {

    loadData();

  }, []);



  const addLine = () => {


    const item = items.find(
      x => x.id === Number(selectedItem)
    );


    if(!item){

      setError("اختر الصنف");

      return;

    }


    setLines([
      ...lines,
      {
        itemId:item.id,
        itemName:item.name,
        qty:Number(qty),
        unit:item.baseUnit,
        unitPrice:Number(unitPrice),
      }
    ]);


    setSelectedItem("");

    setQty("");

    setUnitPrice("");

  };



  const savePurchase = async () => {


    try {


      await addPurchase({

        supplierId:Number(supplierId) || null,

        invoiceNumber,

        notes,

        items:lines,

      });


      setLines([]);

      setInvoiceNumber("");

      setNotes("");

      await loadData();


      alert("تم حفظ فاتورة الشراء");


    } catch(err){

      setError(err.message);

    }

  };



  return (

    <Box sx={{direction:"rtl"}}>


      {error && (

        <Alert
          severity="error"
          onClose={()=>setError("")}
          sx={{mb:2}}
        >
          {error}
        </Alert>

      )}



      <Typography variant="h5" sx={{mb:2}}>

        المشتريات

      </Typography>



      <TextField

        select

        label="المورد"

        value={supplierId}

        onChange={(e)=>setSupplierId(e.target.value)}

        sx={{m:1,width:250}}

      >

        {suppliers.map(s=>(

          <MenuItem key={s.id} value={s.id}>

            {s.name}

          </MenuItem>

        ))}

      </TextField>



      <TextField

        label="رقم الفاتورة"

        value={invoiceNumber}

        onChange={(e)=>setInvoiceNumber(e.target.value)}

        sx={{m:1}}

      />



      <br />


      <TextField

        select

        label="الصنف"

        value={selectedItem}

        onChange={(e)=>setSelectedItem(e.target.value)}

        sx={{m:1,width:250}}

      >

        {items.map(i=>(

          <MenuItem key={i.id} value={i.id}>

            {i.name}

          </MenuItem>

        ))}


      </TextField>



      <TextField

        label="الكمية"

        type="number"

        value={qty}

        onChange={(e)=>setQty(e.target.value)}

        sx={{m:1,width:120}}

      />



      <TextField

        label="سعر الوحدة"

        type="number"

        value={unitPrice}

        onChange={(e)=>setUnitPrice(e.target.value)}

        sx={{m:1,width:150}}

      />



      <Button

        variant="contained"

        onClick={addLine}

        sx={{m:1}}

      >

        إضافة

      </Button>



      <TableContainer component={Paper} sx={{mt:2}}>

        <Table>


          <TableHead>

            <TableRow>

              <TableCell>الصنف</TableCell>

              <TableCell>الكمية</TableCell>

              <TableCell>الوحدة</TableCell>

              <TableCell>السعر</TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {lines.map((l,index)=>(

              <TableRow key={index}>

                <TableCell>{l.itemName}</TableCell>

                <TableCell>{l.qty}</TableCell>

                <TableCell>{l.unit}</TableCell>

                <TableCell>{l.unitPrice}</TableCell>

              </TableRow>

            ))}


          </TableBody>


        </Table>

      </TableContainer>



      <Button

        variant="contained"

        color="success"

        onClick={savePurchase}

        sx={{mt:2}}

      >

        حفظ الفاتورة

      </Button>



      <Typography variant="h6" sx={{mt:4}}>

        الفواتير السابقة

      </Typography>


      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>رقم</TableCell>

              <TableCell>المورد</TableCell>

              <TableCell>الإجمالي</TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {purchases.map(p=>(

              <TableRow key={p.id}>

                <TableCell>{p.id}</TableCell>

                <TableCell>{p.supplierName}</TableCell>

                <TableCell>{p.totalAmount}</TableCell>

              </TableRow>

            ))}

          </TableBody>


        </Table>

      </TableContainer>


    </Box>

  );

}


export default Purchases;