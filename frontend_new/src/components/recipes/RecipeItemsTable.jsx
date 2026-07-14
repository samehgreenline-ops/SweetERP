import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


function convertQty(qty, fromUnit, toUnit) {

  const units = {
    "كيلو": 1,
    "KG": 1,

    "جرام": 0.001,
    "GRAM": 0.001,

    "جم": 0.001,

    "لتر": 1,
    "LITER": 1,

    "قطعة": 1,
    "PIECE": 1,
  };


  const amount = Number(qty) || 0;


  if (!units[fromUnit] || !units[toUnit]) {
    return amount;
  }


  return amount * units[fromUnit] / units[toUnit];

}



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

            <TableCell>المادة</TableCell>

            <TableCell>الكمية</TableCell>

            <TableCell>الوحدة</TableCell>

            <TableCell>تكلفة الوحدة</TableCell>

            <TableCell>الإجمالي</TableCell>

          </TableRow>

        </TableHead>


        <TableBody>

          {items.map((item) => {


            const qtyInBase = convertQty(
              item.qty,
              item.unit,
              item.baseUnit || "KG"
            );


            const total =
              qtyInBase * Number(item.cost || 0);



            return (

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
                  {total.toFixed(2)}
                </TableCell>


              </TableRow>

            );

          })}


        </TableBody>


      </Table>

    </TableContainer>

  );

}


export default RecipeItemsTable;