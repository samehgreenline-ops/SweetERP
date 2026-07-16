import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getTypeLabel,
  getUnitLabel,
  formatMoney,
} from "../../utils/constants.js";


function ItemTable({ items, onEdit, onDelete }) {

  console.log("ITEM TABLE DATA:", items);

  return (

    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        overflowX: "auto",
        direction: "rtl"
      }}
    >

      <Table
        sx={{
          width: "100%",
          tableLayout: "fixed"
        }}
      >

        <colgroup>
          <col style={{ width: "80px" }} />
          <col />
          <col style={{ width: "110px" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "110px" }} />
          <col style={{ width: "110px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "90px" }} />
        </colgroup>


        <TableHead>

          <TableRow>

            <TableCell align="right">الكود</TableCell>
            <TableCell align="right">اسم الصنف</TableCell>
            <TableCell align="right">النوع</TableCell>
            <TableCell align="right">الوحدة</TableCell>
            <TableCell align="right">سعر الشراء</TableCell>
            <TableCell align="right">سعر البيع</TableCell>
            <TableCell align="right">المخزون</TableCell>
            <TableCell align="right">إجراءات</TableCell>

          </TableRow>

        </TableHead>



        <TableBody>

          {items.length === 0 && (

            <TableRow>

              <TableCell colSpan={8} align="center">
                لا توجد أصناف — أضف صنفاً جديداً
              </TableCell>

            </TableRow>

          )}



          {items.map((item) => (

            <TableRow key={item.id}>


              <TableCell
                sx={{
                  px: 1,
                  whiteSpace: "nowrap"
                }}
              >
                {item.code || "-"}
              </TableCell>



              <TableCell
                sx={{
                  px: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {item.name}
              </TableCell>



              <TableCell sx={{ px: 1 }}>
                {getTypeLabel(item.itemType)}
              </TableCell>



              <TableCell sx={{ px: 1 }}>
                {getUnitLabel(item.baseUnit)}
              </TableCell>



              <TableCell sx={{ px: 1 }}>
                {formatMoney(item.purchasePrice)}
              </TableCell>



              <TableCell sx={{ px: 1 }}>
                {formatMoney(item.salePrice)}
              </TableCell>



              <TableCell sx={{ px: 1 }}>

                {item.trackInventory ? (

                  <Chip
                    label={`${item.stockQty} ${getUnitLabel(item.baseUnit)}`}
                    size="small"
                  />

                ) : "-"}

              </TableCell>



              <TableCell sx={{ px: 1 }}>

                <IconButton
                  color="primary"
                  onClick={() => onEdit(item)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>


                <IconButton
                  color="error"
                  onClick={() => onDelete(item.id)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>

              </TableCell>


            </TableRow>

          ))}


        </TableBody>


      </Table>


    </TableContainer>

  );

}


export default ItemTable;