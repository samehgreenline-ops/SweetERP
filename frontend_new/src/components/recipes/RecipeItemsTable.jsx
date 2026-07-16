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

    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        overflowX: "auto"
      }}
    >

      <Table
        sx={{
          direction: "rtl",
          minWidth: 800,
          tableLayout: "auto"
        }}
      >

        <TableHead>

          <TableRow>

            <TableCell
              sx={{
                minWidth: 200,
                width: 200
              }}
            >
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

            <TableRow key={item.id}>


              <TableCell
                sx={{
                  minWidth:200,
                  width:200,
                  whiteSpace:"nowrap",
                  overflow:"visible"
                }}
              >

                <div
                  style={{
                    color:"#000",
                    fontSize:"16px",
                    fontWeight:"bold",
                    direction:"rtl",
                    display:"block"
                  }}
                >
                  {item.name}
                </div>

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
                {Number(item.cost || 0).toFixed(2)}
              </TableCell>



              <TableCell>

                {
                  (
                    convertDisplayQty(
                      item.qty,
                      item.unit
                    )
                    *
                    Number(item.cost || 0)
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