import { useEffect, useState } from "react";

import {
  Box,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";


import {
  getInventory,
  getMovements,
} from "../../services/inventoryService.js";



function Inventory() {


  const [items, setItems] = useState([]);

  const [movements, setMovements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  const loadData = async () => {

    try {

      setLoading(true);

      setError("");

      const inventoryData = await getInventory();

      const movementsData = await getMovements();


      setItems(inventoryData);

      setMovements(movementsData);


    } catch(err) {

      setError(err.message);


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    loadData();

  }, []);



  if (loading) {

    return (

      <Box sx={{display:"flex",justifyContent:"center",p:4}}>

        <CircularProgress />

      </Box>

    );

  }



  return (

    <Box sx={{direction:"rtl"}}>


      {error && (

        <Alert
          severity="error"
          sx={{mb:2}}
          onClose={()=>setError("")}
        >
          {error}
        </Alert>

      )}



      <Typography variant="h5" sx={{mb:2}}>

        رصيد المخزون

      </Typography>



      <TableContainer component={Paper} sx={{mb:4}}>


        <Table>


          <TableHead>

            <TableRow>

              <TableCell>الصنف</TableCell>

              <TableCell>الكود</TableCell>

              <TableCell>النوع</TableCell>

              <TableCell>الوحدة</TableCell>

              <TableCell>الرصيد</TableCell>


            </TableRow>

          </TableHead>


          <TableBody>


            {items.map(item=>(


              <TableRow key={item.id}>


                <TableCell>
                  {item.name}
                </TableCell>


                <TableCell>
                  {item.code}
                </TableCell>


                <TableCell>
                  {item.itemType}
                </TableCell>


                <TableCell>
                  {item.baseUnit}
                </TableCell>


                <TableCell>
                  {item.stockQty}
                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>




      <Typography variant="h5" sx={{mb:2}}>

        حركة المخزون

      </Typography>



      <TableContainer component={Paper}>


        <Table>


          <TableHead>

            <TableRow>

              <TableCell>الصنف</TableCell>

              <TableCell>الحركة</TableCell>

              <TableCell>الكمية</TableCell>

              <TableCell>الوحدة</TableCell>

              <TableCell>المرجع</TableCell>

              <TableCell>التاريخ</TableCell>


            </TableRow>


          </TableHead>



          <TableBody>


            {movements.map(m=>(


              <TableRow key={m.id}>


                <TableCell>
                  {m.itemName}
                </TableCell>


                <TableCell>
                  {m.movementType}
                </TableCell>


                <TableCell>
                  {m.qty}
                </TableCell>


                <TableCell>
                  {m.unit}
                </TableCell>


                <TableCell>
                  {m.referenceType}
                </TableCell>


                <TableCell>
                  {m.createdAt}
                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>


    </Box>

  );

}



export default Inventory;