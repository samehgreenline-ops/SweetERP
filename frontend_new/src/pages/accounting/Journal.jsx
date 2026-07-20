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



function Journal() {


  const [entries, setEntries] = useState([]);



  async function loadJournal() {

    try {

      const data = await apiGet(
        "/accounting/journal"
      );


      setEntries(data);


    } catch(error) {

      console.error(
        "JOURNAL ERROR:",
        error
      );

    }

  }



  useEffect(()=>{

    loadJournal();

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

        القيود اليومية

      </Typography>



      <TableContainer component={Paper}>

        <Table>


          <TableHead>

            <TableRow>

              <TableCell>
                التاريخ
              </TableCell>

              <TableCell>
                البيان
              </TableCell>

              <TableCell>
                نوع المرجع
              </TableCell>

              <TableCell>
                رقم المرجع
              </TableCell>

              <TableCell>
                تاريخ الإنشاء
              </TableCell>

            </TableRow>

          </TableHead>



          <TableBody>


            {entries.map((entry)=>(


              <TableRow key={entry.id}>


                <TableCell>
                  {entry.entry_date}
                </TableCell>


                <TableCell>
                  {entry.description}
                </TableCell>


                <TableCell>
                  {entry.reference_type}
                </TableCell>


                <TableCell>
                  {entry.reference_id || "-"}
                </TableCell>


                <TableCell>
                  {entry.created_at}
                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>


    </>

  );

}


export default Journal;