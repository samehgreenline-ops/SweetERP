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

  return (

    <TableContainer component={Paper}>

      <Table sx={{ direction: "rtl" }}>

        <TableHead>

          <TableRow>

            <TableCell>الكود</TableCell>
            <TableCell>اسم الصنف</TableCell>
            <TableCell>النوع</TableCell>
            <TableCell>الوحدة</TableCell>
            <TableCell>سعر الشراء</TableCell>
            <TableCell>سعر البيع</TableCell>
            <TableCell>المخزون</TableCell>
            <TableCell>إجراءات</TableCell>

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

              <TableCell>{item.code || "-"}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{getTypeLabel(item.itemType)}</TableCell>
              <TableCell>{getUnitLabel(item.baseUnit)}</TableCell>
              <TableCell>{formatMoney(item.purchasePrice)}</TableCell>
              <TableCell>{formatMoney(item.salePrice)}</TableCell>

              <TableCell>
                {item.trackInventory ? (
                  <Chip
                    label={`${item.stockQty} ${getUnitLabel(item.baseUnit)}`}
                    color={item.stockQty <= 10 ? "warning" : "default"}
                    size="small"
                  />
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(item.id)}>
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
