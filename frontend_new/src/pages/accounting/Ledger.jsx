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



function Ledger() {


  const [rows, setRows] = useState([]);



  async function loadLedger() {

    try {

      const data = await apiGet(
        "/accounting/reports/gl"
      );


      setRows(data);


    } catch(error) {

      console.error(
        "LEDGER ERROR:",
        error
      );

    }

  }



  useEffect(()=>{

    loadLedger();

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

        دفتر الأستاذ العام

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
                التاريخ
              </TableCell>


              <TableCell>
                البيان
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
                  {row.entry_date}
                </TableCell>


                <TableCell>
                  {row.description}
                </TableCell>


                <TableCell>
                  {row.debit}
                </TableCell>


                <TableCell>
                  {row.credit}
                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>


    </>

  );

}


export default Ledger;