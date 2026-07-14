import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
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



function RecipeItemsTable({ items, onUpdateQty }) {


  return (

    <TableContainer component={Paper}>

      <Table sx={{ direction:"rtl" }}>

        <TableHead>

          <TableRow>
            <TableCell>الصنف</TableCell>
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

                <TextField

                  type="number"

                  size="small"

                  value={item.qty}

                  onChange={(e)=>
                    onUpdateQty(
                      item.id,
                      e.target.value
                    )
                  }

                />

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