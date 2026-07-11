import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


import {
  ITEM_TYPES,
  UNITS,
} from "../../services/itemService.js";


function getTypeLabel(value) {

  const type = ITEM_TYPES.find(
    item => item.value === value
  );

  return type ? type.label : value;

}


function getUnitLabel(value) {

  const unit = UNITS.find(
    item => item.value === value
  );

  return unit ? unit.label : value;

}



function ItemTable({ items }) {

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
              الكود
            </TableCell>

            <TableCell>
              اسم الصنف
            </TableCell>

            <TableCell>
              النوع
            </TableCell>

            <TableCell>
              الوحدة
            </TableCell>

          </TableRow>

        </TableHead>


        <TableBody>

          {items.map((item) => (

            <TableRow key={item.id}>

              <TableCell>
                {item.code || "-"}
              </TableCell>


              <TableCell>
                {item.name}
              </TableCell>


              <TableCell>
                {getTypeLabel(item.itemType)}
              </TableCell>


              <TableCell>
                {getUnitLabel(item.baseUnit)}
              </TableCell>


            </TableRow>

          ))}


        </TableBody>

      </Table>

    </TableContainer>

  );

}


export default ItemTable;