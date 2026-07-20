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



function BalanceSheet() {


  const [data, setData] = useState(null);



  async function loadBalanceSheet() {

    try {

      const result = await apiGet(
        "/financial-reports/financial-position"
      );


      setData(result);


    } catch(error) {

      console.error(
        "BALANCE SHEET ERROR:",
        error
      );

    }

  }



  useEffect(()=>{

    loadBalanceSheet();

  },[]);



  if(!data){

    return null;

  }



  function renderSection(title, rows) {

    return (

      <TableContainer

        component={Paper}

        sx={{ mb:3 }}

      >

        <Typography

          variant="h6"

          sx={{

            p:2,

            fontWeight:"bold"

          }}

        >

          {title}

        </Typography>



        <Table>


          <TableHead>

            <TableRow>

              <TableCell>
                الكود
              </TableCell>


              <TableCell>
                الحساب
              </TableCell>


              <TableCell>
                الرصيد
              </TableCell>


            </TableRow>

          </TableHead>



          <TableBody>


            {rows.map((item,index)=>(


              <TableRow key={index}>


                <TableCell>
                  {item.code}
                </TableCell>


                <TableCell>
                  {item.name}
                </TableCell>


                <TableCell>
                  {Number(item.balance || 0).toFixed(2)}
                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>

    );

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

        المركز المالي

      </Typography>



      {renderSection(
        "الأصول",
        data.assets || []
      )}



      {renderSection(
        "الالتزامات",
        data.liabilities || []
      )}



      {renderSection(
        "حقوق الملكية",
        data.equity || []
      )}





      <Paper

        sx={{

          p:3

        }}

      >


        <Typography>

          إجمالي الأصول:
          {" "}
          {Number(data.totals.assets || 0).toFixed(2)}

        </Typography>



        <Typography>

          إجمالي الالتزامات:
          {" "}
          {Number(data.totals.liabilities || 0).toFixed(2)}

        </Typography>



        <Typography>

          إجمالي حقوق الملكية:
          {" "}
          {Number(data.totals.equity || 0).toFixed(2)}

        </Typography>



      </Paper>


    </>

  );

}



export default BalanceSheet;