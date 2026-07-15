import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";


import {
  getDashboardStats,
  getInventoryReport,
  getProductionCosts,
} from "../../services/reportService.js";



function Reports() {


  const [dashboard, setDashboard] = useState(null);

  const [inventory, setInventory] = useState(null);

  const [productionCosts, setProductionCosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  const loadReports = async () => {

    try {

      setLoading(true);

      setError("");

      const [
        dashboardData,
        inventoryData,
        productionData,
      ] = await Promise.all([
        getDashboardStats(),
        getInventoryReport(),
        getProductionCosts(),
      ]);


      setDashboard(dashboardData);

      setInventory(inventoryData);

      setProductionCosts(productionData);


    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    loadReports();

  }, []);



  if (loading) {

    return (

      <Box sx={{display:"flex",justifyContent:"center",p:4}}>

        <CircularProgress />

      </Box>

    );

  }



  if (error) {

    return (

      <Alert severity="error">

        {error}

      </Alert>

    );

  }



  return (

    <Box sx={{direction:"rtl"}}>


      <Typography variant="h5" sx={{mb:3}}>

        التقارير

      </Typography>



      <Grid container spacing={2}>


        <Grid item xs={12} md={4}>

          <Paper sx={{p:2}}>

            <Typography>

              عدد الأصناف

            </Typography>

            <Typography variant="h5">

              {dashboard.itemsCount}

            </Typography>

          </Paper>

        </Grid>



        <Grid item xs={12} md={4}>

          <Paper sx={{p:2}}>

            <Typography>

              عدد الوصفات

            </Typography>

            <Typography variant="h5">

              {dashboard.recipesCount}

            </Typography>

          </Paper>

        </Grid>



        <Grid item xs={12} md={4}>

          <Paper sx={{p:2}}>

            <Typography>

              الإنتاج المكتمل

            </Typography>

            <Typography variant="h5">

              {dashboard.productionCount}

            </Typography>

          </Paper>

        </Grid>



        <Grid item xs={12} md={4}>

          <Paper sx={{p:2}}>

            <Typography>

              إجمالي المشتريات

            </Typography>

            <Typography variant="h5">

              {dashboard.totalPurchases}

            </Typography>

          </Paper>

        </Grid>



        <Grid item xs={12} md={4}>

          <Paper sx={{p:2}}>

            <Typography>

              إجمالي المبيعات

            </Typography>

            <Typography variant="h5">

              {dashboard.totalSales}

            </Typography>

          </Paper>

        </Grid>



        <Grid item xs={12} md={4}>

          <Paper sx={{p:2}}>

            <Typography>

              الربح

            </Typography>

            <Typography variant="h5">

              {dashboard.profit}

            </Typography>

          </Paper>

        </Grid>


      </Grid>





      <Typography variant="h6" sx={{mt:4,mb:2}}>

        الأصناف منخفضة المخزون

      </Typography>


      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>الصنف</TableCell>

              <TableCell>الكمية</TableCell>

              <TableCell>الوحدة</TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {dashboard.lowStock.map(item=>(

              <TableRow key={item.id}>

                <TableCell>{item.name}</TableCell>

                <TableCell>{item.stockQty}</TableCell>

                <TableCell>{item.baseUnit}</TableCell>

              </TableRow>

            ))}


          </TableBody>

        </Table>

      </TableContainer>





      <Typography variant="h6" sx={{mt:4,mb:2}}>

        قيمة المخزون

      </Typography>


      <Paper sx={{p:2}}>

        إجمالي قيمة المخزون:

        {" "}

        {inventory.totalValue}

      </Paper>





      <Typography variant="h6" sx={{mt:4,mb:2}}>

        تكلفة تصنيع المنتجات

      </Typography>


      <TableContainer component={Paper}>

        <Table>


          <TableHead>

            <TableRow>

              <TableCell>المنتج</TableCell>

              <TableCell>تكلفة الإنتاج</TableCell>

              <TableCell>تكلفة الوحدة</TableCell>

            </TableRow>

          </TableHead>



          <TableBody>


            {productionCosts.map(item=>(

              <TableRow key={item.recipeId}>

                <TableCell>

                  {item.productName}

                </TableCell>


                <TableCell>

                  {item.totalCost}

                </TableCell>


                <TableCell>

                  {item.unitCost}

                </TableCell>


              </TableRow>

            ))}


          </TableBody>


        </Table>

      </TableContainer>



    </Box>

  );

}


export default Reports;