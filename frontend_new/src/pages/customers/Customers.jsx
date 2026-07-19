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


function Customers() {

  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });



  function loadCustomers() {

    fetch("/api/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));

  }



  useEffect(() => {

    loadCustomers();

  }, []);




  function addCustomer() {

    fetch("/api/customers", {

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

      loadCustomers();

    });

  }



  return (

    <Paper sx={{ p: 3 }}>


      <Typography variant="h5" sx={{ mb: 3 }}>
        العملاء
      </Typography>



      <Box sx={{ display:"flex", gap:2, mb:3 }}>


        <TextField

          label="اسم العميل"

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

          onClick={addCustomer}

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


          {customers.map((c)=>(

            <TableRow key={c.id}>


              <TableCell>
                {c.name}
              </TableCell>


              <TableCell>
                {c.phone}
              </TableCell>


              <TableCell>
                {c.address}
              </TableCell>


            </TableRow>

          ))}


        </TableBody>


      </Table>


    </Paper>

  );

}


export default Customers;