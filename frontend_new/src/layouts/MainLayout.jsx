import { Outlet, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";


const menuItems = [
  {
    text: "الرئيسية",
    path: "/",
  },
  {
    text: "الأصناف",
    path: "/items",
  },
  {
    text: "المخزون",
    path: "/inventory",
  },
  {
    text: "الوصفات",
    path: "/recipes",
  },
  {
    text: "الإنتاج",
    path: "/production",
  },
  {
    text: "المبيعات",
    path: "/sales",
  },
  {
    text: "المشتريات",
    path: "/purchases",
  },
  {
    text: "التقارير",
    path: "/reports",
  },
];


function MainLayout() {

  return (

    <Box
      sx={{
        minHeight: "100vh",
        direction: "rtl",
        display: "flex",
        backgroundColor: "#f5f5f5",
      }}
    >

      <Drawer
        variant="permanent"
        anchor="right"
      >

        <Box
          sx={{
            width: 240,
            padding: 2,
          }}
        >

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            SweetERP
          </Typography>


          <List>

            {menuItems.map((item) => (

              <ListItem
                key={item.path}
                disablePadding
              >

                <ListItemButton
                  component={Link}
                  to={item.path}
                >

                  <ListItemText
                    primary={item.text}
                  />

                </ListItemButton>

              </ListItem>

            ))}

          </List>


        </Box>

      </Drawer>


      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
        }}
      >

        <Outlet />

      </Box>


    </Box>

  );

}


export default MainLayout;