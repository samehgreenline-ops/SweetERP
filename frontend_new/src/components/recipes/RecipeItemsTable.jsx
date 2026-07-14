import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


function convertDisplayQty(qty, unit) {

  const value = Number(qty) || 0;

  if (unit === "مل") {
    return value / 1000;
  }

  if (unit === "جرام") {
    return value / 1000;
  }

  return value;

}



function RecipeItemsTable({ items }) {


  return (

    <TableContainer component={Paper}>

      <Table sx={{ direction:"rtl" }}>

        <TableHead>

          <TableRow>

            <TableCell>المادة</TableCell>

            <TableCell>الكمية</TableCell>

            <TableCell>الوحدة</TableCell>

            <TableCell>تكلفة الوحدة</TableCell>

            <TableCell>الإجمالي</TableCell>

          </TableRow>

        </TableHead>


        <TableBody>

          {items.map((item)=>(

            <TableRow key={item.id}>

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
                {
                  (
                    convertDisplayQty(item.qty,item.unit)
                    *
                    Number(item.cost)
                  ).toFixed(2)
                }
              </TableCell>


            </TableRow>

          ))}


        </TableBody>


      </Table>

    </TableContainer>

  );

}


export default RecipeItemsTable;