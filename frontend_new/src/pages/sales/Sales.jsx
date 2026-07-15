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
  getCustomers,
  getSales,
  addSale,
} from "../../services/saleService.js";


import { getItems } from "../../services/itemService.js";



function Sales() {


  const [customers, setCustomers] = useState([]);

  const [items, setItems] = useState([]);

  const [sales, setSales] = useState([]);

  const [lines, setLines] = useState([]);


  const [customerId, setCustomerId] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [notes, setNotes] = useState("");

  const [selectedItem, setSelectedItem] = useState("");

  const [qty, setQty] = useState("");

  const [unitPrice, setUnitPrice] = useState("");

  const [error, setError] = useState("");



  const loadData = async () => {

    try {

      setCustomers(await getCustomers());

      setItems(
        (await getItems())
          .filter(
            item => item.itemType === "FINISHED_PRODUCT"
          )
      );

      setSales(await getSales());


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

      setError("اختر المنتج");

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



  const saveSale = async () => {


    try {


      await addSale({

        customerId:Number(customerId) || null,

        invoiceNumber,

        notes,

        items:lines,

      });


      setLines([]);

      setInvoiceNumber("");

      setNotes("");

      await loadData();


      alert("تم حفظ فاتورة البيع");


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

        المبيعات

      </Typography>



      <TextField

        select

        label="العميل"

        value={customerId}

        onChange={(e)=>setCustomerId(e.target.value)}

        sx={{m:1,width:250}}

      >

        {customers.map(c=>(

          <MenuItem key={c.id} value={c.id}>

            {c.name}

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

        label="المنتج"

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

        label="سعر البيع"

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

              <TableCell>المنتج</TableCell>

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

        onClick={saveSale}

        sx={{mt:2}}

      >

        حفظ الفاتورة

      </Button>



      <Typography variant="h6" sx={{mt:4}}>

        فواتير البيع السابقة

      </Typography>


      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>رقم</TableCell>

              <TableCell>العميل</TableCell>

              <TableCell>الإجمالي</TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {sales.map(s=>(

              <TableRow key={s.id}>

                <TableCell>{s.id}</TableCell>

                <TableCell>{s.customerName}</TableCell>

                <TableCell>{s.totalAmount}</TableCell>

              </TableRow>

            ))}

          </TableBody>


        </Table>

      </TableContainer>


    </Box>

  );

}


export default Sales;