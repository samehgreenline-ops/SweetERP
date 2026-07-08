import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <TableContainer component={Paper}>

      <Table>

        <TableHead>

          <TableRow
            sx={{
              backgroundColor: "#1976d2",
            }}
          >
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              الكود
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              اسم الصنف
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              الفئة
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              التكلفة
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              سعر البيع
            </TableCell>

            <TableCell
              align="center"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              الإجراءات
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {products.map((item) => (

            <TableRow key={item.id} hover>

              <TableCell>{item.code}</TableCell>

              <TableCell>{item.name}</TableCell>

              <TableCell>{item.category}</TableCell>

              <TableCell>{item.cost}</TableCell>

              <TableCell>{item.price}</TableCell>

              <TableCell align="center">

                <IconButton
                  color="primary"
                  onClick={() => onEdit(item)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(item.id)}
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

export default ProductTable;