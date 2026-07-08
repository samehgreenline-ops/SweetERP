import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ProductToolbar({ search, setSearch, onAdd }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        label="بحث عن صنف"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        إضافة صنف
      </Button>
    </Box>
  );
}

export default ProductToolbar;