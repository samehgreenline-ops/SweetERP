import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { apiGet } from "../../services/api.js";



function IncomeStatement() {


  const [data, setData] = useState(null);



  async function loadIncomeStatement() {

    try {

      const result = await apiGet(
        "/financial-reports/income-statement-full"
      );


      setData(result);


    } catch(error) {

      console.error(
        "INCOME STATEMENT ERROR:",
        error
      );

    }

  }



  useEffect(()=>{

    loadIncomeStatement();

  },[]);



  if(!data){

    return null;

  }



  return (

    <>


      <Typography

        variant="h5"

        sx={{

          mb:3,

          fontWeight:"bold"

        }}

      >

        قائمة الدخل

      </Typography>




      <TableContainer

        component={Paper}

        sx={{mb:3}}

      >

        <Table>


          <TableHead>

            <TableRow>

              <TableCell>
                الإيراد
              </TableCell>

              <TableCell>
                القيمة
              </TableCell>

            </TableRow>

          </TableHead>



          <TableBody>


            {data.revenues.map((item,index)=>(


              <TableRow key={index}>


                <TableCell>

                  {item.name}

                </TableCell>


                <TableCell>

                  {Number(item.amount || 0).toFixed(2)}

                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>





      <TableContainer

        component={Paper}

        sx={{mb:3}}

      >

        <Table>


          <TableHead>

            <TableRow>

              <TableCell>
                المصروفات
              </TableCell>

              <TableCell>
                القيمة
              </TableCell>

            </TableRow>

          </TableHead>



          <TableBody>


            {data.expenses.map((item,index)=>(


              <TableRow key={index}>


                <TableCell>

                  {item.name}

                </TableCell>


                <TableCell>

                  {Number(item.amount || 0).toFixed(2)}

                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>





      <Paper

        sx={{

          p:3

        }}

      >


        <Typography>

          إجمالي المبيعات:
          {" "}
          {Number(data.totals.sales || 0).toFixed(2)}

        </Typography>



        <Typography>

          مجمل الربح:
          {" "}
          {Number(data.totals.grossProfit || 0).toFixed(2)}

        </Typography>



        <Typography>

          مصروفات التشغيل:
          {" "}
          {Number(data.totals.operatingExpenses || 0).toFixed(2)}

        </Typography>



        <Typography

          sx={{

            mt:2,

            fontWeight:"bold"

          }}

        >

          صافي الربح:
          {" "}
          {Number(data.totals.netProfit || 0).toFixed(2)}

        </Typography>



      </Paper>


    </>

  );

}


export default IncomeStatement;