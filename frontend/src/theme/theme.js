import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",

  palette: {
    primary: {
      main: "#1565c0",
    },

    secondary: {
      main: "#ff9800",
    },

    background: {
      default: "#f4f6f9",
    },
  },

  typography: {
    fontFamily: "Tahoma, Arial",
  },
});

export default theme;