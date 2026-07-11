import { Box, Button, Typography } from "@mui/material";


function ItemToolbar({ onAdd }) {

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 3,
        direction: "rtl",
      }}
    >

      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
        }}
      >
        قائمة الأصناف
      </Typography>


      <Button
        variant="contained"
        onClick={onAdd}
      >
        إضافة صنف
      </Button>


    </Box>

  );

}


export default ItemToolbar;