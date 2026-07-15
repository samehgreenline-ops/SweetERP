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
  Alert,
} from "@mui/material";

import { apiGet } from "../../services/api.js";

import {
  getProductionOrders,
  createProductionOrder,
  completeProductionOrder,
  deleteProductionOrder,
} from "../../services/productionService.js";


function Production() {

  const [orders, setOrders] = useState([]);

  const [recipes, setRecipes] = useState([]);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    recipeId: "",
    plannedQty: "",
    notes: "",
  });


  const loadData = async () => {

    try {

      setError("");

      const ordersData = await getProductionOrders();
      setOrders(ordersData);


      const recipesData = await apiGet("/recipes");
      setRecipes(recipesData);


    } catch(err){

      setError(err.message);

    }

  };


  useEffect(() => {
    loadData();
  }, []);



  const handleCreate = async () => {

    try {

      await createProductionOrder({

        recipeId: Number(form.recipeId),

        plannedQty: Number(form.plannedQty),

        notes: form.notes,

      });


      setForm({
        recipeId:"",
        plannedQty:"",
        notes:"",
      });


      await loadData();


    }catch(err){

      setError(err.message);

    }

  };



  const handleComplete = async(id)=>{

    try{

      await completeProductionOrder(id);

      await loadData();

    }catch(err){

      setError(err.message);

    }

  };



  const handleDelete = async(id)=>{

    if(!window.confirm("حذف أمر الإنتاج؟")) return;


    try{

      await deleteProductionOrder(id);

      await loadData();

    }catch(err){

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



      <Paper sx={{p:2,mb:2}}>


        <TextField

          select

          label="الوصفة"

          value={form.recipeId}

          onChange={(e)=>
            setForm({
              ...form,
              recipeId:e.target.value
            })
          }

          sx={{m:1,minWidth:200}}

        >

          {recipes.map(r=>(

            <MenuItem
              key={r.id}
              value={r.id}
            >

              {r.productName}

            </MenuItem>

          ))}


        </TextField>



        <TextField

          label="الكمية"

          type="number"

          value={form.plannedQty}

          onChange={(e)=>
            setForm({
              ...form,
              plannedQty:e.target.value
            })
          }

          sx={{m:1}}

        />



        <TextField

          label="ملاحظات"

          value={form.notes}

          onChange={(e)=>
            setForm({
              ...form,
              notes:e.target.value
            })
          }

          sx={{m:1}}

        />



        <Button

          variant="contained"

          onClick={handleCreate}

          sx={{m:1}}

        >

          إنشاء أمر إنتاج

        </Button>


      </Paper>



      <TableContainer component={Paper}>


        <Table>


          <TableHead>

            <TableRow>

              <TableCell>المنتج</TableCell>
              <TableCell>الكمية</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>الإجراءات</TableCell>

            </TableRow>

          </TableHead>


          <TableBody>


            {orders.map(order=>(


              <TableRow key={order.id}>


                <TableCell>
                  {order.productName}
                </TableCell>


                <TableCell>
                  {order.plannedQty}
                </TableCell>


                <TableCell>
                  {order.status}
                </TableCell>


                <TableCell>


                  {order.status !== "COMPLETED" && (

                    <Button
                      color="success"
                      onClick={()=>
                        handleComplete(order.id)
                      }
                    >
                      تنفيذ
                    </Button>

                  )}



                  <Button
                    color="error"
                    onClick={()=>
                      handleDelete(order.id)
                    }
                  >
                    حذف
                  </Button>


                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>


    </Box>

  );

}


export default Production;