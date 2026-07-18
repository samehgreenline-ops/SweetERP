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

import { useAuth } from "../context/AuthContext.jsx";



const menuItems = [

  {
    text: "الرئيسية",
    path: "/",
    permission: "dashboard.view",
  },

  {
    text: "الأصناف",
    path: "/items",
    permission: "items.view",
  },

  {
    text: "المخزون",
    path: "/inventory",
    permission: "inventory.view",
  },

  {
    text: "الوصفات",
    path: "/recipes",
    permission: "items.view",
  },

  {
    text: "الإنتاج",
    path: "/production",
    permission: "production.view",
  },

  {
    text: "المبيعات",
    path: "/sales",
    permission: "sales.view",
  },

  {
    text: "المشتريات",
    path: "/purchases",
    permission: "purchases.view",
  },

  {
    text: "التقارير",
    path: "/reports",
    permission: "reports.view",
  },

  {
    text: "المستخدمون",
    path: "/users",
    permission: "users.manage",
  },

  {
    text: "الأدوار والصلاحيات",
    path: "/roles",
    permission: "users.manage",
  },

];



function MainLayout() {


  const location = useLocation();


  const {
    hasPermission,
    user,
  } = useAuth();



  const visibleMenu = menuItems.filter((item) =>

    hasPermission(item.permission)

  );



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

              marginBottom: 1,

              textAlign: "center",

            }}

          >

            SweetERP

          </Typography>



          {user && (

            <Typography

              sx={{

                textAlign: "center",

                mb: 2,

                fontSize: 14,

              }}

            >

              {user.full_name}

            </Typography>

          )}




          <List>


            {visibleMenu.map((item) => (


              <ListItem

                key={item.path}

                disablePadding

              >


                <ListItemButton

                  component={NavLink}

                  to={item.path}

                  selected={
                    location.pathname === item.path
                  }

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