import { Outlet, NavLink, useLocation } from "react-router-dom";

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
  { text: "الرئيسية", path: "/" },
  { text: "الأصناف", path: "/items" },
  { text: "المخزون", path: "/inventory" },
  { text: "الوصفات", path: "/recipes" },
  { text: "الإنتاج", path: "/production" },
  { text: "المبيعات", path: "/sales" },
  { text: "المشتريات", path: "/purchases" },
  { text: "التقارير", path: "/reports" },
  { text: "المستخدمون", path: "/users" },
  { text: "الأدوار والصلاحيات", path: "/roles" },
];


function MainLayout() {

  const location = useLocation();


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
        sx={{
          width: 240,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
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
                  component={NavLink}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    textAlign: "right",
                  }}
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
        component="main"
        sx={{
          flexGrow: 1,
          width: "calc(100% - 240px)",
          minWidth: 0,
          overflowX: "hidden",
          padding: 3,
        }}
      >

        <Outlet />

      </Box>


    </Box>

  );

}


export default MainLayout;