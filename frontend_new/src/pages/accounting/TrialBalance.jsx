import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { apiGet } from "../../services/api.js";



function TrialBalance() {


  const [rows, setRows] = useState([]);



  async function loadTrialBalance() {

    try {

      const data = await apiGet(
        "/accounting/reports/trial-balance"
      );


      setRows(data);


    } catch(error) {

      console.error(
        "TRIAL BALANCE ERROR:",
        error
      );

    }

  }



  useEffect(()=>{

    loadTrialBalance();

  },[]);



  return (

    <>

      <Typography

        variant="h5"

        sx={{

          mb:3,

          fontWeight:"bold"

        }}

      >

        ميزان المراجعة

      </Typography>



      <TableContainer component={Paper}>


        <Table>


          <TableHead>

            <TableRow>

              <TableCell>
                كود الحساب
              </TableCell>


              <TableCell>
                اسم الحساب
              </TableCell>


              <TableCell>
                مدين
              </TableCell>


              <TableCell>
                دائن
              </TableCell>


            </TableRow>


          </TableHead>



          <TableBody>


            {rows.map((row,index)=>(


              <TableRow key={index}>


                <TableCell>
                  {row.code}
                </TableCell>


                <TableCell>
                  {row.name}
                </TableCell>


                <TableCell>
                  {Number(row.debit || 0).toFixed(2)}
                </TableCell>


                <TableCell>
                  {Number(row.credit || 0).toFixed(2)}
                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>


    </>

  );

}


export default TrialBalance;