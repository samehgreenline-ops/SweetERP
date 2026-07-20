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



function Accounts() {


  const [accounts, setAccounts] = useState([]);



  async function loadAccounts() {

    try {

      const data = await apiGet(
        "/accounting/accounts"
      );


      setAccounts(data);


    } catch (error) {

      console.error(
        "ACCOUNTS ERROR:",
        error
      );

    }

  }



  useEffect(()=>{

    loadAccounts();

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

        دليل الحسابات

      </Typography>



      <TableContainer

        component={Paper}

      >

        <Table

          sx={{

            minWidth:700

          }}

        >


          <TableHead>

            <TableRow>

              <TableCell>
                كود الحساب
              </TableCell>


              <TableCell>
                اسم الحساب
              </TableCell>


              <TableCell>
                نوع الحساب
              </TableCell>


              <TableCell>
                الحساب الأب
              </TableCell>


              <TableCell>
                الحالة
              </TableCell>


            </TableRow>

          </TableHead>



          <TableBody>


            {accounts.map((account)=>(


              <TableRow

                key={account.id}

              >


                <TableCell>

                  {account.code}

                </TableCell>



                <TableCell>

                  {account.name}

                </TableCell>



                <TableCell>

                  {account.account_type}

                </TableCell>



                <TableCell>

                  {account.parent_id || "-"}

                </TableCell>



                <TableCell>

                  {
                    account.active
                    ?
                    "نشط"
                    :
                    "متوقف"
                  }

                </TableCell>


              </TableRow>


            ))}


          </TableBody>


        </Table>


      </TableContainer>


    </>

  );

}


export default Accounts;