import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


function RecipeItemsTable({ items }) {


  return (

    <TableContainer component={Paper}>

      <Table
        sx={{
          direction: "rtl",
        }}
      >

        <TableHead>

          <TableRow>

            <TableCell>
              المادة
            </TableCell>


            <TableCell>
              الكمية
            </TableCell>


            <TableCell>
              الوحدة
            </TableCell>


            <TableCell>
              تكلفة الوحدة
            </TableCell>


            <TableCell>
              الإجمالي
            </TableCell>


          </TableRow>

        </TableHead>


        <TableBody>

          {items.map((item) => (

            <TableRow
              key={item.id}
            >

              <TableCell>
                {item.name}
              </TableCell>


              <TableCell>
                {item.qty}
              </TableCell>


              <TableCell>
                {item.unit}
              </TableCell>


              <TableCell>
                {item.cost}
              </TableCell>


              <TableCell>
                {item.qty * item.cost}
              </TableCell>


            </TableRow>

          ))}


        </TableBody>


      </Table>

    </TableContainer>

  );

}


export default RecipeItemsTable;