import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";


function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });



  function loadSuppliers() {

    fetch("/api/suppliers")
      .then(res => res.json())
      .then(data => setSuppliers(data));

  }



  useEffect(() => {

    loadSuppliers();

  }, []);




  function addSupplier() {

    fetch("/api/suppliers", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),

    })
    .then(res => res.json())
    .then(() => {

      setForm({
        name: "",
        phone: "",
        address: "",
      });

      loadSuppliers();

    });

  }



  return (

    <Paper sx={{ p: 3 }}>


      <Typography variant="h5" sx={{ mb: 3 }}>
        الموردون
      </Typography>



      <Box sx={{ display:"flex", gap:2, mb:3 }}>


        <TextField

          label="اسم المورد"

          value={form.name}

          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }

        />


        <TextField

          label="الهاتف"

          value={form.phone}

          onChange={(e)=>
            setForm({
              ...form,
              phone:e.target.value
            })
          }

        />


        <TextField

          label="العنوان"

          value={form.address}

          onChange={(e)=>
            setForm({
              ...form,
              address:e.target.value
            })
          }

        />


        <Button

          variant="contained"

          onClick={addSupplier}

        >
          إضافة
        </Button>


      </Box>




      <Table>


        <TableHead>

          <TableRow>

            <TableCell>الاسم</TableCell>
            <TableCell>الهاتف</TableCell>
            <TableCell>العنوان</TableCell>

          </TableRow>

        </TableHead>



        <TableBody>


          {suppliers.map((s)=>(

            <TableRow key={s.id}>

              <TableCell>{s.name}</TableCell>

              <TableCell>{s.phone}</TableCell>

              <TableCell>{s.address}</TableCell>

            </TableRow>

          ))}


        </TableBody>


      </Table>


    </Paper>

  );

}


export default Suppliers;