import { Box, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3">
        SweetERP
      </Typography>

      <Typography variant="h5" sx={{ mt: 2 }}>
        لوحة التحكم الرئيسية
      </Typography>
    </Box>
  );
}

export default Dashboard;