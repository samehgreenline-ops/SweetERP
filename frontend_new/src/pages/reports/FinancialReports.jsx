import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  CircularProgress,
} from "@mui/material";


const API = "/api";



function FinancialReports() {


  const [income, setIncome] = useState(null);
  const [position, setPosition] = useState(null);
  const [inventory, setInventory] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadReports() {

      try {


        const [
          incomeRes,
          positionRes,
          inventoryRes
        ] = await Promise.all([

          fetch(
            `${API}/financial-reports/income-statement-full`
          ),

          fetch(
            `${API}/financial-reports/financial-position`
          ),

          fetch(
            `${API}/financial-reports/inventory-value`
          )

        ]);



        const incomeData =
          await incomeRes.json();


        const positionData =
          await positionRes.json();


        const inventoryData =
          await inventoryRes.json();



        setIncome(incomeData);

        setPosition(positionData);

        setInventory(inventoryData);



      }

      catch(error){

        console.error(
          "REPORT ERROR",
          error
        );

      }

      finally{

        setLoading(false);

      }


    }


    loadReports();


  }, []);




  if(loading){

    return (
      <Box sx={{p:3}}>
        <CircularProgress/>
      </Box>
    );

  }





  return (

    <Box sx={{p:3}}>


      <Typography variant="h5" mb={3}>
        التقارير المالية
      </Typography>





      {income && (

        <Paper sx={{p:2, mb:3}}>

          <Typography variant="h6">
            قائمة الدخل
          </Typography>


          <Typography>
            المبيعات:
            {" "}
            {income.totals.sales}
          </Typography>


          <Typography>
            مجمل الربح:
            {" "}
            {income.totals.grossProfit}
          </Typography>


          <Typography>
            المصروفات التشغيلية:
            {" "}
            {income.totals.operatingExpenses}
          </Typography>


          <Typography>
            صافي الربح:
            {" "}
            {income.totals.netProfit}
          </Typography>


        </Paper>

      )}







      {position && (

        <Paper sx={{p:2, mb:3}}>


          <Typography variant="h6">
            المركز المالي
          </Typography>


          <Typography>
            إجمالي الأصول:
            {" "}
            {position.totals.assets}
          </Typography>


          <Typography>
            إجمالي الالتزامات:
            {" "}
            {position.totals.liabilities}
          </Typography>


          <Typography>
            حقوق الملكية:
            {" "}
            {position.totals.equity}
          </Typography>


        </Paper>

      )}







      <Paper sx={{p:2}}>


        <Typography variant="h6" mb={2}>
          قيمة المخزون
        </Typography>



        <Table>


          <TableHead>

            <TableRow>

              <TableCell>
                الكود
              </TableCell>

              <TableCell>
                الصنف
              </TableCell>

              <TableCell>
                الرصيد
              </TableCell>

              <TableCell>
                القيمة
              </TableCell>

            </TableRow>

          </TableHead>



          <TableBody>


            {inventory.map(item=>(

              <TableRow key={item.code}>


                <TableCell>
                  {item.code}
                </TableCell>


                <TableCell>
                  {item.name}
                </TableCell>


                <TableCell>
                  {item.balance_qty}
                </TableCell>


                <TableCell>
                  {item.stock_value}
                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </Paper>



    </Box>

  );


}


export default FinancialReports;